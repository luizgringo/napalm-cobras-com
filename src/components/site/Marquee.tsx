export function Marquee({ words }: { words: string[] }) {
  const items = [...words, ...words, ...words, ...words];
  return (
    <div className="overflow-hidden border-y-4 border-blood bg-blood py-3">
      <div className="marquee-track flex whitespace-nowrap">
        {items.map((w, i) => (
          <span key={i} className="mx-6 font-display text-3xl uppercase tracking-wider text-paper">
            {w} ★
          </span>
        ))}
      </div>
    </div>
  );
}
