import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Building2, CheckCircle2, Lightbulb, Quote } from 'lucide-react';
import { projects } from '../data/projects';

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link to="/" className="text-cyan-400 hover:text-cyan-300">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-sm rounded-full border border-cyan-500/20">
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {project.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap gap-6 text-slate-400 mb-8">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              {project.company}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {project.year}
            </div>
          </div>

          {/* Summary */}
          <p className="text-xl text-slate-300 leading-relaxed mb-8">
            {project.summary}
          </p>

          {/* Impact Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {project.impact.map((metric) => (
              <div key={metric.label} className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">{metric.value}</div>
                <div className="text-sm text-slate-400">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-6 mb-16">
        <div className="rounded-2xl overflow-hidden border border-slate-800">
          <img 
            src={project.heroImage} 
            alt={project.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 pb-24">
        {/* The Challenge */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
              <span className="text-red-400">🔥</span>
            </span>
            The Challenge
          </h2>
          <div className="prose prose-invert prose-lg max-w-none">
            {project.story.theChallenge.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-slate-300 leading-relaxed mb-4">{paragraph}</p>
            ))}
          </div>
        </section>

        {/* My Approach */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <span className="text-blue-400">🎯</span>
            </span>
            My Approach
          </h2>
          <div className="prose prose-invert prose-lg max-w-none">
            {project.story.myApproach.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-slate-300 leading-relaxed mb-4">{paragraph}</p>
            ))}
          </div>
        </section>

        {/* The Journey */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <span className="text-purple-400">🛤️</span>
            </span>
            The Journey
          </h2>
          <div className="prose prose-invert prose-lg max-w-none">
            {project.story.theJourney.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-slate-300 leading-relaxed mb-4">{paragraph}</p>
            ))}
          </div>
        </section>

        {/* The Outcome */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <span className="text-green-400">🏆</span>
            </span>
            The Outcome
          </h2>
          <div className="prose prose-invert prose-lg max-w-none">
            {project.story.theOutcome.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-slate-300 leading-relaxed mb-4">{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Lessons Learned */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            <Lightbulb className="w-8 h-8 text-yellow-400" />
            Lessons Learned
          </h2>
          <div className="bg-slate-900/50 rounded-2xl p-6 md:p-8 border border-slate-800">
            <ul className="space-y-4">
              {project.story.lessonsLearned.map((lesson, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-300">{lesson}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Personal Reflection */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            <Quote className="w-8 h-8 text-cyan-400" />
            Personal Reflection
          </h2>
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 md:p-8 border border-cyan-500/20">
            <div className="prose prose-invert prose-lg max-w-none">
              {project.story.personalReflection.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-slate-200 leading-relaxed mb-4 last:mb-0">{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center pt-8 border-t border-slate-800">
          <p className="text-slate-400 mb-6">Want to discuss this project or something similar?</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/#contact" 
              className="px-6 py-3 bg-cyan-500 text-slate-900 font-semibold rounded-lg hover:bg-cyan-400 transition-colors"
            >
              Get in Touch
            </Link>
            <Link 
              to="/#projects" 
              className="px-6 py-3 border border-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              View Other Projects
            </Link>
          </div>
        </section>
      </article>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center text-slate-500">
          <p>© 2024 Michael Nguyen. Built with React, Tailwind CSS, and too much coffee.</p>
        </div>
      </footer>
    </div>
  );
}
