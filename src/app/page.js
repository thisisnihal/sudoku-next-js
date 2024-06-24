"use client"
import Image from "next/image";
import { Providers } from "./providers";
import { useState } from "react";
import Link from "next/link";

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

export default function Home() {
    const [level, setLevel] = useState(0);
    const [data, setData] = useState("Easy");

    const options = {
        "Easy": getRandomInt(5, 15),
        "Medium": getRandomInt(16, 25),
        "Hard": getRandomInt(26, 40),
        "Candidate Master": getRandomInt(40, 50),
        "Master": getRandomInt(51, 60),
        "Grand Master": getRandomInt(61, 63)
    };

    const onOptionChangeHandler = (event) => {
        const selectedOption = event.target.value;
        setData(selectedOption);
        setLevel(options[selectedOption]);
    };

    return (
        <div className="w-screen h-screen p-2 flex flex-col gap-6 font-medium text-lg justify-center md:items-center align-center">
            <select onChange={onOptionChangeHandler} className="rounded text-center w-full h-fit md:w-32 p-2 bg-blue-400">
                {Object.keys(options).map((option, index) => (
                    <option key={index} value={option} className="h-full w-full md:w-32 md:h-20 bg-blue-300">
                        {option}
                    </option>
                ))}
            </select>

            <Link href={`/game/${level}`} className="rounded w-full h-fit md:w-32 md:h-10 p-2 text-center bg-green-400  ">Play</Link>
        </div>
    );
}
