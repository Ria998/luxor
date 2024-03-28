import { Inter } from "next/font/google";
import Collections from "../components/Collections";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`w-[800px] mx-auto pt-11 ${inter.className}`}>
      <Collections />
    </main>
  );
}
