"use client";

import React from "react";
import Image from "next/image";
import { Linkedin, Mail, Github } from "lucide-react";
import { cn } from "@/lib/utils";

// Team data (in a real app, this would come from an API or CMS)
const teamMembers = [
  {
    id: 1,
    name: "David William",
    role: "Branch Chair",
    image: "/images/david.jpg",
    social: {
      linkedin: "https://linkedin.com/in/",
      email: "mailto:david@ieee.org",
      github: "https://github.com/"
    }
  },
  {
    id: 2,
    name: "Aparna S",
    role: "Vice Chair",
    image: "/images/aparna.jpg",
    social: {
      linkedin: "https://linkedin.com/in/",
      email: "mailto:aparna@ieee.org"
    }
  },
  {
    id: 3,
    name: "Jishnu J",
    role: "Secretary",
    image: "/images/jishnu.jpg",
    social: {
      linkedin: "https://linkedin.com/in/",
      email: "mailto:jishnu@ieee.org",
      github: "https://github.com/"
    }
  },
  {
    id: 4,
    name: "Jerry Thomas",
    role: "Treasurer",
    image: "/images/jerry.jpg",
    social: {
      linkedin: "https://linkedin.com/in/",
      email: "mailto:jerry@ieee.org"
    }
  },
  {
    id: 5,
    name: "Kaveri R",
    role: "Technical Lead",
    image: "/images/kaveri.jpg",
    social: {
      linkedin: "https://linkedin.com/in/",
      email: "mailto:kaveri@ieee.org",
      github: "https://github.com/"
    }
  },
  {
    id: 6,
    name: "Archa Anil",
    role: "Events Coordinator",
    image: "/images/archa.jpg",
    social: {
      linkedin: "https://linkedin.com/in/",
      email: "mailto:archa@ieee.org"
    }
  },
  {
    id: 7,
    name: "Abhijith K",
    role: "Membership Chair",
    image: "/images/abhijith.jpg",
    social: {
      linkedin: "https://linkedin.com/in/",
      email: "mailto:abhijith@ieee.org"
    }
  },
  {
    id: 8,
    name: "Abel Mathew",
    role: "Content Lead",
    image: "/images/abel.jpg",
    social: {
      linkedin: "https://linkedin.com/in/",
      email: "mailto:abel@ieee.org",
      github: "https://github.com/"
    }
  }
];

interface TeamMemberCardProps {
  member: typeof teamMembers[0];
}

const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  return (
    <div className="bg-background border border-border rounded-lg overflow-hidden group transition-all hover:shadow-md">
      {/* Member image */}
      <div className="aspect-square relative overflow-hidden">
        <Image 
          src={member.image} 
          alt={member.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Social overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
          <div className="flex gap-3">
            {member.social.linkedin && (
              <a 
                href={member.social.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors"
                aria-label={`${member.name}'s LinkedIn profile`}
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            
            {member.social.email && (
              <a 
                href={member.social.email}
                className="text-white hover:text-primary transition-colors"
                aria-label={`Email ${member.name}`}
              >
                <Mail className="h-5 w-5" />
              </a>
            )}
            
            {member.social.github && (
              <a 
                href={member.social.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors"
                aria-label={`${member.name}'s GitHub profile`}
              >
                <Github className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>
      
      {/* Member info */}
      <div className="p-4 text-center">
        <h3 className="font-bold text-lg">{member.name}</h3>
        <p className="text-primary text-sm">{member.role}</p>
      </div>
    </div>
  );
};

const TeamSection = () => {
  return (
    <section id="team" className="py-16 md:py-24 bg-background/50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our <span className="text-primary">Team</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Dedicated student leaders working to build a vibrant IEEE community
          </p>
        </div>
        
        {/* Team grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
