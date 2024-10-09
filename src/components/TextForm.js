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
    Props.showAlert("Success Converted to UpperCase", "success");
  };

  const handleOnClickl = () => {
    const newtext = text.toLowerCase();
    setText(newtext);
    Props.showAlert("Success Converted to LowerCase", "success");
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

  function correctPunctuation() {
    // Trim leading and trailing spaces
    let correctedText = text.trim();

    // Correct common punctuation mistakes
    // 1. Ensure space after punctuation (.,!?:;)
    correctedText = correctedText.replace(/([.,!?:;])([^\s])/g, "$1 $2");

    // 2. Remove spaces before punctuation
    correctedText = correctedText.replace(/\s+([.,!?:;])/g, "$1");

    // 3. Remove multiple spaces with a single space
    correctedText = correctedText.replace(/\s{2,}/g, " ");

    // 4. Capitalize first letter of the sentence (if not already capitalized)
    correctedText = correctedText.replace(/(^\s*\w|\.\s*\w)/g, function (txt) {
      return txt.toUpperCase();
    });

    setText(correctedText);
    Props.showAlert("Success Corrected the Punctuation", "success");
  }

  return (
    <div>
      <div className="mb-3 container">
        <h1 style={{ color: Props.mode === "dark" ? "white" : "black" }}>
          {Props.heading}
        </h1>
        <textarea
          className="form-control mb-3"
          id="MyBox"
          value={text}
          onChange={handleOnChange}
          rows="8"
          style={{
            background: Props.mode === "dark" ? "#242425" : "white",
            color: Props.mode === "dark" ? "white" : "black",
          }}
        ></textarea>
        <button className="btn btn-primary mx-2" onClick={handleOnClick}>
          Convert to uppercase
        </button>
        <button className="btn btn-primary mx-2" onClick={handleOnClickl}>
          Convert to LowerCase
        </button>
        <button className="btn btn-primary mx-2" onClick={correctPunctuation}>
          Correct Punctuation
        </button>

        <button
          className="btn btn-primary mx"
          id="speakButton"
          onClick={readText}
        >
          Speak Button
        </button>
        <div style={{ color: Props.mode === "dark" ? "white" : "black" }}>
          <h1>Text Summary</h1>
          <p>Number of words: {text.split(" ").length}</p>
          <p>Number of characters: {text.length}</p>
          <p>
            Time required to Read the Document {text.split(" ").length * 0.008}{" "}
            mins
          </p>
          <h1 id="status">Preview</h1>

          <p>
            {text.length > 0
              ? text
              : "Enter some text in the Box Above to Preview it"}
          </p>
        </div>
      </div>
    </div>
  );
}
