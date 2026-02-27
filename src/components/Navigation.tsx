"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserCircle, Settings, Flame, CircuitBoard } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navigation() {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const links = [
        { href: "/feed", label: "DATALINK[FEED]", icon: <Flame className="w-5 h-5" /> },
        { href: "/onboard", label: "SYS.INIT", icon: <UserCircle className="w-5 h-5" /> },
        { href: "/settings", label: "OVERRIDE", icon: <Settings className="w-5 h-5" /> },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 glass-card border-b-2 border-[var(--primary)] shadow-[0_4px_20px_rgba(0,255,204,0.15)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-20 py-4 sm:py-0">

                    <Link href="/" className="flex items-center gap-3 group mb-4 sm:mb-0">
                        <div className="p-2 border border-[var(--primary)] bg-black group-hover:bg-[var(--primary)] transition-colors">
                            <CircuitBoard className="w-6 h-6 text-[var(--primary)] group-hover:text-black transition-colors" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="font-bold text-xl tracking-[0.2em] text-[var(--foreground)] hover-glitch">
                                SYNAPSE<span className="text-[var(--primary)]">.MATCH</span>
                            </span>
                            <span className="text-[0.6rem] text-[var(--primary)] tracking-[0.3em] uppercase mt-1">
                                Net-Protocol v9.4
                            </span>
                        </div>
                    </Link>

                    <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4">
                        {links.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-200 ${isActive
                                            ? "bg-[var(--primary)] text-black shadow-[4px_4px_0_var(--accent)] translate-x-[-2px] translate-y-[-2px]"
                                            : "text-gray-400 border border-[rgba(0,255,204,0.4)] hover:text-[var(--primary)] hover:border-[var(--primary)] hover:bg-[rgba(0,255,204,0.1)]"
                                        }`}
                                >
                                    {link.icon}
                                    <span className="hidden sm:inline-block">{link.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Decorative progress bar type line */}
            <div className="w-full h-1 bg-[var(--primary)] origin-left animate-[pulse_4s_ease-in-out_infinite] opacity-50"></div>
        </nav>
    );
}
