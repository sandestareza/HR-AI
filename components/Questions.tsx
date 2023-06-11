"use client";

import React from "react";
import Skelton from "./Skelton";
import { FaRegCopy, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

type QuestionsProp = {
    questions: string[];
    posisi: string;
    isLoading: boolean;
};

function Questions({ questions, posisi, isLoading }: QuestionsProp) {
    const [isCopied, setIsCopied] = React.useState(false);
    const copyPaste = (question: string) => {
        const textToCopy = question;
        navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            })
            .catch((error) => {
                console.log("Copy failed:", error);
            });
    };

    const [textDot, setTextDot] = React.useState("");
    const sentence = "...";

    React.useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            setTextDot(sentence.substring(0, index));
            index++;
            if (index > sentence.length) {
                index = 0;
            }
        }, 500);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const speak = (question: string) => {
        if ("speechSynthesis" in window) {
            const synthesis = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(question);
            utterance.lang = "id-ID"; // Menentukan bahasa Indonesia
            synthesis.speak(utterance);
        } else {
            console.log("Web Speech API tidak didukung di browser ini.");
        }
    };
    
    return (
        <motion.div
            className="w-full px-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {isLoading ? (
                <>
                    <p className="text-center">HR sedang mengetik{textDot}</p>
                    <Skelton />
                    <Skelton />
                    <Skelton />
                </>
            ) : null}
            {questions.length ? (
                <>
                    <p>
                        Sebagai HR yang akan melakukan wawancara untuk posisi{" "}
                        <span className="font-bold capitalize">{posisi}</span>,
                        berikut adalah 10 pertanyaan yang sesuai untuk
                        mengevaluasi kandidat:
                    </p>
                    <div
                        className={`${
                            isCopied ? "opacity-100" : "opacity-0"
                        } right-0 bottom-10 w-[200px] p-2 fixed rounded-tl-sm rounded-bl-sm  z-10 bg-green-500 text-white shadow-md flex justify-center items-center mt-3 text-sm transition-opacity duration-500 ease-in-out`}
                    >
                        <FaCheckCircle size={10} className="mr-1" />
                        Copied to clipboard!
                    </div>
                    <motion.ul className="flex flex-col gap-3 mt-3">
                        {questions.map((question, i) => (
                            <motion.li
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                whileHover={{ scale: 1.05 }}
                                key={i}
                                className="list-decimal cursor-pointer rounded-md border p-4 text-sm hover:bg-zinc-50 flex justify-between items-center group"
                                onClick={() => speak(question)}
                            >
                                <span>
                                    {i + 1}. {question}
                                </span>
                                <button
                                    className="group-hover:block hidden"
                                    onClick={() => copyPaste(question)}
                                >
                                    <FaRegCopy />
                                </button>
                            </motion.li>
                        ))}
                    </motion.ul>
                </>
            ) : null}
        </motion.div>
    );
}

export default Questions;
