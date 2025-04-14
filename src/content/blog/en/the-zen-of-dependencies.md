---
title: The Zen of Dependencies
description: I don't mean to harm anyone here.
pubDate: 2024-02-17T00:00:00Z
language: 'en'
tags: [Software Design]
style: border
color: success
---

It seems that dependency is an intuitive, simple concept.

After all, we just need to look closely at the code, make sure
that thing A depends on thing B, and decide that we can change A without breaking B.

And then we proceed with the changes, roll out a new version, and realize by the number of errors that we miscalculated somewhere.

{:refdef: style="text-align: center;"}
![miscalculated](/assets/images/miscalculated.jpeg)
{: refdef}

We might try to rid our codebase of a "specific" dependency, attempt to design it so that it "depends on interfaces, not implementations," or pursue SOLID through dependency inversion.

Dependencies are far from simple and intuitive. And even less trivial is the task of getting rid of dependencies.

We simply cannot point at the sky and remove/modify the part we considered a dependency, such an approach is like a blind man walking barefoot through a room littered with blades. Well, it's possible to get through unscathed.

---

How to objectively define dependency?

We can use this term in completely different contexts - from package management to tuning and issues with the performance and usability of a specific service.

We need a formal, strict definition of dependency in the context of our industry; a simple "Well, thing A depends on thing B, it's obvious" is not enough at all.

Today, I invite you on a journey to search for this formal definition.


## What's Your Name?

Dependency is one of those concepts we all think we know well and understand what it means.

In many classic printed works on software engineering, this word is used dozens or even hundreds of times, while rarely these works provide a definition of dependency.

Thus, it's easy to discourse about dependencies and the restrictions they impose. But the ambiguity in defining the term "dependency" leads us to uncertainty in real work, to uncertainty in making important architectural decisions.

Take a typical statement:

> "My web project includes Redux as a dependency, but it does not depend on it if state management is not used, and in fact, it does not depend on it because my project does not rely on a specific way of managing state."

Well, if you think about it, in this sentence the word "dependency" means different things each time:

- The first "includes as a dependency" means that Redux is listed among the packages necessary for the project.
- The second "does not depend on it if state management is not used" indicates that if the project is designed in such a way that centralized state management is not required, then the presence or absence of Redux does not affect its functionality.
- The third "in fact, it does not depend on it" emphasizes that the flexibility of the project allows replacing Redux with another state management system without significant changes in the code, meaning the project is architecturally not tied to Redux as an essential element.

## Are Dependencies Really That Complex?

Let's imagine we're working on creating a some cloud service for data storage, and decide to integrate Amazon S3 as one of the storage solutions.

Aiming to avoid being tied to a single cloud provider, we develop an abstract interface for file operations, allowing easy switching between different cloud storages.

Question: Does this service depend on Amazon S3?

---

{:refdef: style="text-align: center;"}
![thinking](/assets/images/thinking.jpeg)
{: refdef}

One software engineering guru might suggest the following solution - minimize dependency by using the "Adapter" or "Gateway" design pattern, which would allow our service to interact with Amazon S3 through a common interface.

Another guru might point out that having an abstract layer still creates a dependency in your project, as the choice of cloud storage still affects the overall architecture of the system.

Such contradictions raise questions about the nature of dependencies in programming and how we interpret them.

Even with an abstract layer that theoretically "eliminates" the dependency on a specific technology, in practice, the project can still remain dependent on this technology at the design level.

For example, in a microservices system designed for e-commerce, these services may seem autonomous at first, but in practice, they are often closely interrelated. The order service depends on the product catalog service and the account management service to verify user data. A change in one such "microservice" is likely to require changes in others.

Dependencies are often more complex and multifaceted than they appear at first glance, and understanding them requires deep analysis and awareness of the compromises involved in system design.

Let's try to categorize dependencies and answer typical questions for these categories.

## Categories of Dependencies

### Framework Dependency

> Component A calls component B - meaning, component A depends on component B.

Alright. A task scheduler, such as round-robin, will eventually call all scheduled tasks. Does the scheduler itself depend on the tasks it calls?

### Shared Format Dependency

> Component A correctly writes information to a file, and B correctly reads it.

They are obviously connected to each other, at least by the common data format in the file.

But which one depends on the other?

### Dependency of a Dependency

We often assume that:

> if A does not depend on B, then a change in B cannot affect A.

But what if the new change in service B introduces a new dependency?

For example, we change a global variable (in configuration or something like that) used by both A?

### Crash Dependency

This is a type of dependency that has escalated in terms of consequences compared to the previous one. In this scenario, a change in any module, through indirect connections, can affect any other module and lead to the program crashing.

Accordingly, by adhering to the rule "A does not depend on B if a change in B cannot explicitly affect A," we ultimately arrive at the complete opposite conclusion:

> everything depends on everything else.

### Failover Dependency

Imagine we have a primary server B for data storage, used by application A for saving and retrieving data.

However, we have implemented an automatic failover system to switch to a backup server C in case the primary server becomes unavailable.

Then, in the event of B's failure, application A starts using backup server C to ensure its continuous operation.

In this context, A depends on B for its normal operation, but this dependency is not absolute thanks to the presence of C.

The failure of B does not lead to the failure of A because the failover to C ensures continuity.

In short, in such a scenario, the failure of B does not mean the failure of A.

> But does this mean that A does not depend on B?

### Dependency Inversion

Dependency inversion from SOLID is "sold" as a means to eliminate dependencies: instead of A statically binding/calling module B, a reference to B is passed to A at runtime.

But A will still fail if B fails. So, did it help? Has it become easier to determine what depends on what in this scenario?

Additionally, with DI, we might lose many cool static type-checking things.

### Circular Dependency

We usually consider dependency to be transitive:

> A cannot function without B, and B cannot function without C, therefore A cannot function without C.

I'm sure almost all of us have encountered nightmare dependency cycles: where A depends on B, and B depends on A, or even worst.

The key question here is the following:

> What does it even mean for A - to depend on A?

### Higher-Order Dependency

Libraries are generally designed not to depend on the specific application code that utilizes them.

However, exceptional scenarios can arise. For example, a hash table implementation might produce incorrect outcomes if different keys implement comparison and hash calculation methods inconsistently. This could lead to a scenario where identical values result in different hashes.

In the case of strings, which in several prominent programming languages are not primitive types but classes, we are free to inherit from them. If we create a subclass and override the equals() method, we could populate the hash table with a mix of standard strings and instances of our customized subclasses.

> Therefore, the question arises: Do such hash tables and other standard library classes depend on the calling code?

### Majority Dependency

In the 1970s, "N-version programming" was a trendy idea: it stated that if 5 professional developers write the same program, the likelihood that all their versions of the code will have the same errors is extremely low.

Thus, we could ask 5 engineers to implement the same highly detailed specification of a subsystem, and let their programs "vote" on what to do at each step of execution; as long as three people don't make the same errors in the specification (which is highly unlikely), the program will *always* operate in accordance with this very specification, right?

{:refdef: style="text-align: center;"}
![thinking](/assets/images/padme.png)
{: refdef}

---

No! It's a cognitive brain fart!

In this [study](https://ieeexplore.ieee.org/document/6312924), 27 versions of a program were independently coded by two different universities based on the same specification, after which each of versions was run through a million tests.

The results showed that while individually the programs were extremely reliable, the number of tests in which more than one program failed was significantly higher than expected.

---

This is a very interesting paradox: Suppose all 5 programs written by our developers implement the specification perfectly, and because of this, all their programs always vote for the same action.

From this, it can be inferred that no changes in any single implementation can alter the behavior of the main system as a whole (the overwhelming majority will still make the same decision).

> But can we say that the main system does not depend on any of the five programs?

## Formalizing Dependency

For any type of dependency discussed earlier, a simple but essential question arises:

> "Does A depend on B?"

However, this is not enough, as this is precisely where we started...

To accurately characterize a dependency, we need the following parameters:\

- semantics, i.e., *a specific computational model*;
- key characteristics of our dependency;
- the space of permissible changes.

### Dependency Semantics

Let's revisit the example we considered at the beginning:

> "My web project includes Redux as a dependency, but it does not depend on it if state management is not used, and in fact, it does not depend on it because my project does not rely on a specific way of managing state."

Each "dependency" mentioned here is not just an answer to different questions, it's an answer within different execution computational models.

When we import a package into our project, we create a "dependency" within it.

However, the project does not "depend" on the package until it begins to use it.

If the project is indeed implemented in such a way that Redux can be replaced with another state management library with practically no code changes (magic?), then it can indeed be said that the project does not depend on Redux.

The catch is that all these "dependencies" are qualitatively different.

In "Build Dependency," when we "physically" import a package, it concerns the execution model at the level of the compiler or build system. The appropriate theoretical term is *"Static Semantics"*.

The actual use of the package is a *"Runtime Dependency."* This is the execution model at the level of the interpreter or a combination of compiler and processor. Attention needs to be paid to whether code from this package is indeed executed and contributes to the overall program's output. This can be termed theoretically as *"Dynamic Semantics"*.

When we assert that the program will work "just as before" even after switching to another library, the execution model is essentially only **the mental reasoning of the assertor**.

With this statement, we try to convince ourselves or someone else that the program is correct and achieves its goals, based only on guaranteed properties at the level of abstraction.

If we agree that human reasoning is akin to automatic (which is not the case at all), the theoretical term reflecting this is *"program logic,"* or the proof system used to determine that a program achieves its goals.

### Key Characteristics

When we ask ourselves, "Does A depend on B?" our approach to analysis becomes overly vague and universal, leading to a loss of specificity in the task at hand.

Asking such a question prevents us from delving into the specifics and nuances of the relationships between components, resulting in an analysis that may be superficial and not reflective of the actual situation.

For a more precise and relevant analysis, it's important to reformulate the question more precisely:

> "How does the specific property P of module A depend on module B?"

This approach allows focusing on studying the relationships between certain characteristics of the system.

For instance, let's return to the previously discussed example of the scheduler.

Reminder of the question:
> Does the round-robin scheduler depend on individual tasks?

Obviously, yes - by many runtime characteristics. But regarding the correctness of the scheduler - it should not depend on the scheduled tasks at all.

But if we are dealing with a preemptive scheduler, then a task might hang and not generate hardware interrupts, which in turn will take up all the scheduler's time.

In other words, situations are not uncommon where no dependency on a component seems visible - except that this component can "break out of its cage" and spoil the rest of the system.

Herein lies the next very important dimension in the formal study of the nature of dependency.

### Acceptable Changes

In an ideal scenario, we would always want dependencies to have the following nature:

> if A does not depend on B, then no change in B can affect A.

I repeat - but what if a change in B introduces a new dependency, making A dependent on B?

Now, we can derive a nonsensical, tautological definition:

> "if A does not depend on B, then no change in B can affect A... unless this change introduces a dependency."

In an attempt to escape this contradiction, we are forced to compromise: what if *sometimes* we exclude such changes, and **sometimes we do not**? :trollface:

But this is not very serious. Any practical discussion of dependency must carry a strict frame of reference:

> what kinds of changes will it be "reasonable" to consider in the current context?

When we ask whether the stability of our application depends on the framework used, we should get a different answer depending on the quality of the *influence* on the system that interests us.

Thus, in addition to the execution model and the properties of interest (key characteristics), such a "space of reasonable changes" becomes the third parameter defining the concept of dependency.

---

For example, the spell:

> "the system should depend on interfaces, not implementations"

implies that if our program uses a certain function, then any change in the implementation of this function within the space of *"changes that do not alter the specification"* should not affect the correctness of this function's operation.

It turns out that the "space of reasonable changes" can be called a *specification*.

Unfortunately, this can potentially lead us into even greater confusion.

For example, we might ask: "Can the authors of library X ruin my project by changing its interface?", and here we are essentially interested in *possible changes to an existing specification of an **external library***.

In such a case, the space of permissible changes effectively becomes a *specification of the specification*, and it seems that the best name we can come up with for this is "super-specification".

> A super-specification is the constraints on acceptable changes to specifications.

## Extracting Meaning

We have defined 9 types of dependencies, as well as three important characteristics of a dependency, providing us with a method to properly conceptualize them.

Now, let's consider another definition of a dependency, from a different perspective:

> A dependency is a cause-and-effect relationship.

Everything we have discussed so far is applicable not only to software engineering but also to physical reality, to our lives.

In fact, all topics of dependency resolution are isomorphic to the key question about such physical causality.

Does a round-robin scheduler depend on its tasks?

Does my ability to read English-written books affect my reading speed? Not realy, until I come across a translation of a work by Nagarjuna.

If a car engine does not start, it means my plans for the day are highly dependent on the condition of the car. My trip to work is a consequence of the car working, unless there is a traffic jam on the road. However, I did not cause the traffic jam myself.

Does it mean that if B can break down, then everything depends on B?

If we can use C when B breaks down, does it mean we do not depend on B?

Does the freshness of the air in the room depend on the window just opened, when the air conditioning system was set to turn on if it became stuffy in the room?

{:refdef: style="text-align: center;"}
![why are you doing this to me](/assets/images/wtf.png)
{: refdef}

---

Well, there are two categories of causality.

The first type - theoretical, or *general causality*, deals with general conclusions about categories. For example - "water pollution leads to the death of fish".

The second type - concrete, or *actual causality*, concerns statements about specific situations: "The discharge of waste from factory X into river Y in city Z led to a mass fish kill in July 2020".

Since in our context we discuss dependencies concerning specific actions and concrete circumstances, the most suitable, useful type turns out to be actual causality.

The concept of actual causality varies, and there is no universal criterion for its definition.

Arguments in favor of this type are often based on practical utility and intuition.

For example, in law, it is considered that indirect actions can lead to legal liability, such as an accident caused by certain actions.

For instance, if a building owner does not remove ice from the sidewalk in front of their building during the winter period and a pedestrian slips on this ice, falls, and fatally injures their head.

This raises questions about what to consider the real cause of an event, especially when there are alternative sources of influence, similar to the situation with the freshness of the air in the room, which can be caused not only by opening a window.

In the context of software engineering, the dependency of one component on another is defined through *its influence on the outcomes or properties of the system*.

This simplifies the understanding of relationships between different elements of the project, eliminating the need for deep theoretical reflections on the nature of causality.

---

Finally, we can derive a universal and absolutely correct definition of dependency:

> Property P, defined in a certain computational model, depends on component A *then and only then*, when A is the actual cause of property P with respect to the *space of permissible changes* of A.

As a useful practice, I suggest you return to the 9 types of dependencies and recall suitable examples from your experience.

To determine the properties of dependencies using this new definition, consider the following: In the case of dependencies on dependencies, and especially in the case of higher-order dependencies, attempt to describe super-specifications.

Please remember that introducing dependencies, as well as eliminating them, are insanely important factors in making architectural decisions.

Dependencies should not be taken lightly.
