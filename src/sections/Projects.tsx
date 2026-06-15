"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

interface ProjectsSectionProps {
  projects: any[];
}

export function ProjectsSection({ projects = [] }: ProjectsSectionProps) {
  const [filter, setFilter] = React.useState("All");
  
  // Extract unique categories from projects
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = projects.filter((p) => filter === "All" || p.category === filter);

  return (
    <section id="projects" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Featured Projects</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A selection of my best work and side projects.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={filter === cat ? "default" : "outline"}
              onClick={() => setFilter(cat)}
              className="rounded-full"
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full flex flex-col hover:shadow-xl transition-all hover:-translate-y-1 border-primary/10 group bg-card">
                <div className="relative w-full bg-muted overflow-hidden flex flex-col items-center justify-center">
                  <div className="relative z-10 w-full h-full">
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : null}
                  </div>
                  <div className="absolute inset-0 z-20 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    {project.githubUrl && (
                      <Link href={project.githubUrl} className={cn(buttonVariants({ size: "icon", variant: "secondary" }), "rounded-full")}>
                        <FaGithub className="w-5 h-5" />
                      </Link>
                    )}
                    {project.liveUrl && (
                      <Link href={project.liveUrl} className={cn(buttonVariants({ size: "icon", variant: "default" }), "rounded-full")}>
                        <ExternalLink className="w-5 h-5" />
                      </Link>
                    )}
                  </div>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-xl font-bold line-clamp-1">{project.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {Array.from(new Set((project.technologies || []).flatMap((t: any) => t.split(',').map((s: string) => s.trim())))).map((t: any) => (
                      <Badge key={t} variant="secondary">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
