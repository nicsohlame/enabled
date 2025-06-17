import React, { useState } from 'react';

function TextToSpeech() {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    if (!text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.lang = 'en-US';

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🗣️ Text-to-Speech</h1>
      <p style={styles.subtitle}>
        Type or paste text below and let it read aloud for you.
      </p>

      <label htmlFor="tts-input" style={styles.label}>
        Enter text:
      </label>
      <textarea
        id="tts-input"
        rows="6"
        placeholder="e.g. Hello, how are you today?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={styles.textarea}
        aria-label="Text input for speech"
      />

      <button
        onClick={handleSpeak}
        disabled={!text.trim() || isSpeaking}
        style={{
          ...styles.button,
          backgroundColor: isSpeaking ? '#ffa07a' : '#ff7f50',
          cursor: isSpeaking ? 'not-allowed' : 'pointer',
        }}
        aria-label="Read text aloud"
      >
        {isSpeaking ? '🔊 Reading...' : '▶️ Read Aloud'}
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '50px auto',
    padding: '30px',
    backgroundColor: '#fffaf5',
    borderRadius: '16px',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial Rounded MT Bold, sans-serif',
    textAlign: 'center',
  },
  title: {
    fontSize: '32px',
    color: '#ff7f50',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '30px',
  },
  label: {
    display: 'block',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
    textAlign: 'left',
  },
  textarea: {
    width: '100%',
    fontSize: '18px',
    padding: '12px',
    marginBottom: '24px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    resize: 'none',
    fontFamily: 'inherit',
  },
  button: {
    fontSize: '18px',
    padding: '12px 28px',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    transition: 'background 0.2s ease',
  },
};

export default TextToSpeech;


