---
title: "Information Redundancy: Not Bad, Quite the Opposite"
description: More data representations for better.
pubDate: 2024-07-31T00:00:00Z
language: 'en'
tags: [Software Design]
style: border
color: warning
---

In the context of data models for some systems, * constraints* is a completely separate topic if we consider it as a distinct applied field of software engineering.

Regular programming and writing code, *programming in-small* is another area, for sure.

I’m not talking about the constraints imposed by a type systems, but about logical constraints, invariants that guarantee, or at least attempt to guarantee, the correctness of data in our system.

I believe that in every software project where we invest our time and effort, we always have two significant “default” goals. Achieving these goals will ensure we create good work.

- Our first goal is always to develop a system where incorrect states are impossible. It doesn’t matter whether we consciously formalize this goal or not (though it’s better to do so).
- Our second goal is to provide a good, convenient interface for both internal and external users of our products.

> I understand that it is a bit of a sophisticated topic, and we may consider other valuable ‘default’ goals, but these two are the best ones in the context of my musings today.

I think that one good way to move toward achieving this goal could be *information redundancy*.

---

Information redundancy is quite a broad mechanism that can be applied at different levels of the system, both in-small and in-large (kind of).

Let’s look at a few examples.

### Main ideas, I’ll try to explain

Imagine we need to develop some warehouse management system with Product, Storage Location, and Arrival Date.

How should we organize the data model? Let’s say we decided to represent it as a dictionary (hello, JSON).

The question is, what should be used as keys, and what as values?

We can either use product + location as the key or just product alone, depending on what’s more important — tracking the product’s location or its movement.

Using product as a key, we avoid the situation where the same product is listed in multiple locations simultaneously.

In the case of using product + location as the key, we prevent the possibility of double storage of the product in the same place.

> Let’s pretend this is a reasonable requirement.

If we need both constraints, regardless of which representation we choose, we’ll have to explicitly code it or use information redundancy.

Information redundancy here can be applied, for example, by using two dictionaries simultaneously.

Obviously, it’s important to consider the system’s efficiency: with a large volume of data, it’s crucial to optimize frequently performed queries. If we often need to find a product’s location, it’s more convenient to use it as a key for quick access. If we need to search for products by location, it’s better to choose location as the key and products as the values.

Using two dictionaries simultaneously can simplify the API but complicate data synchronization, so it’s important to find a balance between convenience and implementation complexity.

Of course, I understand that information redundancy is not a silver bullet, and it’s probably easy to end up with a system even worse than what we would have if we blindly followed mainstream OOP, imperative style, or whatever you choose.

Simply because synchronization and consistency of such different representations can be quite challenging to implement, we might end up with something like database transactions. But is that a bad thing?

An alternative approach could be to calculate one of the dictionaries on the fly, avoiding redundancy and automatically maintaining data integrity at the code level.

---

Thinking about information redundancy and data models is always useful at all stages of working on a system.

Ignoring the data model can mess things up *anywhere*, for example, in an OAuth authorization service, storing in a database something that could safely be encoded in a JWT token, avoiding unnecessary database queries when validating incoming tokens.

Just reminding you words of a Good Man Linus Torvalds:

> Bad programmers worry about the code. Good programmers worry about data structures and their relationships.

And the data model (or models if it is reaaaaally big and layered) of our system obviously consists of data structures and data flows, right?

Taking step back, in the in-large context, information redundancy can be considered in the context of organizing fault tolerance and the ability to roll back to certain “checkpoints” in processing, thinking of some data units in our *data flow* as free objects.

For example, let’s say we’re integrating with some email provider, living in an event-driven architecture with lots of microservices, one of which listens to events from the email provider, and if there are emails to respond to, another service processes these emails and their attachments, or the body of the email — it doesn’t matter.

Imagine the email provider, for some reason, doesn’t provide a proper API for re-fetching already retrieved emails, and something goes wrong in our processing.

Also, imagine for a moment that almost all of our business is tied to these client emails, and it’s crucial not to lose them.

Information redundancy can help here. Nothing stops us from storing these emails in our storage and re-fetching them from there if needed.

---

It wouldn’t be entirely correct to consider classic database replication and backups as examples of information redundancy in the context of *the idea* I’m discussing today.

But, for example, synchronous replication to speed up read queries (when only updates and inserts go to the master) can be seen as a suitable example because such information redundancy *simplifies and improves the interface*, which is one of the main goals.

### Conclusion

So, applying information redundancy as a method in our system will undoubtedly complicate the implementation. 

At the very least, we’ll have to worry a lot about ensuring synchronization and data relevance across all data structures. 

However, from the product’s perspective, its general quality, and the quality of the interface, information redundancy can have a very positive impact — both in terms of convenience, when we speed up/simplify data access, and in terms of reliability and correctness, when, thanks to information redundancy, we guarantee the required invariants and/or increase the overall reliability of our system.

Wdyt?

