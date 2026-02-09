import './StarBorder.css';

export default function StarBorder({
  children,
  className = '',
  color = '#39FF14',
  speed = 6,
  as: Component = 'button',
  ...props
}) {
  return (
    <Component className={`star-border-wrapper ${className}`} {...props}>
      <div
        className="star-border-glow"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: `${speed}s`,
        }}
      />
      <div
        className="star-border-glow star-border-glow-2"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: `${speed * 0.7}s`,
          animationDelay: `${-speed * 0.3}s`,
        }}
      />
      <span className="star-border-content">{children}</span>
    </Component>
  );
}
