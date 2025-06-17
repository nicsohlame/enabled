import react, { useState, useEffect } from "react";
import { AssemblyAI } from "assemblyai";

function Transciption() {
  const [text, setText] = useState("");
  const [video, setVideo] = useState(null);
  const [uploadUrl, setUploadUrl] = useState('');
  const client = new AssemblyAI({
    apiKey: "182784a0e39145d196a34c10d1e47e8f",
  });


  const onFileUpload = async () => {
    setUploadUrl("");
    setText("");
    try {
      console.log(video);
      const uploadResponse = await client.files.upload(video);
      console.log(uploadResponse);
      setUploadUrl(uploadResponse);
      console.log(uploadUrl);
      const config= {
        audio_url: uploadResponse,
      }
      console.log(config)
      try {
        const transcript = await client.transcripts.create(config);
        console.log(transcript.text);
        setText(transcript.text);
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }

    
    setVideo(null);
  }

  return (
    <>
    <div>
    <input className="input-fields" type="file" required onChange={(e) => setVideo(e.target.files[0])}/>
    <button onClick={onFileUpload}>Upload File</button>
    </div>
      <h1>Transciption</h1>
      <p>{text}</p>
    </>
  );
}

export default Transciption;
