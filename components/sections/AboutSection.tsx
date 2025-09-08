"use server"

import React from 'react';
import { Info, Users, Award, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}

const Feature = ({ icon, title, description, delay }: FeatureProps) => {
  return (
    <div className={cn("group flex flex-col items-start gap-3 p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1", delay)}>
      <div className="rounded-lg p-3 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
};

const AboutSection = () => {
  const features = [
    {
      icon: <Info className="h-6 w-6" />,
      title: "IEEE Mission",
      description: "IEEE's core purpose is to foster technological innovation and excellence for the benefit of humanity.",
      delay: "animate-fade-in-delay-100"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Global Community",
      description: "Connect with over 400,000 members worldwide who share knowledge and collaborate on advancing technology.",
      delay: "animate-fade-in-delay-200"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Professional Growth",
      description: "Develop technical and leadership skills through workshops, conferences, and specialized training programs.",
      delay: "animate-fade-in-delay-300"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "IEEE UKFCET",
      description: "Our student branch at UKFCET aims to bridge the gap between academic learning and industry requirements.",
      delay: "animate-fade-in-delay-400"
    }
  ];

  return (
    <section id="about" className="relative py-16 sm:py-24 bg-background">
      <div className="absolute inset-0 z-0 opacity-5 bg-circuit-pattern"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="animate-fade-in text-sm font-medium text-primary">About Us</span>
          <h2 className="animate-fade-in-delay-100 mt-2 text-3xl md:text-4xl font-bold tracking-tight">
            About Us
          </h2>
          <p className="animate-fade-in-delay-200 mt-4 text-lg text-muted-foreground text-balance">
            IEEE UKFCET is a student branch of the world's largest technical professional organization dedicated to advancing technology for the benefit of humanity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left content */}
          <div className="lg:col-span-1 space-y-6">
            <div className="animate-fade-in-delay-300">
              <h3 className="text-2xl font-bold">Who We Are</h3>
              <p className="text-muted-foreground leading-relaxed">
                Since our establishment, we have been committed to creating a platform for students to explore and contribute to the field of engineering and technology.
              </p>
            </div>
            <div className="animate-fade-in-delay-300">
              <p className="text-muted-foreground leading-relaxed">
                Our branch provides numerous opportunities for students to develop technical knowledge, leadership skills, and professional networks. We organize workshops, technical talks, project competitions, and various other events to foster a vibrant learning environment.
              </p>
            </div>
            <div className="flex flex-col gap-3 animate-fade-in-delay-300">
            </div>
          </div>

          {/* Right content - Feature cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Feature
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={feature.delay}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;