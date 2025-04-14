---
title: Hack in Declarative Model - Part 2
description: Diving deeper, meet recursion.
pubDate: 2023-11-24T00:00:00Z
language: 'en'
tags: [Computer Science,  Declarative Model]
style: border
color: danger
---

Hello everybody and everywhere! Let's continue our investigation into the declarative computation model. As the [first part](https://wannahack.in/blog/Hack-in-Declarative-model-Part-1) was quite introductory, now we are delving deeper. In the first part, we discussed the declarative model from a theoretical standpoint and will now aim to understand it more thoroughly.

## Benefits of the Declarative Model. Declarative "constructor."

One of the coolest aspects of declarative programming is that declarative programs are **compositional**. This means that a program consists of *components*, each of which, thanks to the principles of this computation model, is a strictly and clearly defined *separate* part of the program.

---

Every component of the declarative program is always clearly distinguishable from other parts; it has concrete *inputs* and *outputs*.

However, such a component is not always a *small* fragment of code, like a function or procedure. A procedure is just a specific type of component, and in a more "complex" component, others can be defined while preserving the entire declarative clarity and power.

Compositionality is achieved thanks to the qualities inherent in the declarative model.

> Let me remind you that in declarative computation model we do not use "dynamic variables," do not store the internal states of procedures/functions, and do not transfer them somewhere outside.

This implies that components are "entities in themselves," or better yet, *independent entities*. The output from one declarative operation becomes the input to another; side effects are, in fact, **impossible**.

That's why the declarative model is a powerful tool for building complex and robust systems.

## Okay, whatever. So what?

The second power of declarative programming naturally follows from the first: declarative programs are easy to understand. We can effortlessly reason about them through the prism of logical analysis.

> To understand the declarative program as a whole, we only need to understand all its components.

Based on this assumption, we can infer that we can, in theory, ignore all other computational models, delve into the declarative one, and describe all programs only in it. Unfortunately, that's not possible.

If everything were that simple, other models simply wouldn't have invented. Programming problems vary, and different paradigms are suitable for solving them.

But the good news is that at the *programming-in-small* level (writing code at the level of separated functions or modules), the declarative style can be applied almost **in any case!**.

In fact, we can do quite well by following this approach. Because such an approach is the key to a good product, not only in the form of individual software modules but also in a high-quality software system as a whole (*programming-in-large*).

Components should not have unnecessary connections because it leads to confusion and complicates the system. In such a situation, we cannot talk about composability or clarity.

How can one understand a specific part if it explicitly depends on a bunch of others? And those, in turn, depend on a bunch of others? And if not explicitly? Brrr 💀

Other computational models, characterized by tight coupling of many components, should ideally *be used in isolation and in a limited number of modules*. We are trying, so to speak, to "componentize" parts of the system with complex connections so that these parts themselves become **declarative components** in terms of the module level.

A good mantra:

> "I make as many components of the system declarative as possible."

They say that if you repeat it every time you sit down to code and apply it in practice, you will become a good engineer.

## Recursion

How much stimulating intellect is in that word.

I remember in childhood, I was sitting in a barbershop, and the seats were opposite each other on opposite walls, with mirrors accordingly. I didn't know the word "recursion" back then but got *deeply* fascinated for a long time, and captured forever in this tunnel.

In programming, recursion is a "technique" where the function calls itself within its body. It can be applied in different ways.

The simplest and most common case is *direct* or simple recursion, where a function explicitly calls "itself." There are also *indirect* or *mutual* recursions. This is a trickier method, for instance, when function `A` calls function `B`, which in turn calls function `A` again, and so on.

If the recursive call within the function body is the last operation, then such recursion is called *tail recursion*.

---

The *depth* of recursion is determined by the number of recursive calls. How does it work? Well, in general, there is a data structure called the **stack**. Naively and abstractly, we can think of it as a "vertical stack" of records. We can push records onto it one after another and pop them in reverse order, meaning taking the "top" records one by one.

For example, let's take a recursive function `A` and an initially empty stack. In the `A0` call, something happens, and this call with its "environment" is placed as a record on the stack. During execution, a recursive call `A1` occurs. The situation repeats, `A1` is placed on the stack right after `A0`, then `A2` is called, and so on.

In reality, this can go on indefinitely until memory runs out, and the stack overflows happens. To avoid this in recursive functions, a *terminating condition* should be defined. When this condition is satisfied, the function should return something instead of diving into further recursion.

Returning to the example above, let's imagine that in the `A4` call, the terminating condition was satisfied.

As a result, we have a stack that looks, hypothetically, like this: `A0 -> A1 -> A2 -> A3 -> A4`. Arrows in this case represent the sequence of recursive calls. So, the result of the `A4` operation will return to `A3`, then to `A2`, `A1`, and finally to the initial `A0` call (which, in general, also has some output, but it's not interesting for us in this case).

If you've watched the cartoon Gravity Falls, you might remember the bottomless pit where anything you throw in will eventually come back out. Recursive calls and the stack can be thought of in a similar way, for memorization.

![Uncle Stan](https://github.com/m0n0x41d/m0n0x41d.github.io/blob/portfolYOU/assets/images/botomless_pit.gif?raw=true)

> It's obvious that thoughtless use of recursion can impose significant memory costs.

## Hold up, what is going on?

You might be thinking by now - "Ivan, what does recursion have to do with the declarative model?"

Oh, right! I didn't stray from the topic.

Now we know everything we need to apply "declarativity" in practice. Let's summarize.

To adhere to the declarative model, firstly, we need to use variables exclusively for single assignment. Secondly, use simple (arithmetic) operations on inherently declarative data types — lists and records. Thirdly, combine declarative operations, obtaining declarative operations as a result (compose thoroughly!).

So, what do we do with all of this exactly?

> Combine components of a declarative program according to the rules of **higher-order programming**!

Sounds serious, doesn't it?

Higher-order programming is when, in the functional model, functions can take other functions as arguments (as parameters) and *return functions also as results*.

Got it, right?

The technically correct implementation of a declarative program will be its description as **pure recursive functions** organized according to **higher-order programming** principles.

Remember, at the very beginning of the first part, we talked about the declarative approach, about the main idea, that when we describe "what the result should be," and not how to achieve this result?

This precisely corresponds to the canon of higher-order programming. Let's consider a very simple pseudocode.

```python
   def iterative_calculation(processing_data, is_data_processes, do_something_with_data):
        if is_data_processes(processing_data) == True:
            return processing_data

        processing_data = do_something_with_data(processing_data)
        return iterative_calculation(processing_data, is_data_processes, do_something_with_data)
```
Let's break it down.

The whole thing is called **control abstraction**, which is precisely an example of higher-order programming.

We have a function that is called recursively — *iterative_calculation*.

In this example, I named it that way because **iterative calculations** are a *special case of recursion.*

*is_data_processes*, in this case, is the function that determines the condition "what should be in the end."

And *do_something_with_data* is the workhorse performing the actual transformations of the initial value "*processing_data*."

All of this can be wrapped in another function, where the only argument passed is *processing_data*, which needs to be transformed in a way encapsulated (hidden) within the implementation.

As a result, we get a component that can be used in a project. In the previous part, I talked about *linguistic abstractions*. A similar component, if it needs to be frequently used in a project, can be presented as such an abstraction.

Considering the rule we discussed earlier—using simple arithmetic operations, a deep stack of recursive calls will not be formed. Firstly, because we have a clearly defined final state checked by the "CheckResultsFunction." Secondly, such simple calculations are well-optimized by compilers.

---

I know that you might be confused by now because it might still not be clear how to implement the **do_something_with_data** part. We will discuss it in the upcoming posts of this series :)

## Summary

If the declarative model is the origin of all other models, their core, then the core of the declarative model itself is recursive computations! It's an extremely powerful tool with enormous potential. The rabbit hole is *very deep*, but dazzlingly simple and beautiful in essence.

Next time, we'll delve into the fact that lists are actually a **recursive data type!** and continue chasing the declarative white rabbit.

Stay healthy and happy!

---

[Next post of the series.](https://wannahack.in/blog/Hack-in-Declarative-Model-Part-3)
