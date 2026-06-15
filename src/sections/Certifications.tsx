"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ExternalLink, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CertificationsSectionProps {
  certificates: any[];
}

export function CertificationsSection({ certificates = [] }: CertificationsSectionProps) {
  return (
    <section id="certifications" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Certifications</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Continuous learning and professional accreditations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert: any, index: number) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-all border-primary/10 group">
                <div className="relative w-full bg-muted overflow-hidden flex flex-col items-center justify-center">
                  <Award className="absolute text-primary/5 w-64 h-64 -right-12 -bottom-12" />
                  <div className="relative z-10 w-full h-full">
                    {cert.imageUrl ? (
                      <img
                        src={cert.imageUrl}
                        alt={cert.title}
                        className="w-full h-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : null}
                  </div>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col items-center text-center space-y-3">
                  <h3 className="text-lg font-bold line-clamp-2">{cert.title}</h3>
                  <p className="text-sm font-medium text-primary">{cert.issuer}</p>
                  <p className="text-xs text-muted-foreground">
                    {cert.date ? new Date(cert.date).toLocaleDateString(undefined, { month: 'long', year: 'numeric' }) : ''}
                  </p>
                  {cert.certificateUrl && (
                    <Link href={cert.certificateUrl} target="_blank" className={cn(buttonVariants({ variant: "outline" }), "w-full mt-4 rounded-full")}>
                      View Certificate <ExternalLink className="ml-2 w-4 h-4" />
                    </Link>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
