---
title: Pitfalls in software design reasoning
description: Few conrintuitive things.
pubDate: 2023-12-14T00:00:00Z
language: 'en'
tags: [Software Design]
style: border
color: success
---


Oh, hello there! Today I would like to talk about counterintuitive things in software design. 

Because these things are counterintuitive, they may cause rejection and resistance at first glance.

This is okay because we, humans, do not like unusual things that can disrupt the routine.

The brain is a lazybone because it is very hard to form new neural connections. 
But one should make an effort because it is very useful to look at things from different angles.

Okay, enough of the lyrics.


## One of the best methological approaches

Without any delays, we could deduce that it is good to give developers maximum freedom, allowing them to do everything that is not prohibited. 

Prohibit only a few critical things. In simple words, give them the *freedom of creativity*.

{:refdef: style="text-align: center;"}
![NOOO](/assets/images/no.gif)
{: refdef}

No, it is the worst method. The best approach is the opposite:

> Do not allow developers to do what is prohibited. Prohibit everything by default that might be prohibited (unless necessary).

---

The first approach already demonstrates sorrowful results. 
In most popular programming languages, we have almost complete freedom to do whatever the heck we want.

And this, basically, leads to an overwhelming amount of bugs in the industry overall (hey red-teamers, this is your bread :)

The thing is, for most of us, it is more interesting to quickly dive into frameworks and achieve programming results as soon as possible. 

Many of us are self-taught developers, and it's even more challenging to gain an interest in the fundamentals of programming and computer science this way.

We either don't find it at all or discover it too late when we already have a lot of experience with, emm... *"less-than-ideal"* programming practices, 
making it even more challenging to relearn.

Studying these things is worthwhile for quite objective reasons.


---

Okay, get back to "Freedom". 

The stronger the programming language in terms of the "strength" of the mathematical model embedded in it, the greater the "soundness" of that programming language.

The "soundness" is a kind of measure for the possibility of programs written in a programming language to fall into erroneous, invalid states. 
The more 'soundness' a language has, the lower this possibility.

Greater "soundness" in a programming language allows us more syntax-level control but may limit freedom by overrestricting even correct options, 
which "complete" type system should not do, but it is acceptable for the set of practical tasks. 

Languages like Java, C#, and TypeScript are not considered "soundness," even if they strive to be so. 

An example of a soundness language is Haskell.

---

The second approach we have talked about above is just not common. 

There aren't many websites coded in Haskell, yeah?

Implementing such an approach is hard, simply because of the fact we have already discussed: the prevalence and popularity of programming languages with complete freedom.

But the good news is that we have many methods that impose restrictions or rules on the process of programming and designing.

One such method is Bertrand Meyer's OOA/D approach, based on the concept of abstract data types. 
In this approach, every class is clearly and strictly defined as a representation of a concrete data structure with an explicit set of operations (interface), 
and any other operation not described in this set is prohibited.
This topic is a rabbit hole; I will try to write a series of posts about it someday. 


## How on earth do I suppose to write awesome code?

There is no formal academic answer.

We have a ton of books, write-ups, posts, and other kinds of papers that teach:

- How to code Tetris on Android.
- How to build high-load and disaster-tolerant systems.
- [Name a Tech] for dummies.
- How to become a good and beloved team lead.

And yada yada yada.

Comparing to this we have a very few amount of usefull material written about:

> "how to design a project code base so that developers will work with it easily, frealy and with pleasure. Even after 5 years."


{:refdef: style="text-align: center;"}
![Pulp](/assets/images/pulp.gif)
{: refdef}


The process of writing good code is not mysterious; it is a skill that can be learned, akin to learning Python or a some web framework. 

While the importance of simple code and clear system design is well-known to us, achieving these principles often eludes. 

Let's try to explore counterintuitive ideas about *what makes code bad* and, hopefully, gain some insights on how to combat these issues to elevate our programming skills. 

## 1. Debugging, logs, chains of checks.

It is quite a traditional thing for all of us - spend a dozen of time in debugger trying to find and fix a bug; filling up codebase with a lot of condition checks to
prevent erroneous states; orginize logs as good as posible in the whole system. 

Lets define this things as "*defensive programming*".

Long condition checks chains is comonnly appears in in functions. 

These chains are ensuring that some parameters are in correct bounds, or thar everything initialized correctly and so on.

In a well-designed software system, such problems are almost impossible. 

And It's not about porhibiting of pass negative values somhere they are not allowed; such restrictions are entirely fine. 

The issue lies in the fact that we as developers are mechanically "bolt on" these checks without having any understanding of the system's overall functioning, 
because we've come to expect such erroneous behavior.

These checks **do not** logically derive from the system's design; they are merely engineering safeguards at the lowest level "foolproof".

> When we are designing our APIs, types, and data structures, we are essentially choosing the **set of states** in which our program **can exist**. 

So, we should design **the set** which is exclude erroneous states. 

Thoroughly planning the type system of our project is particularly helpful in defining such the permissible set.

Defensive programming, simply implies that there is already something to defend against. 

Therefore, we sould not to intentionally hinder errors, but try hard to **Make errors impossible**.

## 2. Refactoring is Not Throwing Trash into a Junkyard.

Usually, we define refactoring as one of these activities:

- Moving code parts around, attempting to reorganize logic into separate methods or modules.
- An effort to clarify the peculiar behavior of a class, for example, by adding a new class (trying not to violate the OCP).

The idea is that such work resembles an "in-hurry" apartment cleaning, where we take things and throw them into the same box.

Almost always, in refactoring attempts, it is possible to simplify the code, but it requires much more thinking and in-depth analysis. 
We can identify the key concepts of our system and express them through a "direct" interface, instead of throwing code in a box.

Essentially, refactoring is akin to rewriting a text note. 
While rewriting, we are not changing punctuations and indents. 

Instead, we think about what we want to say precisely and express it in a new way, using different words to make the narration clearer.

> Moving things around, trying to decompose something is **Factorization**, whereas **Refactoring** is representing, expressing something **differently**.

## 3. Why Can't Some Project Decisions Be Reversed?

Imagine that an empowered world-illuminati-government decided to change the standard QWERTY keyboard layout entirely in one day after it had become widely adopted. 

The world would be set on fire. Yet, QWERTY has been in use since 1888; this layout was designed for typewriters.

The same logic applies to changing widely and long-used things, such as the USB interface or PDF document format. 
There is simply no easy way back, no straightforward method to force people to stop using it, and no way to break it drastically.

We can change the internal representation of our system as we like. However, its boundaries are similar to a USB connector. 

The code we write contains our assumptions and considerations about how to handle data effectively. 
These assumptions are essentially embedded in data structures, and our future code must handle them well.

Most users don't give a heck about USB internals — whether it's USB-2 or USB-3? They just want to plug in and do their things as usual.

The same is if clients use our software for 20 years, then we become dependent on decisions made two decades ago.

> The boundaries of our system, the interface, must be designed exceptionally and precisely well because we will have to live with it for a long time.

## 4. The quality of code (to a large extent) is not directly related to the code itself.


The first intuitive thing developers do when trying to understand a new project is to figure out "how the hell it is working." 

We read classes, methods, and functions line by line, attempting to comprehend *what* is happening. 
However, we get deep into *how* the states are flowing, *how* this logic works, etc. 

I have fallen into this trap many times, and it is usually overwhelming...

> Correct understanding, both in programming and in other engineering fields, lies in a person thinking about "**what is being done**" rather than "**how it is being done.**"

And, of course, it is not only about learning a new codebase; this is a generic rule of reasoning.

If as the first step we are thinking about good data structure (type), "clean code" will naturally follow them.

> "Bad programmers worry about the code. Good programmers worry about data structures and their relationships."  - Linus Torvalds


## 5. Getting stuck in the old design.

Do not touch it, because it is working.

Many programmers see their work as suffering, dealing with complicated monolith code globes. 
Attempting to complete tasks their either wirte new code, or replacing one module with onother.

And that all. Existing components are frequently does not pricesely implies what needed, so programmers working most of the time trying to "refactoring" them.
Never-enging madness of data transformations and chains of conditional statements.

The important thing here is to learn how to make structural changes to the codebase in a way that makes maintaining what you're doing straightforward. 
It's not easy at first, but I try my best to learn it, get used to thinking this way, and advise you to do the same. 

There's no doubt that it pays off later. The code and design become clear.


Yeah, I believe that in almost any project, if there is poor design, there is a possibility to improve it, which will make the code we write further beautiful and simple. 
If the chosen design constructs are not suitable for this, we **can** change them.

> We should not be afraid to make non-local changes to the project design. 

Of course, I understand how difficult it could be in some cases, but still, this is **not an excuse not to try**.

Make an effort now; suffer less later.

And, of course, we should not lose sanity in the process; such changes should not be turned into a rewrite of the system from scratch.

Yeah, I know that sometimes things are so bad that a rewrite is the only option. Say nothing, press F.


## 6. What makes bad tests bad?

Two main reasons for bad tests:

- Insufficiently checking that the code does what it should, which is quite obvious.
- Testing too many things. Redundant tests make it harder to understand their purpose and can potentially slow down delivery.

Tests essentially verify our expectations from the code, making them too specific. 
Expectations can change quickly and may be erroneous in themselves. 

Failure to understand these essential aspects leads to weak tests.

Some teams write tests to "cover 100% of the code", checking every line of code and all the details of program operation. 

However, consider this – do such tests always ensure that our interfaces perform as expected, meeting clients' expectations?

Understanding the system goes beyond blind code coverage with tests. 
It aligns with a fundamental principle of software engineering: thinking about the *meaning and purpose* of the program, which is different from the code itself.

> Don't just check that the code does what is directly written in it. Make sure that the code performs exactly as intended within the entire system.

## So what

All the points mentioned above might sound like simple and obvious meanings, but in reality, implementing these in our brains is not simple at all.

Embedding these and related engineering reasoning rules in our minds will act as a system for the formal verification of the code we are working with.

Unfortunately, we are still far from cyber implants, still cannot plug SMT solvers into our heads, so **learn hard**.
















 


