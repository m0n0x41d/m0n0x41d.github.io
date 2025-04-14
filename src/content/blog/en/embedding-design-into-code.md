---
title: Embedding Design Into Code
description: Project abstractions can be implemented in code, but not fully expressed only by it.
pubDate: 2024-10-14T00:00:00Z
language: 'en'
tags: [Software Design]
style: border
color: success
---

Overengineering can probably happen at almost any stage of design (or lack of design) and actual software development.

For example, when we’re implementing an entity and its methods, it’s far from guaranteed that all these methods will be small and elegant. And what’s more — they don’t always have to be.

Yet, when I see a function or method of 30-50 lines on my editor screen, I automatically ask myself: what can I factor out here?

### **Problems with Blind Faith in SRP**

In a method of this size, there are always smaller logical pieces (SRP), and they are always easy to spot, especially if the code was just written and we’re still in the context.

But should we always start breaking the method right away? Will we always benefit from this?

Well, if you manage to do such factoring quickly and elegantly, then yes, you’re definitely drawing logical boundaries in your code, but you’re also adding a certain level of redirection.

Blindly following SRP everywhere can lead to a lot of methods.

Even if we try to arrange them in some _“logical”_ and readable order, in the future, we (or other developers — pretty much the same thing) will likely have to scroll the code editor back and forth to figure out and remember what our methods do and when, following all the added redirection.

Of course, if we don’t do this factoring, we naturally end up in the opposite situation — keeping all our code in one method, we don’t get clearly defined logical boundaries but avoid an explosion of methods and nested calls.

To be more precise — we don’t get _as clearly defined_ boundaries that SRP creates when logic is localized. This does not mean that we can’t express them.
### **Embedded Design**

I once wrote that note called ["Bullshit Of Self-Documenting Code"](/en/blog/bullshit-of-self-documenting-code)

Sure, when all our methods and arguments are properly named, and we even follow popular style guides, the code becomes much more readable and better than some randomly obfuscated code full of single-letter identifiers and one-liners.

And yet, by using comments or language syntax features, we can mark logical boundaries in a method without splitting it according to SRP.

It’s simple, and it’s pretty cool. 
Especially in C-like languages with curly braces, where braces help group code within a function.

1. First, it’s regularly much clearer than any “self-documenting” tricks, and allow you to express more formality.
2. Second, almost all IDEs allow you to collapse such blocks of code marked by braces.


On top of that, these blocks can (and likely should) be marked with informative and expressive comments — awesome!

Using such an _embedded design_, we not only avoid blurring the logic across dozens of methods, but we also maintain a higher level of abstraction in our code, making it _observable_, as pieces of code alone do not reflect the design well.

> We are literally embedding concepts from the “Programming in the Large” level into “Programming in the Small” world. These are cognitive shortcuts you’ll thank yourself for later.

Moreover, by doing this work in advance, we prepare everything for _“physical”_ factoring. If we ever need it, doing so will be super easy because everything is already done, and we don’t need to think about how to do it!

Of course, embedded design shouldn’t be used as an excuse for boxing everything into one class and its methods. That’s criminal negligence, not embedded design.

### **Applicability in Non-C-like Languages**

What should we do with Python? There are no curly braces here, and if you suggest to your colleagues that team should start writing in [Bython](https://github.com/mathialo/bython), they might call *911*.

At first glance It seems we don’t have many options for applying embedded design in Python projects. We can either write clear comments for code blocks or declare logically related blocks as separate functions within a method and call them in the desired order at the end of the method. Okay.

I’d like to say the first option is better, but the second isn’t bad either. It’s probably just a matter of style and personal preference.

Python is still a programming language, and even though it "lacks" curly braces, we’re still writing the program text in _files_, and in most cases, we’re writing OOP code. We can fully follow the idea of embedded design.

It can be applied not only within the scope of a specific method but also at the level of organizing functions in files or methods in a class.

The essence is the same — we divide functions or methods into logical clusters, and those clusters are separated by expressive but *informative* comments.

However, at this level, it seems that not all such logical subcategories can always adequately reflect designed business processes.

Nevertheless, we still get the same advantages upfront — our classes or files, following the idea of embedded design, are not only cognitively friendly for our future selves or new colleagues, but they are also ready for further factoring, and may be even re-factoring transformations.
### **Conclusion**

Obviously, both approaches — SRP-based factoring and embedded design — have their pros and cons. But whats more important - these approaches are _qualitatively different_.

Of course, they’re not fully mutually exclusive, and choosing when to use each one depends entirely on the context (both - large and small) and your preferences.

Hopefully, you prefer cognitive efficiency over mental sufferin g.

