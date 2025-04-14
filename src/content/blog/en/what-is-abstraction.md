---
title: What is Abstraction?
description: Such a delusional topic.
pubDate: 2024-05-07T00:00:00Z
language: 'en'
tags: [Software Design]
style: border
color: primary
---

The definition of "Abstraction" in software engineering is expressed differently by various people, and often these views directly contradict each other.

I asked myself - what really is "Abstraction"? How can we precisely define the meaning behind this word?

Some say that interfaces are an abstraction; others say that interfaces are not an abstraction.

Some say abstraction is when we find logically related parts of code and separate them into a distinct component; others say that abstraction in software engineering is a process where we focus on individual parts of the model as abstractions.

What the hell is going on?

And the crazy part is that these opinions not only come from random engineering blogs but from quite serious academic papers.

Reading these materials, I realized that I don't fully understand what Abstraction in software engineering really means.

I caught myself having a very vague idea - in one context, I considered interfaces as abstractions, in another, I could call a simple function an abstraction.

I can no longer live in the darkness of ignorance, let's figure it out.

---

## Limited Forms of Abstraction

First, I would like to start with something quite primitive, which I naively-intuitively took for *abstraction*.

Function.

But is a function really an abstraction?

In the usual sense, functions separate one calculation from another (not always, of course, there are nightmares).

Functions, in the context of lambda calculus, are often called abstractions. What do they *abstract*?

> Lambda calculus is a formal system developed by Alonzo Church to formalize computability. And computability is a concept from the theory of algorithms and computer science, which defines which tasks *can* be solved using algorithms.

So, in lambda calculus functions, parts of an expression are abstracted into hypothetical variables representing generic input for the function.

For example, the abstraction of a function that takes one argument and returns its product by three would look something like this:

> λx. x * 3

This could potentially start a holy war - to consider functions from the perspective of high-minded lambda calculus and from the side of conventional mainstream imperative and OOP programming.

Nevertheless, in our usual way of programming, by defining a function, we limit one piece of code from another, with brackets or indents, so despite disagreements in views, a function can still be seen as a form of abstraction, but a *very limited form*.

A form that does not answer the question - what is abstraction.

---

So what about unlimited form? 

Maybe factorizing code into neat modules is a process of extracting abstraction?

Following the DRY (Don't repeat yourself) principle, we essentially perform *anti-unification*, decomposing similar parts of code into separate functions and the like.

But this is in general lead us to the same example we discussed earlier in the context of a function. If this trick can be called an abstraction, it is still very limited.

Anti-unification, particularly obsession with it, can lead to one terrible anti-pattern.

Its name is *boxing*.

Boxing is when we cram a huge amount of code into one big function or method, the set of parameters for which automatically grows.

Naively following the idea of de-duplication of code, we can easily loose focus on the specification and logical domain to which these parts of code belong, so we will almost certainly end up with boxing.

Think about it:

>Try to find examples of logic, the actual implementation of which will be the same (or almost the same), but the specification, the sense - will have *different*.
>
 Is it correct to "abstract" the implementations of such logics in our mixed domain into one function/method, even if hidden behind multiple dispatch and similar?

## Not Abstractions at All

Well... Abstraction... Where it is...

Maybe the process of organizing code into separate modules, or in OOP class hierarchy is the process of abstracting things?

Yes, of course, we can split the code into several modules, hide a lot of logic in class hierarchies, and every time we will return in the project to add a new feature, we will switch between 4 files/modules to remember how and what actually works here.

Familiar?

Is this abstraction?

What's the difference between `entity.getTotalSomething()` and `getTotalSomething(entity)`?

Looking at this example from a meta level, from a [specification level](https://ivanzakutnii.com/blog/Levels-of-reasoning-about-software), I see no difference, they do the same thing.

So what are we abstracting by organizing long chains of method calls or spreading the class hierarchy across several modules?

I feel this is not abstraction, but the stirring of implementational "water" in a mortar.

## Well, What About Interfaces?

An interface, in the broad sense, is essentially a mechanism for grouping several implementations of one "function", allowing a specific call of such function to any of the defined implementations.

Type classes and parametric polymorphism/generics are intended for the same purpose.

Well, Abstraction!

Here we have an implementation hidden behind some "interface", we abstracted it! No? Yes? What's wrong!?

I don't like it. I don't like that nothing forces all these different implementations to have *any relation to each other*.

We can create such a mess that one and the same interface will be implemented in completely different ways, or even make it so that two different implementations will perform completely opposite things.

And how can this be *Abstraction*?

At this stage of the search, I realized what I expect from Abstraction.

If feels that it should be some sort of *specification*. 

We can call it "abstract specification", yes, *abstract*, but **specification**.

It seems that I have finally managed to at least approach the correct, albeit still semi-intuitive definition of abstraction.

But I still can't find an example of how abstraction looks in code, what it can be expressed by, how it is represented?

## Authentic Abstraction

What was the starting point for the search - find a concrete, formal definition of Abstraction.

As I mentioned at the beginning, I tried to find it, but encountered completely opposite formulations in meaning.

The fact is that I was just looking in the wrong places.

Taking a broad step away from the mainstream towards Holy Computer Scientists of the Past, I found commonality in definitions, even in seemingly quite different areas - they did not contradict each other and carried a similar sense, which can be expressed as follows:

>Abstraction is the mapping of a specific subject area of the *dirty*, contradictory, and confusing real world into *something pure*, idealized, capable of being described mathematically.

Sounds complicated, but the following quote from *Edsger W. Dijkstra* clarifies everything:

>Being abstract is something *profoundly* different from being vague … The purpose of abstraction is not to be vague, but to create a *new semantic level* in which one can be absolutely precise.

Aha! Semantic Level!

---

So what turns out, if we define abstraction from such a perspective, then it turns out that all the previously considered "mechanisms" of programming are not abstractions after all? Or are they?

Yes, our OOP classes and even their hierarchy should somehow reflect the subject area, but the *purity* (as a concept) of this reflection is highly questionable.

The same applies to functions, especially *dirty* imperative ones filled with side effects.

The most pure and authentic abstraction that comes to mind is *numbers*.

The number 108 can be represented in various forms, numeral systems, signs, as a mathematical set...

Mathematical operations, like addition and multiplication, also have many different implementations, but we never think about them when using calculators.

And how many interpretations occur around electrical signals, just to see a picture of a doggo on the screen?

> All this looks like when working with good abstractions we don't even realize that we are working with an abstraction.


And it follows that abstraction, in its true and authentic sense, is represented in the code as...

>*It is not present at all.*

---

Let me explain my thoughts here.

Abstraction in principle cannot "be located" somewhere, because it is a *representation* it self, in the sense of some *pattern*, which we overlay on the modeled world, and not on specific entities of this world.

It is incorrect to ask:

>"Is `A` an abstraction of `B`?"

It is more correct to ask:

> "Will the *mapping* from `A` to `B` *be* an abstraction?
> Are all the necessary operations of `B` preserved in the abstraction of `A`?"

So, stop. But we have already remembered that there is a "mapping" from each implementation of a function to its interface!

And to each call of a function, from its implementation!

Yes, that's true! But it seems we have found the reason why, looking at some interfaces in the code base, we understand nothing, and looking at others, we can make quite correct predictions about what will happen as a result of executing this code - *Poor abstraction VS. Good one.*

Observing and working with good abstractions, we are able to make quite accurate predictions about the outcomes of the considered code, because "Abstraction" *is represented* precisely, expressively, forming that very "*semantic level*" mentioned by Dijkstra.

> Looking through such *quality* representation, we are able to observe the meaning of the code easily.

---

And yet, why does abstraction *not* look like anything in code?

Because it's a separate dimension altogether, and it's not that abstraction should be associated with code, but *code should be associated with abstraction*.

For example, if we have a method/function whose responsibility is to transfer money from one account to another. 

The *specifications* of such a function can be described quite differently:

1. We can describe all the permissible variants of behavior - success or failure of the transaction, under what conditions it is performed or not performed;
2. We can describe it as a mapping to an abstract domain to which this function belongs. Most likely such a function will belong to the domain of some "client", hence the abstraction of this function can be described as a mapping to this domain - for example, we can say that this function should perform a transaction, and return a set of transactions after attempting a transfer - including successful and unsuccessful transactions;
3. Ultimately, we can simply literally describe the implementation of the function, its purpose and responsibility - "function N attempts to transfer X of something from there to there";


As we can see, any of these specifications can be used, they themselves are separated not only from the code but also from the domain, it is absurd to claim that our function is a specification (or anything else like a class to which this function belongs as a method, and so on).

Therefore, it turns out that the code is associated with *abstractions*, not the other way around. 

Yes, with *a multitude* of abstractions, because such formal descriptions, if you want - *ideas*, can be infinite.

All abstractions are precise in their own way, within the space of meaning they try to impose. Nevertheless, we are able to determine which abstraction is more "correct", more suitable.

In general, good abstract states always contain less information than concrete ones.

And this is less obvious than it seems.

Trying to "hide" already existing "information" in the code behind some "false" abstraction, we engage in anti-unification and slide into boxing.

Focusing on the meta level, reflecting and designing code in clean, true abstractions, there are fewer chances to slide into boxing because we operate with representation and abstract domains.

---

So, I don't know about you, but I think I've found it.

Abstraction is a "pattern" that we overlay on the modeled external world, resulting in program code. 

Only good abstraction allows, looking at the chains of calls and structures in the code, to predict the meaning and purpose of these calls precisely enough.

The goal of abstraction is to show whether specific code has some systemic property, whether it is an element of system design, a certain feature, and so forth.

Abstractions are not expressed in the code by anything or in any way.

They are very similar to abstract data types. We could even say something like - "Good abstract data types express good abstractions," but that *would not be correct*.

Good abstractions are *completely separate* from the code, and even from the abstract domain.

Good abstraction is a supra-system entity, which is not always explicitly distinguished in classes/objects, moreover, *abstraction does not always need to be somehow distinguished.*





