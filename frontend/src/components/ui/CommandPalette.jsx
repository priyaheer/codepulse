import { useEffect, useMemo, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CornerDownLeft } from 'lucide-react';
import { allNavItems } from '../../utils/navigation';
import { cn } from '../../utils/cn';

export function useCommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handler(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return { open, setOpen };
}

export function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!query.trim()) return allNavItems;
    return allNavItems.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => setActiveIndex(0), [query]);

  function go(item) {
    if (!item) return;
    navigate(item.to);
    onClose();
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      go(results[activeIndex]);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[14vh] px-4">
      <div className="absolute inset-0 bg-black/55" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-lg border border-border-strong bg-background-elevated shadow-[var(--cp-shadow-medium)] overflow-hidden">
        <div className="flex items-center gap-2.5 px-3.5 h-12 border-b border-border">
          <Search size={16} className="text-text-muted shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search or run a command..."
            className="flex-1 bg-transparent text-[13.5px] text-text-primary placeholder:text-text-muted outline-none"
          />
          <kbd className="text-[10.5px] text-text-muted border border-border-strong rounded px-1 py-0.5">
            esc
          </kbd>
        </div>
        <div className="max-h-72 overflow-y-auto p-1.5">
          {results.length === 0 && (
            <p className="px-3 py-6 text-center text-[13px] text-text-secondary">No matching commands.</p>
          )}
          {results.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={item.to}
                onClick={() => go(item)}
                onMouseEnter={() => setActiveIndex(i)}
                className={cn(
                  'flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-[13px] text-left transition-colors',
                  i === activeIndex ? 'bg-accent-muted text-accent-text' : 'text-text-secondary'
                )}
              >
                <Icon size={15} />
                <span className="flex-1">{item.label}</span>
                {i === activeIndex && <CornerDownLeft size={13} className="text-text-muted" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
