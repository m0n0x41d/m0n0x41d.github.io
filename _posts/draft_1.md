---
title: "HighLoad Saga. Part Two: The Databases"
tags: [System Design]
style: border
color: secondary
description: A note about databases in System Design.
---

Modern tools and technologies no longer fit into classical DBMS categories.

> DBMS stands for Database Management System, including software like PostgreSQL.

These technologies, optimized for broad scenarios, continue to blur traditional boundaries. For instance, in-memory key-value systems like Redis can surprisingly serve as message queues, while systems like Kafka offer message queues with added storage reliability.

Addressing complex System Design challenges involves decomposing them into smaller problems and applying a wide range of tools. This includes using additional layers like Memcached for caching or Elasticsearch and Sphinx for full-text searching, which operate separately from DBMS. Synchronizing these caches is crucial to ensure data consistency and non-contradictory results for users.

---

Modern apps often build on a layered data model approach, each layer presenting its data to be correctly understood by the next. This complexity increases as systems scale, despite abundant resources on relational data modeling. Yet, the industry frequently defaults to relational models and SQL, questioning if this approach is always appropriate.

## SQL data model

The well-known SQL data model, created in 1970 by Edgar Codd, organizes data into tables. However, it faces an object-relational mismatch, challenging integration with object-oriented programming. This impedance mismatch, only partially addressed by object-relational mapping (ORM) tools, introduces complexity and inefficiency.

## Oh, hello there - NoSQL!

Enter NoSQL databases, which manage unstructured documents, offering better data locality compared to relational models. However, they introduce challenges like data duplication and difficulties in representing complex relationships such as "many-to-many."

Document-oriented databases, for instance, can lead to massive data duplication, necessitating updates across multiple documents if project details change, which increases storage requirements and complicates queries.

---

The concept of database normalization aims to eliminate duplication but struggles with document models' "many-to-one" relationships. While relational databases handle joins efficiently, document-oriented databases often require application-level queries to perform similar tasks.

## It is CODASYL, Harry!

Historically, hierarchical DBMS like IBM IMS and the network model CODASYL addressed "one-to-many" and "many-to-many" relationships differently. CODASYL, for example, allowed records to have multiple parents, enabling complex relationship modeling. However, navigating these relationships was complex and schema changes could disrupt access paths.

## But here we go again...

Despite historical challenges with hierarchical and network models, NoSQL databases are gaining popularity for their scalability and flexibility. They offer significant advantages in processing large data sets or achieving high write throughput and provide more dynamic and expressive data models.

Document-oriented databases revisit the hierarchical model for "one-to-many" relationships but face challenges with "many-to-many" and "many-to-one" relationships similar to relational databases. They avoid the pitfalls of CODASYL by not requiring complex traversals for data access.

## Document versus Relation

Document models offer schema flexibility, improved performance for certain tasks due to data locality, and easier scalability across distributed systems. They are well-suited for applications primarily using "document-like" data structures. Conversely, relational models excel in processing "many-to-one" and "many-to-many" relationships, highlighting the need to choose the database type based on specific application requirements.
