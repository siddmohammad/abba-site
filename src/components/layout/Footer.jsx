import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="py-4 mt-2">
      <div className="container-xxl d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
        <div>
          <div className="pixel neon-text">ABBA</div>
          <small className="text-success-50">
            Built in Bangladesh &bull; &copy; {new Date().getFullYear()} Always Building Better Automation
            <span className="mx-2">&bull;</span>
            <Link to="/privacy" className="text-success text-decoration-none">Privacy Policy</Link>
          </small>
        </div>
        <div className="footer-right">
          <div className="botter-sprite" aria-label="Botter waving"></div>
        </div>
      </div>
    </footer>
  );
}
