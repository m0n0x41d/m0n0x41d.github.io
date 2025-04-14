---
title: Levels Of Reasoning About Software
description: Tough staff, or – how to think about software systems.
pubDate: 2023-09-25T00:00:00Z
language: 'en'
tags: [Software Design, Computer Science]
style: border
color: secondary
---

# What is erroneous program?

How do we understand that a program is erroneous? How can we even arrive at the correct definition, the judgment that a specific program is not working correctly?

The first thing that comes to mind is that the program doesn't work as we expected, it does something different from what we wanted. Or it works correctly in some circumstances but in others, for example with a certain set of arguments, this program will be incorrect.

We can say:
> *A program is erroneous if it was run and produced an incorrect result.*

In fact, these are quite straightforward thoughts. Let's try to come up with clearer definitions.

Take the last case - the program seems to be working fine, it runs every time with the same parameters, but on some day X, everything broke, a bug was caught!

Then it would be more accurate to say something like:
> *A program is erroneous if in a specific environment, set of input values, or after a certain sequence of actions/events, it was run and produced an incorrect result.*

Great, that's a bit better already. But we still have incorrect code as main point of reasoning :)

Essentially, we've only defined that the program works but has bugs. We may believe that such a program will never let us down because we assume it will always be run in the same conditions, environment and input date (lol).

In essence, the assertion about such a program, that it works "normally", is entirely incorrect, as it obvious that this code has vulnerabilities.

Such a vulnerability will sooner or later lead to a serious malfunction in future versions of the program - someone will change something, and... you know.

So, there is a third definition of program error that seems not as obvious and simple as the previous ones, moreover – it seems like mind-breaker crux:

> *A program is erroneous, if the *reason* why it *should be correct* – is erroneous.*

Of course, all three definitions above are correct, but it depends on the stages and time of reasoning about the system.

To understand them, especially the last one, we need to get to know a little about the field of *formal code verification*.

# Three Levels of Thinking about a Software System

Here's one of the most important things to remember:

> At the moment, when we are thinking about a software system, we **always** do it at **one of the following three levels**:

1. Runtime, or execution time. This level involves the specific execution of a program in a particular environment, with specific values and states. Most of the code *debugging* happens at this level.

2. Concrete implementation, the source code. At this level, we think about some concrete implementation of the program, and assume what it can do in some environment and with some input data that can be pretty *random*. There are many program behaviors ("scenarios") that **can never occur**. It's important to learn how to exclude such scenarios from consideration during development, even if it requires significant mental effort. Most of the work in implementing a program occurs at this level.

3. Program design, architecture, and logic. Here, we consider the abstract specification of each component of the program. In the design phase, we always consider only those behaviors of the program that are defined by the specification. At the same time, assuming that these "behaviors" can be replaced by another implementation while maintaining the specification's requirements.

***

The catch is that many programs appear completely correct when examined at the *second level* - the code implementation is functional.

However, these same programs, if looked at from the "angle" of *third logical level*, may be incorrect because they implement or assume behavior *whose correctness is not guaranteed at all in future versions*.

Without reasoning about the program at the third level (without ensuring the correctness of its design), and only by studying the code and dependencies, claiming that a function works correct – it is a **logical mistake!**

Because, in this approach, we don't even know what the fuck this function should specifically do within the spectre of entire system.

## It's Important Not to Confuse

It's quite obvious that the design of a software system is carried out at the logic level, *even if "designers" are not aware of this*, and even if they have no idea of what they are doing and mix all levels together in their minds.

The runtime and implementation levels can also be confused, even they are quite concrete. For example, when running a debugger and examining the execution stack – we are at the runtime level.

When we study the program's code and think about how it works and what cases can happen, we are thinking at the level of concrete implementation.

It's very important to remember the difference between these two levels, and not to confuse **what** a component does and **how** it does it.

***

Besides that, we can understand the difference between interfaces and implementation well, but it's much more challenging to precisely and in details understand what the *interface defines **across the entire system***, rather than just thinking of the interface as a "list of functions".

The problem seems to be that this moment can be fully realized only through process of formal system verification, which describes the properties and characteristics of the program just as correctly as the source code.

And this requires thinking, putting in even more effort than just coding - creating a detailed description and complete documentation.

We cannot mix reasoning about the program at different levels because it can lead to significant confusion in communication between different members of the development team and confusion in the process of thinking about the whole system.

## Design is the Key

First and foremost, when thinking about a new project or new feature enhancements, you need to think at the third, architecture-logical level.

Otherwise, all we will be concerned about is delivering a working piece of code to release, which means merely ensuring correctness at the implementation level.

But no, that's probably monkey coding.

The main goal of any responsible engineering developer is to **deliver, develop, and maintain a working software system now and in the future, doing it *qualitatively* and *productively***.

The logical level primarily implies a striving for minimal connectivity of project components and a desire for these components to be as modular as possible. This is especially important if we plan to create different versions of such components and want to change their implementations painlessly for the rest of the system.

In software development, decisions which are already made are almost impossible to reverse, and these decisions must be supported until the project's death.

The project will live "forever" - the decisions made during its development will also "live forever." A good example is the typo in the naming of the "referer" protocol in the HTTP protocol specification.

> But the mistake may be less harmless.

Therefore, it is very important to practice designing programs at the level of formal specification so that we can assert, and even better, prove that each component, regardless of the rest of the program, is correct in itself.

This logical level is "hidden" because it does not exist physically in the code or the project, but it is the **most important**, the key skill for any programmer who aspires to become a true software engineering developer, rather than settling for ordinary coding.

# First Level – Runtime Level: Traces and States

At the first level, we work with states and traces.

**Traces** are sequences of events that occur during the operation of a program. Traces can be high-level (events like the launch of a microservice) or low-level (system calls, or even deeper - events related to processor instruction execution). Traces serve to understand the current state of the system and what has happened in it. From a programmer's perspective, the abstraction of a trace is expressed in the form of logs or debugging outputs to the console.

**State** is a set of memory cells with their current values (we will cover this a much deeper in upcoming blog series about programming paradigms). From a programmer's perspective, the abstraction of states is expressed when they examine the values of variables in a debugger.

Any program instruction that can be expressed in terms of states and traces is considered to belong to the runtime level.

So, formally, reasoning at the runtime level can only be about specific values, without quantitative criteria.

# Second Level – Level of Concrete Code Implementation

Here, we are reasoning about each instruction as a command in a specific programming language, written in a specific syntax, with a defined semantics. At this point, we completely move away from the abstraction of traces and states.

For example, by providing different values as input to the same function, we will get different results - sequences of states, traces. It is quite obvious that even a simple function can potentially generate an infinite number of states. So, while at the runtime level, we strive to find out whether an error will occur during the execution of certain code, at the code implementation level, we ask a different question:

> *Is it possible for a potential scenario of executing this function, this specific piece of code, to result in an error?*

We try to understand this *not through traces* but through the *source code*, without running it and testing it.

This method of reasoning is called:
> **FOL** - First Order Logic.

# Third Level – Specification Level

So, this is the level of full-fledged formal logical reasoning about the entire system. Specifications are applied here.

Usually, in classical development, this level implies system design. But from a computer science perspective, specifications are about the idea that **the principles of encapsulation and modularity can only be formally defined in terms of *specification* and *formal logic***.

There are many ways to define specifications, and one popular approach is *Hoare Triples*.

In short, Hoare's main idea is that each construct of an imperative language should have a *precondition* and a *postcondition* expressed as a *logical formula*. A triple consists of a precondition, the language construct, and the postcondition.

For example, following this method, at the specification level, we define the precondition and postcondition of a certain function.

If at the second level, we reason about the specifics of implementing this function - *what if* consequence X happens if event Y occurs?

Then, at the specification level, these questions are generalized - ***will*** consequence X occur in the program that uses our function?

This method of reasoning is called:
> **HOL** - High-Order Logic.

An important feature of specifications is that through them, we can define properties of the system that **cannot be expressed directly in code**.

***

It may seem that such a formal specification system is redundant. Why should we bother writing formulas with quantifiers, boilerplate comments and so on?

It does not help us control the specific implementation of a function from some standard library, especially if we don't even have access to its source code...

The reason is that while we may not be able to formally control the specific implementation, by using the specification system, we still have a **logically consistent set of rules that must be checked and followed when writing our code**.

If we are not going to follow them, if we still do not see the benefits of formal specifications... well, yeah, we will definitely not use it 🤷

By reasoning in advance at the specification level, we can identify all potentially dangerous "spots" and possible pitfalls, and we will know what needs to be *thoroughly checked* to ensure that our program works correctly and that the results of its parts correspond to the formal specification.

In short, the main idea of the third level is to try to think **conceptually**, as if abstracted from the first two levels, and only then translate the derived formal concepts into the "physical" level using programming language tools.

A system of specifications is like an *ideal* technical assignment in which there are no contradictions or ambiguities. It is logically complete, and during its formation, numerous unclear technical nuances are revealed that need to be formalized and consciously reasoned about.

Thus, no matter what we implement, we always need to think about the components of the system through the prism of *abstract interfaces* (ADTs), specifications, and invariants. Mentally translate them into logical formulas.

This approach actually works not only in design but also in working with legacy code and in testing - we can proactively cover the most obscure parts of the code with specification tests. In the process of "developing" these specification checks, the part becomes less obscure, because we are dealing with **logic** at that moment, and logic is the language of software design.

***

Congrats if you've read this far. If you now think that thinking about and writing formal specifications is really challenging – you are right. This is why so few engineers do it. But is this a reason for us not to try?

![think](/public/images/think.gif)
*<center>there is no rest for the wicked</center>*

***

I hope now you get why I am believe that [self-documenting code is a bullshit.](/en/blog/bullshit-of-self-documenting-code)