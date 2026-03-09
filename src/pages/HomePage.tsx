import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Mail, Phone, Linkedin, MapPin, Send, ChevronRight,
  Award, GraduationCap, ArrowRight, Calendar, Clock
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, Radar,
  PieChart, Pie, Cell
} from 'recharts';
import { projects } from '../data/projects';
import { blogPosts } from '../data/blogs';

// Data for charts
const savingsData = [
  { company: 'DTA', amount: 14, color: '#06b6d4' },
  { company: 'IHMS', amount: 51, color: '#3b82f6' },
  { company: 'Gaxa', amount: 25, color: '#8b5cf6' },
  { company: 'Snowy', amount: 80, color: '#10b981' },
];

const careerGrowthData = [
  { year: '2021', projects: 3, impact: 14 },
  { year: '2022', projects: 8, impact: 40 },
  { year: '2023', projects: 15, impact: 91 },
  { year: '2024', projects: 22, impact: 170 },
];

const skillsRadarData = [
  { skill: 'SQL/Data', value: 95 },
  { skill: 'Power BI', value: 92 },
  { skill: 'Python', value: 80 },
  { skill: 'Stakeholder Mgmt', value: 88 },
  { skill: 'Business Analysis', value: 90 },
  { skill: 'Process Design', value: 85 },
];

const toolsData = [
  { name: 'Power Platform', value: 30, color: '#06b6d4' },
  { name: 'SQL Server', value: 25, color: '#3b82f6' },
  { name: 'Python', value: 20, color: '#10b981' },
  { name: 'SAP', value: 15, color: '#8b5cf6' },
  { name: 'Excel/VBA', value: 10, color: '#f59e0b' },
];

const experiences = [
  {
    company: 'Snowy 2.0 - Future Generation JV',
    role: 'Business Data Analyst',
    period: '2024 - Present',
    location: 'Mobile Plant Department',
    color: 'cyan',
    highlights: [
      'Architected SAP to Dataverse pipeline combining 5 data sources',
      'Led BA process for 5+ Power BI dashboards, saving 17 hrs/week',
      'Built $200M OpEx predictive budget model (EAC)',
      'Established data governance standards (RACI framework)',
      'Delivered 40% productivity increase business case',
    ],
    metrics: [
      { label: 'Downtime Reduction', value: '10%' },
      { label: 'Weekly Hours Saved', value: '17' },
      { label: 'Budget Managed', value: '$200M' },
    ]
  },
  {
    company: 'International Health & Medical Services',
    role: 'Business Analyst',
    period: '2022 - 2024',
    location: 'Performance Management Team',
    color: 'blue',
    highlights: [
      'Built SQL/Power BI reporting for government KPI compliance',
      'Supported $500M tender with 5-year performance analysis',
      'Led data integration connecting clinical CRM to warehouse',
      'Optimised SQL procedures, reducing runtime by 60%',
      'Managed relationships with ABF and Home Affairs officials',
    ],
    metrics: [
      { label: 'Annual Savings', value: '$36K' },
      { label: 'Additional Revenue', value: '$15K' },
      { label: 'Tender Supported', value: '$500M' },
    ]
  },
  {
    company: 'Gaxa Consulting Australia',
    role: 'Business Analyst / Project Manager',
    period: '2021 - 2023',
    location: 'Consulting',
    color: 'purple',
    highlights: [
      'Led team of 4 through end-to-end invoicing automation',
      'Conducted discovery workshops and mapped workflows',
      'Configured system integration with validation rules',
      'Delivered training and knowledge transfer to client staff',
    ],
    metrics: [
      { label: 'Hours Saved/Year', value: '500' },
      { label: 'Team Size', value: '4' },
      { label: 'Error Rate', value: '~0%' },
    ]
  },
  {
    company: 'Dementia Training Australia',
    role: 'Data Analyst',
    period: '2021 - 2022',
    location: 'National Coverage',
    color: 'green',
    highlights: [
      'Automated data collection with Excel VBA and Python',
      'Built national coverage dashboard with ABS geospatial data',
      'Analysed surveys from 20,000+ enrolled learners',
      'Presented insights to C-level executives',
      'Worked in Agile/Scrum environment',
    ],
    metrics: [
      { label: 'Annual Savings', value: '$14K' },
      { label: 'Learners Analysed', value: '20K+' },
      { label: 'Branches', value: 'All AU' },
    ]
  }
];

const navItems = ['Home', 'About', 'Experience', 'Projects', 'Blog', 'Contact'];

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeExperience, setActiveExperience] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Handle hash navigation from other pages
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.toLowerCase()));
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach((section, index) => {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(navItems[index].toLowerCase());
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string }> = {
      cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
      blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
      purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
      green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' },
    };
    return colors[color] || colors.cyan;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="#home" className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              MN
            </a>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.toLowerCase() 
                      ? 'text-cyan-400' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900 border-b border-slate-800 py-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-6 py-3 text-slate-300 hover:text-white hover:bg-slate-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="blob absolute top-20 -left-32 w-96 h-96 bg-cyan-500/20 blur-3xl animate-float" />
          <div className="blob absolute bottom-20 -right-32 w-96 h-96 bg-blue-500/20 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700 mb-6">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-slate-300">Sydney, Australia</span>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                G'day, I'm{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Michael
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-400 mb-6">
                Business & Data Analyst
              </p>
              
              <p className="text-slate-400 text-lg mb-8 max-w-lg leading-relaxed">
                5+ years turning messy data into clear decisions. I've helped organisations save{' '}
                <span className="text-cyan-400 font-semibold">$100K+</span> annually, supported{' '}
                <span className="text-cyan-400 font-semibold">$500M</span> tenders, and built systems 
                that actually make people's jobs easier.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <a 
                  href="#contact"
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  Let's Talk <ChevronRight className="w-4 h-4" />
                </a>
                <a 
                  href="#projects"
                  className="px-6 py-3 border border-slate-700 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
                >
                  View Projects
                </a>
              </div>

              <div className="flex items-center gap-4 text-slate-500">
                <a href="https://linkedin.com/in/duongnguyen2001" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="mailto:duongnq2k1@gmail.com" className="hover:text-cyan-400 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
                <span className="text-slate-600">|</span>
                <span className="text-sm">PL-200 Certified</span>
              </div>
            </div>

            {/* Impact Chart */}
            <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-slate-300">Impact Across Roles ($K Saved/Generated)</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={savingsData} layout="vertical">
                  <XAxis type="number" stroke="#64748b" fontSize={12} />
                  <YAxis type="category" dataKey="company" stroke="#64748b" fontSize={12} width={60} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#e2e8f0' }}
                    formatter={(value) => [`$${value}K`, 'Impact']}
                  />
                  <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                    {savingsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            About Me
          </h2>
          <p className="text-slate-400 text-center mb-16 max-w-2xl mx-auto">
            The short version: I make data useful. The longer version? Read on.
          </p>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Story */}
            <div>
              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  I'm a Business & Data Analyst based in Lidcombe, Sydney. After graduating with 
                  Distinction from UOW (Computer Science, Big Data major — shoutout to the Dean's 
                  Merit Award), I've spent the last five years helping organisations across healthcare, 
                  consulting, and infrastructure make sense of their data.
                </p>
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  Currently, I'm at Snowy 2.0 — yes, that Snowy 2.0 — where I'm building data 
                  systems for one of Australia's biggest infrastructure projects. Before that, 
                  I helped IHMS navigate government compliance, led digital transformation at 
                  a consulting firm, and mapped dementia training coverage across the entire country.
                </p>
                <p className="text-slate-300 text-lg leading-relaxed">
                  What I've learned: technical skills matter, but understanding people matters more. 
                  The best dashboard in the world is useless if nobody uses it.
                </p>
              </div>

              {/* Quick Facts */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                  <GraduationCap className="w-6 h-6 text-cyan-400 mb-2" />
                  <div className="text-sm text-slate-400">UOW Graduate</div>
                  <div className="font-semibold">Distinction (83% WAM)</div>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                  <Award className="w-6 h-6 text-cyan-400 mb-2" />
                  <div className="text-sm text-slate-400">Certified</div>
                  <div className="font-semibold">PL-200 Functional</div>
                </div>
              </div>

              {/* Internships */}
              <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20">
                <div className="text-sm text-cyan-400 mb-2">Notable Internships</div>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-slate-800 rounded-full text-sm">BCG Strategy Consulting</span>
                  <span className="px-3 py-1 bg-slate-800 rounded-full text-sm">KPMG Data Analytics</span>
                </div>
              </div>
            </div>

            {/* Skills & Tools */}
            <div className="space-y-6">
              {/* Skills Radar */}
              <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
                <h3 className="text-lg font-semibold mb-4">Core Competencies</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <RadarChart data={skillsRadarData}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="skill" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <Radar name="Skills" dataKey="value" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Tools Distribution */}
              <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
                <h3 className="text-lg font-semibold mb-4">Daily Tools</h3>
                <div className="flex items-center gap-4">
                  <ResponsiveContainer width="50%" height={150}>
                    <PieChart>
                      <Pie
                        data={toolsData}
                        innerRadius={35}
                        outerRadius={60}
                        dataKey="value"
                        stroke="none"
                      >
                        {toolsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2">
                    {toolsData.map((tool) => (
                      <div key={tool.name} className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tool.color }} />
                        <span className="text-slate-400">{tool.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-2">
                {['Power BI', 'SQL', 'Python', 'Power Platform', 'SAP', 'SSIS/ETL', 'Agile/Scrum', 'BPMN 2.0', 'Azure'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-slate-800/50 text-slate-300 text-sm rounded-full border border-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Experience
          </h2>
          <p className="text-slate-400 text-center mb-16 max-w-2xl mx-auto">
            From healthcare to heavy machinery — here's where I've made an impact.
          </p>

          {/* Career Growth Chart */}
          <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800 mb-12">
            <h3 className="text-lg font-semibold mb-4">Growth Journey</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={careerGrowthData}>
                <defs>
                  <linearGradient id="impactGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="impact" stroke="#06b6d4" fill="url(#impactGradient)" name="Cumulative Impact ($K)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Experience Tabs */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Tab Buttons */}
            <div className="space-y-2">
              {experiences.map((exp, index) => (
                <button
                  key={exp.company}
                  onClick={() => setActiveExperience(index)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    activeExperience === index 
                      ? `${getColorClasses(exp.color).bg} ${getColorClasses(exp.color).border}` 
                      : 'bg-slate-900/30 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className={`font-semibold ${activeExperience === index ? getColorClasses(exp.color).text : 'text-white'}`}>
                    {exp.company.split(' - ')[0]}
                  </div>
                  <div className="text-sm text-slate-400">{exp.period}</div>
                </button>
              ))}
            </div>

            {/* Active Experience Detail */}
            <div className="lg:col-span-2 bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
              <div className="mb-6">
                <h3 className={`text-xl font-bold ${getColorClasses(experiences[activeExperience].color).text}`}>
                  {experiences[activeExperience].role}
                </h3>
                <div className="text-slate-400">
                  {experiences[activeExperience].company} • {experiences[activeExperience].location}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {experiences[activeExperience].metrics.map((metric) => (
                  <div key={metric.label} className="text-center p-3 bg-slate-800/50 rounded-lg">
                    <div className={`text-xl font-bold ${getColorClasses(experiences[activeExperience].color).text}`}>
                      {metric.value}
                    </div>
                    <div className="text-xs text-slate-400">{metric.label}</div>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <ul className="space-y-3">
                {experiences[activeExperience].highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <ChevronRight className={`w-4 h-4 mt-1 flex-shrink-0 ${getColorClasses(experiences[activeExperience].color).text}`} />
                    <span className="text-slate-300">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Featured Projects
          </h2>
          <p className="text-slate-400 text-center mb-16 max-w-2xl mx-auto">
            Real problems, real solutions, real impact. Click to read the full story.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                className="group bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.heroImage} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-slate-800 text-xs text-slate-400 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {project.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      {project.impact.slice(0, 2).map((metric) => (
                        <div key={metric.label}>
                          <div className="text-cyan-400 font-bold">{metric.value}</div>
                          <div className="text-xs text-slate-500">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-24 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Blog
          </h2>
          <p className="text-slate-400 text-center mb-16 max-w-2xl mx-auto">
            Thoughts on data, career, and everything in between. Mostly written at 11pm.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="h-40 overflow-hidden">
                  <img 
                    src={post.coverImage} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                    <span className="text-cyan-400">{post.category}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Get in Touch
          </h2>
          <p className="text-slate-400 text-center mb-16 max-w-2xl mx-auto">
            Got a project in mind? Want to chat about data? Or just want to say g'day? 
            I'm always happy to connect.
          </p>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
                <h3 className="text-lg font-semibold mb-6">Contact Details</h3>
                <div className="space-y-4">
                  <a href="mailto:duongnq2k1@gmail.com" className="flex items-center gap-4 text-slate-300 hover:text-cyan-400 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Email</div>
                      <div>duongnq2k1@gmail.com</div>
                    </div>
                  </a>
                  <a href="tel:0423110760" className="flex items-center gap-4 text-slate-300 hover:text-cyan-400 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Phone</div>
                      <div>0423 110 760</div>
                    </div>
                  </a>
                  <a href="https://linkedin.com/in/duongnguyen2001" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-slate-300 hover:text-cyan-400 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                      <Linkedin className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">LinkedIn</div>
                      <div>linkedin.com/in/duongnguyen2001</div>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Location</div>
                      <div>Lidcombe 2141, Sydney</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 border border-cyan-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-semibold">Currently Open to Opportunities</span>
                </div>
                <p className="text-slate-400 text-sm">
                  Interested in contract work, consulting engagements, and full-time roles 
                  in data analytics and business analysis.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <form className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-6">Send a Message</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Project Type</label>
                  <select className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white">
                    <option value="">Select a category</option>
                    <option value="dashboard">Dashboard / BI Development</option>
                    <option value="automation">Process Automation</option>
                    <option value="integration">Data Integration</option>
                    <option value="consulting">Consulting / Advisory</option>
                    <option value="other">Just a Chat</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white resize-none"
                    placeholder="Tell me about your project or just say hello..."
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  Send Message <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-slate-500 text-sm">
              © 2024 Michael Nguyen. Built with React, Tailwind CSS, and too much coffee.
            </div>
            <div className="flex items-center gap-6">
              <a href="https://linkedin.com/in/duongnguyen2001" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:duongnq2k1@gmail.com" className="text-slate-500 hover:text-cyan-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
