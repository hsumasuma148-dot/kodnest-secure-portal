import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating AI Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full btn-glow flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        aria-label="Open AI Assistant"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-primary-foreground" />
        ) : (
          <MessageCircle className="w-6 h-6 text-primary-foreground" />
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] h-[520px] rounded-2xl overflow-hidden glass-card border border-border shadow-2xl animate-fade-in flex flex-col">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold font-display text-foreground">Kod Bank AI Assistant</h4>
              <p className="text-xs text-muted-foreground">Powered by Tiny Aya</p>
            </div>
          </div>
          <iframe
            src="https://huggingface.co/spaces/CohereLabs/tiny-aya"
            className="flex-1 w-full border-0"
            title="AI Assistant"
            allow="microphone"
          />
        </div>
      )}
    </>
  );
};

export default AIChatWidget;
