---
title: "HighLoad Saga. Part Two, Chapter 2: Data Storage and Processing Subsystems"
description: Key aspects of data storage subsystems
pubDate: 2024-02-25T00:00:00Z
language: 'en'
tags: [System Design]
style: border
color: info
---

So, databases are data storage systems. Essentially, they should solve just two tasks: save the data received from the client and provide data in the future as a response to specific requests.

A good question is - should an application developer know how the DBMS is structured internally? Specifically, how is data stored and how does the search for this data work?

It sounds like a closed question, but I believe the correct answer goes something like this: By default, a developer *should not* know how to implement a data storage subsystem from scratch (we are talking about us - JSON bricklayers, not system developers hired on the project to implement a new ultra-fast DBMS, of course), but the developer should understand the practical significance of different storage subsystems, their pros and cons, to be able to choose the suitable one for the project being developed.

Well, in general, the short answer to this closed question then is a yes :)

We need to have at least a rough, conceptual idea of the storage mechanisms' structure to select and optimally configure the DBMS for our load.

## Basic Data Structures in DBMS: Key-Value

Typically, a database stores unique keys, each corresponding to some value. In general, the types of these values can vary.

The *simplest* form of implementing the key-value model is to write data in a file as lines that contain pairs of keys and values serialized into a text/string format.

The performance of adding a new key-value pair in this case is high if keys are always generated as uniquely new (current timestamp, for example) and updates to existing records are not allowed.

Under such conditions, we simply append new lines at the end of the file.

Many DBMSs use a (mainly for specific purposes) essentially *similar* mechanism called *journaling*: there is a file, called a journal (or log, or whatever), and it is intended only for appending data at its end.

Obviously, in practice, such logging is implemented in a more complex manner, as it requires managing concurrent access to the journal, controlling disk space, creating backups, handling errors, and correcting corrupted records. Nonetheless, the fundamental principle remains the same.

To optimize the use of disk space, journals are usually divided into segments of a certain size. Once a segment reaches this size, its file is "closed", and subsequent data are recorded in a new segment.

In addition to this, there often exists so-called *compaction* technology for existing segments, which involves discarding duplicate keys from the journal and keeping only the latest version for each key.

Many logging/journaling technologies implement similar mechanics of segmentation.

## Indexes

So, we manage to write to the journal efficiently, but reading a value by key would work terribly inefficiently in the case of a large number of records in our journal.

We end up with linear complexity *O(n)*, because each time we would have to search through our entire "database" from start to finish looking for the required key.

To ensure efficient searching for any key in our storage system, we need another data structure - an *index*.

The main essence of an index is that it stores additional metadata, a kind of "pointers", which help to find the necessary records much faster.

Typically, the ability to add and remove indexes in most DBMSs does not affect the content (actual data) of the database, but modifying indexes affects the *performance of queries*.

Maintaining indexes leads to additional costs, especially when the database writes new values to disk, because indexes need to be updated each time to keep them up to date with the new data.

In such a scenario, it is practically impossible to outperform the efficiency of simply appending data to the end of a file (since this is the simplest of all possible disk write operations).

This is an important compromise in data storage systems: well-chosen indexes speed up read queries but slow down writing.

This is why DBMSs do not index everything by default but offer developers the chance to choose indexes manually, based on their knowledge of query patterns typical for the application.

## Hash Indexes

The key-value data model is somewhat "similar" to the dictionary (map, etc.) data structure.

Or rather, dictionaries are usually implemented as hash maps or hash tables.

Since hash maps are used for in-memory data structures, and such structures are extremely convenient, how about using hash maps for indexing data on disk?

Imagine we are still dealing with our simplest storage, which operates solely by appending data to the end of a journal file.

We start to build and keep a hash map in memory, where each key corresponds to a physical offset (relative address) in the data file - essentially a pointer to the specific location where the value is located.

> File operations in every OS allow the operation of positioning the cursor within the file with byte accuracy - the seek operation.

As a result, when adding a new "key-value" pair to the file, our hash map is updated to reflect the address of the data just written. This implementation works efficiently both when inserting new keys and when updating the values of existing ones.

Just in case - hash maps can serve not only for indexing pointers to stored values but also for indexing any metric of interest.

For example, a video URL might serve as a key, and the value could be the number of views, which increases each time someone requests playback.

With this type of load, the number of write operations will be high, but there will not be too many unique keys. Therefore, in such a scenario, it is perfectly acceptable to store all keys and values in memory.

This concept is implemented by in-memory databases, which entirely (or in large blocks) fit into RAM, achieving very high performance.

To ensure their reliability, data from memory is regularly dumped as snapshots to a fast (hopefully) disk.

So, we run into the fact that the hash table must fit into memory, and if there are *really* a lot of keys in the database - we're in trouble.

## SSTables and LSM Trees

Developing our scenario further, let's try to change the format of *segment* files (remember the journal segments?).

The new requirement is to sort the sequences of "key-value" pairs by key.

The first thing that comes to mind is that this requirement will prevent us from writing sequentially to the file, and it seems that other problems related to working with the journal may arise.

A valid concern, but first, let's consider the advantages we get.

The new format we are describing is called *SS-table*, or *"sorted string table."* 

The implementation of SS-tables also requires ensuring that each key is unique in the combined segment. We already talked about this at the beginning, mentioning that key uniqueness is achieved through a compaction process.

In an SS-table, to find a specific key in the file, it's no longer necessary to store indexes of all keys in memory because all keys are sorted, and access to them is pretty fast.

Moreover, the compaction of segments is performed efficiently and simply, even if the file sizes exceed the available memory space (The approach is similar to that used in the merge sort algorithm).

Sorted data structures can be stored on disk, but it's much easier to do this in memory - using tree-like data structures such as red-black or balanced binary trees.

Using such structures, we can very quickly add keys in any sequence and then read them in the desired order.

One significant and obvious problem remains - in the event of a fatal database failure, recently written data, which has not yet been written to disk, is *lost*.

A common practice to combat this problem is to maintain a separate journal on disk, into which all new data being written is *added immediately*. 

Such a journal does not need to be sorted in some specific way, because its main and only purpose is to restore the data structure in memory when the database starts up after a failure.

---

Storage subsystems based on the principle of merging and compacting sorted files are often called *LSM storage subsystems*, derived from Log-Structured Merge-Tree, or *LSM-Tree*.

An LSM-tree-based algorithm may perform slowly when searching for missing keys, because it requires scanning the entire structure in memory firstly, and then scanning all segments up to the oldest one, reading each of them from the disk before it can be confirmed that the key is missing.

To optimize such access, storage subsystems often employ a *Bloom filter*.

A Bloom filter is a probabilistic data structure that provides an efficient way to test whether an element is a member of a set. It can quickly tell if a key is definitely not in the database or might be, with a small chance of false positives. The beauty of a Bloom filter lies in its ability to perform these checks in nearly constant time, significantly reducing the need for disk reads when searching for keys that do not exist in the database.

## B-Trees

Although journaled indexes are a popular technology, they are not the most common type of indexes.

The most widely used index structure is the *B-tree*.

B-trees were introduced 50 years ago and remain the default implementation of indexes in nearly all relational database management systems to this day.

Many non-relational databases also use B-trees for indexing.

B-trees have one thing in common with SSTables: they store key-value pairs sorted by key, allowing for efficient key lookups and range queries.

While journaled indexes divide the database into segments of variable size and always write them to disk sequentially, B-trees divide the DB into blocks or pages of a fixed size, typically 4 kilobytes, reading or writing one page at a time.

This structure is better suited to low-level hardware since disks in the file system are also divided into blocks of a fixed size.

Each page has an address, allowing pages to refer to other pages.

These references form a tree of pages. One of the pages is designated as the root of the B-tree - it is the starting point for any key search in the index.

The root page contains several keys and links to child pages. Each of the child pages corresponds to a continuous range of keys, and special keys, located between pointers, indicate the boundaries of these ranges.

The number of links to child pages on a specific B-tree page is called the *branching factor*.

The algorithm ensures that the tree remains balanced - the depth of a B-tree with *n* keys will be *O(log n)*.

For most databases, trees of three or four levels deep are sufficient, so the DBMS does not have to follow many page references to find the required one.

> A four-level tree of 4 KB pages with a branching factor of 500 can store up to 256 terabytes of information.

---

The basic write operation of a B-tree involves rewriting its page on disk with new data.

It is assumed that such rewriting does not change the page's location in the tree, meaning all references to it remain unchanged.

This is a significant difference from journaled indexes, for example, from LSM-trees, where files are only appended to, and outdated files are gradually deleted in the compaction process, but existing files are not modified.

## Optimization Challenges

In-place page updating involves certain complexities - when multiple threads access a B-tree simultaneously, careful management of concurrent access is required; otherwise, a thread may traverse the tree in an inconsistent state.

The mechanism for correct concurrent access is usually implemented using *latches* - a lightweight type of lock.

> The key difference between latches and locks lies in their scope and duration. **Locks** are typically used to manage access to database data at a higher level, such as rows or tables, and can be held for longer periods, such as the duration of a transaction. They are primarily concerned with ensuring data integrity across concurrent transactions. **Latches**, on the other hand, are used at a lower level to protect specific data structures in memory and are held for very short durations. Their main purpose is to ensure the consistency and integrity of these structures during concurrent access, rather than managing broader transactional data access.

The journaled approach is simpler in this sense, as merging occurs in the background, without interfering with incoming requests, and with periodic atomic replacement of old segments with new ones.

But we are not always dealing with the rewriting of only one page.

As pages are limited to a small size, values exceeding this size are split across multiple pages. Consequently, when updating such a value (or inserting a new, large value), we need to update/write more than one page, as well as rewrite their parent page to update links to all child pages.

In the event of a database failure at the moment when only part of the page is written, we end up with a corrupted index. A typical reason is the appearance of an orphan page, which has no parent because the process of updating links was not completed during the failure.

To ensure DB resilience, implementations usually include an additional data structure on disk - a *write-ahead log*, also known as a redo log.

> Journals, here we go again.

This log is a file or series of files intended only for appending information, where all modifications to B-trees (and modifications to *other* DBMS pages that have not yet been written to disk - i.e., stored in the DBMS buffers) are recorded before being applied to the pages themselves.

When the database recovers from a failure, this log is used to restore and bring the B-tree to a consistent state.

Some DBMSs also apply a write-on-copy scheme. The modified page is written to a different location with the creation of new versions of parent pages in the tree, pointing to this new location. This approach is also useful for managing concurrent access.

For optimization purposes, space on pages is sometimes saved by storing not the entire key but only its shortened version.

Additional pointers can also be added to the tree. For example, each leaf page may link to its left and right pages at the same level, allowing for an orderly traversal of keys without returning to parent pages.

## Pros and Cons of Different Approaches

Generally, LSM-trees usually perform better in writing, while B-trees excel in reading.

Reading in LSM-trees is slower because it involves scanning several different data structures and SSTables at various stages of compaction.

A B-tree-based index must write each piece of data several times, at least twice - once in the write-ahead log and then onto the tree page itself.

Let's not forget about page splitting...

Journaled indexes also rewrite data several times due to repeated compaction and merging of SSTables, but clearly, these operations do not occur with every new entry write.

The effect where one database write operation leads to multiple disk write operations is known as *write amplification*.

> If we have our server in a closet, this factor is very important to consider, especially when using SSDs, which can only rewrite blocks a limited number of times before they wear out :)

In applications requiring large volumes of writing, the bottleneck may be the speed at which the database writes data to disk. In this case, write amplification directly impacts performance - the more the storage subsystem writes to disk, the fewer write operations per second it can perform within the available disk bandwidth.

## Other Index Structures

Key-value indexes are very similar to the primary key index in the relational model.

A primary key uniquely identifies a single row in a relational table, one document in a document-oriented database, or one vertex in a graph database.

In relational databases, it's possible to create multiple secondary indexes in one table using the **CREATE INDEX** command. The presence of such indexes is often critically important for the efficient execution of **JOIN**'s.

The main difference from the primary key is that secondary keys are *not unique by default* - meaning that several rows can share the same key.

This problem can be easily solved by making all keys unique, adding a row identifier to them.

Both B-trees and journaled indexes can be used as secondary indexes.

### Composite Indexes

We previously discussed indexes that map a single key to a value.

However, they are not sufficient in cases where a query involves multiple table columns or document fields simultaneously.

*Composite indexes* are used to optimize such queries.

The most common type of composite index is the concatenated index, which simply combines several fields into one key by attaching one column to another.

> When creating an index, its description specifies the order in which the fields are concatenated.

Suppose we have a Books table containing the *Author*, *Title*, and *Year* columns. We want to optimize queries that filter books by both author and publication year simultaneously. 

In this case, we can create a composite index that concatenates the *Author* and *Year* fields into one key.

```sql
CREATE INDEX idx_author_year ON Books (Author, Year);
```

When creating such an index, we specify that the *Author* field comes first, followed by the *Year*. This index will be effective for queries like:

```sql
SELECT * FROM Books WHERE Author = 'Stephen King' AND Year = 1994;
```

However, if we want to find all books published in 1837 without specifying the author, our index will be less useful because the search starts with the *Author* field, which is not specified in this case.

In such cases, the DBMS query planner might choose another index or even opt for scanning the entire table as the search algorithm, which could be less efficient.

### Multidimensional Indexesi

Multidimensional indexes are another way to query multiple columns at once, especially important for working with geospatial data.

For example, a mapping service might use a database with the latitude and longitude coordinates of all stored objects (e.g., restaurants, barbershops, schools, etc.). 

When processing a query, it needs to find all objects located within a rectangular area on the map (the frontend determines which area of the map the user has selected).

Then, two-dimensional queries, for example, for searching schools, might look like this:

```sql
SELECT * FROM schools
WHERE latitude > 40.7128 AND latitude < 40.7484 AND 
      longitude > -74.0060 AND longitude < -73.9732;
```

Standard indexes based on B-trees or LSM-trees cannot provide efficient execution of such a query. They would efficiently return either all schools within a certain latitude range with arbitrary longitude or all schools within a certain longitude range but at any point between the North and South poles - and cannot do both simultaneously.

To support geospatial queries, specialized spatial indexes are used, such as *R-trees*.

Multidimensional indexes can be used not only for geographical coordinates but also for optimizing any multidimensional queries:

- Searching for products by color (RGB): to find products within a specific range of colors;
- Movie or book recommendation systems: Multidimensional indexes can be used to optimize queries in recommendation systems, where each item (e.g., movie or book) is rated on several criteria, such as genre, release year, and rating;
- Warehouse inventory management: In databases tracking warehouse inventories, multidimensional indexes can be used to optimize queries on multiple attributes simultaneously, such as product type, batch size, and expiration date.

And so on.

### Full-Text Search and Fuzzy Indexes

The indexes we've discussed are excellent for searching for precise values within specific ranges.

However, they lack the capability to search for keys that may contain errors or resemble each other — for instance, words with spelling errors. To manage such fuzzy queries, alternative approaches are necessary.

Full-text search systems typically offer the ability to extend a word search by including synonyms, disregarding various grammatical forms of the word, searching for words located near each other in the text, and supporting additional functions based on linguistic text analysis. They utilize a range of technologies, from Levenshtein algorithms for finding words within a certain "edit distance" to machine learning methods.

## In-Memory Databases

In many scenarios, data sets are relatively small, making it feasible to store them entirely in memory.

This concept led to the development of in-memory databases, aptly named for their storage method.

Some key-value stores, like Memcached, utilize a cache only when data loss is permissible in the event of a machine reboot.

However, other in-memory databases aim to ensure full data persistence through:
- Writing change logs to disk,
- Periodically saving state snapshots to disk,
- Replicating the memory state to other machines.

Additionally, employing uninterruptible power supplies or NVDIMM memory, which retains data through server restarts, is encouraged.

Paradoxically, the fact that entirely in-memory-operated databases do not need to read data from disk **does not always give them a significant performance edge** over traditional database management systems.

Modern data storage systems and operating systems are capable of caching recently used data in memory, thereby eliminating the need to read it from disk if the server's memory capacity is sufficiently large for such a DBMS and if most operations involve reading data.

In-memory databases may offer increased speed by reducing the overhead associated with serializing data structures for disk storage.

Moreover, in-memory DBs present unique advantages in terms of implementing data models that are challenging or inefficient to execute using disk-based indexes. 

For instance, Redis provides interfaces for various data structures, like priority queues and sets, making it resemble a database. All information is kept in memory, streamlining the implementation of such interfaces.

The architecture of in-memory databases can also scale relatively easily to support data sets larger than the available memory, avoiding the overhead typical of architectures that *actively* rely on disk writing.

The *anti-caching* technique permits the removal of infrequently used data from memory to disk, with the possibility of reloading it when needed. This method is similar to how operating systems manage virtual memory and swap files, but with more precise control at the level of individual records, allowing databases to manage memory more efficiently than the operating system. Nevertheless, for this strategy to be effective, it's essential for the indexes to fit entirely in memory.

## Coming Up Next

In this post, we've explored various index structures, delving into their essential nature and the impact of their inner workings. This knowledge should aid us in better understanding data storage options, enabling us to select and optimize storage solutions that bring the most benefits to our projects. However, our exploration doesn't end here. Stay tuned, as next time we will take a look on transaction processing and analytics.
