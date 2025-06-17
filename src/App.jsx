import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        {/* Hamburger Menu Only */}
        <div
          style={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          role="button"
          aria-label="Toggle menu"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

        {menuOpen && (
          <div style={styles.dropdown}>
            <Link to="/" style={styles.link} onClick={() => setMenuOpen(false)}>
              🏠 Home
            </Link>
            <Link to="/transcription" style={styles.link} onClick={() => setMenuOpen(false)}>
              🎥 Transcribe Video
            </Link>
            <Link to="/text-to-speech" style={styles.link} onClick={() => setMenuOpen(false)}>
              🗣️ Text-to-Speech
            </Link>
          </div>
        )}

      </header>

      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial Rounded MT Bold, sans-serif',
    backgroundColor: '#fffdf8',
    minHeight: '100vh',
  },
  header: {
    backgroundColor: 'transparent',
    padding: '16px 20px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottom: '2px solid #ffedd5',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    position: 'relative',
    zIndex: 10,
  },
  hamburger: {
    fontSize: '32px',
    cursor: 'pointer',
    color: '#ff6f3c',
    userSelect: 'none',
  },
  dropdown: {
  position: 'absolute',
  top: '70px',
  right: '20px',
  backgroundColor: '#fff8f0',
  borderRadius: '16px',
  boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
  padding: '12px 16px',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1000,
},
link: {
  padding: '10px 16px',
  margin: '6px 0',
  fontSize: '16px',
  color: '#ff6f3c',
  backgroundColor: '#fff1e6',
  borderRadius: '999px',
  textDecoration: 'none',
  textAlign: 'center',
  fontWeight: '600',
  transition: 'all 0.2s ease',
},

  main: {
    padding: '40px 20px',
  },
};

export default App;
