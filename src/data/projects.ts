export interface Project {
  id: string;
  title: string;
  company: string;
  year: string;
  tags: string[];
  summary: string;
  heroImage: string;
  impact: { label: string; value: string }[];
  story: {
    theChallenge: string;
    myApproach: string;
    theJourney: string;
    theOutcome: string;
    lessonsLearned: string[];
    personalReflection: string;
  };
}

export const projects: Project[] = [
  {
    id: "sap-dataverse-pipeline",
    title: "Building the Data Backbone for Australia's Biggest Infrastructure Project",
    company: "Snowy 2.0 - Future Generation JV",
    year: "2024",
    tags: ["SAP", "Power Platform", "Dataverse", "ETL", "Real-time Analytics"],
    summary: "Architected an automated SAP to Dataverse pipeline combining 5 data sources, enabling real-time inventory tracking for 500+ pieces of heavy machinery.",
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=600&fit=crop",
    impact: [
      { label: "Downtime Reduction", value: "10%" },
      { label: "Data Sources Unified", value: "5" },
      { label: "Equipment Tracked", value: "500+" },
      { label: "Manual Hours Saved", value: "17/week" }
    ],
    story: {
      theChallenge: `When I joined Snowy 2.0, I walked into what I can only describe as data chaos. The Mobile Plant Department manages over 500 pieces of heavy machinery — we're talking excavators, dump trucks, cranes worth millions. And here's the thing: nobody knew where half of them were.

The data lived in five different systems. SAP had the asset register. Excel spreadsheets tracked maintenance (yes, really). The warehouse had their own system. Production used something else entirely. And don't even get me started on how fuel consumption was tracked.

Every Monday, the planning meeting was basically educated guessing. "I think Excavator 47 is at the tunnel face?" "Wasn't it scheduled for maintenance last week?" Nobody knew. And in a project where a single day of downtime costs tens of thousands, that's not okay.`,

      myApproach: `I spent my first two weeks just listening. Coffee chats with operators, shadowing the maintenance team, sitting in on planning meetings. I wasn't trying to solve anything yet — I was trying to understand the real problems, not the symptoms.

What I discovered was interesting: the data actually existed. It was just trapped in silos. The challenge wasn't collection — it was integration.

I pitched a simple idea: what if we could see everything in one place? Real-time. No more Monday morning guessing games.

The technical solution I proposed was a SAP to Dataverse pipeline using Power Platform. But honestly, selling the vision was harder than building it. Management had been burned by "digital transformation" promises before. So I built a prototype in two weeks — just one excavator, real data — and showed them what was possible.`,

      theJourney: `The build took about three months. Some things I learned the hard way:

First, SAP integration is harder than it looks. The documentation says one thing, reality is another. I spent two weeks on what should have been a "simple" API connection. Eventually found a workaround using intermediate staging tables. Not elegant, but it worked.

Second, data quality issues are sneaky. We'd get the pipeline running perfectly, then discover that half the equipment IDs in SAP didn't match the warehouse system because someone added leading zeros years ago. Spent a whole sprint just on data cleansing rules.

Third, change management is 70% of the job. The best dashboard in the world is useless if nobody uses it. I ran weekly demos with the planning team, incorporated their feedback, made them feel ownership. By launch, they were more excited than I was.

The Power BI dashboards came together faster once the data foundation was solid. Five dashboards in total: real-time location, maintenance scheduling, parts utilization, downtime analysis, and fuel consumption.`,

      theOutcome: `The numbers tell part of the story: 10% reduction in unplanned downtime, 17 hours per week saved on manual reporting, first-ever real-time visibility across systems.

But what I'm most proud of is the cultural shift. The Monday planning meetings actually work now. People make decisions based on data, not gut feel. The maintenance team can predict failures before they happen. The warehouse knows exactly what parts to stock.

Last month, one of the operators told me: "I used to dread coming to planning meetings. Now I actually look forward to them." That meant more than any metric.`,

      lessonsLearned: [
        "Prototype fast, prove value early — nothing kills skepticism like a working demo",
        "Data integration projects are 30% technical, 70% people and process",
        "Never underestimate the power of shadowing end users before building anything",
        "Perfect is the enemy of done — ship something useful, then iterate",
        "The person closest to the problem often has the best solution, you just need to ask"
      ],

      personalReflection: `This project changed how I think about my role. I came in thinking I was a "data analyst" — my job was to build reports and dashboards. I left understanding that my real job is to solve problems. The data stuff is just the tool.

Snowy 2.0 is genuinely one of the most important infrastructure projects in Australian history. Being able to contribute to it, even in a small way, is something I'll always be proud of.

Also, I now know way more about hydraulic excavators than I ever expected to. Did you know they can drink 200 liters of diesel per hour? The things you learn.`
    }
  },
  {
    id: "government-compliance-engine",
    title: "How I Saved $51K and Kept the Government Happy",
    company: "International Health & Medical Services",
    year: "2023",
    tags: ["SQL Server", "Power BI", "SSIS", "Healthcare", "Compliance"],
    summary: "Built automated compliance reporting that satisfied government KPIs while generating $36K savings and $15K additional revenue.",
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop",
    impact: [
      { label: "Annual Savings", value: "$36K" },
      { label: "Additional Revenue", value: "$15K" },
      { label: "Report Time", value: "Days → Hours" },
      { label: "Performance Boost", value: "60%" }
    ],
    story: {
      theChallenge: `IHMS provides healthcare services to immigration detention facilities across Australia. When you're dealing with government contracts, compliance isn't optional — it's existential. Miss your KPIs, lose your contract. Simple as that.

The problem? The reporting was a nightmare. Every week, analysts were spending days manually pulling data from the clinical CRM, cross-referencing with spreadsheets, and building reports in Excel. By the time reports were ready, the data was already outdated.

The Home Affairs officials weren't happy. The reports were late, sometimes inaccurate, and didn't give them the visibility they needed. And internally, our team was burning out.

I was brought in to fix it.`,

      myApproach: `First thing I did was map out the entire reporting workflow. Post-it notes everywhere. I wanted to see every manual step, every handoff, every place where things could go wrong.

What I found was fascinating: about 80% of the work was repetitive. Same queries, same calculations, same formatting — just different dates. That screamed automation.

But I also discovered something else: the reports we were producing weren't actually what the government wanted. Over years of iteration, we'd drifted from their requirements. We were working hard to produce reports that didn't quite answer their questions.

So my approach was two-pronged: automate the repetitive stuff, and redesign the reports to actually be useful.`,

      theJourney: `The technical build centered on SQL Server and SSIS. I created a data warehouse that pulled from the clinical CRM automatically every night. Automated ETL jobs cleaned and transformed the data. Power BI dashboards replaced the Excel reports.

The tricky part was the SSIS packages. The clinical CRM had... let's call it "interesting" data quality. Patient IDs that changed format. Dates stored as strings. Duplicate records everywhere. I spent a solid month just building validation and cleansing rules.

But the bigger challenge was stakeholder management. The Health Service Managers had been doing things a certain way for years. They were skeptical of change. I ran workshops — lots of workshops — to understand their real needs and get buy-in.

The government relationships were delicate too. I worked closely with our compliance team to rebuild trust with ABF and Home Affairs. Showed them what we were building, got their input, made them feel involved.

One moment I remember: a Home Affairs official visited our office, saw the new dashboard, and said "This is exactly what we've been asking for." That was a good day.`,

      theOutcome: `The numbers: $36,000 in direct savings from reduced manual work. $15,000 in additional revenue from improved compliance (we stopped losing money to KPI penalties). 60% faster report generation.

But the real win was the relationship with government. Audit meetings went from tense to collaborative. They trusted our numbers. When contract renewal came around, our track record was spotless.

I also got to support a $500M tender. My analysis of five years of performance data helped shape our service delivery position. We won that contract.`,

      lessonsLearned: [
        "When reports are always late, the problem usually isn't speed — it's process",
        "Talk to the end users of your reports, not just the people requesting them",
        "Data quality issues compound over time — fix them early or pay later",
        "Government stakeholders appreciate transparency more than perfection",
        "Automation is great, but human judgment is still essential for compliance work"
      ],

      personalReflection: `Healthcare analytics is different from other domains. The data represents real people — vulnerable people, in this case. That weight never left me.

There was a moment, late in the project, when I realized that our improved reporting was actually leading to better health outcomes. Faster identification of trends meant faster interventions. It wasn't just about compliance anymore.

I learned that "boring" compliance work can have real impact. You just have to care enough to look for it.`
    }
  },
  {
    id: "sme-digital-transformation",
    title: "Giving a Small Business Owner 500 Hours of Their Life Back",
    company: "Gaxa Consulting Australia",
    year: "2022",
    tags: ["Process Automation", "System Integration", "Change Management", "SME"],
    summary: "Led a team of 4 to transform a completely manual invoicing process into an automated digital solution.",
    heroImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=600&fit=crop",
    impact: [
      { label: "Hours Saved Yearly", value: "500" },
      { label: "Team Size Led", value: "4" },
      { label: "Error Rate", value: "~0%" },
      { label: "Project Duration", value: "3 months" }
    ],
    story: {
      theChallenge: `The client was a small business owner — let's call him Tom. He ran a successful wholesale distribution company, about 15 employees, solid revenue. From the outside, things looked great.

But Tom was drowning.

Every single invoice was created manually. He'd get an order (sometimes by phone, sometimes by email, sometimes scribbled on paper), manually enter it into Excel, manually calculate prices and discounts, manually create the invoice in Word, manually email it to the customer, and manually track whether it was paid.

When I first met Tom, he was working 70-hour weeks. Most of that time wasn't growing his business — it was just keeping the paperwork from collapsing.

"I started this business because I love what I do," he told me. "Now I spend all my time on admin."

That hit me.`,

      myApproach: `This was my first time leading a team, so I was nervous. Four people looking to me for direction. But I'd spent enough time at IHMS watching good (and bad) project management to know the basics.

Step one: understand the current state. I ran discovery workshops with Tom and his team. We mapped every step of the order-to-payment process. Post-it notes on a whiteboard, nothing fancy. By the end, we had a workflow diagram that stretched across an entire wall.

Step two: identify what could be automated vs. what needed human judgment. Not everything should be automated. Customer relationships, dispute resolution, unusual orders — those needed Tom's expertise. But data entry? Calculations? Reminders? Those were just wasting his time.

Step three: design the solution. We proposed an integrated system connecting his customer database to an invoicing platform, with automated calculations, approval workflows, and payment tracking.

Tom was skeptical. "I've tried software before. It never works the way they promise." Fair enough. So I made him a deal: we'd build it in phases, and he could pull the plug at any point if it wasn't working.`,

      theJourney: `Three months of focused work. Here's what I learned about leading a team:

First, clear communication beats micromanagement. I held daily 15-minute standups. Everyone knew what everyone else was doing. Problems surfaced early.

Second, involve the client constantly. Tom wasn't a tech person, but he knew his business better than anyone. Every week, we'd show him what we built and ask for feedback. By the end, the system wasn't "ours" — it was his.

Third, training matters more than technology. The best system in the world is useless if people don't know how to use it. We spent almost a month just on training and documentation. Recorded videos, written guides, hands-on practice sessions.

The technical stuff was relatively straightforward. The hard part was change management. Tom's staff had been doing things manually for years. Some were resistant. We had to prove the new way was actually easier.`,

      theOutcome: `500 hours per year. That's what we gave back to Tom.

The invoicing process that used to take hours now takes minutes. Errors dropped to nearly zero (no more manual calculation mistakes). Payments come in faster because invoices go out immediately.

But here's what really mattered: Tom's working 45-hour weeks now. He's spending time with his family again. He's actually thinking about growing the business instead of just surviving.

Last Christmas, he sent me a card. "Thanks for giving me my business back." I still have it on my desk.`,

      lessonsLearned: [
        "For SMEs, time is more valuable than money — they'll pay to get their life back",
        "Involve the client as a co-creator, not just a recipient",
        "Training and change management are half the project — budget accordingly",
        "Simple solutions that work beat sophisticated solutions that don't",
        "The best metric is often qualitative: is the client's life actually better?"
      ],

      personalReflection: `This project taught me why I do this work.

It's easy to get caught up in technical complexity — building elaborate systems, using the latest tools, impressing other analysts. But none of that matters if it doesn't help someone.

Tom didn't care about my technical skills. He cared about seeing his kids before bedtime.

I think about that a lot now. Every project I take on, I ask myself: who is this actually helping? How is their life going to be different?

If I can't answer those questions, I probably shouldn't be doing the project.`
    }
  },
  {
    id: "national-coverage-dashboard",
    title: "Mapping Dementia Training Across Australia",
    company: "Dementia Training Australia",
    year: "2021",
    tags: ["Power BI", "Geospatial", "Python", "Survey Analytics", "Healthcare"],
    summary: "Built a national coverage dashboard using ABS geospatial data, analyzed 20,000+ survey responses, and automated data pipelines.",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    impact: [
      { label: "Annual Savings", value: "$14K" },
      { label: "Learners Analyzed", value: "20,000+" },
      { label: "Branches Covered", value: "All AU" },
      { label: "Automation", value: "VBA + Python" }
    ],
    story: {
      theChallenge: `Dementia Training Australia does something incredibly important: they train healthcare workers across the country to provide better dementia care. With an aging population, this work matters more every year.

But they had a problem: they didn't know where they were making an impact.

Training data came from surveys — over 20,000 learners — but it was scattered across different Qualtrics instances, different formats, different branches. Each branch did things their own way. There was no national picture.

The C-suite was flying blind. They'd ask questions like "Are we reaching rural areas?" or "Which states need more resources?" and nobody could answer confidently.

My job was to fix that.`,

      myApproach: `I started with the data mess. Each branch had their own Qualtrics setup, their own question formats, their own export processes. Step one was standardization.

I built Python scripts to automatically pull data from all Qualtrics instances, normalize the formats, and consolidate into a single dataset. What used to take analysts hours of manual copying and cleaning now happened automatically overnight.

Then I tackled the geospatial challenge. I wanted to show training coverage on a map — but our data only had postcodes, and I needed to map that to proper geographic boundaries. Cue a deep dive into ABS (Australian Bureau of Statistics) datasets.

The final piece was the dashboard itself. Power BI, connected to the automated data pipeline, with drill-down capability from national view to individual postcodes.`,

      theJourney: `The Python automation was fun. I hadn't done much Python at that point — mostly SQL and Excel/VBA. This project forced me to level up.

The tricky part was handling the inconsistencies between branches. One branch recorded dates as DD/MM/YYYY, another as MM/DD/YYYY. One used "Yes/No", another used "1/0". I built a whole validation layer to catch and handle these variations.

The geospatial work was surprisingly complex. ABS has multiple geographic classification systems (SA1, SA2, SA3, SA4, LGA...) and they don't all align cleanly with postcodes. I ended up creating custom mapping tables.

Presenting to executives was new for me. I remember being nervous before my first presentation to the CEO. But I learned quickly: executives don't care about technical details. They care about "what does this mean?" and "what should we do about it?"

So I structured every presentation around insights and recommendations, with the technical stuff in appendix slides if anyone asked.`,

      theOutcome: `$14,000 annual savings from automation alone. But the real value was strategic.

For the first time, leadership could see training coverage across Australia. They discovered that rural areas were significantly underserved — not because they weren't trying, but because they didn't know. The dashboard revealed geographic gaps they'd never seen before.

This led to resource reallocation. More online training options for remote areas. Targeted outreach to underserved regions. The dashboard didn't just report the past — it shaped the future.

I also got my first taste of executive presentation. Learned to speak their language, focus on impact, make data tell a story. Skills I use every day now.`,

      lessonsLearned: [
        "Automation isn't just about saving time — it's about enabling consistency",
        "Geospatial data is powerful but tricky; budget extra time for mapping exercises",
        "Executives care about 'so what?' not 'how' — structure presentations accordingly",
        "Working in healthcare/social impact adds meaning that pure commercial work sometimes lacks",
        "Python is worth learning — it opens doors that Excel and SQL can't"
      ],

      personalReflection: `This was my first full-time data role after university. I was terrified of failing.

Looking back, I'm proud of how much I grew in 18 months. I went from "can I even do this?" to presenting insights to the CEO. I built systems that saved real money and helped real people.

But what I remember most is the mission. Dementia affects so many Australian families. The work DTA does — training carers to provide better support — makes a genuine difference in people's lives.

When you're debugging Python at 11pm, it helps to know it's for something that matters.`
    }
  }
];
