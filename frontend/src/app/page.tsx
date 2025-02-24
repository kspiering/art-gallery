import Image from "next/image";
import heroImage from "../components/images/hero.jpg";

import { EventListSkeleton } from "@/components/skeletons/event-list-skeleton";
import { Suspense } from "react";
import EventListHomepage from "@/components/event-list/event-list-homepage";

import { LinkButton } from "@/components/buttons/link-button";
import CookieBanner from "@/components/cookie-banner/cookie-banner";
import Link from "next/link";

import { Brush, Sparkles, Rocket } from "lucide-react";

// Info für Event Daten
export interface EventData {
  id: number;
  title: string;
  content: string;
  longDescription: string;
  location: string;
  address: string;
  date: string;
  time: string;
  user_id: number;
  firstname: string;
  lastname: string;
  created_at: string;
  updated_at: string;
}

// Homepage
export default async function Home() {
  return (
    <div>
      <CookieBanner />
      <div className="relative w-full h-[400px] md:h-[550px] overflow-hidden">
        <Image
          src={heroImage}
          alt="Hero Bild"
          fill
          className="object-cover opacity-70"
          priority
        />
        {/* Dunkler Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10 px-4 text-center">
          {/* Hero Section Titel */}
          <h1 className="text-white text-4xl md:text-6xl lg:text-8xl font-bold mb-4">
            Deine Ausstellung
          </h1>
          <h2 className="text-white text-xl md:text-2xl font-bold">
            Lass die Schweiz wissen, wann deine Ausstellungen stattfinden
          </h2>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <p className="mt-10 text-justify">
            Willkommen bei The Art Gallery – deinem Treffpunkt für Kunst und
            Inspiration! Ob du ein aufstrebender Künstler bist, der seine Werke
            der Schweiz präsentieren möchtest, oder ein Kunstliebhaber auf der
            Suche nach einzigartigen Erlebnissen – hier bist du genau richtig.{" "}
            <span className="font-semibold text-primary">
              <Link href={"/session"}>Jetzt anmelden oder registrieren</Link>{" "}
            </span>{" "}
            und bringe deine künstlerische Vision zum Leben!
          </p>
        </div>
        {/* Stichpunkte */}
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start mt-20 font-semibold gap-4 md:gap-2">
          <span className="ms:text-xl flex flex-row gap-2 items-center">
            <Sparkles /> Entdecke neue Möglichkeiten
          </span>
          <span>
            <Link
              className="ms:text-xl flex flex-row gap-2 items-center"
              href={"/ausstellungen"}
            >
              <Brush /> Erlebe aufregende Events
            </Link>
          </span>
          <span className="ms:text-xl flex flex-row gap-2 items-center mb-20">
            <Rocket /> Starte deine Kunst-Reise
          </span>
        </div>
        {/* Events */}
        <h1 className="sm:text-3xl text-center sm:text-left">Ausstellungen</h1>
        <h2 className="sm:text-2xl text-center sm:text-left">Aktuell</h2>
        <div className="flex flex-col gap-6">
          <Suspense fallback={<EventListSkeleton />}>
            <EventListHomepage />
          </Suspense>
        </div>
        <LinkButton
          href={"/ausstellungen"}
          className="px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm text-center flex items-center justify-center gap-1"
        >
          Mehr Events
        </LinkButton>
      </div>
    </div>
  );
}
