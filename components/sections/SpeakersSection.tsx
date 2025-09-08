"use server"

import React from "react";
import Image from "next/image";
import { Linkedin, Twitter, Globe } from "lucide-react";
import { prisma } from "@/lib/prisma";

interface SpeakerItem {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string | null;
  twitter?: string | null;
  website?: string | null;
}

const SpeakerCard = ({ speaker }: { speaker: SpeakerItem }) => {
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

        <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          {speaker.linkedin && (
            <a
              href={speaker.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 transition-colors p-2 rounded-full bg-background/10"
              aria-label={`${speaker.name}'s LinkedIn profile`}
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}

          {speaker.twitter && (
            <a
              href={speaker.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 transition-colors p-2 rounded-full bg-background/10"
              aria-label={`${speaker.name}'s Twitter profile`}
            >
              <Twitter className="h-5 w-5" />
            </a>
          )}

          {speaker.website && (
            <a
              href={speaker.website}
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

const SpeakersSection = async () => {
  const speakers = await prisma.speaker.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <section id="speakers" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-primary">Speakers</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Learn from industry experts and academic leaders at the forefront of
            technological innovation
          </p>
        </div>

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

