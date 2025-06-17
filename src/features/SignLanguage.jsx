import React, { useState } from "react";

function SignLanguage() {
  const [text, setText] = useState("");

  const renderSignImages = () => {
    return text
      .toLowerCase()
      .split("")
      .filter((char) => (char >= "a" && char <= "z") || char === " ")
      .map((char, idx) =>
        char !== " " ? (
          <img
            key={idx}
            src={`/asl/${char}.png`}
            alt={`Sign for ${char}`}
            style={styles.image}
          />
        ) : (
          <p>&emsp;</p>
        )
      );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🤟 Text to Sign Language</h1>
      <p style={styles.subtitle}>Type text to see its ASL fingerspelling.</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text here..."
        rows={4}
        style={styles.textarea}
      />

      <div style={styles.imageContainer}>{renderSignImages()}</div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "30px",
    backgroundColor: "#f5faff",
    borderRadius: "16px",
    fontFamily: "Arial Rounded MT Bold, sans-serif",
    textAlign: "center",
  },
  title: {
    fontSize: "32px",
    color: "#0077cc",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#444",
    marginBottom: "24px",
  },
  textarea: {
    width: "100%",
    fontSize: "18px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontFamily: "inherit",
    marginBottom: "20px",
  },
  imageContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
  },
  image: {
    width: "50px",
    height: "50px",
    objectFit: "contain",
  },
};

export default SignLanguage;
