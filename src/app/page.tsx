"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Terminal, ShieldAlert, Fingerprint } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;

    setIsLoading(true);
    // Dummy login
    setTimeout(() => {
      document.cookie = `auth_user=${username}; path=/`;
      router.push("/feed");
    }, 1200);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col md:flex-row items-center justify-center p-4 lg:p-12 gap-12 sm:pt-28 pt-32">

      {/* Decorative Grid Background Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 border border-[var(--primary)] opacity-10 animate-spin-slow pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-[var(--accent)] opacity-5 blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--primary)] opacity-[0.03] blur-[120px] pointer-events-none"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-2xl"
      >
        <motion.div variants={itemVariants} className="mb-4">
          <span className="inline-block px-3 py-1 bg-[var(--primary)] text-black font-bold text-xs tracking-[0.3em] mb-4">
            CONNECTION /// SECURE
          </span>
          <h1 className="text-5xl sm:text-7xl font-bold uppercase tracking-tighter leading-none neon-text-primary mb-6">
            ENTER THE<br />
            <span className="text-white hover-glitch">MAINFRAME</span>
          </h1>
          <p className="text-lg text-gray-400 font-mono max-w-lg border-l-2 border-[var(--accent)] pl-4 py-2">
            Establish a neural link with the matching network. Deploy proxy agents. Override protocols.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-12 flex items-start gap-4 text-gray-500 font-mono text-xs uppercase max-w-md hidden md:flex">
          <Terminal className="w-8 h-8 text-[var(--primary)] shrink-0" />
          <p>WARNING: Unauthorized proxy deployment is a violation of central command directives. Access logged.</p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-black/80 backdrop-blur-md p-8 sm:p-10 brutalist-border relative overflow-hidden">

          {/* Aesthetic Scanner line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--primary)] origin-left animate-[bounce_3s_ease-in-out_infinite] shadow-[0_0_15px_var(--primary)]"></div>

          <div className="text-center mb-10 mt-4">
            <Fingerprint className="w-16 h-16 text-[var(--primary)] mx-auto opacity-80 mb-4" />
            <h2 className="text-2xl font-bold tracking-widest uppercase">Identity Verification</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="relative group">
              <label htmlFor="username" className="absolute -top-3 left-4 px-1 bg-black text-[10px] sm:text-xs font-mono text-[var(--primary)] tracking-[0.2em] group-focus-within:text-[var(--accent)] transition-colors">
                INPUT / HUMAN ID
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full px-4 py-4 bg-transparent border-2 border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:border-[var(--primary)] transition-colors font-mono uppercase tracking-wider"
                placeholder="AWAITING INPUT..."
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !username}
              className={`relative w-full overflow-hidden flex justify-center py-5 px-4 font-bold tracking-[0.2em] uppercase transition-all duration-300 ${isLoading || !username
                  ? 'bg-slate-800 text-slate-600 cursor-not-allowed border-2 border-slate-700'
                  : 'bg-[var(--primary)] text-black border-2 border-[var(--primary)] brutalist-border'
                }`}
            >
              {/* Button Diagonal Stripes */}
              {!isLoading && username && (
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgogIDxwYXRoIGQ9Ik0wLDggTDgsMCBMMCwwIFoiIGZpbGw9InJnYmEoMCwwLDAsMC4xKSIvPgo8L3N2Zz4=')] opacity-20 pointer-events-none"></div>
              )}

              {isLoading ? (
                <span className="flex items-center gap-3 z-10 relative">
                  <div className="w-5 h-5 border-2 border-slate-500 border-t-slate-200 rounded-sm animate-spin"></div>
                  AUTH_SEQUENCE.exe...
                </span>
              ) : (
                <span className="flex items-center gap-2 z-10 relative tracking-widest text-[0.9rem]">
                  <ShieldAlert className="w-5 h-5" />
                  INITIATE_LINK
                </span>
              )}
            </button>
          </form>

          <div className="mt-8 pt-4 border-t border-slate-800 flex justify-between text-[10px] text-slate-500 font-mono uppercase tracking-widest">
            <span>SYS.STATE: LOGICAL</span>
            <span className="text-[var(--primary)]">SEC: v4.2</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
