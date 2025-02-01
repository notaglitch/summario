import React, { useState, useCallback } from "react";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const selectedFile = files[0];
    if (selectedFile) {
      setFile(selectedFile);
      simulateUploadProgress();
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      simulateUploadProgress();
    }
  }, []);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const simulateUploadProgress = () => {
    const uploadInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleUpload = () => {
    console.log("Uploading:", file);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="mb-4">Upload file</h2>
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
        />
        <label htmlFor="file-upload" className="cursor-pointer text-blue-500">
          Drag and Drop file here or Choose File
        </label>
      </div>
      {file && (
        <div className="mt-4">
          <p>{file.name}</p>
          <div className="w-full bg-gray-200 rounded-full">
            <div
              className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        </div>
      )}
      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={progress === 100}
      >
        {progress === 100 ? "Uploaded" : "Upload"}
      </button>
    </div>
  );
};

export default FileUpload;
