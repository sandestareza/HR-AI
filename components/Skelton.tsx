import React from "react";

function Skelton() {
    return (
        <ul className="flex flex-col gap-3 mt-3 animate-pulse border p-4 bg-zinc-100 rounded-md">
            <li className="w-full h-2 bg-gray-200 rounded-md"></li>
            <li className="w-1/2 h-2 bg-gray-200 rounded-md"></li>
        </ul>
    );
}

export default Skelton;
