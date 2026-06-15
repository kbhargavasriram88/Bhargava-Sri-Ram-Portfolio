"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SkillsSectionProps {
  skills: any[];
}

export function SkillsSection({ skills = [] }: SkillsSectionProps) {
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Technical Arsenal</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A comprehensive toolkit for building robust and scalable applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm">
                  {category.charAt(0)}
                </span>
                {category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.filter((s: any) => s.category === category).map((skill: any, index: number) => (
                  <Card key={skill.name} className="overflow-hidden border-border/50 hover:border-primary/30 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-foreground">{skill.name}</span>
                        <div className="text-right">
                          <span className="text-xs text-muted-foreground mr-2">{skill.level}</span>
                          <span className="text-xs font-bold text-primary">{skill.progress}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-secondary/20 h-2 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                          className="bg-primary h-full rounded-full"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
