---
title: General Techniques for Documenting Systems
description: A look at the practices we have in software engineering that help express and understand the system arch.
pubDate: 2023-11-09T00:00:00Z
language: 'en'
tags: [Software Design]
style: border
color: primary
---

Hello, friends. I've written about levels of reasoning about software systems several times before in blog posts. For example, you can find one of my discussions [here](/blog/Levels-of-reasoning-about-software). The conclusion drawn was that the most challenging and valuable layer of reasoning is the third layer - Specification.

However, specifications are something that is closer to "code," even if they are more abstract and higher-level than the concrete implementation. This aspect doesn't assist us in gaining a comprehensive understanding of the overall system.


What can assist with this? Probably, good documentation, diagrams, and all the architecture-related materials. Please, don't roll your eyes; there's no such mythical thing as [self-documented code](/blog/Bullshit-of-self-documenting-code). It simply doesn't work that way.

Let's take a basic look today at the practices we have in software engineering that help express and understand the system.

## Good old diagrams

The first thing comes up from the topic is UML. This is a standard modeling language for specifying and visualizing software systems. UML is a bit old (created in the 90s), but it is still thrive well, and eventuale becomes a standard to providing us an abbility to make good architecture blueprints.

While UML is comprehensive, it advocates for a flexible approach where architects can choose which diagrams and symbols to use as needed. The key benefit is consistency - anyone familiar with UML can understand diagrams designed by others.

Of course, to be able to describe architecture with UML, you should... well... design some. And here, OOA/D comes into play. I will try to cover OOA/D in the upcoming posts because it is a pretty tough topic.

But, if you are feel eager to learn I've just found a great book written by Craig Larman, just google it – `Applying UML and Patterns`.

---

The other thing is ERD, which stands for 'Entity Relation Diagram.' It represents the relationships between data 'entities' within the system. ERDs typically express and reflect database design, making them common tools used in database modeling.

ERD diagrams not only show relations between entities but also include attributes associated with each entity, displayed inside the respective rectangles.

There are a dozen of tools that will help you to create UML and ERD diagrams.

## ADR

Architecture Decision Records serve as a way to document important decisions made during agile software projects life cycle. Each ADR explains the decision's context, including technical and project-related factors, and outlines the decision itself along with its consequences.

ADRs are typically stored in a simple text format like Markdown, often within the project repository or other organizational documents.

This approach ensures that the reasons behind past decisions remain visible, preventing hasty or uninformed changes. Taking time to understand decisions is crucial, as rushing can lead to architectural mistakes that are difficult, if not impossible, to rectify.

Furthermore, capturing ADRs aids new team members in understanding the system's architecture rationale. Additionally, it facilitates future rearchitecting efforts by documenting long-term intentions, making it easier for the team to build upon existing decisions when making future architectural changes.

## DDD

Domain-driven design (DDD) is a software design method that focus the development process and reasoning around modeling a complex *domain* or business.

It aims to create software that closely matches how an organization operates by clearly separating domain logic from application services and infrastructure concerns.

The first step in DDD is *strategic design*, where developers work with business experts to map out the *subdomains*, which are, basically just a subject areas making up the *domain*. This includes identifying bounded contexts where different subdomains may use different language to describe similar concepts.

Once subdomains are identified, developers model the domain objects within each corresponding context. *Entities* there are objects that represent real-world things with unique identities, while *value objects* are attributes without identity.

The next term is *Aggregates group*, which are term for relations betven entities and value objects.
An aggregate serves as a transactional boundary, meaning any changes made to it must be either committed or rolled back in a single database transaction. This ensures that the aggregate remains in a consistent state at all times. The aggregate is also tasked with upholding business invariants, which are fundamental rules that consistently hold true within the system, regardless of the actions performed.

## Event-modeling

Event modeling is one more visualisation approach for reasoning about the system. It is an effective way to design information systems by carefully mapping out events or facts that happen within a system over time. It uses a visual "blueprint" to display events chronologically on a timeline and includes user interfaces or "views" of the system's data.

This approach not only organizes events in order but also shows how users can give commands to change the system and how the system provides updated data through views. By detailing events, inputs, and outputs, event modeling creates a clear system specification, serving as a solid foundation for implementation.

What makes event modeling stand out is its simplicity and collaborative nature. It uses just three main components - events, commands, and views - and four diagram patterns, making it versatile and effective for system design.

---

## Conclusion

In summary, comprehensive system documentation through tools like UML diagrams, ADRs, DDD, and Event Modeling is essential for successful software projects. These methods provide clear visual representations, capture architectural decisions, align software with business domains, and model event-driven systems. By utilizing these techniques, teams enhance communication, foster collaboration, and ensure the long-term success and maintainability of their projects. Yet, this is not a silver bullet and loose of time, if we don't take the time and effort for OOA/D in the very beginning of the project and subsystems designs.
