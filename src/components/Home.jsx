import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Enabled</h1>
      <p style={styles.subtext}>
        Empowering inclusive learning, one tool at a time.
      </p>

      <div style={styles.linksWrapper}>
        <Link to="/transcription" style={styles.linkButton}>
          🎥 Upload Video for Transcription
        </Link>

        <Link to="/text-to-speech" style={styles.linkButton}>
          🗣️ Text-to-Speech
        </Link>
        <Link to="/sign-language" style={styles.linkButton}>
          👋 Sign Language
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
    fontFamily: "Arial Rounded MT Bold, sans-serif",
    backgroundColor: "#fff3e6",
    padding: "60px 20px",
    borderRadius: "20px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.05)",
    maxWidth: "700px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  title: {
    fontSize: "60px",
    marginBottom: "10px",
    background: "linear-gradient(to right, #ff7f50, #ff914d)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "1px 1px 6px rgba(255, 150, 100, 0.3)",
  },
  subtext: {
    fontSize: "20px",
    color: "#333",
    marginBottom: "40px",
  },
  linksWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    alignItems: "center",
  },
  linkButton: {
    display: "inline-block",
    padding: "14px 28px",
    fontSize: "18px",
    backgroundColor: "#ff914d",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "14px",
    boxShadow: "0 4px 8px rgba(255,127,80,0.2)",
    transition: "background 0.2s ease",
    width: "fit-content",
  },
};

export default Home;
