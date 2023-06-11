import Link from "next/link";
import React from "react";
import { TbRobot } from 'react-icons/tb';

function Navbar() {
    return <div className="fixed inset-x-0 top-0 z-10 flex justify-between bg-zinc-100 shadow-sm p-4 transition lg:px-12">
        <Link href="/" className="text-2xl font-bold flex items-center gap-2 text-[#1BBDD4]">
            <TbRobot size={30}/> HR AI
        </Link>
    </div>;
}

export default Navbar;
