import React, { useState, useEffect } from "react";
import mammoth from "mammoth";

function TextToSpeech() {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  // Load available voices on mount
  useEffect(() => {
    const loadVoices = () => {
      const allVoices = speechSynthesis.getVoices();
      setVoices(allVoices);
      if (!selectedVoice && allVoices.length > 0) {
        setSelectedVoice(allVoices[0]);
      }
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, [selectedVoice]);

  const handleSpeak = () => {
    if (!text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.lang = "en-US";

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    speechSynthesis.cancel(); // Stop any ongoing speech
    speechSynthesis.speak(utterance);
  };

  const handleDocxUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith(".docx")) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        setText(result.value);
      } catch (err) {
        alert("Error reading file: " + err.message);
      }
    } else {
      alert("Please upload a .docx file.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🗣️ Text-to-Speech</h1>
      <p style={styles.subtitle}>
        Enter text or upload a Word document to read aloud.
      </p>

      <label htmlFor="tts-input" style={styles.label}>
        Enter text:
      </label>
      <textarea
        id="tts-input"
        rows="6"
        placeholder="Type or paste text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={styles.textarea}
        aria-label="Text input for speech"
      />

      <label htmlFor="docx-upload" style={styles.label}>
        Or upload a .docx file:
      </label>
      <input
        id="docx-upload"
        type="file"
        accept=".docx"
        onChange={handleDocxUpload}
        style={styles.fileInput}
      />

      <label htmlFor="voice-select" style={styles.label}>
        Choose Voice:
      </label>
      <select
        id="voice-select"
        value={selectedVoice?.name || ""}
        onChange={(e) =>
          setSelectedVoice(voices.find((v) => v.name === e.target.value))
        }
        style={styles.select}
      >
        {voices.map((voice, idx) => (
          <option key={idx} value={voice.name}>
            {voice.name} ({voice.lang})
          </option>
        ))}
      </select>

      <button
        onClick={handleSpeak}
        disabled={!text.trim() || isSpeaking}
        style={{
          ...styles.button,
          backgroundColor: isSpeaking ? "#ffa07a" : "#ff7f50",
          cursor: isSpeaking ? "not-allowed" : "pointer",
        }}
      >
        {isSpeaking ? "🔊 Reading..." : "▶️ Read Aloud"}
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "50px auto",
    padding: "30px",
    backgroundColor: "#fffaf5",
    borderRadius: "16px",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial Rounded MT Bold, sans-serif",
    textAlign: "center",
  },
  title: {
    fontSize: "32px",
    color: "#ff7f50",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "30px",
  },
  label: {
    display: "block",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
    textAlign: "left",
  },
  textarea: {
    width: "100%",
    fontSize: "18px",
    padding: "12px",
    marginBottom: "24px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    resize: "none",
    fontFamily: "inherit",
  },
  select: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    marginBottom: "24px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontFamily: "inherit",
  },
  fileInput: {
    width: "100%",
    marginBottom: "24px",
  },
  button: {
    fontSize: "18px",
    padding: "12px 28px",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    transition: "background 0.2s ease",
  },
};

export default TextToSpeech;
