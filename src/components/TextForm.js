import React, { useState } from "react";

export default function TextForm(Props) {
  let [text, setText] = useState("");
  //Function to handle changes in the text area
  const handleOnChange = (event) => {
    //console.log("on change");
    setText(event.target.value);
  };
  //Function to handle click events on the primary button
  const handleOnClick = () => {
    const newtext = text.toUpperCase();
    setText(newtext);
    //console.log("Button pressed");
  };

  const handleOnClickl = () => {
    const newtext = text.toLowerCase();
    setText(newtext);
    //console.log("Button pressed");
  };

  const readText = () => {
    const status = document.getElementById("status");
    const utterance = new SpeechSynthesisUtterance(text);

    // Optional: set voice, language, pitch, and rate
    utterance.lang = "en-US"; // English (United States)
    utterance.pitch = 1; // Range between 0 and 2
    utterance.rate = 1; // Normal speed

    // Handle speech synthesis events
    utterance.onstart = () => {
      status.textContent = "Reading text...";
    };

    utterance.onend = () => {
      status.textContent = "Reading completed!";
    };

    utterance.onerror = (event) => {
      status.textContent = `Error: ${event.error}`;
    };

    // Speak the text
    window.speechSynthesis.speak(utterance);
    status.textContent = "";
  };

  return (
    <div>
      <div className="mb-3 container">
        <h1>{Props.heading}</h1>
        <textarea
          class="form-control mb-3"
          id="MyBox"
          value={text}
          onChange={handleOnChange}
          rows="8"
        ></textarea>
        <button className="btn btn-primary mx-2" onClick={handleOnClick}>
          Convert to uppercase
        </button>
        <button className="btn btn-primary mx-2" onClick={handleOnClickl}>
          Convert to LowerCase
        </button>
        <button
          className="btn btn-primary mx"
          id="speakButton"
          onClick={readText}
        >
          Speak Button
        </button>
        <h1>Text Summary</h1>
        <p>Number of words: {text.split(" ").length}</p>
        <p>Number of characters: {text.length}</p>
        <p>
          Time required to Read the Document {text.split(" ").length * 0.008}{" "}
          mins
        </p>
        <p id="status"></p>
        <p>{text}</p>
      </div>
    </div>
  );
}
