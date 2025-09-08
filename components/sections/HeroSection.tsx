"use server"

import React from "react";
import ThreeScene from "@/components/ui/ThreeScene";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  // const isMobile = useIsMobile();
  
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background ThreeScene */}
      {/* <ThreeScene /> */}
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-background z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="flex flex-col items-center text-center">
          <div className="space-y-4 sm:space-y-6">
            <span className="inline-block animate-fade-in animation-delay-100 px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
              IEEE Student Branch
            </span>
            
            <h1 className="animate-fade-in animation-delay-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter">
              Empowering Innovation
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ieee-blue to-ieee-teal">
                Through Technology
              </span>
            </h1>
            
            <p className="animate-fade-in animation-delay-300 mt-4 sm:mt-6 max-w-xl sm:max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-foreground/80 text-balance">
              Join the global community of IEEE at UKFCET and be part of the technological revolution
            </p>
            
            <div className="animate-fade-in animation-delay-500 mt-6 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a href="#about">Discover More</a>
              </Button>
              
              <Button variant="outline" asChild>
                <a href="#register" className="flex items-center">
                  Register Now <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
