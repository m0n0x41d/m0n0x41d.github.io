---
title: The global state is not a Monster
description: Every public voice of IT keeps saying that the global stat is bad thing. It is far from being true.
pubDate: 2024-11-02T00:00:00Z
language: 'en'
tags: [Software Design]
style: border
color: danger
---

Of course, functional programming differs significantly from imperative programming, but if I had to pinpoint the real thorn in the side, in which concept it differs mostly, especially from a design angle — I’d say it’s about the *local state.*

Almost every situation where we experience challenges in scalability, maintainability, system clarity, or even versioning can usually be traced back to some kind of local state holding us back.

And it doesn’t matter through what thing that state is expressed — whether as an explicit state in objects or an implicit state in callbacks, closures, or queues — it tends to bring about the same issues.

In other words, I’m talking about any state directly embedded within a component or module of a system. And I’m saying “component or module” because even in a poorly distributed system, it’s still possible to spread state across parts (no limit to what can be screwed up), and it remains *conceptually local*, embedded within a specific distributed system even if not a single component. What a mess.

The problem lies in the very nature of the local state. This state cannot be recalculated cheaply and transparently, like immutable live values, and it’s almost always inaccessible to external entities that could otherwise control or coordinate it — it’s _semantically encapsulated_.

I could pretty much stop here — the problem is what it is, and nearly all mainstream imperative and OOP coding and “engineering” in various degrees revolve around local states one way or another, with every voice proclaiming, *“Global state is bad! You’ll get race conditions, and it’ll be a nightmare! Or even worse...”* Yada yada yada. We know that.

But hang on — aren’t data stored in data storages, which can potentially be accessed by various system components, essentially a form of _global state_?

### **Here comes another counterintuitive twist**

> Ivan, are you trying to suggest we use global states?


Well, yeah... And Nope. First and foremost, I’m suggesting, to myself and you, that we at least start thinking in terms of global states.

Thinking about data structures and the *nature of the state* is a step in the right direction. Probably not obvious, but it's a natural step toward the functional paradigm.

This doesn’t mean switching to purely functional languages or writing every variable to disk (or to a database, for example, lol) — that’s almost always a step toward something impractical.

And for sure, it’s difficult to imagine a situation where we could completely or mostly eliminate auxiliary variables in code. No one is asking to do so.

But if we don’t start asking, “Is the state stored in variable X crucial in the context of the system/subsystem?” we’ll never ask the next question, “How can we make this crucial state into some global format?”

### **But why even ask it? What’s the point?**

To make code cleaner, simpler, and better. Fewer local states mean more inherent “mathematical” and functional quality. This makes it easier to expand, support, update, and so on.

And the beauty of it all is that you don’t have to go all-in on functional programming, which, while allowing you to model state mathematically, will likely make the system less convenient in engineering terms than one that _adopts a functional paradigm_.

The global, external state *can be safe* and properly configured — the only question is whether we’re mixing it with parallelism and how well we’ve ensured its safety and consistency.

Some simple, yet solid examples of global states that come to mind:

- Configuration files rather than dynamically obtained configurations via any user or system interface.
- The beloved Redis — surely you realize it can be used for more than just caching?
- ConfigMaps in Kubernetes—a great example that allows seamless rollouts with new inputs.
- Apache Kafka — a point in the holy war on distributed systems that I don’t want to get into, but I had to mention it.
- Event Sourcing and free objects. I think I’ve written about this before but didn’t fully understand it was also about externalizing state, even though it was obvious.
- Oh, and Blockchain!—not about crypto scams, payments, and all that cool dApp stuff. It’s, first and foremost, a storage for global states! And immutable ones.

### **Where’s the balance, then?**

Let me repeat: the global state is _not inherently bad_, yet it might be extremely difficult to cook it nice and safe, especially mixed with parallelism. 

Understanding and managing the state isn’t just an academic or theoretical exercise; it’s truly a key factor in building reliable, flexible, and scalable systems.

Although most developers are familiar with the local state, misusing or over-relying on it can lead to various issues, including increased complexity, reduced transparency, and challenges in maintaining consistency and scalability.

Besides the mainstream in the wild world of IT, there’s a huge ecosystem of Erlang/OTP and technologies like NATS and MQTP. All of these also revolve around global states and managing them.

And have you heard about [durable objects](https://developers.cloudflare.com/durable-objects/) in Cloudflare with their super cool SQLite implementation? Does not it smell of conceptually *global* states? 🤔

---

I am not delusional and fully understand that the global state isn’t a magic wand or a silver bullet. It requires a thoughtful approach and likely a high level of expertise. But it’s essential to recognize that a well-designed global state is not only possible but opens up some truly fantastic engineering solutions.

The local state certainly has its value, and it isn’t going away — some data is more conveniently stored locally, especially when it’s temporary or specific to certain parts of a system. Some systems are simple enough, with no significant growth potential, where the complexity of properly implemented global states would be entirely unreasonable.

However, where interaction, consistency, and scalability are needed, the global state can provide the flexibility to structure a system more robustly.

This flexibility is key. 

By carefully balancing state localization and globalization, you can design an architecture that responds effectively and efficiently to the domain's challenges

A well-designed global state is not just a possibility but a significant step forward in creating engineering elegance.
