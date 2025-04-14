---
title: Hack in Declarative Model - Part 3
description: Exploring the Rabbit Hole of Recursiveness
pubDate: 2024-02-01T00:00:00Z
language: 'en'
tags: [Computer Science,  Declarative Model]
style: border
color: info
---

Hello! This is the third post in a series delving into the Declarative Computation Model.

In the [second part](https://wannahack.in/blog/Hack-in-Declarative-Model-Part-2), we solidified recursive computations as the core of the declarative model.

Recursion as a programming trick is not limited to self-calling of functions — *data types can be recursive too*. A basic example of a recursive data type is a list.

Why is a list actually a recursive structure? Because it is defined *in terms of a shorter version of itself*.

Let's step back a bit. In the [first post](https://wannahack.in/blog/Hack-in-Declarative-model-Part-1) of this cycle, we briefly looked at the basic data types of the declarative model.

> Reminder: A *record* is the foundational data type.

The record has an identifier name and a *"list"*, or rather a set or "sequence" of "key-value" pairs.

So, specifically, the list data type is a collection of arbitrary values that are somehow connected to each other.
In that particular case, this type is called — linked list.

Usually, these "arbitrary" values in the linked list are elementary data types, like strings or numbers.

But it's not necessarily the case; in some monstrous OOP, we can "shove" any data into these "pieces" based on the list if it makes sense or is efficient (which is not always the case :)

Parts of the list are connected in some way with others, and altogether ("elementary piece of data" and the link-pointer to another) is called a *node*.

In a simple case, nodes are linked to each other sequentially (in one direction), like a train.

Okay, I was taken a bit to the wrong place; let's return to the fundamental matters :)

---

In the declarative model, a list is defined *recursively*.

It is assumed that either the list is empty (nil or, if you want, None), or *there is some value connected to the list*.

How it works in very simple terms: Imagine we initially initialized list X.

Its value will be nil — an empty list. If, for example, a "node" containing the string "shrek" is added to the list, then list X will equal "shrek" *linked to the list nil*!

In short, the "last" element in the list will always "point" to an "empty list".

Such representation in the declarative model allows for very expressive and powerful recursive computations.

In recursive functions working with lists, *the base case* will be checking a small list, empty or consisting of 1-2 values.

The recursive case (working with a larger list) will be the computation of results of *smaller lists*.

For example, a "declarative" recursive function calculating the length of a list in Python (just for simplicity) would look something like this:

```python
    def list_length(some_list):
        if some_list == []
            return 0

        list_head = [some_list[0]]
        list_tail = some_list[1:]

        return 1 + list_length(list_tail)
```

Hope you just had a small recursive satori — "Wow, how much can be done with this list!"

![Hold on!](/assets/images/hold_on.gif)

This is still a recursive function; and we already talked about the stack overflow problem last time.

Moreover, recursive functions with lists, if not thoughtfully defined, can turn out to be extremely inefficient — O(n*n) or even worse.

To solve these problems, there's a technique where recursive functions are turned into functions with *an iterative form of computation* with **linear** efficiency.

## Iterate This

We previously talked about iterative computations as a special case of recursion. Let's dive deeper.

First, the stack. Why does it form at all during a recursive call?

Pay attention to the example of the list length calculation function, especially the tail return at the end.

Time after time, during a recursive call, the function's instance environment must be saved in the stack because the addition of one happens **after** this final return.

In our example, this all happens just so that later, in reverse order, we "unwind" the stack and sum up the ones.

Seems redundant.

What distinguishes iterative computation from regular recursion?

> The scheme of iterative computations is a *sequence of **state transformations***.

But how does it work?

Well, really *essentially*, we add some counter to the argument of the recursive function, and we make it so that the increase of this counter *happens **before** the recursive call*.

A recursive-iterative function calculating the length of a list would look like this:

```python
    def iter_list_length(i, some_list):
        if some_list == []:
            return 0

        return iter_list_length(i+1, some_list[1:])
```

Notice the counter *i* again.

We increase it in the arguments of the recursive call, **before** the call itself.

Thanks to this, we "close" the function's environment, and the state of each instance does not need to be saved in separate stack entries.

Nothing prevents us from hiding such a function behind an abstraction that only takes a list, while internally calling `iter_list_length(0, list)`.

## Iterate That

See how the "recursiveness of the function" is connected to the "recursiveness of the type" it processes?

This is an **important feature**.

We can confidently say that:

> *the recursive structure of the function depends on the recursive structure of the definition of the type of data it processes*.

We might potentially come up with any recursive type, but it's not necessarily good.

This freedom in programming often leads to writing very inefficient, clumsy algorithms.

The definition of some data type in a programming language is *descriptive*.

It means that such a definition is just a set of logical statements about the set of values that this type can take.

Such definitions are not full-fledged value admissibility checks, and often (for example, some abstract type) cannot be checked at all.

In the declarative model, even basic types may not be checked by the compiler.

Therefore, it is **important** for us to fully and consciously understand what we are coding and use data types that are inherently and *naturally* aligned with the declarative model.

So, the list is very handy!

We just need to think it through, and do so in a way that avoids inefficient algorithm implementations.

Let's return to our definition of the relationship between the recursiveness of the type and the recursiveness of the function.

First, we need to *correctly define the recursive type* before writing a function for it.

What does this mean?

For example, we have a composite list, the elements of which can also be lists, and we need to count all values, including those in nested lists.

We need to understand, to *define* the type "nested list".

We remember that a "list" is either empty [] or some "element" connected to [].

In this case, a "nested list" will be defined as — either empty [], or a "nested list" connected to a "nested list", or as an "element" connected to a "nested list".

Confused?

In short, in any order, both "in breadth" and "in depth," elements can be either "simple" elements-values or *lists*, in which in any order, both "in depth" and "in breadth," elements can be either "simple" elements-values or lists, in which...

![Recursion](/assets/images/recursion_1.gif)
*<center>Emergency psychiatric care has been called.</center>*

Let's not get ahead of ourselves! It's simpler than it seems.

A nested list, to which another nested list may be connected, is still a "regular" list, which can be empty (that is, it may "not be"! Ommmm!)

That's where we started our definition from.

Then, a function based on such a type will have the structure:

```python
def length_1(some_list):
    if some_list == []:
        return 0

    list_head = some_list[0]
    list_tail = some_list[1:]

    if isinstance(list_head, list):
        return length_1(list_head) + length_1(list_tail)

    return 1 + length_1(list_tail)

nested_list = [1, [2, 3], [4, [5, 6], 7]]
print(length_1(nested_list))
# Output: 7
```

What if the type structure is different?

The function will have a *different* logic. For example, we have a type similar to the previous one, but we don't care about the number of elements in nested lists, and we just want to count the elements at the "top" level.

It doesn't matter whether this element is a list or not.

> It's about the *logical* definition of the type.

In this case, the type "nested list 2" we will define as — either empty [], or "nested list 2" connected to a "nested list 2", or as an *element of the "top" level*.

The key difference from the previous example is that then the "nested list" was always considered a list, but this time it can be considered as a "simple element".

The function:


```python
class NodeItemOrWhatever:
    pass

def length_2(some_list: list[NodeItemOrWhatever]):
    if some_list == []:
        return 0

    list_head = [some_list[0]]
    list_tail = some_list[1:]

    if list_tail == []:
        return 1

    return length_2(list_head) + length_2(list_tail)


node_list = [NodeItemOrWhatever() for _ in range(7)]

print(length_2(node_list))
# Output: 7
```


The key point here is checking list_tail == [], the essence of which is that if the recursion reaches the case where the tail of the element is an empty list, we return a unit, as if "ignoring" the fact that we "fell into" a nested list.

---

These simple examples are given as a way to understand how we should think about recursive computations in the declarative model, and only.

Thats why it's always important to understand the logic of the algorithm and consider the structure of the recursive type we're working with.

The declarative model gives us a powerful and elegant tool — *minimalism*, which can and should be used in developing algorithms (if possible).

The declarative model is convenient and eliminates many potential errors if we clearly define types and understand what the heck we are doing.

## Accumulators!

At this point, we've already figured out how to write recursive functions, make them iterative, and how to correctly define and apply recursive types of data.

So, why then use recursive functions?

Well, it's *not necessary*...

In actual development using the strict declarative model, functions are *written iteratively*!

We've explored these concepts above purely for the sake of understanding and learning.

Let's repeat for reinforcement: The whole trick of iterative computations lies in *passing the value* deeper into the recursion. We never return back using return.

![Buzz](/assets/images/buzz.gif)
*<center>Well, until the memory runs out :D</center>*

Enough with the jokes! How **THE HECK** does it work?

Take a state, which we pass into the function as **S**.

We take this state and *expand* it with two arguments, **S1** and **Sn**.

This trick is called an *accumulator*.

We take this accumulator and pass it into a **procedure** (not a function, God damn, we are serious declarative people after all!).

In the first post, we talked about how a declarative procedure works with pointers to *not yet initialized* declarative variables in its parameters.

In other words, the result of the procedure is returned through these parameters *by reference*.

In the accumulator: **S1** is represents the input state, and **Sn** is the output, i.e., the result.

Inside such a procedure, its recursive call occurs, performing sequential transformations of **Si** into **Si+1** (iteratively, darn it!!!)

Pseudocode:

```python
    procedure(S, S1, Sn):
    if S calculations are not required:
        Sn = S1
    else:
        ## the block of "recursive" calls begins
        procedure1(S1, S2)
        procedure2(S2, S3)
        ...
        procedureN(Sn-1, Sn)
```

The output of each procedureI is the input for procedureI+1

As explained, the difference from a recursive function is that we don't need to save all the intermediate states-calls in the stack, as the values are passed by reference.

And the "base case-limit" of the recursion could be specifying the boundary of processed elements in the original structure **S**.

When we discussed iterative computations in the post on the example of the function `iter_length`:

```python
    iter_list_length(i, some_list):
        if some_list == []:
            return 0

        return iter_list_length(i+1, some_list[1:])
```

We practically used *an accumulator*, passing the current length to the next call *by reference*.

---

Actually, nowadays such a scheme with accumulators is considered outdated, and their excessive use will only complicate programming.

The scheme with accumulators has a right to exist when it's possible to limit to a minimum number of accumulators (1-2).

Nevertheless, the benefit of knowing such fundamental techniques cannot be overstated in the context of enhancing our analytical and programming brain machine.

![Change-My-Mind](/assets/images/change_my_mind.jpeg)

And here we repeat one vital thing—although in iterative computations we don't delve into the stack "in depth," memory can potentially run out just **as well**! This is because we "unwind" the state "in width".

Thank you for your attention and dedication to honing your programming brain machine :)
