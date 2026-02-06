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
      // 1. Submit to Netlify Forms
      const formData = new URLSearchParams();
      formData.append('form-name', 'newsletter');
      formData.append('email', email);

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      // 2. Submit to Listmonk via hidden iframe (avoids CORS)
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://listmonk.quip.network/subscription/form';
      form.target = 'listmonk-frame';

      const fields = { email, name: '', l: '7da41db0-e463-4b00-8ce7-71d3c77f3cad' };
      for (const [key, value] of Object.entries(fields)) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);

      // Clean up iframe after 5s
      setTimeout(() => {
        const iframe = document.getElementById('listmonk-frame') as HTMLIFrameElement;
        if (iframe) {
          iframe.srcdoc = '';
        }
      }, 5000);

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
    <div>
      <div className="text-center mb-5">
        <h3 className="text-[13px] font-medium text-white/50 tracking-wide">
          Stay in the loop
        </h3>
      </div>

      <form onSubmit={handleSubmit} name="newsletter" data-netlify="true" className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
        <input type="hidden" name="form-name" value="newsletter" />
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
            <Icon name="email" size={18} />
          </div>
          <input
            type="email"
            name="email"
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
      <iframe id="listmonk-frame" name="listmonk-frame" style={{ display: 'none' }} />

      {message && (
        <p className={`text-center mt-3 text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
