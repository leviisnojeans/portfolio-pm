Tool design Product governance

# Redesigning Bilibili's PC live streaming tool

How I treated a usability crisis as a governance problem — auditing 230+ pages, restructuring the streaming flow, and lifting streamer NPS through four parallel workstreams

Start conversion

+2.4pp

Feature penetration

+17pp

Activity reach

+1.5pp

Memory footprint

−15%

Context

Bilibili's PC streaming tool — 直播姬 (Streaming Ji) — is the official desktop client for creators who want fine-grained control over their streams: scene management, overlays, interaction widgets, and real-time monitoring. It is the primary tool for Bilibili's most active and commercially valuable streamers.

Over several years of rapid feature expansion, the tool had accumulated significant product debt. Each new business requirement was added independently, without a shared information architecture or design governance model. By 2023, the compounding complexity had reached a crisis point.

The problem

66% of streamers reported the interface was complex and hard to use — and couldn't find the features they needed.

User research surfaced three compounding failure modes:

A fragmented streaming flow

The path from "open app" to "live on air" required navigating multiple disconnected steps with inconsistent interactions. Each improvement had been bolted on without revisiting the overall flow, creating a high cognitive load for new and returning streamers alike.

High activation cost for official features

Bilibili's interactive features — games, polls, lotteries — were buried behind inconsistent entry points and gave users no sense of their current state or progress. Streamers either didn't discover them, or didn't understand what was happening after enabling them.

Low official activity reach

Campaign touchpoints had no dedicated, governed resource slots. Official activities competed with organic UI for attention and lost. Platform initiatives couldn't reach the streamers they were designed for.

Problem reframe

The surface problem was usability. The root problem was **governance failure** : no shared standards, no ownership of information architecture, no rules for how new features integrate into the existing surface. A UI refresh without governance would reproduce the same entropy within 18 months.

I structured the project as a **governance intervention** , not a redesign. The goal was to establish the rules, then fix the surface — so the rules would hold after the project ended.

Approach — four workstreams

Workstream 01

Full-surface UI governance

Result

+2.4pp

start conversion

Audited all **230+ pages** in the tool, mapping the information hierarchy across every state. Identified inconsistencies in navigation patterns, label naming, and layout logic. Established a unified design system and information structure — then applied it systematically across the surface. The result was not just visual consistency, but a measurable reduction in the friction between opening the app and going live.

Workstream 02

Official interactive feature optimization

Result

+17pp

feature penetration

Redesigned feature entry points so they were consistently discoverable. Added real-time progress feedback — streamers could now see the status of active features (e.g., how many viewers had participated in a poll) without leaving their workflow. These changes addressed the two reasons streamers weren't using official features: they couldn't find them, and once activated, the features felt like a black box.

Workstream 03

Official activity reach

Result

+1.5pp

activity penetration

Designed a governed resource slot system for official campaigns — a dedicated, standardized surface where platform activities could reach streamers reliably. By giving campaigns a defined home in the information architecture, we removed the dependency on ad-hoc placement and created a predictable reach channel for the business side.

Workstream 04

Technical architecture optimization

Result

−15%

memory footprint

Coordinated with engineering on performance optimization alongside the UI work. Memory footprint was reduced by 15% and crash rate declined — improvements that reinforced the overall NPS gains by ensuring the tool was stable and responsive during live sessions, where instability has direct commercial consequences for the streamer.

Before & After

Hover to compare with the original interface

After Before

Results

+2.4pp

Streaming start conversion — more streamers completing the path from open to live

+17pp

Interactive feature penetration — streamers discovering and using official tools

+1.5pp

Official activity reach — platform campaigns reliably surfaced to streamers

−15%

Memory footprint, with declining crash rate — stability gains reinforcing NPS

What this project taught me

The most important decision was reframing the project as governance rather than redesign. A pure visual refresh would have resolved the immediate complaints without addressing the structural conditions that produced them. By auditing 230+ pages first, I could see the full pattern of failures — not just the most visible ones — and design interventions that would hold over time.

The +17pp lift in feature penetration was the result I'm most proud of, because it came entirely from reducing discovery and feedback friction, not from any change to the features themselves. The features worked — streamers just couldn't tell.