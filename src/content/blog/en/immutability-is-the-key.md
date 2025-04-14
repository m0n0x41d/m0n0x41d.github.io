---
title: Immutability is The Key
description: Few words about Immutability
pubDate: 2023-09-29T00:00:00Z
language: 'en'
tags: [Functional Programming]
style: border
color: success
---

## Immutable States

State is one of the fundamental concepts in programming. We might say that state is the possibility of modifying some data at any given moment. However, a more accurate definition is:

> State is the "ability" to remember information, the ability to store a sequence of values stretched over time.

Functional Programming wholeheartedly embraces Immutability, which is the direct opposite – the unavailability of data structures after their creation.

Immutability brings numerous benefits; it shields us from side effects and makes code behavior more predictable.
With immutable data structures, we can always be sure that they remain the same, and no other part of our system can change their values.

Therefore, Functional Programming minimizes the use of states and instead relies on "pure functions."
These functions take some input, process it, and return a new "immutable state."

## Predictability Matters

This approach is as clear as day. Such a flow makes our reasoning about the system much easier because we can easily identify the parts of the code where "state" can mutate into something different. In imperative programming with mutable states, such reasoning can be much more challenging because state changes can happen virtually anywhere.

Another bonus of programming with immutable structures is that our code naturally becomes more maintainable. This is because immutability forces us to write simple and clear functions. We don't need to worry about unexpected side effects or create complex solutions to handle data transformations.

### Immutability for Parallelism

Immutability is our savior in parallel programming when several processes or threads could access the same data object and modify it simultaneously. When a data object is immutable, race conditions and other nasty surprises become impossible.

### So What?

Even if we are not writing code in purely functional languages like Haskell and others, we can still benefit from immutability.

For example, in Python, there are elegant immutable data structures like tuples, named tuples, and frozen data classes.

I've mentioned this before, but it's worth repeating: to increase immutability, we should avoid side effects in our functions as much as possible.

By side effects, I mean any changes in the program state outside of the function's scope that occur as a result of the function's execution.

It may be challenging to write functions without side effects, but the effort is worth the guarantee – your code will be more predictable and easier to understand.

I understand that it's simply impossible to avoid side effects entirely, so what can we do?
I suggest that functions with side effects should be grouped into separate modules in a clear and logical way so that they can be "under control."

Other magical spells in functional programming that can help write code more focused on immutability include using higher-order functions and recursion.

We've already explored the concept of currying in [this blog post](/en/blog/currying).