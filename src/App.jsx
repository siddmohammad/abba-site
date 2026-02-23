import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router-dom';
import Starfield from './components/layout/Starfield';
import TwinkleCanvas from './components/layout/TwinkleCanvas';
import Scanlines from './components/layout/Scanlines';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SplashCursor from './reactbits/SplashCursor';
import { LangProvider } from './context/LangContext';
import Botter from './pages/Botter';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Onboard from './pages/Onboard';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

function MainLayout() {
  return (
    <LangProvider>
      <Starfield />
      <TwinkleCanvas />
      <Scanlines />
      <Navbar />
      <Outlet />
      <Footer />
    </LangProvider>
  );
}

function LegalLayout() {
  return (
    <>
      <div className="starfield-legal" />
      <nav className="navbar navbar-expand-md px-3 legal-navbar">
        <div className="container-xxl">
          <Link className="navbar-brand" to="/">
            <span className="brand-logo-text">ABBA</span>
          </Link>
        </div>
      </nav>
      <Outlet />
      <footer className="legal-footer">
        <div className="container text-center">
          <p className="mb-1">&copy; ABBA (Always Building Better Automation)</p>
          <p className="mb-0">
            <Link to="/privacy">Privacy Policy</Link> &middot;{' '}
            <Link to="/terms">Service Agreement</Link>
          </p>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SplashCursor color="#39FF14" size={10} trailLength={18} />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Botter />} />
          <Route path="about" element={<About />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="onboard" element={<Onboard />} />
        </Route>
        <Route element={<LegalLayout />}>
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
