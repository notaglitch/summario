import React from "react";
import { FaGithub } from "react-icons/fa"; // Importing GitHub icon

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6">About Our Product</h1>
        <p className="mb-4 text-lg">
          Summario is a helpful web application that uses artificial
          intelligence (AI) to make learning easier. You can upload audio or
          video files, and the AI will help you understand them better by having
          conversations about the content. This feature allows you to ask
          questions and get answers, making it simpler to learn new things.
        </p>
        <p className="mb-4 text-lg">
          The app also creates flashcards that focus on important points from
          your files. These flashcards are great for quick reviews and help you
          memorize information faster. Additionally, Summario provides short
          summaries of your recordings, so you can quickly grasp the main ideas
          without listening to everything in detail.
        </p>
        <p className="mb-4 text-lg">
          Whether you are a student looking to study more effectively or a
          professional wanting to enhance your skills, Summario is a fantastic
          tool. It helps you learn and be more productive, making your study
          sessions more efficient and enjoyable.
        </p>
        <h2 className="text-2xl font-semibold mb-4">About the Developer</h2>
        <p className="text-lg">
          My name is Ghafoor Nazari, I love programming, AI and cybersecurity
          and I want to use technology to help people and solve real world
          problems.
        </p>
        <a
          href="https://github.com/notaglitch" // Replace with your GitHub username
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 flex items-center justify-center text-blue-500 hover:underline"
        >
          <FaGithub className="text-4xl" />{" "}
        </a>
      </div>
    </div>
  );
};

export default About;
