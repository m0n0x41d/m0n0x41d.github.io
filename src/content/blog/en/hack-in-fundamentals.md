---
title: Hack in Fundamentals
description: Scientific look at programming. Concurrency, atomicity and something else.
pubDate: 2022-01-30T00:00:00Z
language: 'en'
tags: [Programming, Computer Science]
style: border
color: primary
---

Now I am taking a course which is called "How to Understand Everything in Programming." In reality, this is a series of courses aimed at mastering a scientific, or better to say, an engineering approach to programming, from fundamental concepts to understanding programming paradigms.

This post serves as a kind of report on the material covered. I want to focus on the topic of parallel programming and atomicity - I got stuck on the test on this topic :), and I hope that together we will figure it out.

In addition, I will try to shed light on some important concepts. The rest of the course, which is not covered in this post, is either related to the syntax and features of the multi-paradigm programming language Julia, or it involves separate and complex concepts that we have only touched on the surface so far, but we will definitely return to their in-depth study later (or I may have misunderstood them).

Let's rock.

### What's Scientific About It?

Everything.

In the post about [algorithm complexity](/en/blog/algorithms-complexity), I tried to expand on the idea that programming is a beloved child of mathematics, and one should approach the analysis and understanding of algorithms from a scientific-mathematical perspective rather than an intuitively naive one.

To develop efficient and reliable software systems, it is necessary to understand how the system itself works "under the hood" and the "tools" used for developing this system (programming languages, programming paradigms, approaches, etc.).

## Fundamental Concepts

### Variable
---
In the process of running a program or algorithm, there is a need for a "space" in which computations will take place. This space consists of the RAM (random-access memory) and processor caches. The structure of these components is a separate and complex topic, but for now, we need to understand that there is a resource in which a program can quickly write data and read from it.

The easiest way to imagine RAM is as a set of cells, each with its own address. You can access these cells using their addresses. In this case, we are referring to **physical** RAM cells.

In program code, in most cases, we don't work directly (explicitly) with these addresses. Instead, we use variables to which we attach values. The name of the variable is its identifier, and the values are the data that we assign to this name, often using the "=" operator.

In a more scientific view, this is called **named state**, which is a slightly more complex concept and one of the main characteristics in *any* programming paradigm. The degree of its support depends on the particular paradigm under consideration.

In general, *state* is the program's "ability" to remember data (assigned values) and work with them in the future. If a state has an identifier and is directly and explicitly accessible for operations during programming, it is called *"named state"*.

Yeah, states can exist without identifiers and be a kind of anonymous.

### Why We Need Identifiers, When Cells Have Addresses?
---
Firstly, as I mentioned earlier, we don't work directly with addresses.
Secondly, in reality, values are assigned to memory cells as "constants", meaning they are assigned only once.

"Single-assignment" is one of the fundamental concepts in programming.
Its essence is that as soon as a new variable is defined in the code (a certain identifier is assigned its "first" value), this variable becomes immutable.

Wait, but I can do something like this in my beloved Python:

```python
my_special_var = "hello dear friend"
```

and thenk

```python
my_special_var = "goodbye fella"
```

and I'm completely sure that

```python
print(my_special_var)
```

will show in console the last string - "goodbye fella."

That's right! Just in almost all modern programming languages, in addition to the concept of single assignment of variables, there is an additional mechanism - **"explicit reassignment"** which allows you to assign new values to an existing identifier. However, for data to be stored, it will usually be in a *different memory cell*, not the same one. The *same* existing identifier (variable name) will be associated with another area of memory where the new value will be stored.

Don't overuse "explicit reassignment"; it's convenient but has one serious downside - it can potentially lead to a lot of errors. Treat variables carefully and responsibly, use appropriate naming. Try not to reassign already existing variables (if needed, use new names that correspond to the context of the changes and the "meaning of the code").

However, don't create unnecessary variables either; define the necessary ones close to the code where they are used. This is a brief aside on the basic principles of "clear coding style" in programming :)


### Programming Paradigm
---
A programming paradigm, roughly speaking, refers to a specific approach to software development. More accurately, it is nothing less than a genuine scientific discovery, a precisely formulated mathematical theory that is practically embodied in complex software systems such as programming languages.

This doesn't mean that a programming language is constructed based on a single paradigm; on the contrary, many modern languages are multi-paradigm, which implies that they are very complex mathematical models.

The good news is that if humans have come up with something, we can understand it, even if it takes a lot of effort!

A detailed study of programming paradigms is beyond the scope of this post and my current knowledge, but in the future, these topics will be explored in more detail in the corresponding courses that I hope to reach. Therefore, similar report-style posts will be written about them.

---

So, as I mentioned above – the way *named state* is implemented is one of the two key characteristics of programming paradigms. The second characteristic is the presence or absence of *nondeterminism*.


### Nondeterminism
---
In the typical understanding of a novice programmer, especially a self-taught one, an ordinary imperative program is executed sequentially and produces the same result (I hope so :D) from one call to another, with the same arguments and input data.

This behavior is called **deterministic**. In other words, if a program is deterministic, we can definitely assume the output based on its code. No surprises.

**Nondeterminism**, as you might guess already, is the opposite situation. When calling a program, even with the same input data, we can observe different results from time to time. Such *nondeterminism* is called **explicit**.

But how does this happen? A program can produce unexpected results if it is described in a programming system (paradigm) where we combine the *"named states"* with *"parallel computations"*.


### Parallelism
---
Finally, we've arrived at parallelism!

First, we need to precisely define what we're talking about.

Firstly, there is ***parallelism*** — a hardware concept. It's about the "simultaneous" execution of processor instructions on multiple cores, etc.

Secondly, there's ***concurrency*** — a purely software concept, which is what we're primarily interested in within this context.

Let's return to the relations between nondeterminism, parallel computations, and named states. In the topic of program parallelism, there are two different things:

- *Process*
- and *Thread*.

Recalling my initial training as a database administrator, one of the most vivid impressions at that time was a simple but incredibly clear definition of the difference between these two terms that I heard in one of Dmitry Ketov's lectures on the Linux device. I don't remember the exact words, but the essence was this:

"A Process - computations that work in an isolated memory model. Threads - work in a model of shared memory."

In other words, Threads are parallel "processes" that can have access to the same named states (a model of "shared" memory).

Now it should become clear where the "unexpected" nondeterministic results in code execution can come from.

If a program uses parallel threads that work with the same variables, we cannot know at all in what order these threads will be launched, how they will change variable values, and when they will finish.

In such case, a **race condition** occurs, where different threads compete to access and modify the same shared variables. The winner of this race will be the thread that writes to the variable last.

This leads to *explicit nondeterminism*, which we observe as unpredictable outcomes in the program's execution.

Although there are situations where nondeterminism is acceptable or even necessary, desired behavior.
Most of the time, we want our programs to be deterministic – reliable and stable, even when using parallel computations to speed up program execution.

Such deterministic results can only be achieved through proper code design. It's crucial not to use parallel computations and named states together carelessly; this will lead not only to nondeterministic results but to real chaos.

In cases where we do need to combine these concepts, we must do so in a strictly controlled, isolated part of the system where the code must be well-structured, expressive and covered by tests.

Of course, in software engineering approaches have been developed to implement the combination of variables and concurrency.

### Atomicity
---
One way to address the problem of race conditions is to use **atomic** operations.

First, let's revisit the concept of a "race condition" and delve a bit deeper into it.

Imagine a crowded place where everyone is trying to get through a narrow door. This is essentially what happens when parallel threads attempt to access the same areas of memory. It's a "whoever gets there first" situation. Computational threads try to perform similar actions and get in each other's way.

The way to combat this situation is by building and ensure *thread safety*.
Special instructions are introduced into the programming languages, which are available for developers to use and declare certain operations as atomic.

In practice, this involves locking access to a shared memory cell for other threads while an "active" thread (the one that has acquired the lock) is working with it. The lock is released when the active thread has completed all necessary operations with the locked memory cell.

I want to emphasize an important point here:

> although atomicity isolates resources during the execution of one thread from other threads, the threads themselves can still run in an *unpredictable* order.

In other words, while thread safety is a powerful concept and tool for eliminating race conditions, *it does not eliminate nondeterminism*.

To eliminate nondeterminism in parallel computations, again, it can only be achieved through proper program design.
We could divide atomic operations among threads in such a way that, even though they work in parallel, the result becomes deterministic.


### Hardware Parallelism

Let's briefly discuss parallelism at the hardware level, the operation of multi-core systems.

It's important to understand that named states initially go into the cells of RAM and are then copied over the system bus to *processor caches*. Since there can be multiple processor cores, instructions running in parallel on different cores may pull values from memory into their *local* caches and process them differently. As a result, you can have a situation where the original value resides in RAM, but there are different copies of the data in the local processor caches, and they might even be different.

Of course, in practice, there are solutions to this problem; otherwise, how would hardware parallelism work at all? We definitely don't want a "race condition" at the hardware level where different results from independent (parallel) cores are returned to main memory.

The consistency of values in local processor caches to ensure the overall system's correct operation is achieved through so-called *cache coherence protocols*.

Cache coherence is *the property of caches that implies the consistency of values written to the local caches of each processor core*.

This consistency is achieved by having **special flags** for **each** cache cell. These flags determine how the state stored in that cell relates to the states in the cache cells of other cores with the **same address**.

For example, when the state of a specific cache cell changes in any way, special messages are broadcast over the "internal network" of the processor system (very, very quickly!).

Currently, many *cache coherence protocols* have been developed, differing in their algorithms and the number of cell states (flags). Most of these protocols are based on the MESI protocol (the footballer has nothing to do with it!).

### MESI Coherence Protocol
---
It's important to emphasize that data between the cells of RAM and the processor cache cells are transferred in fixed-size blocks called **cache lines**.

In the MESI protocol's operation, each cache line can be in one of four states (those flags I mentioned):

1. Modified line (M). Only *one* line in *one* local cache can be marked with this flag simultaneously. As the name suggests, this flag indicates that the line has been modified, **but the changes have not yet reached main memory**. The core to which this line directly belongs can continue reading from and writing to the cell *without sending* notifications over the internal network.

2. Exclusive line (E). Similar to a modified line, an exclusive line can only be in one local cache at a time. The difference is that the data in this line is *identical* to the data in the corresponding main memory cell. Reading and writing to this line happens without notifications, but after data modification, the line is marked as *modified*.

3. Shared line (S). Such a line *can* be present in different local caches simultaneously, but requests for changes are **always** sent to the shared processor bus. This results in all caches with other lines at the same address being marked with a special flag as *invalid*.

4. Invalid line (I). Attempting to read from an invalid cache line always fails (cache miss). A cache miss leads to "fresh" data being read from main memory. This flag is used to mark either empty lines or those containing outdated values.

---

In practice, the operation of processor caches, their internal interactions, and interaction with main memory are much more complex.

I wanted to touch on the topic of "hardware" parallelism because it is part of one of the questions in the final test for the current course and serves as an additional emphasis on the difference between concurrency and parallelism.

I hope this post was informative, even though it may look and feel like a salad of concepts – it's not :)

All the best!


![Взрыв Мозга](/public/images/mind_blowing.gif)
*<center>what the hell did i just read</center>*
