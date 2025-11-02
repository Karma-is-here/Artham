/**
 * Artham - Reflective Personal Finance App
 * 
 * Complete User Flow:
 * 1. Landing Page → Sign Up or Sign In
 * 2. Sign Up/Sign In → Comprehensive Settings (CSV upload, risk appetite, preferences)
 * 3. Settings → Dashboard (with AI Financial Advisor)
 * 4. Dashboard includes ChatBot with Impact Preview Modal
 * 
 * Features:
 * - Beautiful signup/signin forms with validation
 * - CSV upload for transaction analysis
 * - Risk appetite assessment
 * - Vault preference customization
 * - AI vault calculations
 * - Interactive dashboard with vault cards
 * - AI Financial Advisor chatbot (floating icon → slide-in panel)
 * - Interactive impact preview with rolling digit animations
 * - Persistent user data in localStorage
 */

import { useState, useEffect } from "react";
import { UserData } from "./types/artham";
import { LandingPage } from "./components/artham/LandingPage";
import { SignupPage } from "./components/artham/SignupPage";
import { SigninPage } from "./components/artham/SigninPage";
import { SettingsPage } from "./components/artham/SettingsPage";
import { DashboardPage } from "./components/artham/DashboardPage";
import { ChatBot } from "./components/artham/ChatBot";
import { Toaster } from "./components/ui/sonner";

type Page = "landing" | "signup" | "signin" | "settings" | "dashboard";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("arthamUserData");
    const authToken = localStorage.getItem("arthamAuthToken");
    
    if (savedData && authToken) {
      const data = JSON.parse(savedData) as any;
      
      // Migration: Convert old income structure to new structure
      if (!data.income && (data.monthlyIncome !== undefined || data.additionalIncome !== undefined || data.variableIncome !== undefined)) {
        const oldMonthlyIncome = data.monthlyIncome || 0;
        const oldAdditionalIncome = data.additionalIncome || 0;
        const oldVariableIncome = data.variableIncome || 0;
        
        data.income = {
          primaryIncome: oldMonthlyIncome,
          sideIncomes: oldAdditionalIncome > 0 ? [{ label: "Additional Income", amount: oldAdditionalIncome }] : [],
          isVariable: oldVariableIncome > 0,
          averageMonthly: oldVariableIncome > 0 ? oldMonthlyIncome + oldAdditionalIncome + oldVariableIncome : 0,
        };
        
        // Clean up old fields
        delete data.monthlyIncome;
        delete data.additionalIncome;
        delete data.variableIncome;
      } else if (!data.income) {
        // Initialize income if it doesn't exist
        data.income = {
          primaryIncome: 0,
          sideIncomes: [],
          isVariable: false,
          averageMonthly: 0,
        };
      }
      
      setUserData(data as UserData);
      setIsAuthenticated(true);
      
      if (data.setupComplete) {
        setCurrentPage("dashboard");
      } else {
        setCurrentPage("settings");
      }
    }
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (userData) {
      localStorage.setItem("arthamUserData", JSON.stringify(userData));
    }
  }, [userData]);

  const handleGetStarted = () => {
    if (isAuthenticated && userData) {
      if (userData.setupComplete) {
        setCurrentPage("dashboard");
      } else {
        setCurrentPage("settings");
      }
    } else {
      setCurrentPage("signup");
    }
  };

  const handleGoToSignin = () => {
    setCurrentPage("signin");
  };

  const handleGoToSignup = () => {
    setCurrentPage("signup");
  };

  const handleBackToLanding = () => {
    setCurrentPage("landing");
  };

  const handleSignup = (name: string, email: string, password: string) => {
    const newUserData: UserData = {
      profile: {
        name: name,
        email: email,
        phone: "",
        photo: "",
        arthaScore: 50,
      },
      income: {
        primaryIncome: 0,
        sideIncomes: [],
        isVariable: false,
        averageMonthly: 0,
      },
      riskAppetite: "balanced",
      vaultPreferences: {
        spend: 50,
        save: 20,
        grow: 20,
        protect: 10,
      },
      vaultAllocation: {
        spend: 0,
        save: 0,
        grow: 0,
        protect: 0,
      },
      csvUploaded: false,
      setupComplete: false,
    };

    setUserData(newUserData);
    setIsAuthenticated(true);
    localStorage.setItem("arthamAuthToken", `token_${email}_${Date.now()}`);
    setCurrentPage("settings");
  };

  const handleSignin = (email: string, password: string) => {
    const savedData = localStorage.getItem("arthamUserData");
    
    if (savedData) {
      const data = JSON.parse(savedData) as UserData;
      
      if (data.profile.email === email) {
        setUserData(data);
        setIsAuthenticated(true);
        localStorage.setItem("arthamAuthToken", `token_${email}_${Date.now()}`);
        setCurrentPage(data.setupComplete ? "dashboard" : "settings");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("arthamAuthToken");
    setIsAuthenticated(false);
    setUserData(null);
    setCurrentPage("landing");
  };

  const handleUpdateUserData = (updates: Partial<UserData>) => {
    if (userData) {
      const updatedData = { ...userData, ...updates };
      setUserData(updatedData);
    }
  };

  const handleSetupComplete = () => {
    if (userData) {
      const completeData = {
        ...userData,
        setupComplete: true,
      };
      setUserData(completeData);
      setCurrentPage("dashboard");
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gradient-to-br from-[#1C8B82]/5 via-white to-[#F4B400]/5">
        {currentPage === "landing" && (
        <LandingPage
          onGetStarted={handleGetStarted}
          onLogin={handleGoToSignin}
          isReturningUser={isAuthenticated}
        />
      )}

      {currentPage === "signup" && (
        <SignupPage
          onSignup={handleSignup}
          onBackToLanding={handleBackToLanding}
          onGoToSignin={handleGoToSignin}
        />
      )}

      {currentPage === "signin" && (
        <SigninPage
          onSignin={handleSignin}
          onBackToLanding={handleBackToLanding}
          onGoToSignup={handleGoToSignup}
        />
      )}

      {currentPage === "settings" && userData && (
        <SettingsPage
          userData={userData}
          onUpdateData={handleUpdateUserData}
          onComplete={handleSetupComplete}
          onBackToDashboard={userData.setupComplete ? () => setCurrentPage("dashboard") : undefined}
        />
      )}

      {currentPage === "dashboard" && userData && (
        <>
          <DashboardPage
            userData={userData}
            onUpdateData={handleUpdateUserData}
            onLogout={handleLogout}
            onNavigateToSettings={() => setCurrentPage("settings")}
          />
          
          {/* AI Financial Advisor ChatBot */}
          <ChatBot 
            userName={userData.profile.name} 
            arthaScore={userData.profile.arthaScore} 
          />
        </>
      )}
      </div>
    </>
  );
}

export default App;
