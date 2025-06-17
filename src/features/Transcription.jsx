import react, { useState, useEffect, useRef } from "react";
import { AssemblyAI } from "assemblyai";
import { styles } from "./TextToSpeech";

function Transcription() {
  const videoRef = useRef(null);
  const [videoFile, setVideoFile] = useState(null);
  const [transcriptSegments, setTranscriptSegments] = useState([]);
  const [currentLine, setCurrentLine] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);

  const client = new AssemblyAI({ apiKey: '182784a0e39145d196a34c10d1e47e8f' });

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
    const videoURL = URL.createObjectURL(file);
    if (videoRef.current) {
      videoRef.current.src = videoURL;
    }
  };

  const handleTranscription = async () => {
    if (!videoFile) return alert('Please upload a video file first.');

    setIsTranscribing(true);
    setTranscriptSegments([]);
    setCurrentLine('');

    try {
      const uploadUrl = await client.files.upload(videoFile);

      const transcriptObj = await client.transcripts.create({
        audio_url: uploadUrl,
        auto_chapters: false,
        punctuate: true,
        format_text: true
      });

      let pollingResult;
      while (!pollingResult || pollingResult.status !== 'completed') {
        pollingResult = await client.transcripts.get(transcriptObj.id);
        if (pollingResult.status === 'completed') break;
        await new Promise(res => setTimeout(res, 3000));
      }

      const segments = pollingResult.words.map(word => ({
        start: word.start / 1000,
        end: word.end / 1000,
        text: word.text
      }));

      setTranscriptSegments(segments);
    } catch (err) {
      console.error('Transcription error:', err);
      alert('Transcription failed. Check console for details.');
    }

    setIsTranscribing(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!videoRef.current || !transcriptSegments.length) return;

      const currentTime = videoRef.current.currentTime;
      const currentWords = transcriptSegments.filter(
        word => currentTime >= word.start && currentTime <= word.end
      );

      if (currentWords.length > 0) {
        setCurrentLine(currentWords.map(w => w.text).join(' '));
      } else {
        setCurrentLine('');
      }
    }, 500);

    return () => clearInterval(interval);
  }, [transcriptSegments]);

  return (
    <div style={styles.container} className="App">
      <h1 style={styles.title}>Accessible Video Transcription</h1>
      <p style={styles.subtitle}>
        Upload a .mp4 file to be transcribed
      </p>
      <input style={styles.transcribeFileInput} type="file" onChange={handleVideoUpload} />
      <button onClick={handleTranscription} disabled={isTranscribing}>
        {isTranscribing ? 'Transcribing...' : 'Transcribe Video'}
      </button>

      <div style={{ display: 'flex', marginTop: '20px' }}>
        <video ref={videoRef} width="500" height="300" controls style={{ marginRight: '20px' }} />
        <div style={{ width: '50%', maxHeight: '300px', overflowY: 'auto', background: '#f0f0f0', padding: '10px' }}>
          <h3>Real-Time Transcript:</h3>
          <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{currentLine}</p>
        </div>
      </div>
    </div>
  );


}

export default Transcription;
