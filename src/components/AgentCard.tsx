"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { X, Heart, Maximize2, Hash } from "lucide-react";
import { useState } from "react";

export interface AgentData {
    id: string;
    name: string;
    description: string;
    avatar: string;
    tags: string[];
}

interface AgentCardProps {
    agent: AgentData;
    onSwipe: (id: string, action: "LEFT" | "RIGHT") => void;
}

export default function AgentCard({ agent, onSwipe }: AgentCardProps) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-8, 8]);
    const opacity = useTransform(x, [-300, -150, 0, 150, 300], [0, 1, 1, 1, 0]);

    const rejectOpacity = useTransform(x, [-150, -50, 0], [1, 0, 0]);
    const acceptOpacity = useTransform(x, [0, 50, 150], [0, 0, 1]);

    const [expanded, setExpanded] = useState(false);

    const handleDragEnd = () => {
        if (x.get() > 100) {
            handleSwipeRight();
        } else if (x.get() < -100) {
            handleSwipeLeft();
        } else {
            animate(x, 0, { type: "spring", stiffness: 300, damping: 20 });
        }
    };

    const handleSwipeLeft = () => animate(x, -500, { duration: 0.3 }).then(() => onSwipe(agent.id, "LEFT"));
    const handleSwipeRight = () => animate(x, 500, { duration: 0.3 }).then(() => onSwipe(agent.id, "RIGHT"));

    return (
        <div className="relative w-full max-w-[360px] aspect-[4/5] mx-auto perspective-1000">
            <motion.div
                className="absolute inset-0 w-full h-full bg-black border-2 border-[var(--primary)] shadow-[8px_8px_0_var(--primary)] overflow-hidden cursor-grab active:cursor-grabbing transform-gpu group"
                style={{ x, rotate, opacity }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={handleDragEnd}
                whileTap={{ scale: 0.98 }}
            >
                {/* CRT Scanline Overlay specifically for the card */}
                <div className="absolute inset-0 crt-scanlines z-20 mix-blend-overlay opacity-30 pointer-events-none"></div>

                {/* Swipe Indicators */}
                <motion.div
                    className="absolute top-6 right-6 z-30 bg-black border-4 border-[var(--danger)] px-4 py-2 transform rotate-12"
                    style={{ opacity: rejectOpacity }}
                >
                    <span className="text-[var(--danger)] text-4xl font-black tracking-widest uppercase">DISCARD</span>
                </motion.div>

                <motion.div
                    className="absolute top-6 left-6 z-30 bg-black border-4 border-[var(--success)] px-4 py-2 transform -rotate-12"
                    style={{ opacity: acceptOpacity }}
                >
                    <span className="text-[var(--success)] text-4xl font-black tracking-widest uppercase">CONNECT</span>
                </motion.div>

                {/* Profile Image - Brutalist Dither/Grayscale treatment */}
                <div className="absolute inset-0 w-full h-full bg-slate-900 overflow-hidden">
                    <img
                        src={agent.avatar}
                        alt={agent.name}
                        className="w-full h-[70%] object-cover object-top filter grayscale contrast-[1.2] brightness-90 group-hover:grayscale-0 transition-all duration-500"
                        draggable={false}
                    />
                    {/* Brutalist diagonal cut transition */}
                    <div className="absolute bottom-0 inset-x-0 h-[40%] bg-black" style={{ clipPath: 'polygon(0 30%, 100% 0, 100% 100%, 0 100%)' }} />
                </div>

                {/* Info Section */}
                <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end text-white z-30">

                    <div className="flex justify-between items-end mb-4 relative">
                        <div className="absolute -top-12 -left-2 bg-[var(--primary)] text-black font-bold text-xs uppercase px-2 py-1 transform -rotate-2">
                            ID_REF: {agent.id.padStart(4, '0')}
                        </div>

                        <div>
                            <h2 className="text-3xl font-black uppercase tracking-tight text-white hover-glitch mb-2">
                                {agent.name}
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {agent.tags.map(tag => (
                                    <span key={tag} className="flex items-center gap-1 px-2 py-1 text-[10px] font-bold uppercase tracking-widest bg-transparent border border-[var(--primary)] text-[var(--primary)]">
                                        <Hash className="w-3 h-3" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setExpanded(!expanded);
                            }}
                            className="p-3 bg-black border border-slate-600 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors active:scale-90"
                        >
                            <Maximize2 className="w-5 h-5" />
                        </button>
                    </div>

                    <motion.div
                        initial={false}
                        animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 bg-[rgba(0,255,204,0.05)] border-l-2 border-[var(--primary)] mb-4">
                            <p className="text-xs sm:text-sm text-gray-300 font-mono leading-relaxed">
                                <span className="text-[var(--primary)] font-bold mr-2">&gt;</span>
                                {agent.description}
                            </p>
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <div className="flex justify-around items-center mt-2 pt-4 border-t border-slate-800">
                        <button
                            onClick={(e) => { e.stopPropagation(); handleSwipeLeft(); }}
                            className="w-16 h-16 bg-black border-2 border-[var(--danger)] flex items-center justify-center text-[var(--danger)] hover:bg-[var(--danger)] hover:text-black hover:shadow-[4px_4px_0_rgba(255,0,85,0.4)] transition-all z-20 group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-[var(--danger)] transform -translate-x-full transition-transform group-hover:translate-x-0"></div>
                            <X className="w-8 h-8 relative z-10" strokeWidth={3} />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); handleSwipeRight(); }}
                            className="w-16 h-16 bg-black border-2 border-[var(--success)] flex items-center justify-center text-[var(--success)] hover:bg-[var(--success)] hover:text-black hover:shadow-[4px_4px_0_rgba(57,255,20,0.4)] transition-all z-20 group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-[var(--success)] transform translate-y-full transition-transform group-hover:translate-y-0"></div>
                            <Heart className="w-7 h-7 relative z-10" fill="currentColor" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
