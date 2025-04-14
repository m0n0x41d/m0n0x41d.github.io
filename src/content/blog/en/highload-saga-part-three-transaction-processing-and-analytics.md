---
title: "HighLoad Saga. Part Three: Transaction Processing and Analytics"
description: What about storing it by... columns?
pubDate: 2024-03-05T00:00:00Z
language: 'en'
tags: [System Design]
style: border
color: secondary
---

When we say "transaction," we refer to a group of operations (read/write in various combinations) that reflect a single logical operation for data handling, executed atomically - either all changes are applied, or the database state is rolled back to its state at the beginning of the transaction.

Formally, a transaction is expected to possess _ACID_ properties, which stand for:

- Atomicity, as already mentioned;
- Consistency,
- Isolation, meaning the ability of one transaction to operate independently from other transactions,
- Durability, implying that if a transaction is successful, its results are permanently fixed in the database, regardless of database management system failures, etc.

However, in practice, transaction processing essentially means the ability for clients to perform read and write operations with low latency and the assurance that in case of failure, data corruption or breach of its logical integrity will not occur.

A basic case of such a "user" transaction is an application using an index to find a small number of records by a specific key. Based on user-provided data, new records are added or existing ones are updated. Most such applications are interactive, leading to the access pattern being termed _online transaction processing_ (OLTP).

---

Database management systems are increasingly used for analytical data processing and in data science, where access patterns and requirements differ significantly.

A typical analytical query involves selecting a vast number of records, reading only a few columns in each, and calculating aggregate statistical indicators instead of returning raw data to the user.

To distinguish this database application pattern from transaction processing, it has been named _online analytical processing_ (OLAP).

Thus, OLTP implies arbitrary access to data and database write operations with low latency based on client data. Here, the database always reflects the current data state at the moment of the transaction, and the size of such databases can reach terabytes.

OLAP, on the other hand, usually involves either a long-term group data import, with possible transformation, known as _ETL - Extract, Transform, Load_, or processing a continuous stream of certain events. Typically, such a database stores not only current data but also the history of their changes, and its size is measured in petabytes.

## Data Warehouses

Interestingly, SQL has proven to be quite flexible; it performs just as well in OLAP as in OLTP. Despite this, not so long ago, a trend emerged for creating special _data warehouses_, with large companies starting to move analytics away from OLTP systems to specialized databases.

A large enterprise has many transaction processing subsystems, each typically complex, supported by a separate team of engineers, and almost always operated independently of others.

From OLTP systems, we expect high availability and rapid transaction processing because these systems are often critical to business operations.

Due to these requirements/expectations, we are reluctant to allow business analysts to run analytical queries on these databases simply because these queries are almost always quite complex and resource-intensive, as they involve viewing large data sets, which naturally can adversely affect the performance of other transactions being executed in parallel with such analytical queries.

A data warehouse, however, is a separate database that analysts can query as they wish, without disrupting business operations.

The warehouse contains a read-only copy of data from all of the company's OLTP systems. Data is extracted from OLTP databases through periodic data dumps or a continuous stream of data updates, transformed into an analysis-friendly format, cleaned, and then loaded into the warehouse.

> This is the ETL process.

---

Data warehouses are specifically optimized for analytical queries.

The indexing algorithms that work well for OLTP are not as effective for responding to analytical queries.

The data warehouse model is often relational, as SQL generally suits analytical queries well.

Thus, data warehouses and relational OLTP databases look similar (since both have an SQL interface for queries).

However, the internal structure of these systems differs.

## OLAP Data Models

In OLTP, a wide variety of data models cater to different needs.

However, in analytics, the variety of models is much smaller.

Many data warehouses operate on a standardized pattern known as the _star schema_, also known as _dimensional modeling_.

In this model, the _fact table_ is at the center. Each row of this table reflects an event that occurred at a specific point in time.

Depending on the nature and objectives of the business, each row of this table may reflect a page view, a user action in the system, a product purchase, and so on.

Facts usually enter the warehouse as separate events, which is very convenient, but we must always be aware of the potential for growth in the size of this table and be prepared for it.

> In large corporations, data warehouses store petabytes of transaction history, with fact tables making up a large portion of this history.

If a row in the fact table reflects an _event_, then _dimensions_ correspond to the characteristics of "who," "what," "where," "when," "how," and "

why" related to this event.

In short, part of the columns in the fact table are the event's attributes, and the rest are foreign keys to dimension tables.

That's why this schema is called a star.

---

In an alternative version of the "star" pattern, known as the "snowflake" schema, data is further divided into sublevels.

Instead of storing all dimension information in one table, the "snowflake" schema uses separate tables, sub-dimensions, for more detailed categorization of data.

The "snowflake" schema provides a higher degree of data normalization compared to the "star" schema, making data more structured and orderly. However, the "star" pattern is more commonly used in business analytics for its convenience and simplicity.

## Columnar Storage

In a data warehouse, tables can be extremely wide. This applies to both the fact table, which may have hundreds of columns, and dimension tables, which can become very wide due to the many metadata columns required for analytics.

If fact tables contain trillions of rows and petabytes of data, storing and querying them efficiently becomes a challenging task.

> Dimension tables are usually much smaller, so we will focus on fact storage.

Although fact tables often exceed 100 columns in width, a typical query to the warehouse only accesses a few columns!

In most OLTP databases, storage is organized row-wise: all values from one table row are stored next to each other. Document-oriented databases are similarly structured: the entire document is usually stored as a continuous byte sequence.

If OLAP databases followed a similar row-wise implementation, the storage subsystem would need to load all rows (each with 100 or more columns) into memory, parse them syntactically, and filter the result based on the conditions specified in the query.

This is highly inefficient.

The idea of _columnar storage_ emerged as an optimization: storing values from the same column together, rather than from the same row.

If each column is stored, for example, in a separate file, a query only needs to read and parse the required columns.

However, column-based data storage requires that the files of all columns contain rows in the same order. Consequently, to assemble a whole row, e.g., the 128th row, one must take the 128th element from all the column files and compile them together.

Besides loading only the columns needed for a query from the disk, it's also possible to further reduce disk bandwidth requirements by compressing the data.

Since columns often contain similar and semantically close values, they compress very well.

> Depending on the data contained in a column, various compression methods are applied. One of the methods, particularly effective for data warehouses, is bitmap encoding.

### Sorting Order in Columnar Storage

In columnar storage, the order of row storage, at first glance, seems to have little effect.

In a previous post, we discussed the simplest write operation - appending to the end of a file. And this looks like a good option for such storage.

But we can set the write order, just like in SSTables, and use it as an indexing mechanism.

Obviously, sorting each column separately makes no sense, as it would then be unclear which column elements belong to the needed row.

Remember, in columnar storage, we can assemble rows only because we know: the nth element of one column and the nth element of another column always correspond to the same nth row.

So, if we want to sort something here, we need to sort the rows as a whole, despite the fact that data is stored by columns.

Such sorting is useful if specific columns can be selected for sorting the table, based on knowledge of the most frequently executed queries.

Sorting also helps to compress columns effectively. If the main sorting column has a small number of different values, long sequences of repeating identical values will appear after sorting. Simple encoding, for example, using bitmap schemes, can compress such a column to just a few kilobytes even with billions of rows in the table. Compression works best for the first sorting key. The second and third keys will be more mixed, hence, they won't have such long sequences of repeating values.

For different queries, different sorting orders are better, so why not store differently sorted copies of the data?

This serves as both data replication and optimization of typical queries.

Having multiple sorting orders in columnar storage is akin to a group of secondary indexes in a traditional row-based storage.

But an important difference is that in row-based storage, each row is stored in one place - in an unordered file or a clustered index, and secondary indexes only contain pointers to the corresponding rows.

In columnar storage, there are usually no pointers to data - only columns containing values.

### Writing to Columnar Storage

Data warehouses allow for various forms of optimization, as most of the load falls on the voluminous read-only queries performed by analysts. Columnar storage, compression, and sorting significantly speed up the execution of such queries. However, these warehouses have a serious drawback in the form of complicating write operations.

The approach of updating data in place, used by B-trees, is impossible in the case of compressed columns. If it's necessary to insert rows in the middle of a sorted table, most likely, all column files will need to be rewritten. Insertion must update all columns in a coordinated manner -- since rows are defined by their position in the column.

Fortunately, we've already explored a good solution to this problem: LSM-trees. Everything is first written to storage in RAM, where data is added to a sorted structure and prepared for disk writing.

It doesn't matter whether the storage in RAM is columnar or row-based. Once enough data has accumulated, it is merged with the disk's column files and written in blocks to new files.

## Memory Bandwidth and Vectorized Processing

A significant bottleneck for data warehouse queries is that they have to scan millions or billions of rows, which becomes the bandwidth limitation for moving data from disk to memory.

Moreover, for analytical databases, the efficient use of the data transfer rate from RAM to the CPU cache, avoiding various kinds of branch prediction errors and "bubbles" in the CPU instruction processing pipeline, as well as using the vector instructions (SIMD) of modern processors, becomes a problem.

Besides reducing the volumes of data loaded from the disk, columnar storage schemes can also efficiently use CPU cycles.

For example, the query processing subsystem may take a portion of data that fits well into the L1 cache of the processor and pass through it in a continuous loop.

The processor can execute such a loop much faster than code containing many function calls and conditions for each processed record.

Column compression allows more rows for one column to fit in the same volume of L1 cache.

For working directly with such portions of compressed columnar data, classic bitwise OR/AND operations can be used. This method is known as vectorized processing.

## Aggregation: Data Cubes and Materialized Views

Not all data warehouses for OLAP tasks are necessarily columnar: row-based DBs and several other architectures are also used. However, columnar warehouses perform much faster for arbitrary analytical queries, so their popularity is growing rapidly.

Another important feature of data warehouses is materialized aggregate indicators. Queries to warehouses often include aggregation functions, such as COUNT, SUM, AVG, MIN, or MAX in SQL.

If the same aggregation functions are used in a variety of different queries, it would be wasteful to recalculate raw data from scratch every time.

Why not cache some of the aggregate indicators most frequently used in queries if the data hasn't changed?

One way to create such a cache is a _materialized view_.

In the relational data model, it is often described similarly to a regular view: it is a table-like object which content is the result of some query.

The difference is that a materialized view is an actual copy of the query results, written to disk, while a virtual view is just a shorthand form of writing for queries.

When reading from a virtual view, the SQL engine dynamically unfolds it into the underlying query, and then fully executes this unfolded query.
OLAP Cube

In the case of changes to the data used in the aggregated query, it's necessary to update the materialized view, as it represents a denormalized copy of these data.

The DBMS can perform updates automatically, but such manipulations increase the cost of write operations, so materialized views are rarely used in OLTP databases.

However, in warehouses, where the main load falls on read operations, it makes sense to actively use them. Whether they actually improve the performance of read operations depends on the specific case.

A common case of a materialized view is a data cube, or OLAP cube. It represents a grid of aggregate indicators, grouped by different dimensions.

For example, each fact in the fact table has foreign keys only to two dimension tables, let's say, date and product.

We can build a two-dimensional table with products on one axis and dates on the other. Each cell contains an aggregate indicator of an attribute of all facts with such a combination of date and product.

Then, we can apply the same aggregating function along each row or column and get totals, reduced by one dimension.

In general, facts often have more than two dimensions.

Formally, setting up a five-dimensional hypercube is much more difficult, but the idea remains the same: each cell contains sales for the corresponding combination of date, product, store, advertising campaign, and customer. These values can then be sequentially grouped by each dimension.

The advantage of materialized cubes is that certain queries will be executed very quickly because the data for them were essentially pre-calculated.

For example, if we need to know the total sales volume for few days back by each partner, we just may take a look at the totals by the corresponding dimension - there's no need to analyze millions of rows.

The drawback of this approach is that data cubes don't have the same flexibility as queries to raw data.

## OLAP vs OLTP

In practice, except for analysis tasks, mainly OLTP systems are used, implying potentially a huge number of queries.

Programmers optimize the load, trying to affect a limited number of rows in each query.

The client program requests records using a specific key, and the storage subsystem employs an index to find data with the corresponding key.

The bottleneck here usually becomes the time to move to the required position on the disk.

Data warehouses are mainly used by business analysts and handle much fewer queries than OLTP systems.

However, almost all OLAP queries are usually very resource-intensive and require viewing millions or even billions of rows in a short time.

The bottleneck here usually is a disk bandwidth. For this reason, columnar storages are gaining popularity for this type of task.

In OLTP, there are two main approaches to building data storage subsystems.

1. The log-structured approach, which only allows appending data to files and deleting outdated files, not updating a written file. These are SSTables, LSM-trees, HBase systems, Lucene, etc.

2. The in-place update approach, which views the disk as a set of pages of a certain size that allow rewriting. The main representative of this philosophy is B-trees, used in all major relational databases, as well as many non-relational ones.

The relatively new thing is log-structured storage systems. Their main idea consists of systematically converting any disk write into a sequential one, providing higher write throughput due to the performance characteristics of hard drives and solid-state drives.

And for this technical points analytical OLAP tasks differ so significantly from OLTP tasks: when queries require sequential scanning of a large number of rows, indexes play no special role. Instead, encoding data very compactly to minimize the volume of data read from the disk becomes much more important.

---

But we will talk about data encoding formats and few other things next time :)
Thanks for reading.
