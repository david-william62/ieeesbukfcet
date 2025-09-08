"use server"

import { Calendar, ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

interface EventItem {
  id: string;
  title: string;
  date: string;
  link?: string | null;
  category: string;
  image: string;
  featured?: boolean;
}

const EventCard = ({ event, className, featured = false }: { event: EventItem; className?: string; featured?: boolean }) => {
  return (
    <div
      className={cn(
        "bg-background border border-border rounded-lg overflow-hidden group transition-all hover:shadow-md",
        featured && "md:col-span-2 md:flex",
        className
      )}
    >
      <div className={cn("relative h-48 overflow-hidden", featured && "md:w-1/2 md:h-auto")}>
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent z-10" />
        <div className="absolute top-4 left-4 z-20">
          <span className="inline-block bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-full">
            {event.category}
          </span>
        </div>
        <div className="h-full w-full relative">
          <Image src={event.image} alt={event.title} fill className="object-cover transition-transform group-hover:scale-105" sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "100vw"} />
        </div>
      </div>

      <div className={cn("p-5", featured && "md:w-1/2 md:p-8")}>
        <h3 className="font-bold text-xl mb-3">{event.title}</h3>

        <div className="space-y-2 text-sm text-foreground/70 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{event.date}</span>
          </div>

          {event.link && (
            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-primary" />
              <a href={event.link} target="_blank" rel="noreferrer">
                {event.link}
              </a>
            </div>
          )}
        </div>

        {featured && (
          <p className="mb-4 text-foreground/80 hidden md:block">
            Join us for this special IEEE event featuring presentations, networking,
            and hands-on activities to celebrate innovation and technology.
          </p>
        )}

        <Button variant="outline" size="sm" className="gap-1 mt-2">
          Learn More <ArrowRight className="h-3 w-3 ml-1" />
        </Button>
      </div>
    </div>
  );
};

const EventsSection = async () => {
  const events = await prisma.event.findMany({ 
    orderBy: { createdAt: "desc" } 
  });

  const featuredEvent = events.find((e: EventItem) => e.featured) as EventItem;
  const otherEvents = events.filter((e: EventItem) => e !== featuredEvent);

  return (
    <section id="events" className="py-16 md:py-24 bg-background/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Latest <span className="text-primary">Events</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Discover our most recent and upcoming events, workshops, and conferences organized by IEEE UKFCET.
          </p>
        </div>

        {events.length > 0 && (
          <div className="mb-12">
            <EventCard event={featuredEvent} featured={true} />
          </div>
        )}

        {events.length > 1 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherEvents.map((event: EventItem) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Button>View All Events</Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
