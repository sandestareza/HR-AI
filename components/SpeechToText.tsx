"use client";

import React, { useState } from "react";
import { FaMicrophone } from "react-icons/fa";

type propsSpeechToText = {
    setPosisi: React.Dispatch<React.SetStateAction<string>>;
};

function SpeechToText({ setPosisi }: propsSpeechToText) {
    const [isListening, setIsListening] = useState(false);

    const startListening = () => {
        if (
            "SpeechRecognition" in window ||
            "webkitSpeechRecognition" in window
        ) {
            const SpeechRecognition =
                (window as any).SpeechRecognition ||
                (window as any).webkitSpeechRecognition;
            const recognition = new SpeechRecognition();

            recognition.lang = "id-ID"; // Tentukan bahasa yang diinginkan

            recognition.onstart = () => {
                setIsListening(true);
            };

            recognition.onresult = (event: any) => {
                const speechResult = event.results[0][0].transcript;
                setPosisi(speechResult);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognition.start();
        } else {
            console.log(
                "Web Speech Recognition API tidak didukung di browser ini."
            );
        }
    };

    return (
        <button
            type="button"
            onClick={startListening}
            disabled={isListening}
            className={`${
                isListening ? "text-red-500 p-2 border border-red-500" : "border p-2 hover:text-red-500"
            }`}
        >
            <FaMicrophone />
        </button>
    );
}

export default SpeechToText;
