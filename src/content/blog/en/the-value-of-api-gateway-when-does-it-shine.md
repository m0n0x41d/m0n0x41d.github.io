---
title: "The Value of API Gateway: When Does It Shine?"
description: When to utilize an API Gateway, understand the features and values it provides, and determine situations where it may not be necessary.
pubDate: 2023-11-15T00:00:00Z
language: 'en'
tags: [System Design, Tools]
style: border
color: warning
---

# The Value of API Gateway: When Does It Shine?

In the contemporary landscape, an API Gateway plays a pivotal role in the design of distributed systems involving multiple API services or microservices. Lets delve into concept of an API Gateway, see what it is and when/why we might need one.

An API Gateway serves as the primary entry point into an application from the external world, taking charge of critical functions such as request routing, API composition, authentication, etc.

So, basically, it is one more level of abstraction enveloping the internal architecture and presenting a unified API to clients. Every external API request traverses the API Gateway initially, which then redirects to the appropriate upstream business service.

Now, let's delve into the functionality of the API Gateway.

## What is API Gateway do?

The process begins when a client sends an HTTP request to the API Gateway, which meticulously examines and verifies attributes embedded in the request. The gateway then conducts allow-list and deny-list checks to ensure the request's legitimacy. If an identity provider is part of the architecture, the API Gateway communicates to establish the client's credentials for authorization and authentication.

Following these checks, rate limiting rules are enforced, rejecting requests that exceed predefined limits. Once the requests pass these preliminary checks, the API Gateway identifies the relevant service for routing through path matching. It may also transform the request into the appropriate protocol before dispatching it to backend microservices.

A notable feature of API Gateways is their proficiency in error handling and fault resolution, particularly in scenarios where error recovery takes an extended period (circuit break). This proficiency makes them a robust tool for ensuring the reliability and resilience of a system.

## Why might an API Gateway be necessary in theory?

Microservices APIs typically provide detailed and specific functionalities, but their granularity may not align precisely with what a client needs. While microservices offer precise APIs, interacting with them can become cumbersome for clients, involving communication with multiple services.

This is where the API gateway plays a crucial role, transforming the game by providing a unified entry point for all clients, simplifying their experience. It is most common use case, by the way.

However, it's important to note that an API gateway is not merely a dummy proxy. It serves as a strategic intermediary, streamlining interactions, enhancing manageability, and ensuring a more efficient and cohesive experience for clients.

But firstly, we need to understand the **theoretical** pros and cons of API Gateways, assessing whether we actually need them.

### Pros

1. **Encapsulation of API Internal Structure:** One, already mentioned advantage is the API Gateway's ability to encapsulate the internal structure of an API. This encapsulation shields the intricacies of the backend, presenting a cleaner and more straightforward interface to clients.

2. **Centralized API View:** The API Gateway offers a centralized view of the entire API. This centralized perspective simplifies the management and orchestration of diverse microservices, providing a unified entry point for clients.

3. **Simplified Client Code:** By serving as a intermediary between clients and backend services, the API Gateway contributes to the simplification of client-side code. Clients interact with a single entry point, abstracting away the complexities of multiple service interactions.

4. **Comprehensive Monitoring and Analytics:** The API Gateway comes equipped with essential features such as monitoring, analytics, and tracing. These functionalities enable organizations to gather valuable insights into API usage, performance, and potential issues.

### Cons

While the advantages are significant, it's essential to be mindful of potential drawbacks associated with API Gateways:

1. **Potential Single Point of Failure:** The centralization of API traffic through the gateway introduces the risk of a single point of failure. If the gateway encounters issues, it may disrupt the entire communication flow between clients and services.

2. **Performance Impact:** Depending on various factors, including configuration and scale, an API Gateway might impact overall system performance. It is crucial to carefully assess and optimize the gateway to avoid performance bottlenecks. Also, in scenarios where the API Gateway is not scaled properly, it can become a bottleneck, hindering the system's ability to efficiently handle increased traffic and load.

3. **Challenging Configuration:** Configuring an API Gateway can pose challenges, especially in complex environments. Ensuring the proper setup and configuration demands a nuanced understanding of the system architecture and requirements.

If you're sure that your project really needs an API Gateway, it's time to move on and pick a solution.

### Gateway Features

When choosing an API Gateway for our system, we should consider the most valuable features among the following:

1. Authentication and Authorization
2. Security (WAF)
3. Logging and Tracing
4. Service Discovery
5. Load Balancing
6. Retry and Circuit Breaking
7. Reverse/Transparent Proxy
8. Caching
9.  API Composition
10. Rate Limiting and Throttling
11. Versioning
12. Routing
13. IP Whitelisting or Blacklisting

And probably, it's also about the price, especially if it is not an open-source project that will provide you with all the features you need. There are many API Gateway products in the field, but it seems that the most popular ones are Kong, Apigee, Amazon, and Azure API Gateways.

All above is just a set of typical features that API gateways provide or can provide, but we need to clearly understand what exactly we need in order to decide on a specific solution.

Now, let's examine and discuss the most important functions and topics of the API gateway separately.

### Authentication

The presence of a centralized solution for authenticating requests allows microservices behind the gateway to completely offload this responsibility. Thus, in the case of a well-designed internal architecture of our system, microservices do not need to integrate with other services to implement authentication. If not, either you have a very complex architecture with different user authorization and authentication methods/levels, or... issues with design. However, in most basic cases, this aspect can be entirely entrusted to the responsibility of the API Gateway.

If a service-oriented model is used for authentication, each request undergoes a simple check - "is this request allowed to go to the service it wants to reach?" Another option is a certain client authentication, where, in addition to checking access based on the service model, the token passed by the client in the request is also verified.

### Logging

Here it gets a bit more complicated. According to some logging standard (assuming such a standard exists), these logs are stored somewhere (usually in multiple systems) for various purposes. These logs can be used for analytics and statistics, incident analysis, debugging, and so on.

### Tracing

This is a very important function that is quite often overlooked. In the most primitive case, tracing is necessary for debugging incidents. Imagine a vast system, for example, with dozens of gateways and several hundred services. Without tracing, it would be extremely difficult, if not impossible, to thoroughly understand and reconstruct the chain of events, tracing the entire path of a specific request.

There's another crucial aspect of tracing - it helps address the issue of cycle requests by implementing a cycle breaker, for example, by limiting the number of hops for each request.

### Transparent Proxy

An important function that developers of many proxy solutions often overlook.

Why is it needed? If we have some proxy (which, in our case, is also an API Gateway) communicating with a backend, such as a database, for example. Without a transparent proxy, we would always receive the local IP address of our gateway in the backend. This can be inconvenient during debugging if we need to know the actual addresses of clients.

Of course, this can be emulated using the Proxy Protocol for TCP/UDP and X-Forwarded-For for HTTP, or even by adding the client's address to the payload of the internal protocol.

### Web Application Firewall

The primary task of this technology is the continuous analysis of requests passing through the API Gateway to identify traffic from malicious actors. WAF filters and blocks such traffic by analyzing request data for attempts to exploit common web application security vulnerabilities, such as cross-site scripting (XSS), SQL injection, and other malicious activities. It operates based on predefined security rules (policies).

The main distinction of this solution from hardware solutions is that it is usually much more cost-effective, and software solutions evolve much more quickly.

### Quotas

This is a mechanism for limiting the number of requests to specific services behind the API Gateway based on a set of policies and rules.

Additionally, thanks to quotas, it's possible to block or slow down requests that exceed a certain limit (for example, if we plan to monetize the API, and a user has reached their limit).

Of course, this mechanism can also act as protection against DDoS attacks. It's better to deny service to a few clients and investigate the incident than to deal with the collapse of the entire system.

### Service Discovery

The main idea here is to have control over services and infrastructure in general. Service Discovery enables automatic identification and management of service availability from the gateway side. The larger the system, the more desirable it is to have service discovery. In fact, it's better to have it than not to; Service Discovery allows the gateway to dynamically adapt to changes in the infrastructure.

However, implementing Service Discovery can be quite challenging due to developer team resistance because they would need to register their services in the API Gateway, either manually or through some automated means. Despite numerous recommendations online, it's impossible to provide a one-size-fits-all solution to questions like:

- How to implement this alongside quotas?
- How to properly store configurations?
- How to automate this correctly?

And so on. All these are architectural problems that need careful consideration based on the specific project.

It's important to note that there should be a certain *premise* for the implementation and use of Service Discovery. For example, a DevSecOps process should be in place, allowing for automatic verification and registration of something. Within such a process, checks should ensure that a service is registered in Service Discovery before being fully deployed to production. If this doesn't happen, there's likely no real Service Discovery, and services are added (registered) manually in a quasi-Service Discovery manner.

Thus, if there's no process to control Service Discovery, Service Discovery itself is simply not needed as an AGW function.

### Protocols

Logging, balancing, circuit breaker — all of these are certainly great, but it's extremely important for the API Gateway to support multiple protocols (unless you are a company that exclusively sells REST APIs).

Here, it's crucial to consider two things: which protocols your clients will use externally, and which protocols your services use for internal interaction. Typically, these sets of protocols may differ, and if they do, we want our gateway to be able to translate between them.

## Intermediate Conclusion

Firstly, if it is still not obvious – not all features from the above are needed by default. As I mentioned earlier, we need to think hard and think twice about our system design and what we truly need. But usually, either all the needed functions are available out of the box, or there is (almost always with open-source solutions) the possibility to modularly build all you need.

So the **actual**, high-scope pros and cons of the API Gateway:

#### Pros:

- We need to develop fewer features in backend services because the gateway encapsulates them.
- With the API Gateway, we will definitely have better control over our ecosystem, infrastructure, and business services.

#### Cons:

- The solution is complicated. It is quite difficult to embed and implement it in our system.
- The older and larger the system, the more challenging the API gateway will be to implement.

Yes, both cons are about *challenges*.

## So, When to Use It?

The main red flag we need to focus on is if the company is planning to build a lot of microservices OR a dozen sub-systems as part of one big project, resulting in quite a number of project-related teams.

If the above is true, the API Gateway will decrease Time To Market (because of the first reason from the Pros above).

If we are an API-First company, or just any company that is going to monetize API, it is **almost always** a reason to have an API Gateway.

Basically, everything is measured by time. If your system is relatively small, not planning to grow rapidly, and the realization of common must-have system elements (which are Logging, AuthN/AuthZ, and Routing/Balancing) is estimated to take 3-4 weeks of man-hours... You do not need an API Gateway.

On the other hand, if you already have a couple of dozen services and are going to grow even more rapidly, in such conditions implementing main infrastructure elements by your own team could be estimated, for example, as 1 year in man-hours. If in such a case, the API Gateway can be implemented faster - go for it.

Now we can add one more thesis to our conclusion:

> The API Gateway is necessary for use and implementation only if the costs of its implementation and maintenance are less than the cost of creating a limited number of required functions within the scopes of our subsystems.

---

I have already mentioned, but it needs to be repeated – Implementations of API Gateways **always** come along with *standardization of inner processes* (tracing, logging, service discovery, etc.). Teams should be ready and agree to learn how to deal and live with this new component. If there are any arguments against these new changes, all of this just won't work! Even if we deploy and configure AGW, ignoring these arguments, for what? Nobody will use it and change their flow.

## Final and Summarized Conclusion

- API Gateway is needed only if the company is big and has plans to become even bigger and optimize its infrastructure.
- API Gateway is the tool that opens up possibilities to monetize APIs, sell analytics, etc.
- API Gateway can increase **OR** decrease both: total costs of ownership and time to market.
- API Gateway without standardized processes is a dead story.

---

If you are interested in system design and architecture, I would recommend taking a look at these resources:

- [karanpratapsingh/system-design](https://github.com/karanpratapsingh/system-design#rest-graphql-grpc)
- [donnemartin/system-design-primer](https://github.com/donnemartin/system-design-primer)
- [ByteByteGoHq/system-design-101](https://github.com/ByteByteGoHq/system-design-101)
