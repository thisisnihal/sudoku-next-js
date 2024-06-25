"use client"
import Link from "next/link";
import { useState, useEffect } from "react";

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

async function fetchOptions() {
  const options = {
    Easy: getRandomInt(5, 15),
    Medium: getRandomInt(10, 20),
    Hard: getRandomInt(15, 25),
    "Candidate Master": getRandomInt(20, 30),
    Master: getRandomInt(25, 35),
    "Grand Master": getRandomInt(30, 40),
  };

  return options;
}

export default function Home() {
  const [level, setLevel] = useState(getRandomInt(5, 15));
  const [data, setData] = useState("Easy");
  const [options, setOptions] = useState({});

  useEffect(() => {
    const getOptions = async () => {
      const options = await fetchOptions();
      setOptions(options);
    };

    getOptions();
  }, []);

  const onOptionChangeHandler = (event) => {
    const selectedOption = event.target.value;
    setData(selectedOption);
    setLevel(options[selectedOption]);
  };

  return (
    <div className="w-screen h-screen p-2 flex flex-col gap-6 font-medium text-lg justify-center md:items-center align-center">
      <select
        onChange={onOptionChangeHandler}
        className="rounded text-center w-full h-fit md:w-32 p-2 bg-blue-400"
      >
        {Object.keys(options).map((option, index) => (
          <option
            key={index}
            value={option}
            className="h-full w-full md:w-32 md:h-20 bg-blue-300"
            selected={option === 'Easy'} 
          >
            {option}
          </option>
        ))}
      </select>

      <Link
        href={`/game/${level}`}
        className="rounded w-full h-fit md:w-32 md:h-10 p-2 text-center bg-green-400  "
      >
        Play
      </Link>
    </div>
  );
}
