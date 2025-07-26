"use client";

import React from "react";
import Image from "next/image";
import { Linkedin, Twitter, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

// In a real application, this data would come from a CMS or API
const speakers = [
  {
    id: 1,
    name: "Mr. Srikanth Pillai",
    role: "Chair, IAS CMD",
    bio: "Research assistant at MARC, McMaster University, with a keen interest in the design of electric motors for Electric Vehicles (EV) and Aerospace applications.",
    image: "/images/Pillai_Srikanth_12_Resized.jpg",
    social: {
      linkedin: "https://www.linkedin.com/in/srikanthvpillai/",
      twitter: "https://twitter.com/",
      website: "https://example.com/"
    }
  },
  // {
  //   id: 2,
  //   name: "Prof. Michael Chen",
  //   role: "Quantum Computing Expert, MIT",
  //   bio: "Pioneer in quantum computing research with multiple patents in quantum algorithm optimization.",
  //   image: "/images/circuit-pattern.svg",
  //   social: {
  //     linkedin: "https://linkedin.com/in/",
  //     twitter: "https://twitter.com/"
  //   }
  // },
  // {
  //   id: 3,
  //   name: "Priya Sharma",
  //   role: "Director of Engineering, Microsoft",
  //   bio: "Technology leader focused on cloud infrastructure and distributed systems at scale.",
  //   image: "/images/circuit-pattern.svg",
  //   social: {
  //     linkedin: "https://linkedin.com/in/",
  //     website: "https://example.com/"
  //   }
  // },
  // {
  //   id: 4,
  //   name: "Dr. James Wilson",
  //   role: "Robotics Professor, Stanford",
  //   bio: "Specializes in human-robot interaction and autonomous systems for healthcare applications.",
  //   image: "/images/circuit-pattern.svg",
  //   social: {
  //     linkedin: "https://linkedin.com/in/",
  //     twitter: "https://twitter.com/"
  //   }
  // }
];

interface SpeakerCardProps {
  speaker: typeof speakers[0];
}

const SpeakerCard = ({ speaker }: SpeakerCardProps) => {
  return (
    <div className="bg-background border border-border rounded-lg overflow-hidden group hover:shadow-md transition-shadow">
      <div className="aspect-square relative overflow-hidden">
        <Image 
          src={speaker.image} 
          alt={speaker.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay with social links on hover */}
        <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          {speaker.social.linkedin && (
            <a 
              href={speaker.social.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 transition-colors p-2 rounded-full bg-background/10"
              aria-label={`${speaker.name}'s LinkedIn profile`}
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}
          
          {speaker.social.twitter && (
            <a 
              href={speaker.social.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 transition-colors p-2 rounded-full bg-background/10"
              aria-label={`${speaker.name}'s Twitter profile`}
            >
              <Twitter className="h-5 w-5" />
            </a>
          )}
          
          {speaker.social.website && (
            <a 
              href={speaker.social.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 transition-colors p-2 rounded-full bg-background/10"
              aria-label={`${speaker.name}'s website`}
            >
              <Globe className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-lg">{speaker.name}</h3>
        <p className="text-primary text-sm mb-3">{speaker.role}</p>
        <p className="text-foreground/70 text-sm">{speaker.bio}</p>
      </div>
    </div>
  );
};

const SpeakersSection = () => {
  return (
    <section id="speakers" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-primary">Speakers</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Learn from industry experts and academic leaders at the forefront of technological innovation
          </p>
        </div>
        
        {/* Speakers grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {speakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeakersSection;
