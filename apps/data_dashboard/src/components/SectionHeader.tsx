interface Props {
  title: string;
  subtitle: string;
  badge?: string;
}

export function SectionHeader({ title, subtitle, badge }: Props) {
  return (
    <div className="mb-8">
      {badge && (
        <span className="inline-block text-xs font-medium bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full mb-3">
          {badge}
        </span>
      )}
      <h1 className="text-2xl font-bold text-stone-900 mb-2">{title}</h1>
      <p className="text-stone-600 leading-relaxed max-w-3xl">{subtitle}</p>
    </div>
  );
}
