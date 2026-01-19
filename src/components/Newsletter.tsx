'use client';

import { useState } from 'react';
import { Icon } from './Icons';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setStatus('loading');

    try {
      // Submit to Webflow form endpoint
      const formData = new FormData();
      formData.append('email-2', email);
      formData.append('form-name', 'Newsletter Form');

      await fetch('https://www.quip.network/', {
        method: 'POST',
        body: formData,
        mode: 'no-cors', // Webflow forms require this
      });

      // Since no-cors doesn't give us response info, assume success
      setStatus('success');
      setMessage('Thanks for subscribing!');
      setEmail('');

      // Reset after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');

      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    }
  };

  return (
    <div className="mt-12 mb-8">
      <div className="text-center mb-5">
        <h3 className="text-[13px] font-semibold text-text-primary uppercase tracking-wider">
          Subscribe to Our Newsletter
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
            <Icon name="email" size={18} />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="me@email.com"
            required
            disabled={status === 'loading'}
            className="w-full pl-11 pr-4 py-3.5 rounded-full bg-surface border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading' || !email}
          className="px-6 py-3.5 rounded-full bg-surface border border-border text-text-primary font-medium hover:bg-surface-elevated hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === 'loading' ? 'Please wait...' : 'Subscribe'}
        </button>
      </form>

      {message && (
        <p className={`text-center mt-3 text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
