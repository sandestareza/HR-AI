import Image from "next/image";
import Link from "next/link";
import { TbRobot } from "react-icons/tb";
export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-20 px-4 md:p-24">
            <div className="flex flex-col items-center">
                <TbRobot size={80} className="text-[#1BBDD4]" />
                <h1 className="text-4xl md:text-7xl font-black text-[#1BBDD4]">HR AI</h1>
                <p className="text-md md:text-2xl">Solusi Interview bersama AI</p>
            </div>
            <div className="flex gap-2">
                <p>Powered by :</p>
                <Image
                    src="/openai.png"
                    alt="logo-openai"
                    width={80}
                    height={50}
                />
            </div>
            <Link href="/interview">
                <button
                    type="button"
                    className="px-5 py-3 flex justify-center items-center rounded-full text-white font-bold shadow bg-[#1BBDD4]"
                >
                    Mulai Interview
                </button>
            </Link>
        </main>
    );
}
