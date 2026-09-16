import { Link } from 'react-router-dom';
import { Logo } from '../../components/ui/Logo';
import { Button } from '../../components/ui/Button';
import { ThemeToggle } from '../../components/ui/ThemeToggle';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function PublicNav() {
  const [open, setOpen] = useState(false);
  const links = [['#product', 'Product'], ['#how-it-works', 'How it works'], ['#features', 'Features'], ['#ai-intelligence', 'AI intelligence'], ['#security', 'Security']];
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map(([href, label]) => <a key={href} href={href} className="text-[13px] text-text-secondary transition-colors hover:text-text-primary">{label}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:flex" />
          <Button as={Link} to="/login" variant="secondary" size="sm">
            Sign in
          </Button>
          <button type="button" aria-label="Open menu" onClick={() => setOpen((value) => !value)} className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-text-secondary md:hidden">
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>
      {open && <div className="border-t border-border bg-background-elevated px-5 py-4 md:hidden"><nav className="flex flex-col gap-3">{links.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)} className="text-[13px] text-text-secondary">{label}</a>)}<Link to="/demo" onClick={() => setOpen(false)} className="text-[13px] text-text-secondary">Explore Demo</Link><Link to="/login" onClick={() => setOpen(false)} className="text-[13px] font-medium text-accent">Sign in</Link></nav></div>}
    </header>
  );
}
