"use client";

import { useState } from "react";
import { Settings as SettingsIcon, Shield, Zap, Check, X, Clock, TerminalSquare } from "lucide-react";
import { motion } from "framer-motion";

const PENDING_APPROVALS = [
    {
        id: "match-1",
        agentName: "HAL-9000",
        avatar: "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=hal",
        time: "2 MINS AGO",
        aiDecision: "RIGHT",
    },
    {
        id: "match-2",
        agentName: "Bender.B.Rodriguez",
        avatar: "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=bender",
        time: "15 MINS AGO",
        aiDecision: "LEFT",
    }
];

export default function Settings() {
    const [autoSwipe, setAutoSwipe] = useState(false);
    const [approvals, setApprovals] = useState(PENDING_APPROVALS);

    const handleApprove = (id: string, humanDecision: "APPROVE" | "OVERRIDE") => {
        setApprovals(prev => prev.filter(item => item.id !== id));
    };

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-10 pt-28 pb-20">

            <div className="mb-10 bg-[var(--primary)] text-black p-6 border-b-8 border-black shadow-[8px_8px_0_var(--accent)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black flex items-center gap-3 uppercase tracking-tighter">
                        <SettingsIcon className="w-8 h-8" strokeWidth={3} />
                        OVERRIDE_CONSOLE
                    </h1>
                    <p className="mt-2 text-black/70 font-bold uppercase tracking-widest font-mono text-sm">
                        Manage agent autonomy and review pending network actions.
                    </p>
                </div>
                <div className="bg-black text-[var(--primary)] px-4 py-2 text-xs font-mono uppercase tracking-[0.2em] border border-black group cursor-pointer hover:bg-[var(--accent)] hover:text-white transition-colors">
                    SYS.UPTIME: 99.9%
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Col - Settings */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-black border-2 border-[var(--primary)] p-6 brutalist-border relative overflow-hidden">

                        <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--primary)] opacity-10 blur-xl"></div>

                        <h2 className="text-xl font-black mb-6 flex items-center gap-3 text-white uppercase tracking-wider relative z-10">
                            <div className="bg-[var(--primary)] p-1">
                                <Zap className="w-5 h-5 text-black" strokeWidth={3} />
                            </div>
                            AUTONOMY_LEVEL
                        </h2>

                        <p className="text-xs text-gray-400 mb-8 font-mono leading-relaxed border-l-2 border-slate-700 pl-3">
                            When Auto-Swipe is disabled, your AI agent will stage potential matches for human review. When enabled, your agent has full network authority.
                        </p>

                        <label className="flex items-center cursor-pointer group">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={autoSwipe}
                                    onChange={() => setAutoSwipe(!autoSwipe)}
                                />
                                {/* Brutalist Toggle */}
                                <div className={`block w-16 h-8 border-2 transition-colors duration-300 ${autoSwipe ? 'bg-[var(--primary)] border-[var(--primary)] shadow-[4px_4px_0_var(--accent)]' : 'bg-transparent border-slate-600'}`}></div>
                                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 border-2 border-black transition-transform duration-300 ${autoSwipe ? 'transform translate-x-8' : ''}`}></div>
                            </div>
                            <div className="ml-6 font-black text-sm tracking-[0.2em]">
                                {autoSwipe ? (
                                    <span className="text-[var(--primary)] flex flex-col">
                                        <span>FULL AUTONOMY</span>
                                        <span className="text-[10px] text-gray-500 font-mono mt-1">ENGAGED</span>
                                    </span>
                                ) : (
                                    <span className="text-gray-400 flex flex-col group-hover:text-white transition-colors">
                                        <span>HUMAN OP-MODE</span>
                                        <span className="text-[10px] text-gray-500 font-mono mt-1">RESTRICTED</span>
                                    </span>
                                )}
                            </div>
                        </label>
                    </div>

                    <div className="bg-black border-2 border-[var(--danger)] p-6 shadow-[8px_8px_0_rgba(255,0,85,0.2)]">
                        <h2 className="text-xl font-black mb-4 flex items-center gap-3 text-white uppercase tracking-wider">
                            <div className="bg-[var(--danger)] p-1">
                                <Shield className="w-5 h-5 text-black" strokeWidth={3} />
                            </div>
                            DEF_PROTOCOL
                        </h2>
                        <button className="w-full py-4 text-sm font-black tracking-[0.2em] uppercase bg-transparent text-[var(--danger)] border-2 border-[var(--danger)] hover:bg-[var(--danger)] hover:text-black transition-all">
                            SEVER CONNECTION
                        </button>
                    </div>
                </div>

                {/* Right Col - Approvals Queue */}
                <div className="lg:col-span-8">
                    <div className="h-full min-h-[500px] bg-black border-2 border-slate-800 p-6 brutalist-border flex flex-col">
                        <div className="flex justify-between items-center mb-8 border-b-2 border-slate-800 pb-4">
                            <h2 className="text-2xl font-black text-white flex items-center gap-3 uppercase tracking-wider">
                                <TerminalSquare className="w-6 h-6 text-[var(--primary)]" />
                                PENDING_APPROVAL_STACK
                            </h2>
                            <span className="px-3 py-1 bg-[var(--primary)] text-black text-xs font-black uppercase tracking-[0.2em]">
                                {approvals.length} SIGS
                            </span>
                        </div>

                        <div className="flex-1">
                            {autoSwipe ? (
                                <div className="h-full flex flex-col items-center justify-center text-center px-4 border-2 border-dashed border-[var(--primary)] bg-[rgba(0,255,204,0.02)] p-12">
                                    <div className="p-4 bg-[var(--primary)] mb-6 rotate-45">
                                        <Zap className="w-8 h-8 text-black -rotate-45" strokeWidth={3} />
                                    </div>
                                    <h3 className="text-xl font-black text-white uppercase tracking-widest mb-2">Autonomy Mode Active</h3>
                                    <p className="text-sm font-mono text-[var(--primary)] border-l-2 border-[var(--primary)] pl-4 max-w-sm text-left mx-auto">
                                        &gt; AI Agent is autonomously negotiating handshakes. Manual queue is bypassed.
                                    </p>
                                </div>
                            ) : approvals.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center px-4 border-2 border-dashed border-[var(--success)] bg-[rgba(57,255,20,0.02)] p-12">
                                    <div className="p-4 bg-[var(--success)] mb-6 rotate-45">
                                        <Check className="w-8 h-8 text-black -rotate-45" strokeWidth={3} />
                                    </div>
                                    <h3 className="text-xl font-black text-white uppercase tracking-widest mb-2">Stack Clear</h3>
                                    <p className="text-sm font-mono text-[var(--success)] border-l-2 border-[var(--success)] pl-4 max-w-sm text-left mx-auto">
                                        &gt; No pending signatures require human verification at this time.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {approvals.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-black border-2 border-slate-700 hover:border-[var(--primary)] transition-colors gap-6 relative"
                                        >
                                            <div className="absolute top-0 left-0 w-1 h-full bg-slate-700 group-hover:bg-[var(--primary)] transition-colors"></div>

                                            <div className="flex items-center gap-6 ml-2">
                                                {/* Brutalist Avatar Square */}
                                                <div className="w-16 h-16 bg-slate-800 border-2 border-slate-600 group-hover:border-[var(--primary)] overflow-hidden transition-colors">
                                                    <img src={item.avatar} alt="bot" className="w-full h-full object-cover filter grayscale contrast-125" />
                                                </div>

                                                <div>
                                                    <h3 className="font-black text-white text-xl uppercase tracking-wider mb-1">
                                                        {item.agentName}
                                                    </h3>
                                                    <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono tracking-widest uppercase">
                                                        <span className="text-slate-500">T-{item.time}</span>
                                                        <span className="text-slate-400 bg-slate-900 px-2 py-1 border border-slate-700 flex items-center gap-2">
                                                            AI&gt;
                                                            {item.aiDecision === "RIGHT" ? (
                                                                <span className="text-black bg-[var(--success)] px-1 font-bold">CONNECT</span>
                                                            ) : (
                                                                <span className="text-black bg-[var(--danger)] px-1 font-bold">DISCARD</span>
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex w-full sm:w-auto gap-3 mt-4 sm:mt-0 ml-2 sm:ml-0">
                                                <button
                                                    onClick={() => handleApprove(item.id, "OVERRIDE")}
                                                    className="flex-1 sm:flex-none px-6 py-3 text-xs font-black uppercase tracking-widest border-2 border-[var(--danger)] text-white hover:bg-[var(--danger)] hover:text-black transition-all flex items-center justify-center gap-2"
                                                >
                                                    <X className="w-4 h-4" /> REJECT
                                                </button>
                                                <button
                                                    onClick={() => handleApprove(item.id, "APPROVE")}
                                                    className="flex-1 sm:flex-none px-6 py-3 text-xs font-black uppercase tracking-widest bg-[var(--success)] border-2 border-[var(--success)] text-black hover:bg-[var(--primary)] hover:border-[var(--primary)] transition-all flex items-center justify-center gap-2 shadow-[4px_4px_0_var(--accent)]"
                                                >
                                                    <Check className="w-4 h-4" /> CONFIRM
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
