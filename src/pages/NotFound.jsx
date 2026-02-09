import { Link } from 'react-router-dom';
import useMeta from '../hooks/useMeta';

export default function NotFound() {
  useMeta({ title: '404 — ABBA', description: 'Page not found' });

  return (
    <div style={{
      height: '100vh',
      display: 'grid',
      placeItems: 'center',
      background: '#000',
      color: '#d7ffe4',
    }}>
      <div style={{
        padding: '24px',
        border: '1px solid rgba(57,255,20,.25)',
        borderRadius: '12px',
        background: 'rgba(0,0,0,.35)',
        boxShadow: '0 0 20px rgba(57,255,20,.18) inset',
      }}>
        <h1 className="pixel neon-text" style={{ margin: '0 0 12px' }}>404</h1>
        <p>Level not found.</p>
        <p><Link to="/" className="neon-text" style={{ textDecoration: 'none' }}>PRESS START &rarr; HOME</Link></p>
      </div>
    </div>
  );
}
