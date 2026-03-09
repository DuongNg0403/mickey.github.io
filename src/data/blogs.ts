export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  coverImage: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "excel-to-python-journey",
    title: "Why I Ditched Excel for Python (And Then Went Back to Excel)",
    date: "March 2024",
    readTime: "6 min read",
    category: "Data Engineering",
    excerpt: "The story of my love-hate relationship with spreadsheets, and why the best tool is always the right one for the job.",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=600&fit=crop",
    content: `
## The Great Excel Exodus

Let me tell you about the moment I decided Excel was dead to me.

It was 2pm on a Friday. I was working at IHMS, and I'd been wrestling with a massive spreadsheet for three hours. 50,000 rows of patient data. Every time I added a VLOOKUP, the whole thing would freeze for 30 seconds. Excel kept hitting memory limits. My laptop sounded like a jet engine.

I was trying to do something relatively simple: join two datasets, filter by date range, and calculate some summary statistics. Basic stuff.

That's when my colleague walked by and said, "You know Python can do that in like 10 seconds, right?"

I didn't know Python. But I was angry enough at Excel to learn.

## The Python Honeymoon

I spent that weekend doing a crash course. By Monday, I'd rewritten my analysis in Python. What took three hours in Excel took about 30 seconds to run.

I was evangelical. I told anyone who would listen that Excel was obsolete. Python was the future. I started rewriting everything in Jupyter notebooks. I even got a little annoying about it, if I'm being honest.

For about six months, I refused to open Excel for anything analytical. CSV? Python. Calculations? Python. Quick chart? Believe it or not, Python.

## The Reality Check

Then came the moment that changed my mind.

I was presenting to a group of Health Service Managers. Non-technical folks. I'd built this beautiful analysis in Python — proper data pipeline, clean visualizations, reproducible code. I was proud of it.

One manager asked: "Can you show me what happens if we change this assumption?"

In Python, that meant going back to my Jupyter notebook, finding the right cell, changing a variable, re-running the analysis, and regenerating the charts. Took about five minutes while everyone waited awkwardly.

Later, I rebuilt the same analysis in Excel. Dynamic inputs at the top. Formulas that automatically updated. Charts that refreshed in real-time. The manager could play with assumptions themselves.

"This is way better," they said. "I can actually understand what's happening."

Ouch.

## The Lesson

Here's what I eventually figured out: **the best tool is the one that gets the job done**.

Python is amazing for:
- Large datasets (millions of rows)
- Complex transformations
- Reproducible, automated pipelines
- Statistical modeling
- Working with APIs and databases

Excel is amazing for:
- Prototyping and exploration
- Stakeholder-facing deliverables
- Interactive "what-if" analysis
- Quick one-off calculations
- Collaboration with non-technical people

The mistake I made was treating it as either/or. Now I use both, often in the same project. Python does the heavy lifting — data extraction, cleaning, complex calculations. Excel delivers the results in a format people can actually use.

## My Current Workflow

Here's how I typically work now:

1. **Data extraction**: Python or SQL (depending on source)
2. **Heavy transformation**: Python (pandas is unbeatable)
3. **Analysis and exploration**: Python for complex stuff, Excel for quick looks
4. **Stakeholder deliverable**: Excel or Power BI (depends on audience)
5. **Production automation**: Python scripts scheduled to run automatically

The key insight is that tools serve purposes, not egos. I used to think using Excel was somehow "less professional" than Python. That's ridiculous. Professionals use whatever works.

## The VBA Exception

One more thing: VBA is still underrated.

Yes, it's clunky. Yes, the syntax is ancient. Yes, nobody puts it on their LinkedIn.

But in environments where Python isn't approved (hello, every corporate IT department), VBA is your secret weapon. I've built some genuinely powerful automation tools in VBA that saved thousands of hours.

Don't sleep on VBA just because it's not cool.

## Final Thoughts

If you're an Excel person wondering whether to learn Python: yes, absolutely, learn Python. It will expand what's possible for you.

If you're a Python person who thinks Excel is beneath you: try actually building something for a non-technical stakeholder. You might be surprised what works best.

And if you're just starting out: learn both. They're not competitors. They're collaborators.

---

*What tools do you use? I'm always curious how other analysts set up their workflows. Hit me up on LinkedIn — I love these conversations.*
    `
  },
  {
    id: "sap-integration-nightmare",
    title: "The SAP Integration That Nearly Broke Me",
    date: "January 2024",
    readTime: "8 min read",
    category: "Technical Deep-Dive",
    excerpt: "A war story from Snowy 2.0: enterprise integrations, data chaos, and the debugging session that lasted 72 hours.",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop",
    content: `
## The Promise

"It should be straightforward," they said. "SAP has APIs for everything."

Famous last words.

When I joined Snowy 2.0, one of my first major projects was building an automated data pipeline from SAP into our Power Platform environment. The goal was simple: get real-time equipment data into Dataverse so we could build dashboards and applications on top of it.

On paper, it looked easy. SAP exports data. Power Automate picks it up. Data flows into Dataverse. Dashboards light up. Everyone's happy.

Three months later, I had a significantly more nuanced understanding of "straightforward."

## The Reality

Here's what nobody tells you about enterprise system integration:

**Documentation lies.** SAP's API documentation describes a beautiful, logical system. The actual implementation at any given company has been customized, patched, and worked-around for years. What you read in the docs and what exists in production are often completely different.

**Nobody knows everything.** I spent my first week trying to find someone who understood the entire data flow. That person didn't exist. The SAP team knew SAP. The warehouse team knew their system. The maintenance team knew their spreadsheets. Nobody had the full picture.

**Test environments are fiction.** Our test environment was supposed to mirror production. It didn't. Things that worked perfectly in test would fail mysteriously in production. Eventually, I learned to trust nothing until I'd validated it against real data.

## The 72-Hour Debug

The worst moment came about six weeks in.

The pipeline was "complete." We'd been running successfully for two weeks. I was starting to relax. Then one Monday morning, I came in to find that everything had broken over the weekend.

Not just broken. Catastrophically broken. Records were duplicated. Some equipment had impossible values. The dashboard showed excavators in the ocean.

I still don't fully understand what happened. Near as I can tell, a scheduled SAP batch job ran at an unusual time, conflicting with our extraction window, and the resulting data was corrupted in subtle ways that only became visible downstream.

I spent the next 72 hours — basically non-stop, sleeping on a couch at the site — tracing the issue. Database logs. API call histories. Timestamp analyses. It was like being a detective, except the crime scene was a database and nobody was dead.

The fix, when I found it, was embarrassingly simple: adjust our extraction window by 30 minutes to avoid the SAP batch job.

Three days of work. Thirty minutes of schedule change.

## What I Learned

**Build in redundancy from day one.** I now build every pipeline with logging, validation checkpoints, and rollback capability. If something breaks, I want to know exactly when and why.

**Data validation isn't optional.** Every data point should be checked against reasonable bounds. If an excavator's location is in the middle of the ocean, something went wrong upstream. Catch it before it hits the dashboard.

**Understand the source system.** Don't just learn the API. Learn how the system is actually used. Talk to the people who enter the data. Understand the business process. The technical integration is only half the problem.

**Schedule defensively.** Batch jobs, maintenance windows, backup processes — all of these can interfere with your integration. Know when they run. Plan around them.

**Document everything.** Future you will forget why you made certain decisions. Write it down. Extensively.

## The Silver Lining

That hellish project became one of my most valuable experiences.

When I interview candidates now, I ask them about their worst integration nightmare. The ones who have war stories usually turn out to be better hires. There's something about surviving a truly difficult technical challenge that teaches resilience.

And honestly? Once it was working, the pipeline was beautiful. Real-time equipment data flowing seamlessly. Dashboards that actually reflected reality. Maintenance planning that could anticipate problems.

The pain was worth it.

## Advice for Anyone Starting an Integration Project

1. **Budget 2-3x the time you think you need.** You will encounter unexpected issues.

2. **Find the tribal knowledge holders.** Every organization has people who know things that aren't documented. Buy them coffee.

3. **Validate obsessively.** Check record counts. Verify calculations. Compare to known sources. Trust nothing.

4. **Build monitoring from the start.** You need to know when things break, preferably before anyone else does.

5. **Document your assumptions.** When things go wrong, you need to know what you thought would be true.

6. **Celebrate small wins.** Integration projects are marathons. Take a moment when something works.

---

*If you're currently stuck on an integration project and want to commiserate, my DMs are open. Sometimes it helps just to know you're not alone.*
    `
  },
  {
    id: "writing-business-cases-that-win",
    title: "How I Got Management to Actually Say Yes",
    date: "November 2023",
    readTime: "7 min read",
    category: "Career & Strategy",
    excerpt: "The art of writing business cases that don't get ignored — lessons from securing buy-in for a Microsoft Power Platform rollout.",
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop",
    content: `
## The Rejection

Early in my time at Snowy 2.0, I put together what I thought was a brilliant proposal: a comprehensive Microsoft Power Platform rollout for the Mobile Plant Department.

I'd done my research. Built a detailed technical architecture. Created timeline estimates. Even included a section on risk mitigation. I was proud of it.

It got rejected in about fifteen minutes.

"Interesting," my manager said, flipping through the deck. "But I don't see why we should do this now. What's the actual problem we're solving?"

I'd written 30 pages about the solution. I'd barely mentioned the problem.

## The Rewrite

I went back to my desk, frustrated but curious. What makes a business case actually work?

I started paying attention to proposals that succeeded. I talked to senior leaders about what convinced them. I read a few books on executive communication. And I rewrote my business case from scratch.

The new version was half the length. But it started completely differently.

Page one wasn't about technology. It was about pain.

*"The Mobile Plant Department currently loses approximately $X per month due to unplanned equipment downtime. Root cause analysis indicates that 40% of these incidents could be prevented with better data visibility and predictive maintenance capabilities."*

Then I showed what "better" looked like. Concrete examples. Visual mockups. Comparable results from similar implementations.

Then — and only then — I talked about the solution.

The new proposal was approved in one meeting.

## The Framework

Here's the structure I use now for every business case:

### 1. Start with the Problem (25% of your document)

Executives don't wake up thinking about technology. They think about results. Start with a problem they already care about.

- What's the pain point?
- How much is it costing? (Quantify if possible)
- Why is it happening?
- Who is affected?

### 2. Show What Good Looks Like (25%)

Paint a picture of the future state. Make it concrete and visual.

- What does success look like?
- How will people's lives be different?
- What metrics will improve?
- Include mockups or examples if possible

### 3. Propose Your Solution (25%)

Now you can talk about the technology. But keep it high-level.

- What are you proposing?
- Why this approach over alternatives?
- What's the timeline?
- What resources do you need?

### 4. Address Risks and Objections (15%)

Anticipate concerns before they're raised. This builds credibility.

- What could go wrong?
- How will you mitigate those risks?
- What's the backup plan?

### 5. Make the Ask (10%)

Be explicit about what you need.

- What's the decision you're asking for?
- What's the budget/resources/timeline approval required?
- What are the next steps?

## The Secret Sauce

Here's what I've learned makes the difference between proposals that succeed and proposals that don't:

### Speak their language

Technical people love technical details. Executives don't. They care about outcomes, risks, and resource requirements.

I made this mistake a lot early on. I'd explain the architecture, the data model, the integration patterns. Eyes would glaze over.

Now I translate everything into business impact. "Automated data pipeline" becomes "reduce manual work by 17 hours per week." "Dataverse integration" becomes "single source of truth for equipment status."

### Quantify everything

"This will save time" is weak. "This will save 17 hours per week, equivalent to $X annually" is strong.

Numbers create credibility. They make your proposal comparable to alternatives. They give executives something concrete to evaluate.

If you can't quantify something, you probably don't understand it well enough.

### Anticipate objections

Before presenting, I think about every reason someone might say no.

"We tried something like this before and it failed."
"We don't have budget for this right now."
"This sounds risky."
"Why is this more important than other priorities?"

Then I address those objections preemptively. It shows you've thought things through.

### Make it easy to say yes

Some proposals require massive commitments upfront. Those are hard to approve.

Better approach: propose a phased implementation. Start with a low-risk pilot. Define clear go/no-go criteria. Make the first "yes" small and reversible.

## The Real Secret

Here's what I've learned after writing a lot of business cases: the document itself rarely convinces anyone.

The real work happens before the presentation. Building relationships. Understanding stakeholder concerns. Getting informal buy-in from key players. Socializing the idea informally before making a formal ask.

By the time I present a business case now, I already know how it's going to go. The presentation is just the formality.

## Results

Using this approach, I've secured buy-in for:

- Microsoft Power Platform rollout (40% productivity increase projected)
- $200M budget model for Mobile Plant Department
- Data governance standards across multiple teams
- Multiple process automation initiatives

None of these happened because of brilliant technical proposals. They happened because I understood what decision-makers actually care about.

---

*Building a business case right now? Feel free to reach out — I'm always happy to be a sounding board.*
    `
  },
  {
    id: "data-analyst-career-reflections",
    title: "5 Years In: What I Wish I Knew as a Graduate",
    date: "September 2023",
    readTime: "10 min read",
    category: "Career & Strategy",
    excerpt: "Honest reflections on building a data career in Sydney — the wins, the mistakes, and the advice I'd give my younger self.",
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop",
    content: `
## Five Years Already?

I graduated from UOW in 2020 with a Computer Science degree and a vague idea that I wanted to "work with data." Five years later, I've worked across healthcare, consulting, and infrastructure. I've built pipelines, automated processes, supported massive tenders, and occasionally broken production systems.

Here's what I've learned.

## Thing #1: Technical Skills Are Table Stakes

When I started, I thought being good at SQL and Python would be enough. It's not.

Don't get me wrong — technical skills matter. You need them to get hired. But they're not what makes you valuable.

What makes you valuable is understanding the business. Knowing why certain data matters. Seeing the connection between your analysis and actual decisions. Communicating in ways that non-technical people understand.

The analysts I've seen plateau are usually the ones who stay in their technical bubble. The ones who advance are the ones who treat technical skills as a tool for solving business problems, not an end in themselves.

## Thing #2: Your First Job Probably Won't Be Your Dream Job

My first role at DTA wasn't glamorous. I was doing survey data entry, basic cleaning, and simple analysis. A lot of it was tedious.

But I learned so much.

I learned how data actually flows through an organization. I learned to spot data quality issues. I learned to present to executives. I learned that "boring" work can have real impact.

Every job teaches you something if you're paying attention. The question isn't "Is this job perfect?" It's "What can I learn here that I'll need later?"

## Thing #3: The Best Opportunities Come from Saying Yes

When I was at IHMS, someone asked if I could help with a tender response. It wasn't technically my job. It meant extra work. The $500M tender felt way above my pay grade.

I said yes anyway.

That project taught me more about stakeholder management, documentation, and high-stakes delivery than anything else in my career. It also led directly to my role at Snowy 2.0.

Most of my career progression has come from volunteering for things that weren't strictly in my job description. Scary opportunities usually turn out to be good ones.

## Thing #4: Documentation Is a Superpower

I know, I know. Nobody wants to hear "documentation is important."

But here's the thing: good documentation makes you irreplaceable. It shows you think beyond the immediate task. It makes it possible for others to use and extend your work.

And practically speaking, it saves your future self. I can't count the number of times I've gone back to code I wrote six months ago and had no idea what it did. The times I documented things properly? Smooth sailing.

Document your assumptions. Document your decisions. Document why things are the way they are, not just what they are.

## Thing #5: Relationships > Skills

This was hard for me to accept. I'm an introvert. I'd rather debug code than attend networking events.

But the reality is: most opportunities come through people.

My role at IHMS came through a university connection. My consulting work came through a friend of a friend. My current role at Snowy 2.0 came through someone I'd worked with previously.

You don't need to be a social butterfly. But you do need to maintain relationships. Stay in touch with former colleagues. Be helpful when people ask for advice. Show up to occasional industry events. It compounds over time.

## Thing #6: Imposter Syndrome Never Fully Goes Away

Five years in, I still have moments where I feel like I don't belong. Where I'm waiting for someone to realize I don't know what I'm doing.

The thing is, almost everyone feels this way. The senior people just hide it better.

What I've learned is to reframe it: feeling uncertain usually means you're learning something new. If you always felt confident, you'd be in your comfort zone. That's not where growth happens.

## Thing #7: Take Care of Yourself

I burned out once. It wasn't dramatic — I didn't collapse or quit. I just stopped caring. I was going through the motions, doing the minimum, counting down to weekends.

It took me months to realize what was happening and longer to recover.

What I learned: sustainability matters more than intensity. Working 70-hour weeks might seem impressive, but it's not productive long-term. Setting boundaries isn't lazy — it's professional.

Now I'm ruthless about protecting my time. I have hard stops. I take real breaks. I actually use my annual leave. It makes me better at my job, not worse.

## Advice for New Graduates

If I could go back and talk to myself in 2020, here's what I'd say:

1. **Learn SQL deeply.** It's the foundation of everything.

2. **Pick up Python.** It's more versatile than you think.

3. **Practice explaining technical concepts simply.** This skill will serve you forever.

4. **Say yes to opportunities that scare you.** That's where growth happens.

5. **Build relationships deliberately.** Stay in touch with people.

6. **Don't expect your first job to be perfect.** Learn what you can and move on when ready.

7. **Document your work.** Future you will be grateful.

8. **Take care of yourself.** This is a marathon, not a sprint.

## What's Next?

Honestly? I don't know.

Five years ago, I couldn't have predicted where I'd be now. Probably whatever I imagine for the next five years will be equally wrong.

What I do know is that I want to keep learning. Keep building things that matter. Keep working with good people on hard problems.

If you're just starting out: welcome. The data world needs good people. It won't always be easy, but it's usually interesting. And that's worth something.

---

*Questions about getting started in data? I remember how confusing it was — happy to chat if I can help.*
    `
  }
];
