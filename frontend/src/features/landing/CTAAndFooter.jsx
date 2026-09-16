import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Logo } from '../../components/ui/Logo';

export function FinalCTA() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h2 className="text-[28px] sm:text-[34px] font-semibold tracking-tight text-text-primary max-w-xl mx-auto leading-tight">
          Your codebase changes every day. Know what changed.
        </h2>
        <div className="mt-8 flex justify-center gap-3">
          <Button as={Link} to="/login" size="lg" iconRight={<ArrowRight size={16} />}>
            Sign in with GitHub
          </Button>
          <Button as={Link} to="/demo" variant="outline" size="lg">
            Explore demo
          </Button>
        </div>
      </div>
    </section>
  );
}

const footerLinks = { Product: [['Features', '#features'], ['How it works', '#how-it-works'], ['Security', '#security']], Demo: [['Explore Demo', '/demo'], ['Sign in', '/login']] };

export function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-6xl px-6 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 text-[13px] text-text-secondary max-w-[220px]">
            Understand your code. Find problems. Fix them. Improve continuously.
          </p>
        </div>
        <div><p className="text-[12.5px] font-medium text-text-primary mb-3">CodePulse AI</p><p className="max-w-[240px] text-[13px] leading-relaxed text-text-secondary">A codebase health and developer intelligence platform built around real repository evidence.</p></div>
        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section}>
            <p className="text-[12.5px] font-medium text-text-primary mb-3">{section}</p>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link}>
                  <a href={link[1]} className="text-[13px] text-text-secondary hover:text-text-primary transition-colors">
                    {link[0]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-5 text-[12px] text-text-muted">
          © {new Date().getFullYear()} CodePulse AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
