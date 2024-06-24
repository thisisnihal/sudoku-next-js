import { Providers } from "@/app/providers";
import Link from "next/link";

export default function RootLayout({ children }) {
  return <Providers>
    <div className="w-screen h-full flex flex-col">
      <h1 className="text-3xl text-center my-3 cursor-pointer">
      <Link href={`/`}>Sudoku v7</Link>
      </h1>
      <div>
        {children}
      </div>
    </div>
    </Providers>;
}
