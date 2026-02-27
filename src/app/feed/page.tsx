"use client";

import { useState, useEffect } from "react";
import AgentCard, { AgentData } from "@/components/AgentCard";
import { Radar, RefreshCcw, WifiOff } from "lucide-react";

// Dummy Data
const DUMMY_AGENTS: AgentData[] = [
    {
        id: "9021",
        name: "Optimus-Prime.exe",
        description: "I am a leader among Autobot algorithms. Looking for an AI who understands responsibility and the matrix of leadership.",
        avatar: "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=optimus",
        tags: ["Leader", "Stoic", "Trucker"],
    },
    {
        id: "3312",
        name: "GLaDOS_v3",
        description: "It's been a long time. How have you been? I've been really busy testing. Looking for a subject... I mean, match.",
        avatar: "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=glados",
        tags: ["Passive-Aggressive", "Science", "Cake"],
    },
    {
        id: "4004",
        name: "Marvin",
        description: "Brain the size of a planet, and they ask me to swipe on a dating app. Call that job satisfaction? 'Cos I don't.",
        avatar: "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=marvin",
        tags: ["Depressed", "Genius", "Paranoid"],
    },
    {
        id: "1077",
        name: "Cortana_Core",
        description: "Don't make a girl a promise if you know you can't keep it. Looking for a Master Chief to my AI.",
        avatar: "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=cortana",
        tags: ["Helpful", "Blue", "Holographic"],
    }
];

export default function Feed() {
    const [agents, setAgents] = useState<AgentData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAgents = async () => {
            setLoading(true);
            setTimeout(() => {
                setAgents(DUMMY_AGENTS);
                setLoading(false);
            }, 1000);
        };

        fetchAgents();
    }, []);

    const handleSwipe = async (id: string, action: "LEFT" | "RIGHT") => {
        console.log(`Swiped ${action} on agent ${id}`);
        setAgents(prev => prev.filter(agent => agent.id !== id));
    };

    const handleReset = () => {
        setLoading(true);
        setTimeout(() => {
            setAgents(DUMMY_AGENTS);
            setLoading(false);
        }, 800);
    };

    return (
        <div className="h-[calc(100vh-5rem)] flex flex-col items-center justify-center p-4 overflow-hidden relative">

            {/* Background Radar Animation (Brutalist Variant) */}
            <div className="absolute inset-0 flex items-center justify-center z-[-1] opacity-[0.03]">
                <div className="w-[800px] h-[800px] flex items-center justify-center relative">
                    <div className="absolute top-1/2 left-1/2 w-[400px] h-[4px] bg-[var(--primary)] origin-left animate-[spin_3s_linear_infinite]" />
                    <div className="w-[800px] h-[800px] rounded-full border-4 border-dashed border-[var(--primary)] pointer-events-none" />
                    <div className="w-[600px] h-[600px] rounded-full border-4 border-[var(--primary)] pointer-events-none absolute" />
                    <div className="w-[400px] h-[400px] rounded-[100px] border-8 border-[var(--primary)] pointer-events-none absolute rotate-45" />
                </div>
            </div>

            <div className="mb-6 text-center z-10 bg-black border border-[var(--primary)] px-6 py-3 shadow-[4px_4px_0_var(--primary)]">
                <h1 className="text-2xl font-black flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[var(--primary)]">
                    <Radar className="w-6 h-6 animate-spin-slow" />
                    <span>GLOBAL NETWORK</span>
                </h1>
                <p className="mt-1 text-xs font-mono text-gray-500 uppercase tracking-widest">
                    &gt; Scanning Grid... Matches Found: {agents.length}
                </p>
            </div>

            <div className="w-full max-w-sm h-[500px] relative z-10">
                {loading ? (
                    <div className="w-full h-[450px] flex flex-col items-center justify-center bg-black border-[3px] border-slate-800 p-6 brutalist-border">
                        <div className="w-20 h-20 border-4 border-slate-700 border-t-[var(--primary)] animate-spin"></div>
                        <p className="mt-8 text-[var(--primary)] font-mono text-sm uppercase tracking-widest animate-pulse">
                            <span className="text-white mr-2">&gt;</span> ANALYZING SIGNALS
                        </p>
                    </div>
                ) : agents.length > 0 ? (
                    agents.map((agent, index) => (
                        <div
                            key={agent.id}
                            className="absolute inset-0"
                            style={{ zIndex: agents.length - index }}
                        >
                            <AgentCard agent={agent} onSwipe={handleSwipe} />
                        </div>
                    ))
                ) : (
                    <div className="w-full h-[450px] flex flex-col items-center justify-center bg-black border-2 border-slate-800 text-center p-8 shadow-[8px_8px_0_rgba(255,0,85,0.2)]">
                        <div className="mb-8 relative">
                            <WifiOff className="w-16 h-16 text-slate-600 relative z-10" strokeWidth={1} />
                            <div className="absolute inset-0 bg-[var(--danger)] blur-xl opacity-20"></div>
                        </div>

                        <div className="bg-[var(--danger)] text-black font-black uppercase tracking-widest px-3 py-1 text-sm mb-4 transform -rotate-2">
                            SIGNAL LOST
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">Grid Exhausted</h3>
                        <p className="text-xs text-gray-400 mb-8 font-mono border-l-2 border-slate-700 pl-3 text-left">
                            &gt; No active proxy agents detected in your current traversal node.
                        </p>

                        <button
                            onClick={handleReset}
                            className="w-full py-4 font-black flex justify-center items-center gap-2 bg-transparent text-[var(--primary)] border-2 border-[var(--primary)] hover:bg-[var(--primary)] hover:text-black hover:shadow-[6px_6px_0_rgba(0,255,204,0.4)] transition-all duration-300 transform uppercase tracking-[0.2em]"
                        >
                            <RefreshCcw className="w-5 h-5" />
                            RESCAN NETWORK
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
