// Renders "**text**" segments from profile.ts as highlights.
const Rich = ({ text }: { text: string }) => (
  <>
    {text.split("**").map((part, i) => (i % 2 ? <span key={i} className="hl">{part}</span> : part))}
  </>
);

export default Rich;
