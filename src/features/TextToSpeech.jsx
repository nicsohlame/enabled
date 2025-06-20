import { useState, useEffect } from "react";
import mammoth from "mammoth";
import { styles } from "./Styles";

function TextToSpeech() {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // New state for pause
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [utterance, setUtterance] = useState(null); // Track utterance

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

    // If currently paused, resume speech instead of creating new utterance
    if (isPaused) {
      speechSynthesis.resume();
      setIsPaused(false);
      return;
    }

    const newUtterance = new SpeechSynthesisUtterance(text);
    newUtterance.rate = 1;
    newUtterance.pitch = 1;
    newUtterance.lang = "en-US";

    if (selectedVoice) {
      newUtterance.voice = selectedVoice;
    }

    newUtterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };
    newUtterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setUtterance(null);
    };

    speechSynthesis.cancel(); // Stop any ongoing speech
    speechSynthesis.speak(newUtterance);
    setUtterance(newUtterance);
  };

  const handlePauseResume = () => {
    if (!utterance) return; // Nothing to pause or resume

    if (isPaused) {
      speechSynthesis.resume();
      setIsPaused(false);
    } else {
      speechSynthesis.pause();
      setIsPaused(true);
    }
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
        disabled={!text.trim() || (isSpeaking && !isPaused)}
        style={{
          ...styles.button,
          backgroundColor: isSpeaking && !isPaused ? "#ffa07a" : "#ff7f50",
          cursor: isSpeaking && !isPaused ? "not-allowed" : "pointer",
          marginRight: "10px",
        }}
      >
        {isSpeaking && !isPaused ? "🔊 Reading..." : "▶️ Read Aloud"}
      </button>

      <button
        onClick={handlePauseResume}
        disabled={!isSpeaking}
        style={{
          ...styles.button,
          backgroundColor: isPaused ? "#6a9f7f" : "#4682b4",
          cursor: !isSpeaking ? "not-allowed" : "pointer",
        }}
      >
        {isPaused ? "▶️ Resume" : "⏸️ Pause"}
      </button>
    </div>
  );
}

export default TextToSpeech;
