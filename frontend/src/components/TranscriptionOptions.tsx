import React from 'react';

interface TranscriptionOptionsProps {
  transcription: string;
  onOptionSelect: (option: 'chat' | 'summary' | 'questions' | 'quiz') => void;
}

const TranscriptionOptions: React.FC<TranscriptionOptionsProps> = ({ transcription, onOptionSelect }) => {
  return (
    <div className="mt-6 w-full max-w-2xl">
      <h3 className="text-xl font-bold mb-4 text-gray-200">What would you like to do with this transcription?</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => onOptionSelect('chat')}
          className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700"
        >
          <h4 className="text-lg font-semibold text-blue-400 mb-2">Chat with AI</h4>
          <p className="text-gray-400 text-sm">Have a conversation about the content with AI assistant</p>
        </button>

        <button
          onClick={() => onOptionSelect('summary')}
          className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700"
        >
          <h4 className="text-lg font-semibold text-blue-400 mb-2">Generate Summary</h4>
          <p className="text-gray-400 text-sm">Get a concise summary of the main points</p>
        </button>

        <button
          onClick={() => onOptionSelect('questions')}
          className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700"
        >
          <h4 className="text-lg font-semibold text-blue-400 mb-2">Generate Questions</h4>
          <p className="text-gray-400 text-sm">Create study questions from the content</p>
        </button>

        <button
          onClick={() => onOptionSelect('quiz')}
          className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700"
        >
          <h4 className="text-lg font-semibold text-blue-400 mb-2">Create Quiz</h4>
          <p className="text-gray-400 text-sm">Generate an interactive quiz to test your knowledge</p>
        </button>
      </div>
    </div>
  );
};

export default TranscriptionOptions; 