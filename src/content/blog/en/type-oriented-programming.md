---
title: Type-Oriented Programming
description: Short note on very interesting thing.
pubDate: 2024-03-20T00:00:00Z
language: 'en'
tags: [Software Design]
style: border
color: success
---

# Typestate-Oriented Programming

Many of us are familiar with Object-Oriented Programming to some extent and probably program within this paradigm. The OOP model is extremely convenient for modeling entities and phenomena from the "real" world. For quality object modeling, a foundational factor becomes the _state_ of that object.

Dealing with states, namely our descriptions in code of both the state itself and the pathways, methods for its change/mutation, is a root cause of errors in OO systems and nightmarishly entangles code.

Yes, we can always turn to the jokers of functional programming - immutability and pure functions, or implement and apply strict engineering approaches, such as state machines.

The trouble is that, as a rule, programming languages lack support for a simple and quality implementation of state machines, which means we have to resort either to external libraries or to design and implement it ourselves, imposing additional restrictions and resource expenditures.

Typestate-Oriented Programming is an extremely powerful direction that naturally extends the OO paradigm.

The key essence of TOP is that we model objects not only in terms of classes but in explicit terms of changing states. This means that each possible state receives its own representation with specific methods that can transition the object into a new state.

By developing a system following TOP, we gain the ability to track the states in which objects reside right at the compile stage, or thanks to type-checker annotations in dynamically typed languages.

In essence, by rigorously designing in the TOP paradigm, we can already define the only possible path of program execution at the syntax level.

## This State Again

In the OOP universe, over time, many different frameworks have evolved into quite complex things, which require understanding and a good grasp of how they work and change the states of objects.

> Probably, the ORM part of OOP frameworks comes to mind first :)

The good news is that we can use TOP as a way to build abstractions over the operations available at the current moment for an object, which embodies a certain state capable of changing during operation.

This state, a fundamental abstraction, if you will - a concept, is not only important in programming but also in the natural world. Of course, we are interested in the state as data associated with some meaning, in particular in OOP - with the "meaning" of the object *containing* this state.

There are myriad states and meanings, especially in OOP-oriented languages. In them, i.e., in the standard library. In our own code, the number, "meanings and forms," definitions of states are often limited only by the flight of our wild thought.

Say we have class X, which has a certain state, and this class defines 5 different methods capable of changing this state in some way. In the simplest, working implementation, where all these methods are formally correct and work on their own, the wrong order of calling these methods is highly likely to lead to incorrect, contradictory states in the context of the "meaning" of our class.

We would very much like to avoid such scenarios and strictly control the mutations of object states.

Typestate-Oriented Programming is a natural, evolutionary development of OOP, allowing us to model objects *not only in terms of classes* but also in *terms of their changing states*.

## But How?

Indeed - how? Modern programming languages do not support state as a data type.

Well, the simplest, orthodox method is to adhere to the style adopted in functional programming :)

Either we make each object completely immutable, and the methods affecting the state return a new instance of the corresponding class.

Otherwise, when the object's state is mutable (for example, it's simply difficult by its nature to make it immutable - like an open file, etc.), every method that transitions the object into another state returns/creates a new, specific type of object.

The second approach leaves many questions open and can be extremely labor-intensive to implement.

If considering its use, such design patterns as State or State Machine might help.

---

We have other options.

Scientists from Carnegie Mellon University [suggest](https://www.cs.cmu.edu/~aldrich/papers/onward2009-state.pdf) a minimally efficient scheme for implementing TOP, requiring only three annotations or decorators for classes:

1. `unique` - which prohibits creating aliases, essentially - a singleton.
2. `immutable` - speaks for itself - changing the state of the class instance is forbidden. Want to change it? Return a new object.
3. `shared` - access to the object is possible, but formal state guarantees, which all users/clients must accept, are added.

Again - these are the minimal requirements for programming language tools for convenient design and implementation in the TOP paradigm out of the box.

But all these things, these concepts are nothing extraordinary and are surely present in one form or another in your favorite programming language. Well, maybe with a slight workaround... But TOP is definitely doable!

Moreover, by and large, the first two characteristics are quite enough to make the classic, familiar object-oriented code almost completely correct.

While correct, writing code within such constraints is possible but almost unrealistically challenging to make it expressive. This is precisely why the `shared` characteristic is proposed.

> Over the evolution of computational models in programming, the Declarative model eventually expanded with concepts of state and object - aiming to increase the expressiveness of the code.

Indeed, theorizing heavily, it would be great to truly have TOP support out of the box. It might seem that the concept of a typestate isn't implemented because it's too specific and applicable only in certain, narrow areas of programming, but that's not entirely true.

In a broad sense, the idea of a typestate is applicable to anything that can be expressed through an OOP class hierarchy.

I've already mentioned that TOP is a natural continuation of OOP - it's moving to a different meta-level of reasoning about classes, a different level of design and relation to states.

Even without typestate support, applying TOP in a language that qualitatively implements the OOP paradigm is possible without significant costs.

`unique` can be expressed through a singleton, and a system of types, and typestates (within reasonable limits) can be consistently and strictly thought out, neatly designed as an algebraic data type.

## Algebraic Data Type

An algebraic data type, in essence, is a type *composed of other types*.

This can be understood through the lens of familiar OOP classes.

When we define a usual class in an OOP language, for example, with two fields of basic data types, the number of possible states of our class objects is derived from the multiplication of possible states of values of the basic data types composing our class.

From the perspective of type theory, such a class (type) is called a *Product Type*.

For instance, if our class has two fields - a Boolean, which has only 2 permissible values, and a uint8 which can take 256 different values, it turns out that our type, simply put - class, can take 512 different states.

In the context of today's topic, we are interested purely in the algebraic data type - *sum type*, which is not commonly found in popular programming languages but actively exists in functional ones.

A sum type can only take states from a list of explicitly permissible states for that type.

A classic example of a sum type, especially in functional programming languages, is a certain data type for representing search trees.

Let's consider, for example, a simple binary search tree, where each node can store values, and it may have left and right children.

Our data type combines two states: a node with data (and possibly, child nodes) or an empty node, representing the absence of a subtree.

For instance, in Haskell:

```haskell
data BinaryTree a = Empty
                   | Node a (BinaryTree a) (BinaryTree a)
```

- `Empty` denotes an empty tree (or the absence of a node).
- `Node` contains a value (`a`), as well as links to the left and right sub-trees, which in turn are also `BinaryTree`.

We get a structure that can either be an empty tree or a node with a value and two child nodes.

Something more straightforward, some type system in our project's domain in functional languages, can be expressed through pattern matching - where we can guarantee to check all possible states, and the compiler will notify us if we missed some case, or ensure that the object never ends up in an unknown state.

In non-functional languages, well... we can still use carefully thought-out type systems, context managers, and other annotations to follow TOP.

In the worst case, we may limit ourselves to formal specification and at least leave comments or agree on a special naming for classes reflecting one of the three previously mentioned characteristic.
