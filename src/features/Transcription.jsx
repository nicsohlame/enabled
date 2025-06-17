import react, { useState, useEffect, useRef } from "react";
import { AssemblyAI } from "assemblyai";

function Transciption() {
  const videoRef = useRef(null);
  const [videoFile, setVideoFile] = useState(null);
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(null);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const client = new AssemblyAI({ apiKey: "182784a0e39145d196a34c10d1e47e8f" });

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
    const videoURL = URL.createObjectURL(file);
    if (videoRef.current) {
      videoRef.current.src = videoURL;
    }
  };

  const handleTranscription = async () => {
    if (!videoFile) return alert("Please upload a video file first.");

    setIsTranscribing(true);
    setWords([]);
    setCurrentWordIndex(null);

    try {
      const uploadUrl = await client.files.upload(videoFile);

      const transcriptObj = await client.transcripts.create({
        audio_url: uploadUrl,
        punctuate: true,
        format_text: true,
        word_boost: [],
        boost_param: "high",
        speaker_labels: false,
      });

      let pollingResult;
      while (!pollingResult || pollingResult.status !== "completed") {
        pollingResult = await client.transcripts.get(transcriptObj.id);
        if (pollingResult.status === "completed") break;
        await new Promise((res) => setTimeout(res, 3000));
      }

      const wordData = pollingResult.words || [];
      const processed = wordData.map((w, i) => ({
        text: w.text,
        start: w.start / 1000,
        end: w.end / 1000,
        id: i,
      }));

      setWords(processed);
    } catch (err) {
      console.error("Transcription error:", err);
      alert("Transcription failed.");
    }

    setIsTranscribing(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!videoRef.current || words.length === 0) return;
      const currentTime = videoRef.current.currentTime;
      const currentIndex = words.findIndex(
        (word) => currentTime >= word.start && currentTime <= word.end
      );
      setCurrentWordIndex(currentIndex);
    }, 200);

    return () => clearInterval(interval);
  }, [words]);

  return (
    <div className="App">
      <h1>Real-Time Transcription (Word Sync)</h1>

      <input type="file" onChange={handleVideoUpload} />
      <button onClick={handleTranscription} disabled={isTranscribing}>
        {isTranscribing ? "Transcribing..." : "Transcribe Video"}
      </button>

      <div style={{ display: "flex", marginTop: "20px" }}>
        <video
          ref={videoRef}
          width="500"
          height="300"
          controls
          style={{ marginRight: "20px" }}
        />
        <div
          style={{
            width: "50%",
            maxHeight: "300px",
            overflowY: "auto",
            background: "#f9f9f9",
            padding: "10px",
          }}
        >
          <h3>Transcript:</h3>
          <p style={{ lineHeight: "1.5em" }}>
            {words.length > 0
              ? words.map((word, i) => (
                  <span
                    key={i}
                    style={{
                      backgroundColor:
                        i === currentWordIndex ? "#ffeeba" : "transparent",
                      padding: "2px",
                      margin: "1px",
                      borderRadius: "3px",
                    }}
                  >
                    {word.text + " "}
                  </span>
                ))
              : "No transcript yet."}
          </p>
        </div>
      </div>
    </div>
  );
}
export default Transciption;
