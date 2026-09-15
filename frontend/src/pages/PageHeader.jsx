export function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
      <div>
        {eyebrow && <p className="text-[12.5px] text-text-secondary mb-1">{eyebrow}</p>}
        <h1 className="text-[20px] font-semibold text-text-primary tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-[13.5px] text-text-secondary max-w-xl">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}
