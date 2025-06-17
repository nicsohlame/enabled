import React, { useState } from "react";

function SignLanguage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageFrames, setImageFrames] = useState([]);
  const [generatedVideoURL, setGeneratedVideoURL] = useState(null);

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
          <p key={idx}>&emsp;</p>
        )
      );
  };

  const handleGenerateVideo = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setGeneratedVideoURL(null);
    setImageFrames([]);

    const images = text
    .toLowerCase()
    .split("")
    .filter((char) => (char >= "a" && char <= "z") || char === " ")
    .map((char, idx) =>
      char !== " " ? 
          "/asl/"+char+ ".png"
       : null);
    if (images.length === 0) return alert('No images to process');

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const width = 640;
    const height = 480;
    const frameRate = 2; // 2 frames per second
    canvas.width = width;
    canvas.height = height;

    const stream = canvas.captureStream();
    const recorder = new MediaRecorder(stream);
    const chunks = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const videoURL = URL.createObjectURL(blob);
      setGeneratedVideoURL(videoURL);
    };

    recorder.start();
    for (const img of images) {
      if (img === null) {
        continue;
      }
      const image = new Image();
      image.src = img;
      await new Promise(res => {
        image.onload = () => {
          ctx.drawImage(image, 0, 0, width, height);
          setTimeout(res, 1000 / frameRate);
        };
      });
    }

    recorder.stop();
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🤟 Text to Sign Language</h1>
      <p style={styles.subtitle}>Type text to see ASL fingerspelling and generate a sign video.</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text here..."
        rows={4}
        style={styles.textarea}
      />

      <button onClick={handleGenerateVideo} style={styles.button}>
        🎬 Generate Video
      </button>

      {loading && <p>Generating video...</p>}

      <div style={styles.imageContainer}>{renderSignImages()}</div>

      {generatedVideoURL && (
        <div style={{ marginTop: "30px" }}>
          <h3>Generated Sign Language Video:</h3>
          <video src={generatedVideoURL} controls width="400" />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "50px auto",
    padding: "30px",
    backgroundColor: "#ffe5d9",
    borderRadius: "16px",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
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
  button: {
    fontSize: "16px",
    padding: "10px 20px",
    backgroundColor: "#ff914d",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
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