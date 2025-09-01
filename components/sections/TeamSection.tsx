import React from "react";
import Image from "next/image";
import { Linkedin, Mail, Github } from "lucide-react";

interface TeamMemberItem {
  id: string;
  name: string;
  role: string;
  branch: string;
  rank: number;
  image: string;
  linkedin?: string | null;
  email?: string | null;
  github?: string | null;
}

const TeamMemberCard = ({ member }: { member: TeamMemberItem }) => {
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
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-primary transition-colors"
                aria-label={`${member.name}'s LinkedIn profile`}
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}

            {member.email && (
              <a
                href={
                  member.email.startsWith("mailto:")
                    ? member.email
                    : `mailto:${member.email}`
                }
                className="text-white hover:text-primary transition-colors"
                aria-label={`Email ${member.name}`}
              >
                <Mail className="h-5 w-5" />
              </a>
            )}

            {member.github && (
              <a
                href={member.github}
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

const TeamSection = async () => {
  let teamMembers: TeamMemberItem[] = [];

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/team`, { cache: 'no-store' });
    teamMembers = await response.json();
  } catch (error) {
    console.warn('Failed to fetch team members during build/runtime:', error);
  }

  const sbMembers = teamMembers.filter(member => member.branch.toLowerCase() === "sb").sort((a, b) => a.rank - b.rank);
  const iasMembers = teamMembers.filter(member => member.branch.toLowerCase() === "ias").sort((a, b) => a.rank - b.rank);
  const pelsMembers = teamMembers.filter(member => member.branch.toLowerCase() === "pels").sort((a, b) => a.rank - b.rank);
  const comsocMembers = teamMembers.filter(member => member.branch.toLowerCase() === "comsoc").sort((a, b) => a.rank - b.rank);

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
        <h3 className="text-primary text-2xl font-bold mb-4">SB Team</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {sbMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>

        <h3 className="text-primary text-2xl font-bold mb-4">IAS Team</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {iasMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>

        <h3 className="text-primary text-2xl font-bold mb-4">PELS Team</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {pelsMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>

        <h3 className="text-primary text-2xl font-bold mb-4">ComSoc Team</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {comsocMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
