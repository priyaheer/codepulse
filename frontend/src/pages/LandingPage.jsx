import { PublicNav } from '../features/landing/PublicNav';
import { Hero } from '../features/landing/Hero';
import { Problem } from '../features/landing/Problem';
import { Process } from '../features/landing/Process';
import { Features } from '../features/landing/Features';
import { DeepDive } from '../features/landing/DeepDive';
import { BeforeAfter } from '../features/landing/BeforeAfter';
import { AIInsights } from '../features/landing/AIInsights';
import { FinalCTA, Footer } from '../features/landing/CTAAndFooter';

export function LandingPage() {
  return (
    <div className="bg-background min-h-screen">
      <PublicNav />
      <Hero />
      <Problem />
      <section id="how-it-works">
        <Process />
      </section>
      <section id="features">
        <Features />
      </section>
      <DeepDive />
      <BeforeAfter />
      <AIInsights />
      <FinalCTA />
      <Footer />
    </div>
  );
}
