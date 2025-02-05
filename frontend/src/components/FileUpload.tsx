import React, { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [transcription, setTranscription] = useState<string>("");
  const [displayedTranscription, setDisplayedTranscription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const uploadRef = useRef<HTMLInputElement>(null);

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
      }, 35);

      return () => clearInterval(timer);
    }
  }, [transcription]);

  const resetTranscription = useCallback(() => {
    setTranscription("");
    setDisplayedTranscription("");
    setError("");
    setProgress(0);
    setUploadComplete(false);
    setIsTranscribing(false);
  }, []);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const selectedFile = files[0];
    if (selectedFile) {
      setFile(selectedFile);
      resetTranscription();
    }
  }, [resetTranscription]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      resetTranscription();
    }
  }, [resetTranscription]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  }, []);

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
      resetTranscription();
    }
  };

  const handleReset = useCallback(() => {
    setFile(null);
    resetTranscription();
    if (uploadRef.current) {
      uploadRef.current.value = '';
    }
  }, [resetTranscription]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-500">Upload Audio File</h2>
      <div
        className={`border-2 border-dashed p-8 w-full max-w-md text-center rounded-lg transition-colors duration-200 ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-400 hover:border-blue-400"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          ref={uploadRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
          accept="audio/*"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
        >
          <div className="flex flex-col items-center space-y-2">
            <svg
              className="w-12 h-12 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span>Drag and drop audio file here or click to choose</span>
            <span className="text-sm text-gray-500">
              Supported formats: MP3, WAV, M4A
            </span>
          </div>
        </label>
      </div>

      {file && (
        <div className="mt-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Selected file: {file.name}</p>
            <button
              onClick={handleReset}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-center text-sm text-gray-600 mt-1">
            {progress}%
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
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
        disabled={!file || isTranscribing}
      >
        {isTranscribing
          ? "Transcribing..."
          : uploadComplete
          ? "Transcribe Again"
          : "Upload"}
      </button>

      {(displayedTranscription || isTyping) && (
        <div className="mt-6 p-6 w-full max-w-2xl bg-white rounded-lg shadow-md">
          <h3 className="font-bold mb-3 text-xl text-gray-500">
            Transcription
          </h3>
          <div className="text-white leading-relaxed">
            {displayedTranscription}
            {isTyping && (
              <span className="inline-block w-1.5 h-5 ml-1 bg-blue-600 animate-pulse" />
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 w-full max-w-md bg-red-50 border border-red-200 text-red-700 rounded-lg">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
