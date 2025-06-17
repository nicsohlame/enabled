import react, { useState, useEffect } from "react";
import { AssemblyAI } from "assemblyai";

function Transciption() {
  const [text, setText] = useState("");
  const client = new AssemblyAI({
    apiKey: "182784a0e39145d196a34c10d1e47e8f",
  });

  const audioUrl =
    "https://s3-us-west-2.amazonaws.com/rev.ai/resources/FTC_Sample_1.mp3";

  const config = {
    audio_url: audioUrl,
  };

  const run = async () => {
    const transcript = await client.transcripts.create(config);
    console.log(transcript.text);
    setText(transcript.text);
  };

  useEffect(() => {
    run();
  }, []);

  return (
    <>
      <h1>Transciption</h1>
      <p>{text}</p>
    </>
  );
}

export default Transciption;
