import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  PieChart, Pie, Cell
} from 'recharts';

// Impact Data - Real achievements
const savingsData = [
  { category: 'Snowy 2.0\nAutomation', value: 50, detail: 'Process automation savings' },
  { category: 'IHMS\nReporting', value: 36, detail: '$36K annual + $15K revenue' },
  { category: 'DTA\nAutomation', value: 14, detail: 'Data collection automation' },
  { category: 'SME\nDigital', value: 25, detail: '500 hrs/year @ $50/hr' },
];

const careerGrowthData = [
  { year: '2021', projects: 3, impact: 20, role: 'Data Analyst' },
  { year: '2022', projects: 8, impact: 45, role: 'Business Analyst' },
  { year: '2023', projects: 15, impact: 70, role: 'BA / PM' },
  { year: '2024', projects: 22, impact: 95, role: 'Business Data Analyst' },
  { year: '2025', projects: 28, impact: 100, role: 'Senior BA' },
];

const skillsRadarData = [
  { skill: 'Power BI', level: 95 },
  { skill: 'SQL', level: 92 },
  { skill: 'Python', level: 85 },
  { skill: 'Power Platform', level: 90 },
  { skill: 'SAP', level: 80 },
  { skill: 'Process Design', level: 88 },
  { skill: 'Stakeholder Mgmt', level: 92 },
  { skill: 'Azure', level: 78 },
];

const toolsBreakdown = [
  { name: 'Power BI', value: 30, color: '#F2C811' },
  { name: 'SQL/SSIS', value: 25, color: '#CC2927' },
  { name: 'Power Platform', value: 20, color: '#742774' },
  { name: 'Python', value: 15, color: '#3776AB' },
  { name: 'SAP/ERP', value: 10, color: '#0FAAFF' },
];

const experiences = [
  {
    company: 'Future Generation JV - Snowy 2.0',
    role: 'Business Data Analyst',
    department: 'Mobile Plant Department',
    period: '2024 - Present',
    color: 'from-blue-500 to-cyan-500',
    highlights: [
      { metric: '10%', label: 'Downtime Reduction', desc: 'SAP to Dataverse pipeline for real-time tracking' },
      { metric: '17hrs', label: 'Weekly Savings', desc: '5+ Power BI dashboards replacing manual Excel' },
      { metric: '80%', label: 'Less Emails', desc: 'Power Apps workflow automation' },
      { metric: '$200M', label: 'Budget Model', desc: 'Predictive EAC model for OpEx forecasting' },
    ],
    achievements: [
      'Architected automated SAP to Dataverse pipeline combining 5 data sources',
      'Led BA process for 5+ dashboards (downtime, maintenance, utilisation)',
      'Established data governance with RACI frameworks',
      'Built business case securing Power Platform rollout with 40% productivity gains',
    ]
  },
  {
    company: 'International Health & Medical Services',
    role: 'Business Analyst',
    department: 'Performance Management Team',
    period: '2022 - 2024',
    color: 'from-emerald-500 to-teal-500',
    highlights: [
      { metric: '$51K', label: 'Annual Impact', desc: '$36K savings + $15K new revenue' },
      { metric: '$500M', label: 'Tender Support', desc: 'Performance data analysis & compliance' },
      { metric: '60%', label: 'Faster Reports', desc: 'SQL optimization & indexing strategies' },
      { metric: '20', label: 'SSRS Reports', desc: 'Requirements to production delivery' },
    ],
    achievements: [
      'Engineered SQL Server + Power BI solutions for government KPI compliance',
      'Led data integration connecting clinical CRM with reporting warehouse via SSIS',
      'Developed predictive demand model optimising staffing while maintaining SLAs',
      'Managed relationships with ABF and Home Affairs officials',
    ]
  },
  {
    company: 'Gaxa Consulting Australia',
    role: 'Business Analyst / Project Manager',
    department: 'Consulting',
    period: '2021 - 2023',
    color: 'from-purple-500 to-pink-500',
    highlights: [
      { metric: '500hrs', label: 'Saved Yearly', desc: 'Automated ordering & invoicing system' },
      { metric: '4', label: 'Team Led', desc: 'End-to-end implementation over 3 months' },
      { metric: '~0%', label: 'Error Rate', desc: 'Automated calculations & validations' },
      { metric: '100%', label: 'Self-Sufficient', desc: 'Complete knowledge transfer to client' },
    ],
    achievements: [
      'Led team of 4 through full digital transformation for SME client',
      'Conducted discovery workshops to map manual workflows',
      'Configured system integration with standardised templates',
      'Delivered hands-on training ensuring post-implementation success',
    ]
  },
  {
    company: 'Dementia Training Australia',
    role: 'Data Analyst',
    department: 'Research & Analytics',
    period: '2021 - 2022',
    color: 'from-orange-500 to-red-500',
    highlights: [
      { metric: '$14K', label: 'Annual Savings', desc: 'VBA & Qualtrics automation' },
      { metric: '20K+', label: 'Learners', desc: 'Survey analysis across Australia' },
      { metric: '6', label: 'Branches', desc: 'Standardised data formats nationwide' },
      { metric: 'Live', label: 'Dashboard', desc: 'National coverage with ABS geospatial' },
    ],
    achievements: [
      'Automated data collection/cleaning with Excel VBA and Python',
      'Built national coverage dashboard using ABS geospatial data',
      'Applied statistical analyses via SPSS for branch directors',
      'Prepared C-level presentations on growth and inefficiencies',
    ]
  },
];

const blogPosts = [
  {
    title: "How I Saved 17 Hours/Week at Snowy 2.0",
    excerpt: "Manual Excel reports were killing productivity. Here's how I built 5 Power BI dashboards that changed everything for the Mobile Plant team...",
    date: "Jan 2025",
    tags: ["Power BI", "Automation", "Case Study"],
    readTime: "6 min",
    emoji: "⚡"
  },
  {
    title: "SAP to Dataverse: A Love Story",
    excerpt: "Connecting legacy SAP data with modern Power Platform. The challenges, the wins, and why real-time inventory tracking matters on a $12B project...",
    date: "Dec 2024",
    tags: ["SAP", "Power Platform", "Integration"],
    readTime: "8 min",
    emoji: "🔗"
  },
  {
    title: "The Art of the Business Case",
    excerpt: "How to convince management to invest in data initiatives. My framework for quantifying 'soft' benefits and getting that 40% productivity gain approved...",
    date: "Nov 2024",
    tags: ["Strategy", "Leadership", "Tips"],
    readTime: "5 min",
    emoji: "📊"
  },
  {
    title: "From Healthcare to Construction",
    excerpt: "Switching industries taught me that good data practices are universal. Here's what translates and what you need to learn fresh...",
    date: "Oct 2024",
    tags: ["Career", "Healthcare", "Construction"],
    readTime: "4 min",
    emoji: "🏗️"
  },
];

const certifications = [
  { name: 'Microsoft Power Platform Functional Consultant', code: 'PL-200', icon: '🏆' },
  { name: 'BCG Strategy Consulting', code: 'Virtual Internship', icon: '📈' },
  { name: 'KPMG Data Analytics', code: 'Virtual Internship', icon: '📊' },
];

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeExperience, setActiveExperience] = useState(0);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="font-bold text-xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            MN<span className="text-slate-500">.</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8">
            {['home', 'about', 'experience', 'projects', 'blog', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize text-sm transition-colors hover:text-cyan-400 ${
                  activeSection === item ? 'text-cyan-400' : 'text-slate-400'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-4">
            {['home', 'about', 'experience', 'projects', 'blog', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left py-2 capitalize text-slate-400 hover:text-cyan-400"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-slate-800/50 rounded-full px-4 py-2 mb-6 border border-slate-700">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-slate-400">Open to opportunities</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  Michael
                </span>
                <br />
                <span className="text-white">Nguyen</span>
              </h1>
              
              <p className="text-xl text-slate-400 mb-6">
                Business & Data Analyst based in <span className="text-cyan-400">Sydney</span> 🇦🇺
              </p>
              
              <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                5+ years turning messy data into <span className="text-white">$100K+ annual savings</span>. 
                Currently making Snowy 2.0 run smoother, one dashboard at a time.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Let's Chat ☕
                </button>
                <button 
                  onClick={() => scrollToSection('experience')}
                  className="px-6 py-3 border border-slate-700 rounded-lg font-medium hover:border-cyan-500 transition-colors"
                >
                  View My Work
                </button>
              </div>

              <div className="flex gap-4">
                <a href="mailto:duongnq2k1@gmail.com" className="text-slate-500 hover:text-cyan-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/michaelnguyen" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="tel:0423110760" className="text-slate-500 hover:text-cyan-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Impact Stats Visualization */}
            <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-slate-300">💰 Proven Impact (Annual Savings $K)</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={savingsData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis type="number" stroke="#64748b" />
                  <YAxis dataKey="category" type="category" stroke="#64748b" width={80} tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#94a3b8' }}
                  />
                  <Bar dataKey="value" fill="url(#blueGradient)" radius={[0, 4, 4, 0]} />
                  <defs>
                    <linearGradient id="blueGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
              <p className="text-center text-slate-500 text-sm mt-2">
                $100K+ total documented savings across roles
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2">About Me</h2>
          <p className="text-slate-500 mb-12">The quick version ☕</p>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="prose prose-invert">
                <p className="text-slate-400 text-lg leading-relaxed mb-6">
                  G'day! I'm Michael — a <span className="text-white">Business & Data Analyst</span> who genuinely 
                  gets excited when I can turn a 17-hour manual Excel nightmare into an automated dashboard 
                  that updates itself.
                </p>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Currently working on <span className="text-cyan-400">Australia's largest renewable energy project</span> (Snowy 2.0), 
                  where I bridge the gap between SAP, Power Platform, and humans who just want their data to make sense.
                </p>
                <p className="text-slate-400 leading-relaxed mb-8">
                  I've worked across <span className="text-white">healthcare, construction, and consulting</span> — 
                  which taught me that good data practices are universal, but stakeholder management is an art form 
                  that changes with every industry. 
                </p>
              </div>

              {/* Certifications */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Credentials</h3>
                {certifications.map((cert, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                    <span className="text-2xl">{cert.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-white">{cert.name}</p>
                      <p className="text-xs text-slate-500">{cert.code}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {/* Skills Radar */}
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold mb-4">🎯 Skills Radar</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <RadarChart data={skillsRadarData}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="skill" stroke="#64748b" tick={{ fontSize: 11 }} />
                    <PolarRadiusAxis stroke="#334155" domain={[0, 100]} />
                    <Radar
                      name="Skills"
                      dataKey="level"
                      stroke="#06b6d4"
                      fill="#06b6d4"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Tools Pie Chart */}
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold mb-4">🛠️ Daily Toolkit</h3>
                <div className="flex items-center gap-4">
                  <ResponsiveContainer width="50%" height={150}>
                    <PieChart>
                      <Pie
                        data={toolsBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={60}
                        dataKey="value"
                      >
                        {toolsBreakdown.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2">
                    {toolsBreakdown.map((tool, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tool.color }} />
                        <span className="text-slate-400">{tool.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mt-12 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-slate-700">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center text-2xl">
                  🎓
                </div>
                <div>
                  <h3 className="font-semibold text-white">University of Wollongong</h3>
                  <p className="text-slate-400">Bachelor of Computer Science — Big Data / Data Analytics</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-cyan-400">83%</p>
                  <p className="text-xs text-slate-500">WAM</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-cyan-400">Top 5%</p>
                  <p className="text-xs text-slate-500">Dean's Merit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2">Experience</h2>
          <p className="text-slate-500 mb-12">5 years of making data work harder 📈</p>

          {/* Career Growth Chart */}
          <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800 mb-12">
            <h3 className="text-lg font-semibold mb-4">📈 Career Growth</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={careerGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="year" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                />
                <defs>
                  <linearGradient id="impactGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="impact" stroke="#06b6d4" fill="url(#impactGradient)" strokeWidth={2} />
                <Area type="monotone" dataKey="projects" stroke="#3b82f6" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-8 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-cyan-500" />
                <span className="text-slate-400">Impact Score</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-blue-500 border-dashed" style={{ borderTopStyle: 'dashed', borderTopWidth: 2, height: 0, borderColor: '#3b82f6' }} />
                <span className="text-slate-400">Projects Delivered</span>
              </div>
            </div>
          </div>

          {/* Experience Tabs */}
          <div className="flex flex-wrap gap-3 mb-8">
            {experiences.map((exp, i) => (
              <button
                key={i}
                onClick={() => setActiveExperience(i)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  activeExperience === i
                    ? `bg-gradient-to-r ${exp.color} text-white`
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {exp.company.split(' - ')[0]}
              </button>
            ))}
          </div>

          {/* Active Experience Details */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden">
            <div className={`h-2 bg-gradient-to-r ${experiences[activeExperience].color}`} />
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">{experiences[activeExperience].role}</h3>
                  <p className="text-cyan-400">{experiences[activeExperience].company}</p>
                  <p className="text-sm text-slate-500">{experiences[activeExperience].department}</p>
                </div>
                <span className="px-3 py-1 bg-slate-800 rounded-full text-sm text-slate-400">
                  {experiences[activeExperience].period}
                </span>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {experiences[activeExperience].highlights.map((h, i) => (
                  <div key={i} className="bg-slate-800/50 rounded-xl p-4 text-center">
                    <p className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${experiences[activeExperience].color} bg-clip-text text-transparent`}>
                      {h.metric}
                    </p>
                    <p className="text-sm font-medium text-white mt-1">{h.label}</p>
                    <p className="text-xs text-slate-500 mt-1">{h.desc}</p>
                  </div>
                ))}
              </div>

              {/* Achievements */}
              <div>
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Key Achievements</h4>
                <ul className="space-y-3">
                  {experiences[activeExperience].achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className={`mt-1.5 w-2 h-2 rounded-full bg-gradient-to-r ${experiences[activeExperience].color} flex-shrink-0`} />
                      <span className="text-slate-400">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
          <p className="text-slate-500 mb-12">The work I'm most proud of 🚀</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Project 1 */}
            <div className="group bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden hover:border-cyan-500/50 transition-colors">
              <div className="h-40 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                <span className="text-6xl">⚡</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">Power Platform</span>
                  <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded">SAP</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Snowy 2.0 Data Pipeline</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Architected SAP to Dataverse integration combining 5 data sources for real-time inventory tracking on Australia's largest renewable project.
                </p>
                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="text-cyan-400 font-bold">10%</span>
                    <span className="text-slate-500 ml-1">Less Downtime</span>
                  </div>
                  <div>
                    <span className="text-cyan-400 font-bold">5</span>
                    <span className="text-slate-500 ml-1">Data Sources</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden hover:border-emerald-500/50 transition-colors">
              <div className="h-40 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                <span className="text-6xl">📊</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded">Power BI</span>
                  <span className="px-2 py-1 bg-teal-500/20 text-teal-400 text-xs rounded">SQL</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Government KPI Compliance</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Built SQL Server + Power BI reporting solution for IHMS to monitor healthcare KPIs, resulting in direct cost savings and new revenue.
                </p>
                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="text-emerald-400 font-bold">$51K</span>
                    <span className="text-slate-500 ml-1">Annual Impact</span>
                  </div>
                  <div>
                    <span className="text-emerald-400 font-bold">60%</span>
                    <span className="text-slate-500 ml-1">Faster Reports</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden hover:border-purple-500/50 transition-colors">
              <div className="h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <span className="text-6xl">🤖</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">Power Apps</span>
                  <span className="px-2 py-1 bg-pink-500/20 text-pink-400 text-xs rounded">Power Automate</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Workflow Automation Suite</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Delivered automated requests workflow using Power Apps with Dataverse backend, eliminating email chaos and adding progression tracking.
                </p>
                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="text-purple-400 font-bold">80%</span>
                    <span className="text-slate-500 ml-1">Less Emails</span>
                  </div>
                  <div>
                    <span className="text-purple-400 font-bold">40%</span>
                    <span className="text-slate-500 ml-1">Productivity Up</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 4 */}
            <div className="group bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden hover:border-orange-500/50 transition-colors">
              <div className="h-40 bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                <span className="text-6xl">🗺️</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded">Power BI</span>
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">ABS Data</span>
                </div>
                <h3 className="text-xl font-bold mb-2">National Coverage Dashboard</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Built live analytical dashboard for Dementia Training Australia using ABS geospatial data, covering 20K+ learners across all branches.
                </p>
                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="text-orange-400 font-bold">20K+</span>
                    <span className="text-slate-500 ml-1">Learners</span>
                  </div>
                  <div>
                    <span className="text-orange-400 font-bold">6</span>
                    <span className="text-slate-500 ml-1">Branches</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2">Blog & Thoughts</h2>
          <p className="text-slate-500 mb-12">Sharing what I've learned along the way ✍️</p>

          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts.map((post, i) => (
              <article 
                key={i}
                className="group bg-slate-900/50 rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{post.emoji}</span>
                  <span className="text-xs text-slate-500">{post.date} · {post.readTime}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, j) => (
                    <span key={j} className="px-2 py-1 bg-slate-800 text-slate-500 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* Hosting Info Card */}
          <div className="mt-12 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold mb-4">🌐 How This Site is Hosted</h3>
            <p className="text-slate-400 mb-4">
              Fun fact: This portfolio runs on <span className="text-cyan-400 font-medium">Vercel's free tier</span> — 
              perfect for React/Vite sites. Zero cost, auto-deploys from GitHub, and fast globally.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="font-medium text-white">Vercel</p>
                <p className="text-green-400 text-sm">Free</p>
                <p className="text-xs text-slate-500">My choice — simple & fast</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="font-medium text-white">Cloudflare Pages</p>
                <p className="text-green-400 text-sm">Free</p>
                <p className="text-xs text-slate-500">Best CDN performance</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="font-medium text-white">Custom Domain</p>
                <p className="text-yellow-400 text-sm">~$12/year</p>
                <p className="text-xs text-slate-500">michaelnguyen.dev</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">Let's Connect</h2>
          <p className="text-slate-500 mb-12 text-center">
            Always happy to chat about data, automation, or just grab a coffee ☕
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="font-semibold mb-4">📍 Based in</h3>
                <p className="text-slate-400">Lidcombe, Sydney NSW 2141</p>
              </div>
              
              <a href="mailto:duongnq2k1@gmail.com" className="block bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-cyan-500/50 transition-colors">
                <h3 className="font-semibold mb-2">✉️ Email</h3>
                <p className="text-cyan-400">duongnq2k1@gmail.com</p>
              </a>
              
              <a href="tel:0423110760" className="block bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-cyan-500/50 transition-colors">
                <h3 className="font-semibold mb-2">📱 Phone</h3>
                <p className="text-cyan-400">0423 110 760</p>
              </a>
              
              <a href="https://linkedin.com/in/michaelnguyen" target="_blank" rel="noopener noreferrer" className="block bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-cyan-500/50 transition-colors">
                <h3 className="font-semibold mb-2">💼 LinkedIn</h3>
                <p className="text-cyan-400">Connect with me</p>
              </a>
            </div>

            {/* Contact Form */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Name</label>
                <input 
                  type="text"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Email</label>
                <input 
                  type="email"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">What's this about?</label>
                <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors">
                  <option>Job Opportunity</option>
                  <option>Consulting Project</option>
                  <option>Just Saying Hi</option>
                  <option>Coffee Chat ☕</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Message</label>
                <textarea 
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors h-32 resize-none"
                  placeholder="Tell me what's on your mind..."
                />
              </div>
              <button 
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Send Message 🚀
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            Built with React + Tailwind by Michael Nguyen © {new Date().getFullYear()}
          </p>
          <p className="text-slate-600 text-xs mt-2">
            Hosted on Vercel · Source on GitHub
          </p>
        </div>
      </footer>
    </div>
  );
}
