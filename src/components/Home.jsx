import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.pageWrapper}>
      <div style={styles.titleContainer}>
        <h1 style={styles.title}>Enabled</h1>
      </div>

      <div style={styles.container}>
        <p style={styles.subtext}>
          Enabling you to dream bigger.
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
    </div>
  );
}

const styles = {
  pageWrapper: {
    // backgroundColor: "#ff914d",
    padding: "40px 20px",
    fontFamily: "Fredoka",
  },
  titleContainer: {
    textAlign: "center",
    marginBottom: "40px",
  },
  title: {
    fontSize: "100px",
    color: "#F2EFC7",
    textShadow: "2px 2px 6px rgba(0,0,0,0.15)",
    margin: 0,
    letterSpacing: "2px",
  },
  container: {
    textAlign: "center",
    backgroundColor: "#ffe5d9",
    padding: "50px 30px",
    borderRadius: "20px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    maxWidth: "700px",
    margin: "0 auto",
  },
  subtext: {
    fontSize: "20px",
    color: "#F2EFC7",
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
    backgroundColor: "#ff7f50",
    color: "#F2EFC7",
    textDecoration: "none",
    borderRadius: "14px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease",
  },
};

export default Home;
