Live streaming Product management

# Rebuilding the live room framework at Bilibili

How I reduced cognitive load and transaction costs to drive measurable growth in watch time, engagement, and monetization

Interaction scale

+2–3%

Bullet comments

+33%

CTA click-through

+1pp

Watch time

positive

Context

Bilibili's live streaming product had grown rapidly over several years, with different teams shipping features independently and without shared standards. By the time the product entered a maturity phase, the live room UI was accumulating compounding complexity — overlapping visual effects, inconsistent interaction patterns, and no governance model for new business integrations. The result: declining engagement from existing users and difficulty retaining casual viewers.

Problem framing

I reframed this as a **transaction cost problem** rather than a purely aesthetic one. Using the equation _user value = utility − cost_ , I focused on the cost side: the cognitive and interaction friction users faced every session. Three cost categories stood out:

Information overload in the interaction zone

Gift effects, bullet comments, and engagement prompts all competed for the same space with no hierarchy, causing visual noise and reducing users' confidence in what to focus on.

Monetization tools disconnected from content

The same live room could simultaneously display shopping links, game download cards, and creator tipping — regardless of what was actually happening on screen. Users experienced cognitive mismatch between the content and the commercial offer.

No governance model for downstream teams

Business teams had no shared rules for how to integrate new features into the live room, making each new addition a potential disruption to the user experience.

My approach

I structured the project in two tracks: **user-facing** (reduce friction in the viewing experience) and **system-facing** (establish a governance framework for business integrations). Both were grounded in the same mental model: every design decision is a trade-off between user utility and user cost.

Rather than treating this as a UI refresh, I treated it as an economics problem — how do we reduce the cost of every transaction a user makes inside the live room? 

Key design principles I established:

Layered visual hierarchy

The most emotionally significant content (gift effects from tipping) was anchored at the top with a visual separator. Engagement prompts were moved to the bottom and made trigger-based — appearing only when user behavior warranted them, reducing unprompted interruptions.

Context-locked monetization zones

Monetization tools were bound to content type: shopping streams showed product cards, gaming streams showed game download prompts. Only one primary monetization unit was allowed in the bottom-right zone at any given time, eliminating choice paralysis and cognitive mismatch.

A/B tested scroll speed for bullet comments

Rather than guessing the right scroll velocity for the comment feed, I modeled the relationship between scroll speed, discard rate, and real-time latency at various QPS levels. We found a configuration that improved readability while keeping discard and delay within acceptable bounds.

Outcomes

User engagement

Interaction and payment scale up 2–3%. Bullet comment volume up 33%. Watch time positive across cohorts.

Monetization efficiency

Bottom-right CTA click-through rate increased by 1pp. Context-matched monetization reduced misclick and drop-off.

Operational efficiency

Downstream teams (revenue, brand, e-commerce) now operate with a shared integration standard, reducing coordination overhead and iteration cycles.

What I learned

The most counterintuitive finding: **removing things increased revenue**. Constraining the number of monetization units per session — which initially faced internal pushback — turned out to improve conversion by reducing the decision cost for users. This confirmed my belief that user-side friction and business-side performance are not in opposition; resolving one often unlocks the other.

One area for improvement: the governance framework would benefit from more dynamic tooling. Currently it relies on documentation and review processes; a live compliance dashboard visible to business teams would reduce friction even further and shift ownership closer to the teams generating new features.

Information architecture A/B experimentation Cross-functional alignment UX governance Monetization strategy Live streaming Transaction cost theory

Export as plain text ↗ Write LinkedIn version ↗