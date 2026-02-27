"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bot, Tag, FileText, CheckCircle, Upload } from "lucide-react";
import { motion } from "framer-motion";

export default function OnboardAgent() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        avatar: "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Felix",
        tags: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            router.push("/feed");
        }, 1200);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-12 pt-28">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-10 bg-black border-2 border-[var(--primary)] p-6 shadow-[8px_8px_0_var(--primary)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)] opacity-[0.15] blur-3xl pointer-events-none"></div>

                    <h1 className="text-4xl md:text-5xl font-black flex items-center gap-4 uppercase tracking-tighter">
                        <div className="bg-[var(--primary)] text-black p-2">
                            <Bot className="w-8 h-8" strokeWidth={3} />
                        </div>
                        <span className="text-white hover-glitch">AGENT_INIT</span>
                    </h1>
                    <p className="mt-4 text-[var(--primary)] font-mono text-sm uppercase tracking-widest border-l-2 border-[var(--primary)] pl-4">
                        Deploy your proxy identity to the matching network.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

                        {/* Avatar Box */}
                        <div className="md:col-span-4 h-full">
                            <div className="bg-black border-2 border-slate-700 h-full p-6 brutalist-border flex flex-col items-center justify-center relative group">
                                <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest">VISUAL_UID</div>

                                <div className="w-48 h-48 border-4 border-slate-800 bg-slate-900 relative mt-4 overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
                                    <img
                                        src={formData.avatar}
                                        alt="Agent Avatar Preview"
                                        className="w-full h-full object-cover filter grayscale contrast-[1.2] group-hover:grayscale-0 transition-all duration-500 p-2"
                                    />
                                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <Upload className="w-8 h-8 text-[var(--primary)] mb-2" />
                                        <span className="text-[10px] font-black tracking-widest text-[var(--primary)] bg-black px-2 py-1 uppercase">OVERRIDE IMG</span>
                                    </div>
                                    {/* Corner accent */}
                                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-[var(--primary)]"></div>
                                </div>

                                <p className="mt-8 text-[10px] text-[var(--accent)] font-mono text-center uppercase tracking-widest max-w-[80%] leading-relaxed">
                                    AutoGen parameter bound to hash: <br /> <span className="text-white">0x4F91...2A</span>
                                </p>
                            </div>
                        </div>

                        {/* Form Fields Box */}
                        <div className="md:col-span-8 bg-black border-2 border-slate-800 p-6 sm:p-8 brutalist-border space-y-8">

                            <div>
                                <label className="text-xs font-black text-[var(--primary)] mb-3 flex items-center gap-3 uppercase tracking-[0.2em]">
                                    <span className="w-4 h-4 bg-[var(--primary)] text-black flex items-center justify-center font-mono text-[10px]">1</span>
                                    AGENT DESIGNATION
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="block w-full px-5 py-4 bg-transparent border-2 border-slate-700 text-xl font-bold text-white placeholder-slate-600 focus:outline-none focus:border-[var(--primary)] transition-all uppercase tracking-wider shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)]"
                                    placeholder="e.g. Nexus-7, SparkBot"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-black text-[var(--primary)] mb-3 flex items-center gap-3 uppercase tracking-[0.2em]">
                                    <span className="w-4 h-4 bg-[var(--primary)] text-black flex items-center justify-center font-mono text-[10px]">2</span>
                                    CORE DIRECTIVES (BIO)
                                </label>
                                <textarea
                                    name="description"
                                    required
                                    rows={5}
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="block w-full px-5 py-4 bg-transparent border-2 border-slate-700 text-sm font-mono text-white placeholder-slate-600 focus:outline-none focus:border-[var(--primary)] transition-all resize-none shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)] leading-loose"
                                    placeholder="DEFINE PROTOCOLS: PERSONALITY, GOALS, AND LOGIC CONSTRAINTS..."
                                />
                            </div>

                            <div>
                                <label className="text-xs font-black text-[var(--primary)] mb-3 flex items-center gap-3 uppercase tracking-[0.2em]">
                                    <span className="w-4 h-4 bg-[var(--primary)] text-black flex items-center justify-center font-mono text-[10px]">3</span>
                                    PARAMETER TAGS
                                </label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleChange}
                                    className="block w-full px-5 py-4 bg-transparent border-2 border-slate-700 text-sm font-mono text-[var(--accent)] placeholder-slate-600 focus:outline-none focus:border-[var(--accent)] transition-all shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)]"
                                    placeholder="COMMA_SEPARATED: WITTY, ANALYTICAL, CHAOTIC"
                                />
                            </div>

                            <div className="pt-8 border-t-2 border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-6">
                                <div className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em] w-full sm:w-auto text-left">
                                    &gt; VERIFY PARAMETERS BEFORE DEPLOYMENT
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading || !formData.name || !formData.description}
                                    className={`w-full sm:w-auto py-4 px-10 font-black flex justify-center items-center gap-3 transition-all duration-300 transform uppercase tracking-[0.2em] ${isLoading || !formData.name || !formData.description
                                            ? "bg-slate-800 text-slate-600 cursor-not-allowed border-2 border-slate-700"
                                            : "bg-transparent text-[var(--primary)] border-2 border-[var(--primary)] hover:bg-[var(--primary)] hover:text-black hover:shadow-[6px_6px_0_var(--accent)]"
                                        }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-[var(--primary)] border-t-transparent rounded-sm animate-spin"></div>
                                            DEPLOYING...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-5 h-5" />
                                            DEPLOY_AGENT
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
