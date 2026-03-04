import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickReplies: Record<string, string> = {
  "what is my balance": "Your current total balance is ₹4,52,830.00. Your savings account holds ₹3,80,000.00 and your current account has ₹72,830.00.",
  "show transactions": "Here are your recent transactions:\n• Salary - KodNest: +₹75,000\n• Amazon Shopping: -₹4,599\n• Electricity Bill: -₹2,150\n• Freelance Payment: +₹15,000\n• Swiggy Order: -₹680",
  "help": "I can help you with:\n• Account balance inquiries\n• Transaction history\n• Fund transfers\n• Bill payments\n• Card management\n\nJust type your question!",
  "how to transfer money": "To transfer money:\n1. Go to Quick Actions → Send Money\n2. Enter the recipient's details\n3. Enter the amount\n4. Confirm with your PIN\n\nYou can also use UPI for instant transfers.",
  "card details": "Your Kod Bank Platinum Card:\n• Card ending: ****4829\n• Type: Visa Debit\n• Status: Active\n• Daily limit: ₹2,00,000\n\nFor security, full details are available in the Cards section.",
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase().trim();
  for (const [key, value] of Object.entries(quickReplies)) {
    if (lower.includes(key) || key.includes(lower)) return value;
  }
  if (lower.includes("balance") || lower.includes("money")) return quickReplies["what is my balance"];
  if (lower.includes("transaction") || lower.includes("history")) return quickReplies["show transactions"];
  if (lower.includes("transfer") || lower.includes("send")) return quickReplies["how to transfer money"];
  if (lower.includes("card")) return quickReplies["card details"];
  if (lower.includes("hello") || lower.includes("hi")) return "Hello! Welcome to Kod Bank AI Assistant. How can I help you today? Type 'help' to see what I can do.";
  return "I understand your query. For detailed assistance, please visit your nearest Kod Bank branch or call our helpline at 1800-123-4567. You can also type 'help' to see available topics.";
}

const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm your Kod Bank AI Assistant. How can I help you today? Type 'help' to see what I can assist with." },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking delay
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 700));

    try {
      const response = getAIResponse(text);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      console.error("AI response error:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
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

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] h-[500px] rounded-2xl overflow-hidden glass-card border border-border shadow-2xl animate-fade-in flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-border flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-semibold font-display text-foreground">Kod Bank AI</h4>
              <p className="text-xs text-muted-foreground">Always here to help</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-xl px-3 py-2 text-sm whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-accent" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2 items-center">
                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-secondary rounded-xl px-4 py-2 text-sm text-muted-foreground">
                  Typing<span className="animate-pulse">...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 bg-secondary/50 text-foreground placeholder:text-muted-foreground rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary/50"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 rounded-xl btn-glow flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatWidget;
