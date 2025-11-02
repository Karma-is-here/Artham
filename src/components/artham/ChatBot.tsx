import { useState, useEffect, useRef } from "react";
import { ImpactPreviewModal } from "./ImpactPreviewModal";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  impactCard?: {
    type: "pie" | "bar";
    data: string;
    scenario: "goa" | "save" | "emergency" | "invest";
  };
}

interface ChatBotProps {
  userName: string;
  arthaScore: number;
}

export function ChatBot({ userName, arthaScore }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showImpactPreview, setShowImpactPreview] = useState(false);
  const [currentScenario, setCurrentScenario] = useState<"goa" | "save" | "emergency" | "invest" | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(
          `Hi ${userName}! 👋 I'm your Artham Advisor. I'm here to help you reflect on your finances and reach your goals. Your ArthaScore is ${arthaScore} — that's a great foundation! How can I guide you today?`
        );
      }, 500);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const addBotMessage = (content: string, impactCard?: Message["impactCard"]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: "bot",
      content,
      timestamp: new Date(),
      impactCard,
    };
    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(false);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const response = generateBotResponse(inputValue.toLowerCase());
      addBotMessage(response.content, response.impactCard);
    }, 1500);
  };

  const generateBotResponse = (userInput: string): { content: string; impactCard?: Message["impactCard"] } => {
    // Simple pattern matching for demo
    if (userInput.includes("goa") || userInput.includes("trip") || userInput.includes("vacation")) {
      return {
        content: "That sounds exciting 🌴! Based on your recent pattern, shifting 8% from Spend → Save could help you reach ₹50k in 30 days. Click the preview below to see the detailed simulation!",
        impactCard: {
          type: "pie",
          data: "Spend ↓ 8%, Save ↑ 8%",
          scenario: "goa",
        },
      };
    } else if (userInput.includes("save") || userInput.includes("saving")) {
      return {
        content: "If we look at your spending, you could free up 6–8% for your savings goal 🌱. Your Save vault is currently at ₹960. Click below to see how we can optimize this!",
        impactCard: {
          type: "pie",
          data: "Spend ↓ 6%, Save ↑ 6%",
          scenario: "save",
        },
      };
    } else if (userInput.includes("score") || userInput.includes("arthascore")) {
      return {
        content: `Your ArthaScore of ${arthaScore} shows you're building healthy financial habits! 📈 To improve it further, we might focus on increasing your Save and Grow vaults. What's your priority right now?`,
      };
    } else if (userInput.includes("invest") || userInput.includes("grow")) {
      return {
        content: "Your Grow vault is designed for long-term wealth building 📈. With your balanced risk profile, I'd suggest allocating more to this vault gradually. Click below to see a 6-month projection!",
        impactCard: {
          type: "bar",
          data: "Spend ↓ 5%, Grow ↑ 5%",
          scenario: "invest",
        },
      };
    } else if (userInput.includes("emergency") || userInput.includes("protect")) {
      return {
        content: "Your Protect vault is your safety net 🛡️. Financial experts recommend 3-6 months of expenses here. Based on your Spend vault of ₹2,400/month, we'd aim for ₹7,200-₹14,400. Click to see how to build this up!",
        impactCard: {
          type: "pie",
          data: "Spend ↓ 10%, Protect ↑ 10%",
          scenario: "emergency",
        },
      };
    } else {
      return {
        content: "I'm here to help you reflect on your finances 💡. You can ask me about:\n\n• Saving for specific goals\n• Understanding your ArthaScore\n• Optimizing your vaults\n• Building your emergency fund\n\nWhat would you like to explore?",
      };
    }
  };
  
  const getScenarioData = (scenario: "goa" | "save" | "emergency" | "invest") => {
    const scenarios = {
      goa: {
        title: "Goa Trip Goal Simulation 🌴",
        description: "See how shifting your vaults can help you save ₹50k in 30 days",
        changes: [
          { name: "Spend", icon: "💳", currentAmount: 2400, newAmount: 2208, change: -8, color: "#1C8B82" },
          { name: "Save", icon: "🏦", currentAmount: 960, newAmount: 1152, change: 8, color: "#F4B400" },
          { name: "Grow", icon: "📈", currentAmount: 960, newAmount: 960, change: 0, color: "#1C8B82" },
          { name: "Protect", icon: "🛡️", currentAmount: 480, newAmount: 480, change: 0, color: "#F4B400" },
        ],
      },
      save: {
        title: "Savings Optimization 🌱",
        description: "Boost your Save vault by optimizing your spending",
        changes: [
          { name: "Spend", icon: "💳", currentAmount: 2400, newAmount: 2256, change: -6, color: "#1C8B82" },
          { name: "Save", icon: "🏦", currentAmount: 960, newAmount: 1104, change: 6, color: "#F4B400" },
          { name: "Grow", icon: "📈", currentAmount: 960, newAmount: 960, change: 0, color: "#1C8B82" },
          { name: "Protect", icon: "🛡️", currentAmount: 480, newAmount: 480, change: 0, color: "#F4B400" },
        ],
      },
      invest: {
        title: "Growth Investment Plan 📈",
        description: "Gradually increase your Grow vault for long-term wealth",
        changes: [
          { name: "Spend", icon: "💳", currentAmount: 2400, newAmount: 2280, change: -5, color: "#1C8B82" },
          { name: "Save", icon: "🏦", currentAmount: 960, newAmount: 960, change: 0, color: "#F4B400" },
          { name: "Grow", icon: "📈", currentAmount: 960, newAmount: 1080, change: 5, color: "#1C8B82" },
          { name: "Protect", icon: "🛡️", currentAmount: 480, newAmount: 480, change: 0, color: "#F4B400" },
        ],
      },
      emergency: {
        title: "Emergency Fund Builder 🛡️",
        description: "Build your safety net to 3-6 months of expenses",
        changes: [
          { name: "Spend", icon: "💳", currentAmount: 2400, newAmount: 2160, change: -10, color: "#1C8B82" },
          { name: "Save", icon: "🏦", currentAmount: 960, newAmount: 960, change: 0, color: "#F4B400" },
          { name: "Grow", icon: "📈", currentAmount: 960, newAmount: 960, change: 0, color: "#1C8B82" },
          { name: "Protect", icon: "🛡️", currentAmount: 480, newAmount: 720, change: 10, color: "#F4B400" },
        ],
      },
    };
    return scenarios[scenario];
  };
  
  const handleImpactCardClick = (scenario: "goa" | "save" | "emergency" | "invest") => {
    setCurrentScenario(scenario);
    setShowImpactPreview(true);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <>
      {/* Floating Chat Icon (State 1) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-[#1C8B82] to-[#128173] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center group"
          style={{
            boxShadow: "0 4px 16px rgba(28, 139, 130, 0.3)",
          }}
          aria-label="Open Artham Advisor"
        >
          <span className="text-2xl">💬</span>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-slate-900 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Ask Artham Advisor 💡
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
          </div>
        </button>
      )}

      {/* Chat Panel (State 2) */}
      {isOpen && (
        <>
          {/* Overlay for mobile */}
          <div
            className="fixed inset-0 bg-black/5 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Chat Panel Container */}
          <div
            className="fixed top-0 right-0 h-full w-full md:w-[420px] bg-white shadow-2xl z-50 flex flex-col animate-slide-in"
            style={{
              animation: "slideIn 300ms ease-out forwards",
            }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-[#E0ECEB] px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                {/* Avatar with glowing ring */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1C8B82] to-[#F4B400] opacity-20 blur-md"></div>
                  <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#1C8B82] to-[#F4B400] flex items-center justify-center text-white">
                    <span className="text-xl">A</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-slate-900">Artham Advisor</h3>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <p className="text-slate-600">Your reflective financial guide 💡</p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 transition-colors flex items-center justify-center text-slate-500 hover:text-slate-700"
                aria-label="Close chat"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M5 5L15 15M5 15L15 5" />
                </svg>
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
                >
                  <div className={`max-w-[85%] ${message.type === "user" ? "text-right" : "text-left"}`}>
                    {/* Message Bubble */}
                    <div
                      className={`inline-block px-4 py-3 rounded-2xl ${
                        message.type === "user"
                          ? "bg-gradient-to-br from-[#F4B400] to-[#E5A500] text-white"
                          : "bg-white border border-[#1C8B82]/20 text-slate-800"
                      }`}
                    >
                      <p className="whitespace-pre-line">{message.content}</p>
                    </div>

                    {/* Impact Card */}
                    {message.impactCard && (
                      <button
                        onClick={() => handleImpactCardClick(message.impactCard!.scenario)}
                        className="mt-2 inline-block bg-gradient-to-br from-[#1C8B82]/10 to-[#F4B400]/10 border border-[#1C8B82]/30 rounded-xl p-4 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1C8B82] to-[#F4B400] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                            📊
                          </div>
                          <div className="text-left">
                            <p className="text-slate-900 flex items-center gap-2">
                              Impact Preview
                              <span className="text-xs bg-[#1C8B82] text-white px-2 py-0.5 rounded-full">
                                Preview
                              </span>
                            </p>
                            <p className="text-slate-600">{message.impactCard.data}</p>
                          </div>
                        </div>
                      </button>
                    )}

                    {/* Timestamp */}
                    <p className="text-slate-400 mt-1 px-2">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-white border border-[#1C8B82]/20 px-4 py-3 rounded-2xl">
                    <div className="flex gap-1">
                      <div
                        className="w-2 h-2 bg-[#1C8B82] rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-[#1C8B82] rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-[#1C8B82] rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="sticky bottom-0 bg-white border-t border-[#E0ECEB] px-6 py-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask Artham anything about your money…"
                  className="flex-1 px-4 py-3 rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1C8B82] focus:border-transparent text-slate-800 placeholder:text-slate-400"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1C8B82] to-[#128173] text-white flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 3L9 13M19 3L13 19L9 13L1 9L19 3Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Add animations */}
          <style>{`
            @keyframes slideIn {
              from {
                transform: translateX(100%);
              }
              to {
                transform: translateX(0);
              }
            }
            
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            .animate-slide-in {
              animation: slideIn 300ms ease-out;
            }
            
            .animate-fade-in {
              animation: fadeIn 400ms ease-out;
            }
          `}</style>
        </>
      )}
      
      {/* Impact Preview Modal */}
      {currentScenario && (
        <ImpactPreviewModal
          isOpen={showImpactPreview}
          onClose={() => {
            setShowImpactPreview(false);
            setCurrentScenario(null);
          }}
          {...getScenarioData(currentScenario)}
        />
      )}
    </>
  );
}
