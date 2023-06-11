"use client";

import React from "react";
import Questions from "./Questions";
import SpeechToText from "./SpeechToText";

function FormInterview() {
    const [posisi, setPosisi] = React.useState("");
    const [questions, setQuestions] = React.useState<string[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<string>("");

    const getCurrentTime = (): string => {
        // Mendapatkan waktu saat ini
        let date = new Date();
        let currentHour = date.getHours();

        // Menginisialisasi variabel kondisi waktu
        let kondisiWaktu: string | null = null;

        // Menentukan kondisi waktu berdasarkan jam saat ini
        if (currentHour >= 5 && currentHour < 11) {
            kondisiWaktu = "Pagi";
        } else if (currentHour >= 11 && currentHour < 15) {
            kondisiWaktu = "Siang";
        } else if (currentHour >= 15 && currentHour < 18) {
            kondisiWaktu = "Sore";
        } else {
            kondisiWaktu = "Malam";
        }

        return kondisiWaktu;
    };

    const onGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setQuestions([]);
        setMessage("");

        try {
            if (!posisi) {
                throw new Error("Masukkan posisi terlebih dahulu");
            }

            const prompt: string = `Anda adalah HR, akan wawancara untuk posisi ${posisi} apa saja 10 pertanyaan wawancara paling sesuai untuk hal tersebut`;

            const data = {
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: 1000,
                temperature: 0,
            };

            const response = await fetch(
                "https://api.openai.com/v1/completions",
                {
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                        "Accept-Language": "in-ID",
                        Authorization: `Bearer ${process.env.API_KEY_OPEN_AI}`,
                    },
                    body: JSON.stringify(data),
                }
            );

            const result = await response.json();

            if (response.status !== 200) {
                setIsLoading(false);
                throw new Error("Something wrong!");
            }

            const text = result?.choices[0].text;
            const regex: RegExp = /\d+\.\s*(.*)/g;
            const matches: RegExpMatchArray[] = Array.from(
                text.matchAll(regex)
            );

            const results: string[] = [];
            for (const match of matches) {
                results.push(match[1]);
            }

            setQuestions(results);
            setIsLoading(false);
        } catch (error: any) {
            setMessage(error.message);
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        if (posisi) {
            setQuestions([]);
        }
    }, [posisi]);

    return (
        <>
            <div className="max-w-full md:max-w-[450px] md:border-r p-3">
                <p>
                    <span className="font-bold text-xl">
                        Selamat {getCurrentTime()}
                    </span>
                    , perkenalkan saya adalah{" "}
                    <span className="font-bold">HR AI</span> yang akan bertugas
                    memberikan pertanyaan yang sesuai posisi anda lamar.
                </p>
                <form onSubmit={onGenerate} className="flex flex-col mt-3">
                    <label className="text-sm">Masukkan posisi anda</label>
                    <div className="flex items-center">
                        <input
                            type="text"
                            className="w-full rounded-tr-none rounded-br-none p-2 text-sm outline-none border read-only:bg-zinc-200"
                            value={posisi}
                            onChange={(e) => setPosisi(e.target.value)}
                            readOnly={isLoading}
                        />
                        <SpeechToText setPosisi={setPosisi}/>
                    </div>
                    <span className="text-red-500 text-sm">{message}</span>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                        <span className="text-xs">Contoh</span>
                        <button
                            type="button"
                            className="p-2 bg-[#1BBDD4] font-medium rounded-full flex justify-center items-center text-xs shadow text-white"
                            onClick={(e) =>
                                setPosisi(e.currentTarget.innerText)
                            }
                            disabled={isLoading}
                        >
                            Acounting
                        </button>
                        <button
                            type="button"
                            className="p-2 bg-[#1BBDD4] font-medium rounded-full flex justify-center items-center text-xs shadow text-white"
                            onClick={(e) =>
                                setPosisi(e.currentTarget.innerText)
                            }
                            disabled={isLoading}
                        >
                            Marketing
                        </button>
                        <button
                            type="button"
                            className="p-2 bg-[#1BBDD4] font-medium rounded-full flex justify-center items-center text-xs shadow text-white"
                            onClick={(e) =>
                                setPosisi(e.currentTarget.innerText)
                            }
                        >
                            Teknik Sipil
                        </button>
                        <button
                            type="button"
                            className="p-2 bg-[#1BBDD4] font-medium rounded-full flex justify-center items-center text-xs shadow text-white"
                            onClick={(e) =>
                                setPosisi(e.currentTarget.innerText)
                            }
                            disabled={isLoading}
                        >
                            Arsitektur
                        </button>
                        <button
                            type="button"
                            className="p-2 bg-[#1BBDD4] font-medium rounded-full flex justify-center items-center text-xs shadow text-white"
                            onClick={(e) =>
                                setPosisi(e.currentTarget.innerText)
                            }
                            disabled={isLoading}
                        >
                            Web Developer
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full p-2 border bg-[#1BBDD4] font-medium rounded flex justify-center items-center text-white shadow-sm mt-8"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full mr-1"></span>
                                <span>Loading...</span>
                            </>
                        ) : (
                            "Mulai Interview"
                        )}
                    </button>
                </form>
            </div>
            <Questions
                questions={questions}
                posisi={posisi}
                isLoading={isLoading}
            />
        </>
    );
}

export default FormInterview;
