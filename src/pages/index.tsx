import { Inter } from "next/font/google";
import Collections from "../components/Collections";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`pt-24 px-24 ${inter.className}`}>
      <Collections />
    </main>
  );
}
