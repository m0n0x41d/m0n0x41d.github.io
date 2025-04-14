---
title: Serious talks about API Versioning
description: Closer look on the theory of REST API versioning.
pubDate: 2023-11-28T00:00:00Z
language: 'en'
tags: [System Design,  API]
style: border
color: info
---


Oh, hello there! Last time we were talking about REST API in general, and we also covered the main bullet points that should be kept in mind while developing REST APIs.


This time I want to talk about one of these points, which, in my opinion, is the most interesting and potentially painful from an architectural point of view. And this is - API Versioning.

## Why bother at all?

Versioning... why should we even bother about it? We could just support one version for the whole project lifecycle and live with it.

No, unfortunately, **we don't**. This is almost a miraculous case, where some team will initially design and create such a robust, feature-filled, and stable API that will never require making breaking changes in the API contract.

Everything is impermanent; this is a Noble Truth. So are the "wide" and "industrial" REST APIs, which constantly evolve and adapt to world changes, fixing bugs (carbon humanoid life forms making mistakes, this is also the truth 😅), delivering new features drastically wanted by customers, and so on.

The only APIs that might be just coded and never updated are small and simple interfaces that nobody uses, or which deliver such simple functions that can stay the same over decades. Even if changes are needed, they could be easily fixed or quickly rewritten from scratch without contract violations.

So, we are talking about serious APIs here. Right after such API is deployed and introduced to customers, it is only safe to add completely new functionalities, simply because adding new features does not break the contract but only extends it. We can't change anything in the existing API interface because it is in use, and any breaking change will literally break integrations. This is not an option at all.

Making some breaking changes in our API is simply inevitable. It is a matter of time and a matter of money that's at stake.

> API Versioning is inevitable.

{:refdef: style="text-align: center;"}
![Sound of inevitability](/assets/images/inevitability.gif)
{: refdef}

## How to Version APIs?

In the previous post, we briefly covered the main versioning approaches from the "interface side" and the software architectural side.

Versioning from the "interface side" is about the way for API users to pick or identify the exact versions of API where their requests should be delivered. Let's recall these approaches.

**Include versions in the URI**:

```
https://myawesomecompany.it/v1/*
https://myawesomecompany.it/v2/*
and so on
```

It is an easy, straightforward way of deciding where to route client requests. Just by parsing the URI, we can route every request to a specific code version.

**Set version in the custom header or query parameters**:

It is as simple as it sounds – we kindly ~~*forcing*~~ ask our users to include a specific header, for example, `X-API-VERSION`, in every request they make to our API. The same might be achieved with a query parameter. The content of such a header/parameter could be anything; usually, it is a date stamp or a version number.

**Versioned Media Types**:

One can leverage the content negotiation mechanism of the HTTP protocol by defining versioned media types. This allows the client and server to set the version through the `Accept` and `Content-Type` headers, respectively.

---

Today, I want to talk more about the architectural side of versioning implementation.

Generally, API versioning approaches from the code perspective might be assorted by the layer of the MVC pattern, which is tried to be abstracted and versioned.

## MVC Pattern

The Model-View-Controller (MVC) pattern is a software architectural design approach that separates an application into three connected components (which might consist or not consist of separate modules; this is a matter of codebase organization):

- the Model;
- the View;
- and the Controller.

This pattern is quite a mainstream way in web development (and related fields) of designing user interfaces and providing a systematic way to organize code, enhance modularity, and promote maintainability (at least this is the idea).

*Usually*, in the MVC pattern, the **Model** represents the application's data and business logic. It encapsulates the core functionality and is responsible for *managing data*, processing user inputs, and responding to requests from the View or Controller.

The **View** is responsible for representing the data to the user and describing the user interface. It remains independent of the application's logic and communicates with the Model to retrieve data for this representation.

The **Controller** is the "thing" that acts as the mediator, ruling between the Model and the View. The Controller receives input data from the View; then, some middleware processing (logic of "converting" requests) happens, and requests are passed to the Model.

Responses from the Model are then sent back to the View via the Controller. The model state can be altered here, reflecting the context of the ongoing processing, or not, if it is just a regular reading operation.

It's much easier to say that the *updated Model triggers changes in the View via Controller*.

By separating system parts in such a manner, the MVC pattern enhances code organization, making it easier to understand, modify, and maintain. It also might improve collaboration flow among developers because, *ideally*, each component can be developed independently, promoting a more modular and scalable architecture.

In practice, logic parts might be shifted across the components; for example, the Model might only contain ORM-related things, and all the logic of "talking" between View and Model is encapsulated into the Controller. In other words, MVC is not a "protocol" but just an abstract guideline for modular components organization.

## Versioning proxy; model and "all the things" versioning

This is the easiest way from the point of effort, but it requires a lot of duplications in the codebase. It is as simple as a *phonk*; we are just copying code as a new version, making all the changes we need, and proxying requests, using one of the methods mentioned earlier, like a custom header, for example.

It might be really funky to feel free and able to start every next version "from a clean page," changing not only the code but even the architecture however we want.

But... we will need to support and maintain every copy of the code, and we might even have to pay for every version's infrastructure if versions are deployed separately. I hope that all teams who choice this way of versioning are supporting only few versions.

The most interesting thought here is that with such fundamental versioning, if we are changing architecture or data model, we are already versioning not just the API but our app overall.

## Unified router, passing requests to versioned controllers

If we make the good decision not to version data, so our model layer will stay the same across versions, we might reuse its code between versions and version *controllers*, introducing different business logic in new versions (we may also version representation here if needed, and we will most likely **need**).

Yet, the unchanged parts of logic in upcoming versions ("in-use" parts) still should be duplicated because we just can't throw out things needed by clients. Even when migrating to the new versions, they should have a consistent experience with a supported feature-set.

Such an approach will work only without tight coupling between the model and controller "levels."

Even if this way of versioning might look more reliable and better than the first one, it conceals a lot of, how to say it... "opportunities" to badly break one version while trying to change something in a different one.

The more versions we are supporting in such a manner, the more complex and more easily to break such a system becomes.

Almost every change in one version will require some refactoring or even a crutch in previous versions. This might be a big issue because we are not able to quickly release new features without the fear of breaking something. 100% test coverage might help here, but nothing will help maintainers of such versioning to stay young and fresh-looking again.

I am joking. Am I?..

## Versioned Representations & Shared Controllers All Served via One Router

This is probably the most complex to implement but most exciting and painless way for maintaining a **lot** of API versions.

Data model and controllers *mostly* remain the same across all versions; here, we are going to version the *representation layer*.

Basically, this is the only way to support a huge number of versions. It will work fine with 5, 10, 20 (???) versions, while the first and second approaches will become a nightmare right after 2-4 versions.

It is a tricky thing to implement, and every company choosing this approach implements it in their own way. But in abstract, views versioning is achieved by implementing an **additional layer**, which is responsible for *building* appropriate responses for the "requested versions" from the API data. It is additional layer, because business logic remains *unversioned* too, remember?

Look cool, right? Such a relief, when we are not needed to tinkering and refactoring a dozen of duplicate codebases for every sneeze.

---

As I mentioned already, this architectural versioning solution might be implemented differently, but the overall approach has two significant subtypes.

1. **Duplication-based response building:**

This method involves creating a new request/response *builder* for each API version, handling altered API routes or migrating user requests to the latest version. While it is simpler to implement, it lacks scalability.

Updating values in all such builders requires careful manual checking, so yeah, mistakes here can still break things badly.

Also, supporting more than a dozen versions, even in such a way becomes challenging. Some additional automation could help here, for example, by using a *template builder* from the latest version and specifying only differences in child builders.

However, defining all the changes between builders and handling differences in API routes will eventually require the development of some Domain-Specific Language to be viable further.

2. **Migration-based response building:**

Basically, it is an initially automated version of the duplication-based approach, and this method minimizes duplication drastically compared to all the other approaches.

We are not waiting for pain to come from the first approach to implement Domain-Specific Language; no, we are starting by developing it in the first place.

With this DSL, we are able to:
- define *schemas migrations* for changes in requests and responses;
- define *"compatibility gates"* for data "migration" aligned with schema changes;
- define *routes migrations* for modifying, deleting, or even adding routes.


## Acknowledgment to Source, Instead of a Conclusion

Migration-based response building is the method of API versioning used and implemented by such big tech companies as LinkedIn and Stripe. Unfortunately, us mortals do not have access to the codebases of their solutions, and there are no open-source solutions for such a problem.

Or is it out there already, at least for FastAPI?


{:refdef: style="text-align: center;"}
![Sound of inevitability](/assets/images/wow.gif)
{: refdef}

---

The main source of inspiration for this post is the documentation of the incredible open-source project for FastAPI-based APIs versioning named - [Cadwyn](https://docs.cadwyn.dev/). It was born recently, but it is ready to use, not fearing to say - production-ready.

Many thanks to [Stanislav Zmiev](https://github.com/zmievsa), the creator, and maintainer of Cadwyn, for consulting and guiding on the challenging topic of API Versioning.