import { Calendar, ExternalLink, ArrowLeft, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface EventItem {
  id: string;
  title: string;
  date: string;
  link?: string | null;
  category: string;
  image: string;
  featured?: boolean;
}

// Force dynamic rendering to always fetch fresh data
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Events | IEEE Student Branch - UKFCET",
  description: "Browse all events, workshops, and conferences organized by IEEE UKFCET Student Branch",
};

const EventCard = ({ event, featured = false }: { event: EventItem; featured?: boolean }) => {
  return (
    <div
      className={cn(
        "bg-background border border-border rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-lg hover:border-primary/30",
        featured && "lg:col-span-2 lg:row-span-2"
      )}
    >
      <div className={cn(
        "relative overflow-hidden",
        featured ? "h-64 lg:h-80" : "h-48"
      )}>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
        <div className="absolute top-4 left-4 z-20">
          <span className="inline-block bg-primary text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full shadow-md">
            {event.category}
          </span>
        </div>
        {featured && (
          <div className="absolute top-4 right-4 z-20">
            <span className="inline-block bg-yellow-500/90 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md">
              Featured
            </span>
          </div>
        )}
        <Image 
          src={event.image} 
          alt={event.title} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-110" 
          sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        />
      </div>

      <div className={cn("p-5", featured && "lg:p-8")}>
        <h3 className={cn(
          "font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors",
          featured ? "text-2xl lg:text-3xl" : "text-xl"
        )}>
          {event.title}
        </h3>

        <div className="space-y-2 text-sm text-foreground/70 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
            <span>{event.date}</span>
          </div>

          {event.link && (
            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-primary flex-shrink-0" />
              <a 
                href={event.link} 
                target="_blank" 
                rel="noreferrer"
                className="truncate hover:text-primary transition-colors hover:underline"
              >
                {event.link}
              </a>
            </div>
          )}
        </div>

        {featured && (
          <p className="mb-4 text-foreground/80 hidden lg:block text-base leading-relaxed">
            Join us for this special IEEE event featuring presentations, networking,
            and hands-on activities to celebrate innovation and technology.
          </p>
        )}

        {event.link && (
          <Button asChild variant={featured ? "default" : "outline"} size={featured ? "default" : "sm"} className="gap-2 mt-2">
            <a href={event.link} target="_blank" rel="noreferrer">
              Learn More <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};

// Group events by category
function groupEventsByCategory(events: EventItem[]): Record<string, EventItem[]> {
  return events.reduce((acc, event) => {
    const category = event.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(event);
    return acc;
  }, {} as Record<string, EventItem[]>);
}

export default async function EventsPage() {
  const events = await prisma.event.findMany({ 
    orderBy: { createdAt: "desc" } 
  });

  const featuredEvents = events.filter((e: EventItem) => e.featured);
  const regularEvents = events.filter((e: EventItem) => !e.featured);
  const categories: string[] = Array.from(new Set(events.map((e: EventItem) => e.category)));

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors mb-6 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="text-primary">Events</span>
            </h1>
            <p className="text-foreground/70 text-lg md:text-xl leading-relaxed">
              Explore all the events, workshops, seminars, and conferences organized by 
              IEEE UKFCET Student Branch. Stay updated with our latest activities and join us!
            </p>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center px-6 py-4 bg-background/80 backdrop-blur rounded-xl border border-border shadow-sm">
              <div className="text-3xl md:text-4xl font-bold text-primary">{events.length}</div>
              <div className="text-sm text-foreground/70 mt-1">Total Events</div>
            </div>
            <div className="text-center px-6 py-4 bg-background/80 backdrop-blur rounded-xl border border-border shadow-sm">
              <div className="text-3xl md:text-4xl font-bold text-primary">{categories.length}</div>
              <div className="text-sm text-foreground/70 mt-1">Categories</div>
            </div>
            <div className="text-center px-6 py-4 bg-background/80 backdrop-blur rounded-xl border border-border shadow-sm">
              <div className="text-3xl md:text-4xl font-bold text-primary">{featuredEvents.length}</div>
              <div className="text-sm text-foreground/70 mt-1">Featured</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      {featuredEvents.length > 0 && (
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 w-8 bg-primary rounded-full" />
              <h2 className="text-2xl md:text-3xl font-bold">
                Featured <span className="text-primary">Events</span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {featuredEvents.map((event: EventItem) => (
                <EventCard key={event.id} event={event} featured={true} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Events Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-1 w-8 bg-primary rounded-full" />
            <h2 className="text-2xl md:text-3xl font-bold">
              All <span className="text-primary">Events</span>
            </h2>
          </div>

          {/* Category Filter Pills */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-full">
                All ({events.length})
              </span>
              {categories.map((category) => (
                <span 
                  key={category} 
                  className="px-4 py-2 text-sm font-medium bg-background border border-border text-foreground/70 rounded-full hover:border-primary/50 transition-colors cursor-default"
                >
                  {category} ({events.filter((e: EventItem) => e.category === category).length})
                </span>
              ))}
            </div>
          )}

          {events.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {events.map((event: EventItem) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-background rounded-xl border border-border">
              <Search className="h-12 w-12 text-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Events Yet</h3>
              <p className="text-foreground/70 max-w-md mx-auto">
                We haven&apos;t added any events yet. Check back soon for upcoming events, 
                workshops, and conferences!
              </p>
              <Button asChild className="mt-6">
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Want to Participate in Our Events?
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto mb-8">
            Join IEEE UKFCET Student Branch to get exclusive access to workshops, 
            seminars, and networking opportunities with industry professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link 
                href="https://www.ieee.org/membership-application/public/join.html?grade=Student"
                target="_blank"
              >
                Join IEEE Today
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/#contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
