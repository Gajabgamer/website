"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useLayoutEffect } from "react";

type Currency = "INR" | "USD" | "EUR";

interface UserContextType {
  userName: string;
  userEmail: string;
  currency: Currency;
  isFirstVisit: boolean;
  setUserData: (name: string, currency: Currency, email?: string) => void;
  formatPrice: (inrAmount: number) => string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [currency, setCurrency] = useState<Currency>("INR");
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(false);
  const [mounted, setMounted] = useState(true);

  // Keep the original effect for loading user data
  useEffect(() => {
    const storedName = localStorage.getItem("webate_user_name");
    const storedEmail = localStorage.getItem("webate_user_email") || "";
    const storedCurrency = localStorage.getItem("webate_user_currency") as Currency;

    if (!storedName || !storedCurrency) {
      // Using setTimeout to avoid synchronous state update in effect
      setTimeout(() => setIsFirstVisit(true), 0);
    } else {
      // Using setTimeout to avoid synchronous state updates in effect
      setTimeout(() => {
        setUserName(storedName);
        setUserEmail(storedEmail);
        setCurrency(storedCurrency as Currency);
      }, 0);
    }
    // No need to set mounted since it's initialized to true
  }, []);

  const setUserData = (name: string, cur: Currency, email?: string) => {
    localStorage.setItem("webate_user_name", name);
    localStorage.setItem("webate_user_currency", cur);
    if (email) localStorage.setItem("webate_user_email", email);
    setUserName(name);
    setCurrency(cur);
    if (email) setUserEmail(email);
    setIsFirstVisit(false);
  };

  const formatPrice = (inrAmount: number): string => {
    const rates = {
      INR: 1,
      USD: 1 / 83,
      EUR: 1 / 90,
    };

    const symbols = {
      INR: "₹",
      USD: "$",
      EUR: "€",
    };

    let converted = inrAmount * rates[currency];

    // Apply 10x pricing & professional endings for foreign currencies
    if (currency !== "INR" && converted > 0) {
      converted *= 10;

      if (converted >= 1000) {
        converted = Math.max(1, Math.round(converted / 1000)) * 1000 - 1;
      } else if (converted >= 100) {
        converted = Math.max(1, Math.round(converted / 100)) * 100 - 1;
      } else {
        converted = Math.max(1, Math.round(converted / 10)) * 10 - 1;
      }
    }

    // For INR, use no decimals. Non-INR are mostly integers now due to the rounding logic above.
    const formattedValue = currency === "INR"
      ? Math.round(converted).toLocaleString("en-IN")
      : converted.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });

    return `${symbols[currency]}${formattedValue}`;
  };

  if (!mounted) return null;

  return (
    <UserContext.Provider value={{ userName, userEmail, currency, isFirstVisit, setUserData, formatPrice }}>
      {children}
    </UserContext.Provider>
  );
};
