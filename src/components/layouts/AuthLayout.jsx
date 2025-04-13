import React from "react";
import Image from "next/image";
import Logo from "@/components/ui/Logo";
import { motion } from "framer-motion";
import ParticlesBackground from "@/components/ui/ParticlesBackground";
import MessageBox from "@/components/ui/MessageBox";
import { useMessage } from "@/context/MessageContext";

export default function AuthLayout({ children }) {
  const { messages, removeMessage } = useMessage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gray relative overflow-hidden px-4"
    >
      <div className="absolute inset-0 z-0">
        <ParticlesBackground />
      </div>

      {messages.length > 0 && (
        <div className="absolute top-4 w-full flex flex-col items-center gap-2 z-50">
          {messages.map((msg) => (
            <MessageBox
              key={msg.id}
              message={msg.text}
              variant={msg.type}
              onClose={() => removeMessage(msg.id)}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          {children}
        </div>
      </div>
    </motion.div>
  );
}
