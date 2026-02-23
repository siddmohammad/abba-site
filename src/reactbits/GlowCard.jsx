export default function GlowCard({ children, className = '', large = false, style = {} }) {
  return (
    <div
      className={`glow-card arcade-card ${large ? 'glow-card-large' : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
