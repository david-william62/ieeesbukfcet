"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#events", label: "Events" },
  // { href: "#speakers", label: "Speakers" },
  { href: "/#team", label: "Team" },
  { href: "/#contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2">
          <img 
            src="/logo.png" 
            alt="IEEE Logo"
            className="h-15 w-12 mr-6 md:h-15 md:w-14 object-contain"
          />
          <img 
            src="/college-logo.png" 
            alt="UKFCET Logo"
            className="h-auto w-40 md:h-50 md:w-60 object-contain"
          /> 
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-foreground/70 hover:text-primary transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
          
          <Link
            href="https://www.ieee.org/membership-application/public/join.html?grade=Student"
            target="_blank"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md transition-colors hover-lift"
          >
            Register
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-foreground/70 hover:text-primary"
          aria-label="Toggle menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden fixed inset-x-0 top-[60px] bg-background/95 backdrop-blur-lg shadow-lg transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? "max-h-[500px] border-b" : "max-h-0"
        )}
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col gap-2 py-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground/70 hover:text-primary py-2 px-3 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            
            <Link
              href="https://www.ieee.org/membership-application/public/join.html?grade=Student"
              target="_blank"
              className="bg-primary hover:bg-primary/90 text-primary-foreground mt-2 py-2 px-3 rounded-md text-center"
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
