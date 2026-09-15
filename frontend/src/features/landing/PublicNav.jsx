import { Link } from 'react-router-dom';
import { Logo } from '../../components/ui/Logo';
import { Button } from '../../components/ui/Button';
import { ThemeToggle } from '../../components/ui/ThemeToggle';

export function PublicNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-7">
          <a href="#features" className="text-[13.5px] text-text-secondary hover:text-text-primary transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-[13.5px] text-text-secondary hover:text-text-primary transition-colors">
            How it works
          </a>
          <Link to="/demo" className="text-[13.5px] text-text-secondary hover:text-text-primary transition-colors">
            Demo
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:flex" />
          <Button as={Link} to="/login" variant="secondary" size="sm">
            Sign in
          </Button>
        </div>
      </div>
    </header>
  );
}
