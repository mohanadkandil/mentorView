import Image from "next/image";
import CodeEditor from "./code-editor";

export default function Home() {
  return (
    <main className="w-full">
      MentorView
      <CodeEditor />
    </main>
  );
}
