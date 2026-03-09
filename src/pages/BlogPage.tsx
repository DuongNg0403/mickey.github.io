import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { blogPosts } from '../data/blogs';
import ReactMarkdown from 'react-markdown';

export default function BlogPage() {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link to="/" className="text-cyan-400 hover:text-cyan-300">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Get other posts for recommendations
  const otherPosts = blogPosts.filter(p => p.id !== id).slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-24 pb-8">
        <div className="max-w-3xl mx-auto px-6">
          {/* Category */}
          <div className="flex items-center gap-2 mb-6">
            <Tag className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 font-medium">{post.category}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap gap-6 text-slate-400 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
          </div>

          {/* Author */}
          <div className="flex items-center gap-4 pb-8 border-b border-slate-800">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-slate-900 font-bold text-lg">
              MN
            </div>
            <div>
              <div className="font-semibold">Michael Nguyen</div>
              <div className="text-slate-400 text-sm">Business & Data Analyst</div>
            </div>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="rounded-2xl overflow-hidden border border-slate-800">
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 pb-16">
        <div className="prose prose-invert prose-lg max-w-none
          prose-headings:font-bold prose-headings:text-white
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
          prose-strong:text-white prose-strong:font-semibold
          prose-ul:text-slate-300 prose-ol:text-slate-300
          prose-li:mb-2
          prose-code:text-cyan-400 prose-code:bg-slate-800 prose-code:px-2 prose-code:py-0.5 prose-code:rounded
          prose-blockquote:border-l-cyan-400 prose-blockquote:bg-slate-900/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
          prose-hr:border-slate-700
        ">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>

      {/* Author Box */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="bg-slate-900/50 rounded-2xl p-6 md:p-8 border border-slate-800">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-slate-900 font-bold text-2xl flex-shrink-0">
              MN
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Written by Michael Nguyen</h3>
              <p className="text-slate-400 mb-4">
                Business & Data Analyst based in Sydney with 5+ years of experience across healthcare, 
                construction, and consulting. I write about data, career growth, and the occasional technical deep-dive.
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://linkedin.com/in/duongnguyen2001" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  LinkedIn →
                </a>
                <a 
                  href="mailto:duongnq2k1@gmail.com"
                  className="text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  Email →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Posts */}
      {otherPosts.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 pb-16">
          <h2 className="text-2xl font-bold mb-8">More Posts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {otherPosts.map((otherPost) => (
              <Link 
                key={otherPost.id}
                to={`/blog/${otherPost.id}`}
                className="group bg-slate-900/50 rounded-xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all"
              >
                <div className="h-40 overflow-hidden">
                  <img 
                    src={otherPost.coverImage} 
                    alt={otherPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <div className="text-sm text-cyan-400 mb-2">{otherPost.category}</div>
                  <h3 className="font-bold text-lg group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {otherPost.title}
                  </h3>
                  <div className="text-sm text-slate-500 mt-2">{otherPost.readTime}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-3xl mx-auto px-6 text-center text-slate-500">
          <p>© 2024 Michael Nguyen. Built with React, Tailwind CSS, and too much coffee.</p>
        </div>
      </footer>
    </div>
  );
}
