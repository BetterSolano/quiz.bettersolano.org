"use client";

import { motion } from "framer-motion";
import {
  MapPin, Calendar, Users, Landmark, Church, BookOpen,
  ArrowRight, Globe, Building,
} from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { heroStagger, heroChild, staggerContainer, staggerItem } from "@/styles/animations";

const facts = [
  { icon: Calendar, label: "Founded", value: "1767", description: "By Dominican missionary Fr. Alejandro Vidal" },
  { icon: Users, label: "Population", value: "65,287", description: "As of the 2020 census" },
  { icon: MapPin, label: "Barangays", value: "22", description: "6 urban and 16 rural" },
  { icon: Building, label: "Classification", value: "1st Class", description: "Municipality of Nueva Vizcaya" },
  { icon: Globe, label: "Region", value: "Cagayan Valley", description: "Region II, Northern Luzon" },
  { icon: Landmark, label: "Named After", value: "Gov. Gen. Solano", description: "Ramon Solano y Landeral (1860)" },
];

const landmarks = [
  {
    icon: Church,
    name: "St. Louis Beltran Church",
    description:
      "One of the best-preserved Spanish colonial churches in Northern Luzon, dedicated to the town's patron saint.",
  },
  {
    icon: Landmark,
    name: "Shrine of Poong Hesus Nazareno",
    description:
      'Known as the "Quiapo of the North," this shrine attracts thousands of devotees annually.',
  },
  {
    icon: MapPin,
    name: "Spanish-Era Bridge",
    description:
      "A historic stone bridge in Barangay San Luis, built by Fr. Juan Fernandez Villaverde.",
  },
  {
    icon: Globe,
    name: "Bangaan Rolling Hills",
    description:
      "Scenic natural landscape in Barangay Bangaan offering panoramic views of the countryside.",
  },
];

export default function AboutClient() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero */}
      <motion.div
        variants={heroStagger}
        initial="hidden"
        animate="visible"
        className="text-center max-w-3xl mx-auto"
      >
        <motion.div variants={heroChild}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <MapPin className="w-3.5 h-3.5" />
            Discover Solano
          </span>
        </motion.div>
        <motion.h1 variants={heroChild} className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          Solano, Nueva Vizcaya
        </motion.h1>
        <motion.p variants={heroChild} className="mt-4 text-lg text-muted-foreground leading-relaxed">
          A first-class municipality in the province of Nueva Vizcaya, Solano serves as the
          commercial and financial center of the province. Rich in history dating back to 1767,
          it blends Gaddang heritage with a cosmopolitan culture shaped by centuries of diverse settlement.
        </motion.p>
      </motion.div>

      {/* Quick Facts */}
      <section>
        <h2 className="text-2xl font-bold text-center mb-8">Quick Facts</h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {facts.map((fact) => {
            const Icon = fact.icon;
            return (
              <motion.div key={fact.label} variants={staggerItem}>
                <Card className="p-5 text-center h-full">
                  <Icon className="w-6 h-6 mx-auto mb-3 text-primary" />
                  <div className="text-xl font-bold">{fact.value}</div>
                  <div className="text-sm font-medium text-foreground mt-1">{fact.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{fact.description}</div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* History */}
      <section className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">A Brief History</h2>
        <div className="prose prose-sm dark:prose-invert text-muted-foreground space-y-4">
          <p>
            Solano&apos;s history begins with the Gaddang people who originally inhabited the area known as
            Bintauan. In 1767, Dominican priest Father Alejandro Vidal established a Spanish mission,
            formally founding the town under the name Lumabang (from the Gaddang word &quot;lungab&quot; meaning cave).
          </p>
          <p>
            The town experienced various administrative changes. In 1851, Governor General Antonio Urbiztondo
            reduced it to a barrio of Bayombong due to insufficient inhabitants. It was not until 1860 that
            Governor General Ramon Solano y Landeral authorized its separation, granting it full municipal
            status and its current name.
          </p>
          <p>
            In 1889, Father Juan Villaverde redesigned the town with a modern grid layout: 14 parallel
            streets, each 20 meters wide, forming 100 square blocks. This visionary urban plan laid the
            foundation for Solano&apos;s growth into the commercial hub it is today.
          </p>
          <p>
            Spanish rule ended on September 14, 1898. A brief Revolutionary Government was established
            three days later under Major Delfin Esquivel, marking Solano&apos;s transition into the modern era.
          </p>
        </div>
      </section>

      {/* Landmarks */}
      <section>
        <h2 className="text-2xl font-bold text-center mb-8">Notable Landmarks</h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {landmarks.map((landmark) => {
            const Icon = landmark.icon;
            return (
              <motion.div key={landmark.name} variants={staggerItem}>
                <Card className="p-5 h-full">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{landmark.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{landmark.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to Test Your Knowledge?</h2>
        <p className="text-muted-foreground mb-6">
          Take a quiz and see how much you know about Solano&apos;s rich heritage.
        </p>
        <Link href="/quiz">
          <Button size="lg" className="group">
            Start Quiz
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
