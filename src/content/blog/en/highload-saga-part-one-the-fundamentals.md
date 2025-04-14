---
title: "HighLoad Saga. Part One: The Fundamentals"
description: The first of the HighLoad Saga series.
pubDate: 2024-01-31T00:00:00Z
language: 'en'
tags: [System Design]
style: border
color: warning
---

# HighLoad Saga: The Fundamentals

In the modern big tech world, there are titans among mortal, tiny applications, and the common name for such titans is "Highload applications."

Such software systems are designed to not only survive but also thrive under "high pressure."

Highload is a universal term for applications, systems, and architectures that remain stable and reliable while supporting operation under a certain *Highload*.

But what actually does this *Highload* mean?

Well, Highload is more than a number; it is a category of *engineering challenges* that arise as a project grows and evolves.

It's about facing the tough questions head-on:

1. How do we ensure data integrity and completeness?
2. What are our protocols for handling system exceptions and faults?
3. What measures are in place to optimize response times across all client interactions, particularly during partial system outages?
4. What strategies are implemented for dynamic scaling in response to fluctuating demand?

All these questions are crucial in architecting a resilient, scalable infrastructure.

Highload applications are not solely about managing current loads; they are built with proactive planning for scalability, addressing potential challenges to guarantee a consistent, high-quality user experience.

## DIA and CIA

Okay, firstly it's important to distinguish between two primary categories of highload systems.

1. DIA, which stands for *Data-Intensive Applications*: This is the category of situations where the main challenge lies in the amount, quality, or complexity of data processed by the system.

2. CIA, standing for *Compute-Intensive Applications*: Here, the challenge arises from the intensity of the load on CPUs.

In our discussions today and in the next posts of this series, when we refer to a word "system," we will be specifically addressing these highload, high-performance juggernauts.

## The Three Pillars of an Effective System

1. Reliability: This is the backbone of any robust system. A reliable system operates *correctly* under a variety of adverse circumstances, meaning that it maintains performance levels in the face of hardware or software failures, or user errors.
It's about trust and consistency; users and stakeholders need to know that the system will do its job, no matter what.

2. Scalability: The system should work *correctly* as the data volume, computational load, traffic, or overall software complexity increases.
A scalable system adapts and expands, ensuring that increasing demands don't compromise performance or functionality.

3. Maintainability: The true test of a system's design is in how easily it can be maintained by people in a range of roles - from developers to support staff.
A maintainable system is one that can be efficiently managed, adapted, and evolved over time. It's about making life easier for those who work with the system, ensuring that they can perform their roles effectively without *unnecessary* complexity or frustration.

Now let's take a closer look at each of these characteristics.

## Reliability

Formal Aspects of Reliability usually described by two *"contracts"*:
- **Service Level Objectives (SLOs)**
- and **Service Level Agreements (SLAs)**


SLOs are *internal* targets set by service providers to measure its performance, focusing on metrics like uptime and response time.

On the other hand, SLAs are formal, and often legal commitments between providers and clients, detailing service standards and repercussions for not meeting them.

---

Informally, and concisely, a system is considered *reliable* when it continues to work normally even in the case of issues.

But what does "working normally" mean? It means:

- The system performs its expected functions.
- It remains stable despite **any** user errors.
- It maintains high performance under standard operating conditions, known loads, and data volumes.
- It prevents unauthorized access and other forms of misuse.

---

**Faults vs. Failures:**
In the lifecycle of a system, issues that arise in are termed as *'faults'*. A fault-resistant system is one that can withstand such situations.

However, it's crucial to differentiate between a *'fault'* and a *'failure'*.

A fault occurs in a some *subsystem*, meaning that this part of the system is deviating from its normal function, while a *failure* denote the incorrect behavior of the entire system.

Failures are often the result of *escalated* faults, either in terms of *severity* or *quantity*.

## Scalability

If a system works fine today, there are **literally** no guarantees that it will perform the same way tomorrow. Tomorrow, the load could increase twentyfold, so we need to be prepared.

Scalability is the ability of our system to handle increased loads effectively.

It's impossible to measure scalability with a single concrete metric or criterion. Scalability involves having a strict plan to address potential problems when the system experiences rapid growth.

The first step in addressing scalability is **to quantify the current load** on the system. This mean that we are understand the impacts of load increases — whether it doubles, increases tenfold, or even a hundredfold. It's about anticipating and planning for load growth.

To prepare adequately, we need to define *Load Parameters*: These are the numerical characteristics that define the system's load.

These parameters differ based on the system's architecture and can include metrics such as the number of server requests per second, the ratio of read to write operations in a database, cache hit rates, and so on.

The expertise of the system architect lies in selecting the appropriate parameters to focus on, whether it's average values or a range of peak values.

---

The second step, after defining the load parameters, is to *understand the implications of their growth*.

This involves two key considerations.

1. Performance Under Constant (current) Resources: First, assess how the system's performance will be affected if its resources remain unchanged but the load increases. This analysis helps in understanding the system's current capacity and limitations.

2. Resource Enhancement for Maintaining Performance: After understanding the performance implications, determine how much (and which) of the system's resources need to be increased to maintain the **current** level of performance under the **increased** load.

Scalability is not just about handling *more*; it's about handling more *efficiently and effectively*.

It requires foresight, planning, and a deep understanding of the system's capabilities and potential growth. By focusing on scalability, you ensure that your system remains robust, responsive, and reliable, no matter how much the demands on it evolve - the game is worth the candles.

---

When assessing the scalability and performance of a system, *scalar load metrics* like average response times can be really misleading.

They fail to capture the *dynamic* nature of system performance, which can vary significantly depending on the time of day, week, or other ghosty factors.

To get a more accurate picture, it's essential to consider load characteristics as a *distribution of values.*

Thus, we need to *calculate the median*.

The median, or the "middle value" in a set of data, is a more reliable measure than just the average.

For instance, a median server response time of 250 milliseconds means that half of the users experience a faster response, while the other half experiences a slower one.

The distribution of response times or other metrics provides a fuller picture of system performance. It helps in identifying how performance varies across different scenarios and user groups.

In practice, users experiencing *slower* response times can often be the most valuable – for example, those users might make more purchases, or use our API much more, and so naturally require increased processing time. Optimizing performance for these users can be crucial - we don't want to lose them.

---

Another valuable tool in our analysis is "Percentiles."

Percentiles offer a comparative measure of a particular value against its peers.

For example, if a user's server response time is at the 90th percentile for 200 ms, it means that 90% of users receive *faster* responses.

This insight is crucial, especially if the slower-responding users are important to the business.

### Strategies to Tackle Increased Load

One common issue in HighLoad sysmte is the "head-of-line blocking," where a few slow requests can delay subsequent ones, leading to overall slow response times.

While asynchronous request processing can mitigate this to some extent, physical hardware limitations still cap the system's potential.

There are universal, classical approaches to reducing the load:

- Databases: Utilize intermediate storage systems to hold accumulating data. This approach allows various applications to access and process this data later.

- Search Indexes: It is a mechanisms to speed up searches in a storage using keywords and fast data filtering methods. This significantly enhances the efficiency of data retrieval.

- Caches: Store the results of frequent, resource-intensive operations. By delivering these pre-computed results instead of recalculating them each time, caches greatly reduce processing time and load. Almost the same idea as first (Databases), simply depends on storage type.

- Batch Processing: Periodically perform extensive processing of large data volumes, typically in the background. This method is useful for tasks where processing of the masssive data can be deferred.

- Stream Processing: Use asynchronous, concurrent processing by organizing message exchanges between processes. This is particularly effective for operations involving a common dataset or database.

Each of these approaches can be realized through various technologies and methods. However, combining these strategies can **quickly increase the technical complexity of the system.**

It's crucial to carefully select the tools and methods that best fit our project and ensure they are compatible with each other.

The right combination of scalability strategies can significantly enhance system performance, while a bad combination wil hinder it.

### Scaling types

1. **Vertical Scaling**: This involves upgrading to a more "powerful" machine. It's akin to replacing a smaller engine with a larger one in a car. Vertical scaling is often simpler in terms of development and operation, as it doesn't require complex coordination between multiple machines. However, the downside is that more powerful machines can be significantly more expensive, both in terms of initial cost and ongoing maintenance.

2. **Horizontal Scaling**: This approach distributes the load across multiple, often less powerful, machines that are interconnected.

> In practice, most highload systems employ some form of horizontal scaling.

Strategically, it's often more advantageous to scale across a few powerful machines rather than many smaller ones. Orchestrating many small virtual machines can require complex and costly orchestration systems like Kubernetes.

For example, a fairly common approach is to scale the database vertically on a single node, until (and only then) the cost of further scaling or other requirements for response time necessitate its distribution.

---

There exists a separate engineering discipline dedicated to designing systems capable of "autonomously" adapting to poorly predictable changes in workload, such as the notorious autoscaling in Kubernetes.

However, in my honest opinion, it is still preferable to focus on creating systems that are mostly scaled "manually" and do not cause significant troubles to scale them manually.

This approach to scaling is *significantly simpler* in development and more *reliable and predictable* in operation.

In software engineering, many typical and effective patterns have been developed and thoroughly tested through practice. These patterns are universal building blocks for creating a scalable system, some of which we will cover in this post-series later.

# Maintainability

Good old maintainability... How many tears and drops of blood have been shed? Countless.

Maintainability is a critical aspect of software systems, often accounting for **more than half of the total cost** over the system's lifespan.

This includes direct operation, bug fixes, updates for new usage scenarios, adaptation to new platforms, and so on.

To ensure a system is maintainable, three core principles must be considered:

1. **Ease of Operation**: This focuses on how straightforward and simple it is for the maintenance staff to ensure the system's stable operation. A system that's easy to operate reduces the time and resources needed for routine maintenance and troubleshooting, leading to lower operational costs and higher reliability.

2. **Simplicity for Developers**: The ease with which new engineers can understand the system's architecture and start improving or expanding it is crucial. This is primarily achieved through *simplification*. A well-organized, well-documented system with clear code and architecture makes it easier for new team members to contribute effectively.

3. **Capability for Evolution**: This principle, closely related to the previous one, addresses how easily and quickly current engineers can implement and develop new changes.

This includes adapting the system to unforeseen usage scenarios or fundamentally new requirements.

Also known as *extensibility, modifiability, or plasticity*, this principle ensures that the system can grow and evolve over time without causing burnouts among the people involved.

### Achieving Simplicity through Abstraction

One of the best approaches to achieving system simplicity is through effective abstractions.

A good abstraction allows for hiding most, if not all, implementation details behind a simple, neat, and understandable interface.

This concept is extensively used in OOP, where an *abstract data type* is a classic example of a strong abstraction.

Yet, despite the existence of many effective algorithms and local engineering patterns in high-load systems, the "discovery" and formalization of strong abstractions remain challenging.

This is primarily because there is no well-known formal methodology for creating strong abstractions from the mentioned engineering patterns, which would, at the very least, help to restrain the project's complexity growth.

One of the main goals of these post-series is to identify good abstractions that separate parts of a large system into clearly defined components that allow for reuse.

## The Complexity of Dealing with Failures

### Hardware failures

In large data centers, hardware failures such as hard drive crashes, RAM defects, power outages, or incorrect network cable connections are common due to the vast number of machines.

The natural way to deal with it is to increase hardware redundancy. This can be done by creating RAID arrays of hard drives, backup power sources and hot-swappable CPUs.

While this approach doesn't completely prevent hardware-related failures, it's generally acceptable and often capable of maintaining uninterrupted machine operation for many years.

---

15 years ago, hardware redundancy was sufficient for most HighLoad systems, as a critical failure of one specific machine was a relatively rare event. Software services were relatively easy to quickly restore from backup on a new machine, making downtime, if not short, at least acceptable.

With the growth of data volumes and computational requests, applications began using more machines, leading to a proportional increase in hardware failure rates.

In large cloud services, virtual machines often become unavailable without warning, as these platforms prioritize overall system flexibility and adaptability over the reliability of individual machines.

Thats why today, there's a shift towards systems *capable of withstanding the complete shutdown of individual machines*.

This is achieved through failure-toleranse methods, in addition to or even instead of hardware redundancy.

Such systems allowing us to hot-fix installations on individual nodes without downtime for the entire system.

### Systematic software fault

Oh, this is a bad one.

Software failures occur much more frequently than uncontrolled hardware failures. There are plenty of examples, almost every year...

A software error leading to a fatal crash often happens for mundane reasons.

For example, a process might "get out of control" and cause CPU, RAM, or even disk space leakage, completely exhausting a resource, or a severe bug might occur, flooding network bandwidth and causing a DOS.

The service upon which the system's operation depends then slows down, stops responding to requests, or starts returning corrupted responses. This leads to cascading failures, where a minor fault in one component causes a failure in another, which in turn triggers further failures. Such cascades often extend beyond a single system, "knocking out" many servers tied together.

The worst aspect is that such software "mistakes," leading to system faults, often act as "sleeping agents." They remain inactive until all conditions are met to trigger them.

So how to deal with it?

Well, there is no quick solution to the problem of systematic software faults. The most promising approach involves various checkers for the formal correctness of code and the system, but so far, they are highly complex and expensive to implement and use.

Chaos testing is one of the best ways to check system reliability. It involves artificially inducing failures and increasing their frequency.

Many critical fault actually occur due to poorly organized error handling in the software system.

Intentionally generating failures ensures constant testing of mechanisms for resilience and usually indirectly leads to the discovery of previously unknown bugs.

## Time to rest

Well, that's definitely enough for today! The post has already turned out to be quite long.

Today, we've explored the fundamental aspects and key considerations essential in designing HighLoad systems.

I hope this introduction has laid a good groundwork for delving deeper into the complexities of HighLoad systems.

Until next time!
