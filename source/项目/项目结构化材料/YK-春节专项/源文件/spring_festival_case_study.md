0-to-1 innovation Cross-functional

# Designing Youku's Spring Festival live experience from scratch

How I identified a user emotion gap in broadcast live streaming at Alibaba's Youku, invented a new interaction format in under a month, and delivered 60% revenue growth — with no precedent to follow

🏢 Alibaba · Youku (大文娱) · 2022–2023 

Revenue YoY

+60%

Watch time YoY

+38%

Teams coordinated

6+

Timeline

~4 wks

Context

Youku, Alibaba's video and live streaming platform, broadcasts Spring Festival gala content — China's equivalent of the Super Bowl halftime show, but for TV. It draws massive simultaneous viewership and is a key platform showcase moment for brand advertising and user acquisition. But broadcast live presents a fundamentally different product challenge from standard UGC live streaming: viewers are not fans of a specific streamer, there is no host-audience relationship, and the content is entirely out of the platform's control.

The result: without a social hook native to the broadcast format, most viewers were passive. They watched and left. There was no mechanism converting attention into either engagement or revenue.

The opportunity

I started from a user emotion question rather than a product question: _what does someone actually want to feel during a Spring Festival gala?_

The answer wasn't "I want to talk to a streamer." It was "I want to celebrate with everyone around me at the same time." That's a fundamentally different social need — group participation, not parasocial connection. Existing live room features were designed for the latter. Nothing existed for the former. 

This framing had two immediate product implications: the interaction mechanic needed to be ambient and low-friction (you shouldn't have to think to participate), and the revenue mechanic needed to be tied to the festive atmosphere rather than to a streamer relationship.

What I built

One-tap ambient interaction ("Cloud Party")

Inspired by an existing AI-powered visual effect framework used elsewhere on the platform, I identified that the underlying tech could be redeployed in the live room with a single week's engineering work. The result: a one-tap interaction that triggered synchronized visual effects across all viewers simultaneously — no typing, no navigation, just immediate collective participation. During program lulls, this became the primary engagement driver, lifting watch time by 38% year-over-year.

Festival-specific DIY gift at low price point

Standard tipping in UGC live streaming is driven by a fan-streamer relationship. That relationship doesn't exist in broadcast. I reframed the gifting motivation: instead of "support your favorite streamer," the driver was "participate in the festive moment." A seasonal gift (rabbit-year illustration, shareable poster, personalized avatar effect) at a deliberately low price point targeted the maximum viable buyer pool — casual viewers who wouldn't tip a streamer but would spend for a festival moment. Conversion strategy: volume over ARPU.

Revenue logic (GMV decomposition)

GMV formulaViewers × Conversion rate × Price

Lever chosenConversion rate (not price)

RationaleBroadcast audience has weak pay habit; low price widens funnel

ResultRevenue +60% YoY

How I executed it

The full project ran in under four weeks across Youku's product, engineering, business, sales, legal, and design teams.

Week −4Identified the interaction gap and scoped the "Cloud Party" concept. Confirmed technical feasibility by evaluating Youku's existing AI visual framework for reuse. Locked creative direction.

Week −3Coordinated with business, sales, and legal teams to design the DIY gift product. Finalized pricing model, compliance requirements, and launch plan. Confirmed artwork brief with design.

Week −2Led stress testing and gray-scale rollout under simulated peak concurrency. Defined audience scatter strategy to prevent server spikes at simultaneous interaction moments. Ran internal QA and stakeholder sign-off.

LaunchOn-site during broadcast. Full technical monitoring. All critical issues resolved within defined SLA. Post-broadcast social media reception was strongly positive — the mechanic was organically shared on external platforms.

Outcomes

+60%Revenue year-over-year — driven by conversion rate lift, not price increase, confirming the low-price-high-volume thesis

+38%Average watch time year-over-year — the ambient interaction mechanic successfully reduced drop-off during program lulls

OrganicPositive user-generated content about the experience on external social platforms — the product became a brand moment, not just a broadcast

TemplateEstablished a repeatable product framework for all future broadcast live events on Youku

What I learned

The key insight from this project is that **user motivation is context-specific, not product-specific**. The same user who never tips a streamer will spend money on a festival gift — because the emotional driver is entirely different. Products that ignore this distinction and apply a one-size-fits-all monetization mechanic leave significant revenue on the table.

On execution: in a 0-to-1 project with a hard deadline and no room for iteration, the most valuable skill is not creativity — it's the ability to scope aggressively. The "Cloud Party" mechanic worked precisely because I chose to reuse existing infrastructure rather than build something original. Speed-to-market mattered more than novelty.

The long-term value extends beyond the numbers: this project created a reusable product architecture for broadcast live streaming at Bilibili — a context that previously had no dedicated product strategy.

0-to-1 product Live events Monetization design Cross-functional leadership Consumer psychology GMV optimization Broadcast streaming Go-to-market

Levi Liu  ·  Product Manager  ·  levi.liuweijie@gmail.com