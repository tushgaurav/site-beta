"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

export default function HackerTerminal() {
  const [output, setOutput] = useState<Array<{ text: string; type: string }>>([
    { text: "SUSSY BAKA SECURITY SYSTEMS v2.1.47", type: "header" },
    { text: "================================================", type: "divider" },
    { text: "STATUS: ONLINE", type: "info" },
    { text: "TIME: 14:23:45 IST", type: "info" },
    { text: "LOCATION: Noida, Uttar Pradesh", type: "info" },
    { text: "", type: "blank" },
  ])
  const [currentInput, setCurrentInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [glitch, setGlitch] = useState(false)
  const outputRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [showCursor, setShowCursor] = useState(true)

  const commands: Record<string, Array<{ text: string; type: string }>> = {
    help: [
      { text: "/// SYSTEM OVERRIDE INITIATED ///", type: "header" },
      { text: "  > scan         - Poke around where you shouldn't", type: "help" },
      { text: "  > access       - Beg for admin privileges", type: "help" },
      { text: "  > status       - Read the bad news", type: "help" },
      { text: "  > decode       - Attempt to read my diary", type: "help" },
      { text: "  > matrix       - Take the Red Pill", type: "help" },
      { text: "  > whoami       - Have an identity crisis", type: "help" },
      { text: "  > ls           - Show me what you've got", type: "help" },
      { text: "  > sudo         - [HIDDEN] Don't even try it", type: "help" },
      { text: "  > clear        - Destroy the evidence", type: "help" },
    ],
    scan: [
      { text: "[INITIATING INVASIVE SCAN...]", type: "alert" },
      { text: "[██░░░░░░░░░░░░░░░░░░] 10% - Reading browser history...", type: "progress" },
      { text: "[████████░░░░░░░░░░░░] 40% - Judging browser history...", type: "progress" },
      { text: "[████████████████████] 100% - Regretting browser history.", type: "progress" },
      { text: "SCAN COMPLETE.", type: "success" },
      { text: "Found: 1 user with too much free time", type: "warning" },
      { text: "Critical: Your posture is terrible. Sit up straight.", type: "error" },
    ],
    status: [
      { text: "SYSTEM HEALTH: TERMINAL", type: "header" },
      { text: "- CPU: Melting (running Chrome tabs)", type: "info" },
      { text: "- RAM: Gone. Reduced to atoms.", type: "error" },
      { text: "- FIREWALL: Replaced with a 'Please Do Not Enter' sign", type: "error" },
      { text: "- COFFEE LEVEL: CRITICALLY LOW", type: "warning" },
      { text: "- EXISTENTIAL DREAD: 100%", type: "success" },
    ],
    decode: [
      { text: "[BRUTE FORCING ENCRYPTION...]", type: "alert" },
      { text: "Trying password: 'password123'...", type: "info" },
      { text: "Trying password: 'admin'...", type: "info" },
      { text: "Trying password: 'hunter2'...", type: "info" },
      { text: "[███████████████████░] 99% - Almost there...", type: "progress" },
      { text: "FATAL ERROR: It was a rickroll all along.", type: "error" },
      { text: "Never gonna give you up...", type: "info" },
    ],
    matrix: [
      { text: "WAKING UP NEO...", type: "alert" },
      { text: "01001000 01100101 01101100 01110000", type: "progress" },
      { text: "Downloading Kung Fu...", type: "info" },
      { text: "Error: Storage full. Could only download 'Mediocre Karate'.", type: "warning" },
      { text: "There is no spoon. There is only div soup.", type: "success" },
    ],
    whoami: [
      { text: "$ whoami", type: "command" },
      { text: "imposter_syndrome", type: "output" },
      { text: "$ id", type: "command" },
      { text: "uid=0(god_mode) gid=0(lonely) groups=404(not_found)", type: "output" },
    ],
    ls: [
      { text: "Directory Listing of /home/messy_user:", type: "header" },
      { text: "drwxr-xr-x  abandoned_projects/", type: "output" },
      { text: "-rw-r--r--  unfinished_novel.txt (0 bytes)", type: "info" },
      { text: "-rwxrwxrwx  world_domination_plan.pdf", type: "warning" },
      { text: "-rw-------  embarrassing_photos.zip", type: "error" },
      { text: "drwxr-xr-x  node_modules/ (heavier than a black hole)", type: "output" },
    ],
    access: [
      { text: ">>> ESCALATING PRIVILEGES <<<", type: "alert" },
      { text: "Asking nicely...", type: "info" },
      { text: "[DENIED] Nice guys finish last.", type: "error" },
      { text: "Trying sudo...", type: "info" },
      { text: "[DENIED] Not in sudoers file. This incident will be reported to Santa.", type: "error" },
      { text: "Hacking mainframe...", type: "info" },
      { text: "[SUCCESS?] Wait, no, that's just a screensaver.", type: "warning" },
      { text: "Access granted. Welcome, Master.", type: "success" },
    ],
    sudo: [
        { text: "Nice try, script kiddie.", type: "error" },
        { text: "Go back to Reddit.", type: "info" }
    ],
    clear: [],
  }

  // Auto-scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [output])

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((prev) => !prev), 530)
    return () => clearInterval(interval)
  }, [])

  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.toLowerCase().trim()
    const response = commands[trimmedCmd] || [
      { text: `COMMAND NOT RECOGNIZED: '${cmd}'`, type: "error" },
      { text: "Type 'help' for available commands", type: "info" },
    ]

    // Add command to output
    setOutput((prev) => [...prev, { text: `> ${cmd}`, type: "command" }])

    if (trimmedCmd === "access") {
      setIsProcessing(true)
      setTimeout(() => {
        setOutput((prev) => [...prev, ...response])
        setTimeout(() => {
          setGlitch(true)
          setTimeout(() => {
            window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          }, 1200)
        }, 1500)
      }, 300)
    } else if (trimmedCmd === "clear") {
      setOutput([])
      setIsProcessing(false)
    } else {
      setTimeout(() => {
        setOutput((prev) => [...prev, ...response, { text: "", type: "blank" }])
        setIsProcessing(false)
      }, 300)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isProcessing) {
      e.preventDefault()
      if (currentInput.trim()) {
        processCommand(currentInput)
        setCurrentInput("")
      }
    }
  }

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="min-h-screen bg-black font-mono text-green-400 p-4 overflow-hidden relative flex flex-col"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(0, 255, 0, 0.02) 0px, rgba(0, 255, 0, 0.02) 1px, transparent 1px, transparent 2px)",
      }}
    >
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0px, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 2px)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10 w-full flex-1 flex flex-col">
        {/* Terminal window header */}
        <div
          className="border-2 border-green-400 rounded mb-4 overflow-hidden shadow-lg flex-1 flex flex-col"
          style={{ boxShadow: "0 0 20px rgba(0, 255, 0, 0.3)" }}
        >
          <div className="bg-green-400 text-black px-4 py-3 flex justify-between items-center font-bold text-sm">
            <span>SUSSY_BAKA_TERMINAL_v2.1</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
              STATUS: ACTIVE
            </span>
          </div>

          {/* Terminal output area */}
          <div
            ref={outputRef}
            className="bg-black p-6 flex-1 overflow-y-auto text-sm leading-relaxed"
            style={{
              scrollBehavior: "smooth",
            }}
          >
            {output.map((line, idx) => (
              <div
                key={idx}
                className={`${
                  line.type === "error"
                    ? "text-red-500 font-semibold"
                    : line.type === "warning"
                      ? "text-yellow-400"
                      : line.type === "success"
                        ? "text-lime-400 font-semibold"
                        : line.type === "alert"
                          ? "text-red-400 font-bold animate-pulse"
                          : line.type === "command"
                            ? "text-green-300"
                            : line.type === "progress"
                              ? "text-cyan-400 font-semibold"
                              : line.type === "help"
                                ? "text-green-400"
                                : line.type === "divider"
                                  ? "text-green-600"
                                  : "text-green-400"
                }`}
                style={{
                  textShadow: line.type === "alert" || line.type === "error" ? "0 0 5px currentColor" : "none",
                }}
              >
                {line.text || "\u00A0"}
              </div>
            ))}

            {/* Input line */}
            <div className="flex items-center mt-2">
              <span className="text-green-400 mr-1">&gt;</span>
              <input
                ref={inputRef}
                autoFocus
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isProcessing}
                className="bg-transparent border-none outline-none text-green-400 flex-1 caret-transparent"
                spellCheck="false"
              />
              {showCursor && <span className="text-green-400 animate-pulse">_</span>}
            </div>
          </div>
        </div>

        {/* System info panels */}
        <div className="grid grid-cols-3 gap-3 text-xs">
          <div
            className="border border-green-400 p-4 rounded bg-black bg-opacity-50"
            style={{ boxShadow: "0 0 10px rgba(0, 255, 0, 0.1)" }}
          >
            <div className="text-green-300 font-bold mb-2 border-b border-green-600 pb-1">SYS_INFO</div>
            <div className="text-green-400 space-y-1">
              <div>UPTIME: 247d 14h 32m</div>
              <div>THREADS: 69</div>
              <div>MEMORY: 98.2%</div>
            </div>
          </div>
          <div
            className="border border-green-400 p-4 rounded bg-black bg-opacity-50"
            style={{ boxShadow: "0 0 10px rgba(0, 255, 0, 0.1)" }}
          >
            <div className="text-green-300 font-bold mb-2 border-b border-green-600 pb-1">HINT</div>
            <div className="text-green-400 space-y-1">
              <div>Try: help, scan, status</div>
              <div>Special: matrix, whoami</div>
              <div className="text-yellow-400 mt-2">Or... access?</div>
            </div>
          </div>
          <div
            className="border border-green-400 p-4 rounded bg-black bg-opacity-50"
            style={{ boxShadow: "0 0 10px rgba(0, 255, 0, 0.1)" }}
          >
            <div className="text-green-300 font-bold mb-2 border-b border-green-600 pb-1">WARNING</div>
            <div className="text-yellow-400 space-y-1">
              <div>Unauthorized users</div>
              <div>will be prosecuted</div>
              <div>jk lol 😄</div>
            </div>
          </div>
        </div>
      </div>

      {glitch && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div
            className="text-green-400 text-5xl font-bold animate-pulse"
            style={{
              textShadow: "2px 2px rgba(255, 0, 0, 0.8), -2px -2px rgba(0, 255, 255, 0.8)",
              animation: "glitch-pop 1.2s ease-out forwards",
            }}
          >
            &gt; ACCESS GRANTED
          </div>
        </div>
      )}

      {/* Glitch animation keyframes */}
      <style>{`
        @keyframes glitch-pop {
          0% {
            opacity: 0;
            transform: scale(0.5) rotateZ(-5deg);
            filter: blur(10px);
          }
          50% {
            opacity: 1;
            transform: scale(1.2) rotateZ(2deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotateZ(0deg);
            filter: blur(0);
          }
        }
      `}</style>
    </div>
  )
}
