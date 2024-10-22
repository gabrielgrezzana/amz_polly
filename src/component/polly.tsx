// src/TextToSpeech.tsx
import React, { useState } from "react";
import { polly } from "../aws-config";

const TextToSpeech: React.FC = () => {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleGenerateVoice = async () => {
    const params = {
      Text: text,
      OutputFormat: "mp3",
      VoiceId: "Joanna", // escolha a voz que você deseja usar
    };

    try {
      const data = await polly.synthesizeSpeech(params).promise();
      if (data.AudioStream) {
        // Se AudioStream for uma string binária, decodificamos
        const audioStream = data.AudioStream; // Isso pode ser um Buffer ou string
        const binaryString =
          typeof audioStream === "string"
            ? atob(audioStream)
            : audioStream.toString("latin1"); // Decodifica a string binária
        const len = binaryString.length;
        const bytes = new Uint8Array(len);

        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const audioBlob = new Blob([bytes], { type: "audio/mp3" });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      }
    } catch (error) {
      console.error("Erro ao gerar voz:", error);
    }
  };
  return (
    <div>
      <h1>Text to Speech </h1>
      <textarea value={text} onChange={handleTextChange} rows={4} cols={50} />
      <br />
      <button onClick={handleGenerateVoice}>Gerar Voz</button>
      {audioUrl && (
        <div>
          <h2>Ouça a Voz:</h2>
          <audio controls src={audioUrl} />
        </div>
      )}
    </div>
  );
};

export default TextToSpeech;
