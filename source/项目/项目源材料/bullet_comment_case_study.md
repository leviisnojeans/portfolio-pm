Interaction design Real-time systems

# Optimizing the bullet comment experience at Bilibili

How I redesigned the send-read-interact loop for live streaming comments — turning a readability problem into a measurable driver of engagement, watch time, and revenue

Comment volume

+33%

Participation rate

+0.43pp

Watch time

+3.6%

Avg. spend/user

+15%

Context

Bullet comments (danmaku) are Bilibili's core social layer — they are the primary way users interact with each other and with streamers in real time. Unlike video platforms where comments are asynchronous, live streaming makes the comment feed a live social signal: seeing others react creates a sense of shared presence that drives emotional connection and, ultimately, tipping behavior.

The business model of entertainment live streaming depends on this emotional connection. If users can't read or engage with comments, the core social loop breaks down.

The problem

At high concurrency — during peak hours or major events — the comment feed scrolled too fast for users to read. This created a paradox: the most active, high-energy streams were also the ones where the social experience felt most chaotic and least legible.

The previous approach to growing engagement had been adding more interaction features — more formats, more prompts, more entry points. By the time I joined this project, the marginal return on that approach was clearly diminishing. I shifted the lens: instead of making it easier to send comments, I focused on making it more rewarding to read them. 

The core tension was a real-time systems problem with a UX consequence:

Speed vs. legibility trade-off

Slowing scroll speed improves readability but increases the discard rate (how many comments never appear) and introduces latency (comments appear later than they were sent). Finding the right balance required quantitative modeling, not intuition.

Visual noise from layered effects

Gift animations, engagement banners, and comment text all occupied the same visual space. Users couldn't establish stable reading patterns because the display was unpredictable frame-to-frame.

Engagement prompts interrupting the experience

Prompts to follow, share, or like appeared at fixed intervals regardless of user behavior, breaking the immersive viewing state rather than supporting it.

My approach

I separated the problem into three independent workstreams, each targeting a different part of the send-read-interact loop.

1\. Quantitative modeling of scroll speed

Rather than A/B testing arbitrary scroll speeds, I first built a model: at different QPS (queries per second) levels, how does reducing scroll speed affect discard rate and perceived latency? This let us identify a configuration where readability improved while both discard rate and delay remained within acceptable bounds — before running a single experiment.

2\. Layered visual hierarchy for effects

Gift effects (the emotionally highest-value content, since they signal someone just paid) were separated from the comment stream with a visual boundary and anchored at the top. This protected the tipping feedback loop while freeing the comment zone to be more readable. Engagement prompts were moved below the fold and made trigger-based — only appearing when a user's own action (e.g. liking, commenting) made them contextually relevant.

3\. Content-type differentiation

I identified that different stream categories have different latency tolerances: beauty and performance streams prioritize visibility (users want to see comments now, even if some are dropped), while gaming streams prioritize real-time accuracy (a comment about a play that appears 2 seconds late is useless). I designed a per-category strategy to be rolled out after the core fix.

Outcomes

+33% Average bullet comments per user — the clearest signal that more people were actually reading and responding to the feed

+0.43pp Participation rate (share of viewers who sent at least one comment) — higher baseline engagement, not just more from existing commenters

+3.6% Average watch time per user — longer sessions suggest the experience felt more engaging, not just less annoying

+15% Average spend per paying user — consistent with the hypothesis that stronger social presence drives tipping behavior

The results were validated across small, medium, and large-scale live events, including the S15 League of Legends World Championship, to ensure they held under extreme concurrency conditions.

What I learned

The most important insight was about the relationship between social experience and revenue in entertainment platforms. The +15% lift in per-user spend was not caused by any monetization change — we didn't touch pricing, gift design, or promotional mechanics. It emerged entirely from improving social legibility. This is strong evidence that in live streaming, **the comment feed is not a feature — it is the product**. Its health directly determines whether the emotional conditions for tipping exist.

The per-category scroll strategy (beauty vs. gaming) was not shipped during my tenure due to resource constraints, but the modeling work is complete. It represents a clear next step with predictable upside.

Real-time UX A/B experimentation Quantitative modeling Social mechanics Engagement loops Live streaming Monetization

Export as plain text ↗ Write LinkedIn version ↗ Combine both cases ↗