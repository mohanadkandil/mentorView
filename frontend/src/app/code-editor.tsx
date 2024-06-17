"use client";

import Editor, { OnMount, BeforeMount } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import monaco from "monaco-editor"; // Ensure monaco-editor is correctly installed
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function CodeEditor() {
  const [editorContent, setEditorContent] = useState('print("hello")');
  const [language, setLanguage] = useState("python");
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const editorRef = useRef(null);

  const handleEditorWillMount: BeforeMount = (monaco) => {
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2017,
      allowNonTsExtensions: true,
    });
  };

  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor as any;
    editor.onDidChangeCursorPosition(({ position }) => {
      setCursorPosition({ line: position.lineNumber, column: position.column });
    });
  };

  const handleEditorChange = (value: any, event: any) => {
    setEditorContent(value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Submitted code:", editorContent);
    // Add your submit logic here
  };

  return (
    <div className="h-screen w-full">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">MentorView</a>
        </div>
        <div className="flex-none gap-2">
          <select className="select select-bordered w-full max-w-xs">
            <option disabled selected>
              Who shot first?
            </option>
            <option>Python</option>
            <option>JavaScript</option>
            <option>C++</option>
          </select>
        </div>
      </div>

      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[200px] py-4 rounded-lg border"
      >
        <ResizablePanel defaultSize={25}>
          <div className="flex h-full p-6">
            <span className="font-semibold">
              <p>
                Given an array of integers nums and an integer target, return
                indices of the two numbers such that they add up to target.
              </p>
              <p className="mb-2">
                You may assume that each input would have exactly one solution,
                and you may not use the same element twice.
              </p>
              <p className="mb-2">You can return the answer in any order.</p>
              <p>&nbsp;</p>
              <div>
                <p>
                  Example 1: Input: nums = [2,7,11,15], target = 9 Output: [0,1]
                </p>
                <p>
                  Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
                </p>
                <p>
                  Example 2: Input: nums = [3,2,4], target = 6 Output: [1,2]
                </p>
                <p>Example 3: Input: nums = [3,3], target = 6 Output: [0,1]</p>
              </div>
            </span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <div className="flex h-full items-center justify-center p-3">
            <Editor
              height="100%"
              language={language}
              theme="vs-dark"
              value={editorContent}
              onChange={handleEditorChange}
              beforeMount={handleEditorWillMount}
              onMount={handleEditorMount}
              options={{
                fontSize: 21,
                tabSize: 2,
                minimap: {
                  enabled: false,
                },
                padding: {
                  bottom: 4,
                  top: 4,
                },
                scrollBeyondLastLine: false,
                fixedOverflowWidgets: true,
                fontFamily: "var(--font-geist-mono)",
              }}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
