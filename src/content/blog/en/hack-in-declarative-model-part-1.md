---
title: Hack in Declarative Model - Part 1
description: The first look at declarative programming paradigm.
pubDate: 2023-10-03T00:00:00Z
language: 'en'
tags: [Computer Science, Declarative Model]
style: border
color: danger
---

Last year I was studying a programming paradigms, and the first is *declarative programming*.

It is time to remember.

Understanding programming deeply is practically impossible without studying the declarative model because this model is literally **fundamental** - it is the *root* from which all other paradigms growth. A good grasp of the declarative model automatically allows for quicker comprehension of other programming technologies.

## Declarative programming paradigm

I would like to recall, that a paradigm is basically a mathematical theory, but in a more practical sense, it is a ***programming approach*** embodying this mathematical theory.

Or even more accurately, it is a set of software engineering techniques for solving problems, or for a class of problems, so using such techniques we design a program in accordance with a specific ***computational model***.

A deep understanding of various programming paradigms sharpening our blade of mind us, making us more likely to develop high-quality and efficient code. By applying different paradigms for solving appropriate classes of problems, we can create code that is effective and robust.

Therefore, that's why we start our learning from the logical beginning - with the Declarative paradigm

## What's the meaning?

The declarative paradigm is often contrasted with the imperative paradigm. In the imperative paradigm, everything lurking around **states** (variables), and we sequentially describe the steps that the executor must take to solve the given task. In other words, we are inventing and describing an algorithm of concrete actions.

In the declarative paradigm, we describe the **result** we want to achieve, not how to achieve it. Wow, Skynet?! Have machines become so smart that we can say "I want a cookie" and they'll bake it? Well, not yet, at least not for now :)

More precisely, we describe the relationship between the ***input data*** and the result, and if necessary, we clarify some execution details until the interpreter understands what needs to be done.

We still don't tell the executor how to solve the task precisely; we just specify how the "input" relates to the "output."

## Diving deeper 👨‍🚀

Earlier, I mentioned the computational model. In general, it's that very scientific-mathematical thing (a formal system) that defines a programming language and how instructions in that language will be processed by the executor (an abstract computational machine).

Indeed, there are various mathematical concepts, not all of which result in a **useful** computational model. Therefore, the existing programming paradigms (comp. models) used in practice are based on practical, efficient computational models. These models don't hinder us but instead offer clear and meaningful techniques that can be applied in real-world scenarios.


> So, declarative programming is the first and simplest practical computational model where the main idea is to compute functions *without using variables*.


### Internal Structure

Things might being complex from now on, but I'll try to simplify it.

In essence, variables in the declarative model are used, yet not used. Confusing, right?

In the *classical* programmer's sense and reasoning, variables aren't used.
However, we still need to work with memory and values, calculate things here and there... So what to do?

In the declarative model, there's a concept called **single-assignment store**. It's a set of unique variable identifiers that are *initially undefined*.

They can be associated with some value (initialized, we said), but **only once**, and such "variables" are referred to as *declarative variables*.

In the single-assignment store, both already initialized variables and "free" variables can coexist. If all variables in the store are associated with values, it is referred to as a **store of values**.

Essentially, all you can do with the store is associate a value with a declarative variable inside it. If a variable is already initialized (its identifier is associated with a value) and you attempt to associate it with a different value, different from the initialized one, the binding operation will fail with an error.

Variables, as variables that we are used to understnad in code, do exist in this model and are called *variable identifiers*. These identifiers **exist outside of the store** and somehow point to declarative variables within the store.

This system of external "variables" is called the *environment*.

I understand it might sound confusing. First, I mentioned the feature of computation in the declarative model without using variables. Then I talked about variables and "references" from the environment to them. Yes, they exist, but they are not "variables"; they are **constants** (please reread the part about the store if it's not clear).


### Variables that are Constant

Can you sense the beauty of the strictness in these declarative variables? Their essence lies in the fact that creating a variable isn't the same operation as binding that variable to a value. We **cannot** use a variable until it has a value. Attempting to do so will result in an error!

At first, this might be challenging to grasp because in most programming languages, for greater expressiveness and convenience, the operations of variable creation and binding to a value occur simultaneously. Although in some languages, these mechanisms might be implemented differently.

In C or C++, a pointer *can point to an uninitialized area of memory*. Can you imagine the potential consequences?
Generally, this is the worst-case scenario concerning the topic of variables we've been discussing.

There's another scenario where a variable is defined but not bound to a value, yet there are no errors when using it.

This is achieved by assigning a default value when the variable is created. For example, this is how things works in Go, we can create a variable of a certain type and not assign a value to it. By default, each type has its own default value, such as 0 for integers, nil (which is equivalent to None) for slices (similar to dynamic arrays, but not quite).

Overall, this approach is better than the previous one, but it's far from ideal. However, in Go, there's an additional constraint - if we create a variable without binding a value and that variable is never used, our program won't compile at all (this also applies to unused imported modules).

---

The coolest option is ***dataflow variables***!

Dataflow variables are declarative variables that haven't been bound to a value yet. But the trick is that the system doesn't crash with an error; it *waits* until the variable receives its value and continues working. Thanks to this mechanism, we get *declarative parallelism* "out of the box"!

I've already wrote about parallelism and non-determinism in [this blog](https://wannahack.in/blog/hack-in-codding), so the name speaks for itself.

Declarative parallelism is *fantastic*; there are no race conditions.

As we remember, the "formula" for non-determinism is using named states (variables) + parallel computations. So, the implementation of declarative parallelism is essentially embedded within the declarative model itself.

# Data Types and Computations

A type, or data type, is a "entity" that defines possible values and their *meaning*, as well as the operations that can be performed on these values. In programming languages, there are always some basic sets of data types: integers, floating-point numbers, strings, etc.

In the declarative model, every operation on values is checked, taking into account the data types of these values.

If some "illegal" operation is encountered (operations on incompatible types of values), an error occurs in the program. Initially, there are no error handlers in the declarative model; any error immediately halts the execution. Additionally, *exceptional situations* can occur, such as attempting to divide by zero.

### Basic Data Types in the Declarative Model

Of course, there are standard boolean values true-false; there's nothing surprising there.

The data type **Atom**! How cool is that name, I'm absolutely loving it! At least, that was my initial reaction.

Well, in reality, it's just a symbolic constant that can be used in expressions. Essentially, it's just a string or an identifier. But the name is just right :)

---

**Record** - this is a composite structure with an identifier-name and a list of key-value pairs. The simplest example for understanding would be dictionaries in Python.

Records support standard operations, such as accessing fields by the record's name, retrieving their list, etc.

> In general, a record is a *fundamental* programming *concept* for structuring data.

This type can be found in practically any implementation of more complex structures, from linked lists to trees and graphs.

---

**Tuple** - this is a *record* where field names are sequentially increasing numbers, starting from one. So, arrays are also descendants of records :)

**List** - and this is also one more descendant of records :D
A list contains a certain number of arbitrary values, and they are linked in a specific way, usually sequentially.

And finally, **Procedures** - the easiest way to understand a procedure is to think of it as defining a function in its typical sense. A value of procedural type can have an identifier (function name) or be anonymous.

But in reality, procedures are not like the functions we are familiar with. Procedures are simpler than functions because they don't require strict definitions.

> In other words, procedures are not as constrained as functions!

For instance, functions must have *one* output, while procedures can have multiple outputs - any number of them. Similarly, procedures can have any number of inputs or none at all!

Moreover, *any* instruction in a declarative program can be placed inside the definition of a procedure. This trick is called **procedural abstraction**.

Records and procedures are *fundamental* and very powerful building blocks from which, roughly speaking, *everything else in programming is assembled*.

#### Organization of Computations

Despite the fact that variables in the declarative model are strictly defined once and for all, it is allowed to define local scopes for the **identifiers** of declarative variables.

This works in such a way that with each new *local* definition, a new instance of the necessary declarative variable is created. Physically, this instance differs from the "variables" in the store, but the name and value remain the same.

---

Procedures have several interesting features.

Firstly, to obtain the result of a procedure's work, you need to pass a pointer to an uninitialized variable in its arguments. The result of the procedure's work will be associated with this identifier, i.e., it initializes the variable. This is called *pass by reference*.

Secondly, procedures can have **free identifiers**.
These are variables that are not among the procedure's parameters and are not defined within its body (from an outer scope).

The trick is that the values of these free identifiers will be determined as the values of the corresponding variables (according to their scopes) **at the time of the procedure's definition**, not at the time of its invocation! This is called **lexical scoping**.

The point is that defining a procedure in the declarative model is a *regular* operation (instruction) and is executed on par with other code.

In our beloved programming languages, defining functions works differently.
The operation of function definition is not "regular"; it seems detached in some way from the rest of the code, and the function itself does nothing until explicitly called. This is called **dynamic scoping**.

So, in a "function" with lexical scoping, if there are pointers to variables from an outer scope, the values of these "local" variables will become the values of the external variables **at the time the function is called**.

This is generally bad, as it can lead to errors. For this reason, in languages using functions, access to external variables is usually prohibited.

The combination of lexical scoping with procedural abstractions provides a powerful tool for designing reliable programs without side effects.
Moreover, the implementation remains straightforward. This is what a practical computational model means! Impressive!

---

To be fair, it's worth mentioning that the declarative model actually "supports" functions through *linguistic abstraction*.

Linguistic abstraction is the creation of new constructs in a programming language with the aim of extending the syntax of that language.

This is a widespread practice used to enhance code expressiveness and improve the quality of the programming language as a whole, enhancing the safety and efficiency of language constructs.

In the declarative model, linguistic abstraction of a function, as you might guess, involves a procedure with a single output. This procedure returns an expression, the value of which is the result *computed* during the function call with specific arguments.

---

That's all for today. As you can see, the declarative model is truly the "head" of programming. Stay tuned, we are only just beginning to talk about it!

Take care, everyone!

---

[Next post of the series.](https://wannahack.in/blog/Hack-in-Declarative-Model-Part-2)
