---
title: So what is Design Patterns?
description: Let's talk about design patterns and the reasons for their existence.
pubDate: 2023-10-14T00:00:00Z
language: 'en'
tags: [Software Design]
style: border
color: info
---

## So what is Design Patterns?

Basically, design patterns in OOP is an accumulation of other developers experience. Such patters are generally accepted in mainstream as a good solution for set of common software design and development problems.

There are a lot of patterns. The story of design patterns begins from "Gang of Four" – Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides, who wrote a canonical book *"Design Patterns: Elements of Reusable Object-Oriented Software"* about 23 design patterns.

> In fact, story begins not from this book, but from [original document](https://courses.cs.duke.edu/fall00/cps108/readings/patterns-orig.pdf) published in 1993.

In this document, design pattern defined as an abstract description of the interaction between class/object and its structure; some system design problem, "solved" by some abstract structure (taking into account the circumstances of its applicability);
and, eventually, as the consequences of applying such an abstract structure to the overall system architecture.

So, initially, design patterns as a term is the thing from OOP-world. But today we have a lot of "design patterns", which are not about OOP. For example – [Linux kernel design patterns](https://lwn.net/Articles/336224/), [SQL Design Patterns](https://www.amazon.com/dp/0977671542), etc. Which are, probably, a good things, but here we are strictly talking about software engineering design patterns.

---

The thing is, that knowing and even have a good understanding of fundamental OOP concepts, which are:

- Encapsulation
- Abstraction
- Inheritance
- and Polymorphism

Is not enough for "automatically" building robust and flexible OO-systems, which are also will be easy to maintain. Because oop paradigm has a few painful pitfalls.

Because of these pitfalls design patterns were born. And all Design Patterns are stands on few **design principles**, which are, actually, more valuable to understand than patterns itself.

Of the other side, it is pretty easy to fall into the trap of thinking that design patterns it self are silver bullet, and become an adept of such cargo cult.

I am not saying that design patterns are bad, or that we should not study and known them, but I belive, that "Enlightment" is often acheived by reducing the number of entities, which our mind have to deal with in the process of direct thinking.

We should study design patterns, at least for understanding core **design principles**, and also, because design patterns becomes well known "protocol" of comunication between developers. The convenience of design patterns lies primarily in this "protocol" of ready-made terminology.

---

Okay. Lets take a small step back and loot at the reasons, why design patterns were born.

### Impermanence

Impermanence is the noble truth of the Universe. There are no permanent phenomena, and software, of course, is impermanent too.

There are almost always bugs that need to be fixed, and there are always features that need to be implemented. Yet, in every system, there exist "conditionally" permanent parts, contrasting with the frequently changing impermanent components.

Despite the constant flux and the need for continuous improvement, these impermanent aspects coexist with elements that are conditionally permanent. This delicate balance between change and stability defines the ever-evolving nature of software.

So, the design patterns try to provide a way to deal with this ever-changing nature of software, making supporting of these systems less painful.

### It's all the parents' fault

In the object-oriented paradigm, inheritance is an awesome feature, akin to a magic cheat code. Yet, usting it "wrong way" a direct path to fuckups.

In truth, high possibility of using ingeritance wrong way is the primary reason for the emergence of design patterns.

You see, thoughtless use of inheritance in the process of developing a software system inevitably leads to the spread of "mutable" parts throughout the class hierarchy.

And this is a total disaster, because in such cases, when we need to make a change, we are forced to modify "this" everywhere, and we'll most likely miss something and broke something.

So, the central and foundational idea (principle) that underpins every design pattern is:

> Separate the "impermanent" parts and encapsulate them so they can be modified or extended later without impacting the "permanent" parts.

---

For example, imagine you are creating a big AAA game with an open world and a lot of features like Red Dead Redemption 2 and so on.

You start creating a hierarchy of various types of transport, encapsulating all moving behavior in this class. However, this approach will eventually fail because different types of vehicles, such as cars, horses, boats, planes, and more, might have completely different moving behaviors.

That's why such behaviors should be coded as separate interfaces or abstract data types. This way, every concrete implementation can implement these interfaces without issues.

Please, don't be fooled. Even if we say that in object-oriented systems, classes should represent **entities** with states and methods, it doesn't mean that a class can't represent the interface of *behavior*.

Behavior as a concept is not fundamentally different from any of the entities and can have inner states and methods too.
That's why it is legitimate to say that in an object-oriented system:

> Class should represent a **phenomenon**.

This is a subtly philosophical approach, much more detached and formal, and shifted to the third level of reasoning. Take a look at [this post](https://wannahack.in/blog/Levels-of-reasoning-about-software), In fact is is all about the next design principle:

> Reason about and implement software systems on the level of abstract data types (interfaces).

---

So, it's a smart move to "delegate" behavior to own classes or interfaces. Just don't cram an entity and all its behavior into one class (no matter what level of hierarchy you're dealing with), because that's a one-way ticket to chaos.

And here's the bonus: by spreading behaviors into separate classes, you get the nifty ability to switch things up smoothly on the fly. How? Well, you can create setters in the meta class that, you know, set some concrete implementations. It's like having the power to change the game while it's still running!

Very simple example incomming:

```python
# Define interfaces for different behaviors
class MovingBehavior:
    def move(self):
        pass

class FlyingBehavior:
    def fly(self):
        pass

# Concrete implementations of behaviors
class WalkBehavior(MovingBehavior):
    def move(self):
        print("Walking")

class SwimBehavior(MovingBehavior):
    def move(self):
        print("Swimming")

class NoFlyBehavior(FlyingBehavior):
    def fly(self):
        print("Can't fly")

class JetFlyBehavior(FlyingBehavior):
    def fly(self):
        print("Flying with jet engines")

# Entity class that delegates behavior using setters
class Entity:
    def __init__(self):
        self.moving_behavior = None
        self.flying_behavior = None

    def set_moving_behavior(self, behavior):
        self.moving_behavior = behavior

    def set_flying_behavior(self, behavior):
        self.flying_behavior = behavior

    def move(self):
        if self.moving_behavior:
            self.moving_behavior.move()

    def fly(self):
        if self.flying_behavior:
            self.flying_behavior.fly()

entity = Entity()

# Set walking behavior
entity.set_moving_behavior(WalkBehavior())
entity.move()
>>> Walking

# Change behavior dynamically to swimming
entity.set_moving_behavior(SwimBehavior())
entity.move()
>>> Swimming

# Set flying behavior to no fly
entity.set_flying_behavior(NoFlyBehavior())
entity.fly()
>>> Can't fly

# Change flying behavior to jet flying
entity.set_flying_behavior(JetFlyBehavior())
entity.fly()
>>> Flying with jet engines

```


## All hail to the Composition

Building upon the things we have covered above, a new simple rule emerges:

> Use composition over inheritance, every time it makes sense. If it does not at first glance – double-check.

It really is as straightforward as it sounds.

HAS relations often prove to be more reliable and practical than IS relations.

Software systems created using composition offer significantly greater flexibility.

In fact, composition is a fundamental concept utilized in many design patterns, highlighting its importance and versatility in the realm of software engineering. By embracing this principle, developers can craft robust and adaptable systems that stand the test of time.

{:refdef: style="text-align: center;"}
![Stop](/assets/images/hold_on.gif)
{: refdef}
*<center>Excuse me, WHY?</center>*

Because using inheritance in a lazy manner is simply unacceptable. By the end of this post, we will define what is *right* and what is *wrong* when it comes to the context of inheritance.

---

Alright, let's consider a scenario:

**Bob:** "Meeeh, I'm not convinced that composition is the right choice here. It seems like we're reinventing the wheel, especially when we could simply inherit <this> class from <some> library that already contains all the necessary behavior."

**Marry:** "Bob, you can't guarantee that this library will remain unchanged indefinitely. Plus, if we inherit *our* class, who knows where it might end up in our system? Are you certain that we want to propagate the inheritance of <this> class throughout the entire system?"

## Are we going to talk about design patterns in this article, or what?

No, we don't.

Read the GoF book or its simplified version, "Head First Design Patterns: A Brain-Friendly Guide."

Why? I'm emphasizing once again that patterns, in and of themselves, are not a silver bullet that should be the sole focus.

The point is that the benefits of design patterns, which are undeniable, can be achieved through *other methods* more effectively.

To understand this, we should move to a meta-position of reasoning, and try to accept the idea, that ***the objects themselves are already patterns***.

{:refdef: style="text-align: center;"}
![Brain damage](/assets/images/mind_blowing.gif)
{: refdef}
*<center>Excuse me, WHAT?</center>*

Alright, it's easier to understand the idea that a **class** is the **pattern** by which **objects** are created. But how can **objects** themselves be patterns?

It is a really brain melting and deep topic, and this post is already huge enough, but try to consider an object as a "style" of using existential types (of as "encapsulation" of a type, placing multiple representations with support for their interaction behind a single interface).

There is a thing called ***abstract data type*** (ADT), and this is a high-level description of a collection of data and the operations that can be performed on that data. It specifies what operations can be performed on the data, but it does not specify how these operations are implemented.

In other words, an abstract data type focuses on the behavior of the data and the operations that can be performed on it, rather than the details of how these operations are carried out. ADTs provide a way to encapsulate data and behavior into a single **"entity"**, allowing users to interact with the data using well-defined operations without needing to understand the internal workings of the data structure.

> The fact is, that ADT and objects are two different forms of data abstraction!

---

If we agree that objects themselves are *patterns* and not just fundamental elements, it logically follows that object-oriented design patterns are also *not fundamental* (as they are based on more foundational principles).

So, in which cases should objects be considered and treated as patterns? To understand this, we first need to precisely define "true inheritance," upon which design patterns are also built.

This is easily defined through negation. Using inheritance is incorrect if it does not involve calls to superclass methods in subclasses. In other words, adhering to "true inheritance" excludes the possibility of overriding superclass methods.

In fact, the only classical design pattern that **fully adheres** to "true inheritance" is the Visitor pattern.

We'll delve deeper into the Visitor pattern in one of the upcoming posts.

It is all for today, Thanks!