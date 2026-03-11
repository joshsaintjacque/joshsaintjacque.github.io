---
title:
  - On Orchestration
date: 2026-03-10
draft: false
tags:
  - engineering
description: Short summary for previews.
---
# On Orchestration


I don't really write code anymore, and I'm not sure how I feel about that. Don't get me wrong, I'm still shipping software - more than ever in my career. But the act of writing syntax is is no longer part of that.

I've been a Software Engineer for over a decade and was hacking together code for many years prior to that. Most of my adult life professionally has been about building and shipping software. Usually that meant *writing code* as much as, if not more than, anything else.

But there's been a shift in the way that I work. It's been gradual for a few years, then suddenly over the last few months writing code disappeared from my everyday workflow. The engineering bottleneck has moved from writing code to the planning and review while semi-autonomous agents produce the code.

## How did I get here? 

What follows is not an exhaustive recap of my journey with AI tooling. I'm going to try to hit the highlights of the most impactful changes to my workflow over the last few years. 

### It all starts with a single line

A few years ago I installed an extension for VSCode called Tabnine. It really was a *fancy* autocomplete. Initially, all it could do was suggest a completion of the current line you were writing. It felt like magic. Working in a dynamic language like Ruby particularly so. 

Suddenly my editor could fill in method signatures and expressions for me. It wasn't perfect, and its impact on my work was mostly limited to "wow, this is neat", but it made repetitive code a little faster to write.

Then one day Tabnine added the ability to autocomplete whole methods. All I had to do was provide a hint about what I was writing (a comment or a method declaration was usually enough). Again it was far from perfect, the methods were often *a little off*, usually because it only had the context of the part of the file I was working in. And it could only work in one file at a time with close direction from me.

### Chatty rubber ducks

My next big experience with AI was the one most people felt: the release of ChatGPT at the end of 2022.

GPT-3 was a big step up in terms of capability, but probably the most impactful aspect of it was that the interface for interacting with the model was a chat box. Instead of dropping hints and hoping it autocompleted correctly, you could have a *conversation*. It wasn't the best at coding: it hallucinated a lot and lacked the context of your project.

But it was an incredible rubber duck. You didn't just explain the problem you were having to an inanimate object, now the duck could talk back. It could give you examples, ideas, and even help you solve problems.

I found I needed to Google vague syntax errors less and less, and rarely needed to venture into Stack Overflow.

AI was now helping me understand faster.

It still had a big flaw: it lacked context. My issues were not contextualized to my domain. It didn't know anything about the codebase that I was working in - its structure, modules, or libraries. In practice that meant I had to supply whatever info I thought was necessary up front, wait for its solution, and then have a back-and-forth where I steered it in the right direction.

There was just enough friction to make me hesitate to reach for it before starting the implementation on my own. Plus it would make subtle and frustrating mistakes, so on net it was only a productivity gain for some problems.

### Clippy becomes self-aware

Next, I started to poke into Copilot. At first it worked a lot like Tabnine. But soon, it could index your whole code base and you could have a conversation in a chat window about it. 

Suddenly the solutions it could generate were informed by the architecture and style of code that your team used, the libraries that you depended on, and the modules that were available to you - not just the lowest common denominator solutions that it was trained on. 

I could ask questions about my own code base, figure out where to look for specific behavior, and debug issues in natural language. It started to feel like having a teammate available to pair with you anytime.

It couldn't make changes across files on its own. The models still made a lot of subtle mistakes. The RAG used to help it understand the codebase was hit-or-miss, and I often had to steer it - but the tools kept improving.

One thing all of these tools had in common up to this point was that, at most, they made me a marginally more effective programmer.

### From writing code to orchestrating agents

Recently my experience has changed radically. It's like the last pieces needed to make this *actually work* have fallen into place. 

Today I'm mostly using Cursor. It gives models an effective harness, solid tools, and the ability to edit multiple files at a time. Models using this harness excel at exploring the codebase on their own. 

The models themselves have reached a tipping point: in the past they felt like eager junior engineers. Helpful for well defined, narrowly tailored tasks with lots of guidance. Today's frontier "thinking" models (e.g., Opus, GPT/Codex) feel like seasoned senior developers. When their understanding differs from my own, I increasingly find it's because *I* missed something.

I keep my notes in a local Obsidian vault and point Cursor at it so it has the full context of everything I'm working on. I rarely have to steer the agent and when I do the guidance is persisted in ways future agents have access to. I don't have to make the same correction twice. It's often able to point out subtle requirements from a meeting I missed, risks introduced by proposed changes, and complications in a requirements document.

I divide my work into logical "lanes" (often with help from Opus or Codex). Then have different agents run through pre-determined phases of work, each with their own context, model, and instructions. Sometimes I break a feature out into vertical slices, sometimes lanes are occupied by separate feature work entirely in different domains. One might be working on a bug fix while another is doing a deep dive on performance. 

Writing the code is now the fastest part of the workflow. When the agent goes down a path I don't like, I feel really comfortable just throwing its code away because that's the cheap part now. The sunk cost fallacy no longer holds me back: I'm liberated to discard ideas that haven't panned out where before I might feel obligated to try and make them work simply because of the effort I already put in.

Once the reviewing agent is satisfied it's handed off back to the implementer to create a draft pull request. This includes supporting artifacts like screenshots or videos walking through the changes. It's high signal-to-noise, presenting just the right details without being a chore to read.

At this point, I'll review and test the changes the same way I would any other code. I need to understand what the changes do, have confidence that the code works, and that the quality of the changes leaves the code base a little better than we found it. It's only at this point, when I'm ready to take ownership of the code, that I move the PR to "ready for review".

This process might sound like a lot, but the reality is that I can have multiple lanes of these processes running in parallel, moving from planning to implementation to PR, each one much faster than I could do on my own. And there's typically only two human review gates: the implementation plan and the final review of the change-set.

I can now turn out in a day what previously would have taken two weeks while maintaining the same - arguably better - quality.

## How does all this make me feel? 

Deeply mixed emotions. 

**Part of me is excited**. I can build systems that build software. Engineering those systems scratches the same itch as code-level puzzle solving did for me.

I love building and shipping software so being able to do more of that is a lot of fun. I find myself experimenting more and trying new things because writing code is the cheap part now. I write more tests, do more to improve the developer experience, and address more tech debt. There's so little friction I'm freed to *just build things*.

**Part of me is sad**. I enjoy writing code. One of the reasons why I love Ruby so much is because of its elegance, it's a joy to write and read. It's expressive and beautiful, and this new workflow abstracts me away from that language in a very real way.

**Part of me is anxious**. In the long run I don't know what our work looks like. Is there enough demand for software that the market can absorb our increased productivity? Does any knowledge work survive if it's fundamentally susceptible to the same forces?

I've watched this industry go through a lot of change over the years, but nothing I've seen comes close to the transformation I see occurring right now.

That said, the immediate future is clear.

## Where is this all going? 

Whenever I'm considering the merits of a particular solution I like to start by identifying the problem I'm trying to solve. Once I understand the problem the solution usually follows naturally. 

The problem Software Engineers are tasked with solving is not writing code. It's building software that solves someone's problems or makes someone's life better. Writing code is the solution we're accustomed to reaching for in order to solve that problem, but it's no longer the best solution.

By shifting from programming to orchestration we're able to build software faster, better, and cheaper. In other words, we're solving more problems than we could before.

The transition is clear: we don't work in code factories anymore, we build the factories. 

The market's trying to figure out what the future looks like, too. AI seems capable of doing much of a junior engineering scope of work, but it requires experienced engineers in order to orchestrate it correctly. To build a widget factory you need people who understand what widgets are supposed to look like.

So where is this going? I think the answer is orchestration. Software Engineering is going to be less about writing code and more about building systems that can produce code. Models will get better, but they still need to be instructed, provided context, and given feedback. You're managing a team of agents and you need to make sure they have what they need to do their jobs successfully. 

Even if all AI progress stopped right now, we would still be headed towards a future of individual contribution transitioning to orchestration. The models don't need to get any smarter to do that. Each industry is gradually figuring out how to wire agents into their context and environment. Some faster than others, but all moving in that direction.

We're no longer shipping software, we're building factories that ship software.