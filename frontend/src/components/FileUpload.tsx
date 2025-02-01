import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [transcription, setTranscription] = useState<string>("");
  const [displayedTranscription, setDisplayedTranscription] =
    useState<string>("");
  const [error, setError] = useState<string>("");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (transcription && transcription !== displayedTranscription) {
      setIsTyping(true);
      let index = 0;
      const timer = setInterval(() => {
        if (index < transcription.length) {
          setDisplayedTranscription((prev) => prev + transcription[index]);
          index++;
        } else {
          clearInterval(timer);
          setIsTyping(false);
        }
      }, 15);

      return () => clearInterval(timer);
    }
  }, [transcription]);

  const resetTranscription = () => {
    setTranscription("");
    setDisplayedTranscription("");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const selectedFile = files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setProgress(0);
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      setProgress(0);
    }
  }, []);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleUpload = async () => {
    if (!file) return;

    const allowedTypes = ["audio/mpeg", "audio/wav", "audio/mp3", "audio/m4a"];
    if (!allowedTypes.includes(file.type)) {
      setError(
        `File type ${file.type} not supported. Please use MP3, WAV, or M4A files.`
      );
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setError("");
      setProgress(0);
      setUploadComplete(false);
      setIsTranscribing(false);
      resetTranscription();
      console.log("Starting upload for file:", file.name, "Type:", file.type);

      const response = await axios.post(
        "http://localhost:5000/transcribe",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;
            console.log("Upload progress:", progress);
            setProgress(progress);
            if (progress === 100) {
              setUploadComplete(true);
              setIsTranscribing(true);
            }
          },
        }
      );

      console.log("Response received:", response.data);
      setTranscription(response.data.text);
      setIsTranscribing(false);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error || err.message || "Failed to transcribe file";
      setError(errorMessage);
      console.error("Upload error:", err);
      setProgress(0);
      setUploadComplete(false);
      setIsTranscribing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="mb-4">Upload Audio File</h2>
      <div
        className="border-2 border-dashed border-gray-400 p-4 w-80 text-center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
          accept="audio/*"
        />
        <label htmlFor="file-upload" className="cursor-pointer text-blue-500">
          Drag and Drop audio file here or Choose File
        </label>
      </div>
      {file && (
        <div className="mt-4 w-80">
          <p>Selected file: {file.name}</p>
          <div className="w-full bg-gray-200 rounded-full">
            <div
              className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
          {isTranscribing && (
            <p className="text-blue-600 mt-2 text-center animate-pulse">
              Generating transcription... This may take a few moments.
            </p>
          )}
        </div>
      )}
      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        disabled={!file || isTranscribing}
      >
        {isTranscribing
          ? "Transcribing..."
          : uploadComplete
          ? "Transcribe Again"
          : "Upload"}
      </button>

      {(displayedTranscription || isTyping) && (
        <div className="mt-4 p-4 w-96 bg-gray-100 rounded shadow-md">
          <h3 className="font-bold mb-2 text-lg text-blue-600">
            Transcription:
          </h3>
          <p className="text-gray-800">
            {displayedTranscription}
            {isTyping && (
              <span className="inline-block w-1.5 h-4 ml-1 bg-blue-600 animate-pulse" />
            )}
          </p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 w-80 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
