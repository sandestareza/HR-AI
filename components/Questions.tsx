import React from "react";
import Skelton from "./Skelton";
import { FaRegCopy, FaCheckCircle } from "react-icons/fa";

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
    return (
        <div className="w-full px-5">
            {isLoading ? (
                <>
                    <p className="text-center">HR sedang mengetik...</p>
                    <Skelton />
                    <Skelton />
                    <Skelton />
                </>
            ) : (
                <p className="text-center">Daftar pertanyaan</p>
            )}
            {questions.length ? (
                <>
                    <p>
                        Sebagai HR yang akan melakukan wawancara untuk posisi{" "}
                        <span className="font-bold">{posisi}</span>, berikut
                        adalah 10 pertanyaan yang sesuai untuk mengevaluasi
                        kandidat:
                    </p>                    
                    <div
                        className={`${
                            isCopied ? "opacity-100" : "opacity-0"
                        } right-0 bottom-10 w-[200px] p-2 fixed rounded-tl-sm rounded-bl-sm  z-10 bg-green-500 text-white shadow-md flex justify-center items-center mt-3 text-sm transition-opacity duration-500 ease-in-out`}
                    >
                        <FaCheckCircle size={10} className="mr-1"/>Copied to clipboard!
                    </div>
                    <ul className="flex flex-col gap-3 mt-3">
                        {questions.map((question, i) => (
                            <li
                                key={i}
                                className="list-decimal rounded-md border p-4 text-sm hover:bg-zinc-50 flex justify-between items-center group"
                            >
                                <span>{i+1}. {question}</span>
                                <button
                                    className="group-hover:block hidden"
                                    onClick={() => copyPaste(question)}
                                >
                                    <FaRegCopy />
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            ) : null}
        </div>
    );
}

export default Questions;
