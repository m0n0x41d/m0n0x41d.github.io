---
title: "Designing Effective REST APIs: A Comprehensive overview"
description: Some info about REST Apis and their development process.
pubDate: 2023-11-21T00:00:00Z
language: 'en'
tags: [System Design,  API]
style: border
color: secondary
---

## What is REST API?

REST API is, first of all, an API. An API stands for "application programming interface," serving as a layer of abstraction organized within a set of rules and tools. It enables one software system to communicate with another.

REST is a Representational State Transfer (REST) API, which operates upon the HTTP protocol. REST, as a web-app architectural style, consists of a ruleset for building web services that provide APIs. These services are referred to as "RESTful" if they follow the rules and limitations of REST.

REST APIs represent resources such as data, documents, and users, providing an interface for the manipulation of these resources. With the REST interface, resources are identified in requests using specific URIs, and the main operations on the resources are performed using simple HTTP methods like GET, POST, PUT, and DELETE. The response (state transfer) from the API generally contains data in formats like JSON or XML.

## Importance of Well-Designed APIs

As our API expands, complexity usually increases. More problems will arise if we do not follow good design guidelines and development best practices. Therefore, it is crucial to keep this in mind and think about our API architecture at the very first step of the development cycle for every system and subsystem.

This approach is called *API-first design*, signifying that the APIs are *designed* and *specified* first **before** any application coding begins. This represents a shift from the "traditional" approach where coding the application logic starts before or in tandem with API development.

# Part 1: Fundamentals of REST API

## Understanding REST Principles

Let's examine the REST constraints.

Apart from the obvious client-server architecture, we have the following:

1. **Stateless Communication:** Every request from a client to a server includes all the necessary information, and the server doesn't retain what the client asked for previously.

2. **Uniform Interface:** RESTful APIs should offer a consistent and uniform method of interaction, following standard conventions such as resource identification through URLs.

3. **Resource-Based:** Resources behind the API are identified by unique URLs and manipulated using standard HTTP methods.

4. **Representation:** Resources should have a form of representation (JSON, XML, etc.), and clients interact with these representations.

5. **Cacheability:** Responses are explicitly labeled as cacheable or non-cacheable to prevent clients from providing outdated or inappropriate data in response to subsequent requests.

6. **Layered System:** The architecture needs to be organized into layers, promoting scalability and flexibility.

## Key "Components" of REST Architecture

We build REST APIs under the HTTP protocol, so it's not surprising that most of these are just HTTP protocol elements:

- Resources: Yes, repeating again. Because they are **fundamental** API entities that should be kept in mind always.

- URI: A resource's address that should uniquely identify it, providing a means for clients to access and interact with resources.

- HTTP Methods: As we are working over HTTP, we use a set of standard methods that allow us to manipulate resources.

- Representation: The format in which a resource is presented. It can be in the form of JSON, XML, HTTP, or other standard formats, allowing clients to understand and interact with the resources in a unique way.

- Headers: Additional information sent with each HTTP request or response to provide details such as content type, caching instructions, and authentication.

- Status Codes: One more HTTP protocol-related staff - these are numeric codes returned in response to a client's request, indicating the success or failure of the operation.

- Media Types: Specify the format of the representation, such as application/json or application/xml, ensuring consistent communication between the client and server.

# Part 2: Planning Your REST API

## Defining Clear Objectives and Goals

It is essential to difine clear goals:

- Purpose Definition: Clearly defining the purpose of the API. Whether it's streamlining internal processes, enhancing user experience, or enabling third-party integrations, a well-defined purpose is crucial. **What** are we builind?

- Success Metrics: We need a measurable success metrics to evaluate the achievement of objectives. These metrics could include API usage statistics, user satisfaction surveys, or performance benchmarks (maybe we also can count money we earn ).

## Identifying API Use Cases

We should map different scenarios with contexts of utilizing our API. Understanding these processes will make it more clear how we will build. **Who** and going to use our API and **what for**?

A good example of questions to ask ourselves, after defining scenarios, are:

- Do we need to integrate with third-parties for function X?
- Do we need to collect and retrieve data for analytics?
- How are we going to facilitate communication between different software components? (This is a software design topic too, by the way)

To answer these questions, we need to explore our domain deeply and identify *specific functionalities* that our API will need to support for each use case. This step is crucial for designing the API well.

Also, all the use cases should be prioritized based on their significance in our domain and impact on both clients and our developers. Some features might be *really hard* to implement, but is this feature truly needed and *valuable* for our clients?

# Part 3: Resource Naming and Endpoint Design Conventions

## Importance of Consistent Resource Naming and Structuring

Resources should be grouped in meaningfully named layers, and each resource on its own should be named expressively. Weird and inconsistent naming approaches will lead only to confusion for our clients, spoiling their overall experience of using our API.

---

Layering or "Nesting" on endpoints is a neat way to express relationships between resources. For example consider a scenario where we have a resource for users and another for comments. Instead of having separate endpoints for each:

    /users
    /comments

we can nest the comments resource under the users resource to represent the relationship:

    /users
    /users/{user_id}/comments

## Best Practices for Resource Naming

Basically, we need to define a corporate document in the format of a Guideline for API development that will contain all the rules. Such documents should be publicly available for everyone to read, for example, as part of our API documentation. This way, both our internal development team and our clients will be able to refer to it.

Here is an example of most common, good rules for naming API resources are:

- Use simple, expressive and self-explanatory names, avoiding any jargon.
- Stay strict to an informative pattern, meaning avoid unnecessary fillers. It is almost always possible to name a resource with **one** word.
- Ensure consistency in naming conventions across all resources.
- Use plural nouns for resource names to represent collections (e.g., `/users` instead of `/user`) with exception for "sole instance" resource.
- Highly recommended to avoid using verbs and CRUD "names" in resource names; use HTTP methods and appropriate URI layering for actions instead.

# Part 4: Request and Response Formats

## Choosing the Right Data Formats (JSON, XML, etc.)

We should choose one data format for all communications between clients and the API. Moreover, the inner structure of the format should remain consistent and not lead to any assumptions for clients. In other words, the data format and its concrete representation (Data Structures) should follow some stadartized **rule-set** or **contract** for both Requests and Responses.

Frankly, even though XML and HTML formatted REST APIs still exist, the most common and de facto standard format is JSON. XML is pretty old and cumbersome, and almost all popular programming languages know how to handle JSON out of the box.

> Using JSON as your format, not forget to set response header `Content-Type: application/json` 😜

---

Such common things as *pagination* should also be implemented with a standard interface for every endpoint that supports it.

# Part 5: HTTP Status Codes and Error Handling

## Significance of HTTP Status Codes

We should always follow the HTTP protocol standard for status codes in responses made by our API. Because it is a *protocol*, right?

> Have you already noticed how we constantly talk about protocols and agreements in the context of APIs? This is not because I am a repetitive fool, but because it **matters**.

So, um... the best, and probably the only practice that should be considered as "best," is to stick to the HTTP standard for status codes.

| STATUS CODE RANGE | MEANING                                      |
|-------------------|----------------------------------------------|
| 100 – 199         | Informational Responses. |
| 300 – 399         | Redirects. The most common is 301, meaning "Moved permanently." |
| 400 – 499         | Client-side errors. 400, 401, and 404 are probably the most common. |
| 500 – 599         | Server-side errors. For example, 500 means an internal server error. |

Take a look at [mdn web docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) for more info.

We should select all the codes we are going to use in our API and document them in the guidelines.

## Consistent and Informative Error Responses

We need to craft error responses consistently (yes, they also need to be standardized for all endpoints) and informatively to assist our users in understanding and resolving issues effectively.


# Part 8: Security Considerations

## Securing Your API with Authentication
It is crucial to protect **all** our API endpoints with authentication mechanisms. The most common authentication mechanism is HTTP Basic Authentication, **which should never be used** due to its weaknesses and vulnerabilities.

Instead of basic auth, we should use well-known methods such as OAuth and JWT.

The only endpoints that might lack authentication are the OAuth service endpoints, providing functionalities for authentication token operations.

---

One more really important rule that should always be in the minds of developers: we should never expose any sensitive user information in public endpoints. As for endpoints themselves, we should never expose our *internal* endpoints, which might be used for communication between different components of our system. Sensitive information might also be exposed by incorrect handling of authentication errors. Our API should not provide any tips for cybercriminals.

## SSL/TLS Implementation for Data Encryption

Not much to say here – All endpoints should be accessible only via HTTPS and TLS 1.2+ to ensure secure data transmission over the network. This helps protect sensitive information from potential eavesdropping and unauthorized access. Always prioritize the use of secure protocols to maintain the integrity and confidentiality of data exchanged through the API.

## Vulnerability Awareness

Such things as [OWASP API Security Top 10](https://owasp.org/www-project-api-security/) and other security checklists should be a table-on bible for the API platform development team.

# Part 9: Documentation

No one likes quests when working with an API. No one will thank us if our documentation is bad or, even worse, does not exist. It is crucial to provide, support, and update documentation for our API from its very inception and throughout the entire development cycle.

API Documentation usually consist of:

- Clearly defined endpoints with detailed descriptions;
- Illustrative examples of requests and responses for each endpoint;
- A categorized list of error messages accompanied by their corresponding status codes;
- Concise explanations of the purpose and expected behavior of each endpoint;
- Optionally, a comprehensive user guide offering usage implementation examples in various programming languages.

---

In addition to public documentation for our clients, we **definitely** need internal documentation that includes all formal specifications. Architectural Decision Records (ADRs) made during the project lifecycle should also be documented in the API documentation.


## Tools for Generating API Documentation

There are a lot of tools for generating API docs.

- Swagger/OpenAPI: Swagger is a widely-used framework for designing, building, and documenting RESTful APIs. It allows you to define your API in a standard way, and its tools can generate interactive documentation.

- Postman: While primarily known as an API testing tool, Postman also provides features for generating and sharing API documentation. You can create documentation directly from your Postman collections.

- API Blueprint: This is a Markdown-based language for documenting APIs. It's easy to read and write, and there are tools available that can turn API Blueprint into HTML documentation. *Apiary* is an example of an instrument that utilizes API Blueprint for designing, prototyping, documenting, and testing APIs.

- ReDoc: If you already have an OpenAPI definition, Redoc can generate beautiful and interactive API documentation. It focuses on simplicity and performance.

- RAML (RESTful API Modeling Language): Similar to Swagger, RAML allows you to describe practically everything about your API.

Personally, I use only the first two.


# Part 10: Versioning Strategies

## Managing API Versions Effectively
This is a very huge topic that definitely, on its own, might be represented as separate blog posts.

First of all, it is quite hard to avoid having multiple versions of your API. There is an almost endless cycle of new features appearing, and it happens that such features make breaking changes in our API contract.

If we have clients that use the current version and don't want to update because they don't need new features, we have no choice but to support these old versions along with the new one.

For startups, this might be even more painful because they have to adapt and rapidly change to reflect market requirements.

---

## General API Versioning Approaches

There are different approaches to deal with API versioning. Lets look an each of them briefly.

### Versioning through URI Path
Adding /v*/ prefix to all routes and duplicate routes with changes *in code*. This is a very common approach and it is too easy to implement. However, having several versions such way with compicated changes between them will lead one way to development and maintenance hell.

### Versioning throught custom headers or... query params
Trying to avoide "in code" mess we might choice another approach with copying routers codebasy and changing these new direcorties, with routing to specific versions, for example, by our custom header with version number. This will be hell too. With such several versions we are ending up with highly coupled and complicated codebase for every versioned service.

### Versioning through infrastructure duplication
Just deploy versions separetely. This is stable and easy-to-implement, but very expensive approach. Imagine that your API consists of 30 microservices and several infrastructure componenes. All such environment should be duplicated as separate kubernetes namespase or even... cluster? It still might me okay to use this approach for relatively small APIs with several versions. But what if this API will grow A LOT?

### Versioning without versioning
GraphQL creators say:
> GraphQL only returns the data that’s explicitly requested, so new capabilities can be added via new types and new fields on those types without creating a breaking change. This has led to a common practice of always avoiding breaking changes and serving a versionless API.

Yet, we are talking about REST Apis here.

## Versioning from a Software Architecture Point of View


Basically, API versioning might be implemented in three different ways in code, depending on which 'part' is attempted to be versioned from the [MVC](https://developer.mozilla.org/en-US/docs/Glossary/MVC) pattern 'point of view'.


1) **Proxy, forwarding requests to a specific version codebase:**
   It gains flexibility for making changes to an API between versions. This is the case with code-base duplication I have mentioned above. So, yeah, it requires keeping and maintaining a lot of old code. Data migrations may also become difficult, but this is a big red flag because, in my opinion, we should version the API interface and not the data model.

2) **Router with versioned controllers:**
   This approach makes it possible to share the data model, preventing code duplication and saving time by changing only the versions of controllers and relevant code parts. But it still gives us the high risk of accidentally breaking old API versions because even though the codebase is not duplicated, it easily becomes complicated. With this approach, as much test coverage as possible with good, reliable tests is required for our mental health.

3) **A router that shares controllers but has versioned views:**
   This way is very close to the previous one but focuses on versioning the views rather than the controller. This approach allows us to inherit code from past API versions, avoiding code duplication, but this also complicates the ability to fix something easily in subsequent versions only. To address this, meticulous planning of every change and version is essential. Also, we need to ensure a clear separation of different layers from the beginning, including models, resources, and their representations.

Usually, all implementations of these approaches are project-related and proprietary. You can read more about such solutions in articles from [LinkedIn](https://engineering.linkedin.com/blog/2022/-under-the-hood--how-we-built-api-versioning-for-linkedin-market), [Intercom](https://www.intercom.com/blog/api-versioning/), and [Stripe](https://stripe.com/blog/api-versioning).


# Conclusion

A well-designed API definitely requires an API-first approach with clear objectives and strict formal specifications. Security measures, documentation, and versioning strategies are crucial components for creating sustainable, maintainable, and easy-to-evolve REST APIs with continuous improvement in API design.
