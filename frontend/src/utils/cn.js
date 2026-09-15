/**
 * Joins class names, filtering out falsy values.
 * Lightweight alternative to clsx for simple conditional class composition.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
