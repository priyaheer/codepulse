import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Logo } from '../../components/ui/Logo';

export function FinalCTA() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h2 className="text-[28px] sm:text-[34px] font-semibold tracking-tight text-text-primary max-w-xl mx-auto leading-tight">
          Know your codebase before your codebase surprises you.
        </h2>
        <div className="mt-8 flex justify-center gap-3">
          <Button as={Link} to="/login" size="lg" iconRight={<ArrowRight size={16} />}>
            Analyze your repository
          </Button>
          <Button as={Link} to="/demo" variant="outline" size="lg">
            Explore demo
          </Button>
        </div>
      </div>
    </section>
  );
}

const footerLinks = {
  Product: ['Features', 'Security', 'Pricing', 'Changelog'],
  Company: ['About', 'Blog', 'Careers'],
  Resources: ['Documentation', 'API', 'Status'],
};

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
        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section}>
            <p className="text-[12.5px] font-medium text-text-primary mb-3">{section}</p>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-[13px] text-text-secondary hover:text-text-primary transition-colors">
                    {link}
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
