import { HeroSection } from "@/sections/Hero";
import { AboutSection } from "@/sections/About";
import { SkillsSection } from "@/sections/Skills";
import { ProjectsSection } from "@/sections/Projects";
import { ServicesSection } from "@/sections/Services";
import { ExperienceSection } from "@/sections/Experience";
import { CertificationsSection } from "@/sections/Certifications";
import { TestimonialsSection } from "@/sections/Testimonials";
import { ContactSection } from "@/sections/Contact";

import { getSettings } from "@/actions/settings";
import { getProjects } from "@/actions/projects";
import { getSkills } from "@/actions/skills";
import { getServices } from "@/actions/services";
import { getExperience } from "@/actions/experience";
import { getCertificates } from "@/actions/certificates";
import { getTestimonials } from "@/actions/testimonials";

export default async function Home() {
  const [
    settingsRes,
    projects,
    skills,
    services,
    experience,
    certificates,
    testimonials
  ] = await Promise.all([
    getSettings(),
    getProjects(),
    getSkills(),
    getServices(),
    getExperience(),
    getCertificates(),
    getTestimonials()
  ]);

  const settings = settingsRes.success ? settingsRes.data : null;

  return (
    <div className="flex flex-col w-full">
      <HeroSection settings={settings} />
      <AboutSection settings={settings} />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <ServicesSection services={services} />
      <ExperienceSection experience={experience} />
      <CertificationsSection certificates={certificates} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection settings={settings} />
    </div>
  );
}
