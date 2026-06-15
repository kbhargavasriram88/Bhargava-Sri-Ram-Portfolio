import mongoose from "mongoose";
import Project from "../models/Project";
import Skill from "../models/Skill";
import Service from "../models/Service";
import Experience from "../models/Experience";
import Certificate from "../models/Certificate";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://kbhargavasriram88_db_user:6SekesO1HXnFltWk@kbhargavasriramportfoli.atjtwox.mongodb.net/?appName=kbhargavasriramportfolio";

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected.");

    const projectsCount = await Project.countDocuments();
    if (projectsCount === 0) {
      console.log("Seeding Projects...");
      await Project.insertMany([
        {
          title: "AI Image Generator",
          description: "A full-stack application that generates images from text prompts using DALL-E 3 API.",
          imageUrl: "/placeholder-project.svg",
          category: "AI/ML",
          technologies: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI"],
          githubUrl: "#",
          liveUrl: "#",
          featured: true
        },
        {
          title: "E-Commerce Platform",
          description: "Modern e-commerce platform with real-time inventory, Stripe integration, and admin dashboard.",
          imageUrl: "/placeholder-project.svg",
          category: "Full Stack",
          technologies: ["React", "Node.js", "MongoDB", "Stripe"],
          githubUrl: "#",
          liveUrl: "#",
          featured: true
        },
        {
          title: "Portfolio Website",
          description: "A premium, nature-inspired personal portfolio to showcase projects and skills.",
          imageUrl: "/placeholder-project.svg",
          category: "Web Development",
          technologies: ["Next.js 15", "Tailwind v4", "Framer Motion"],
          githubUrl: "#",
          liveUrl: "#",
          featured: true
        }
      ]);
    }

    const skillsCount = await Skill.countDocuments();
    if (skillsCount === 0) {
      console.log("Seeding Skills...");
      await Skill.insertMany([
        { name: "React", progress: 90, category: "Frontend", yearsOfExperience: 3, level: "Expert" },
        { name: "Next.js", progress: 85, category: "Frontend", yearsOfExperience: 2, level: "Advanced" },
        { name: "TypeScript", progress: 85, category: "Frontend", yearsOfExperience: 2, level: "Advanced" },
        { name: "Tailwind CSS", progress: 95, category: "Frontend", yearsOfExperience: 3, level: "Expert" },
        { name: "Framer Motion", progress: 80, category: "Frontend", yearsOfExperience: 1, level: "Intermediate" },
        { name: "Node.js", progress: 80, category: "Backend", yearsOfExperience: 3, level: "Advanced" },
        { name: "Express", progress: 85, category: "Backend", yearsOfExperience: 3, level: "Advanced" },
        { name: "MongoDB", progress: 75, category: "Database", yearsOfExperience: 2, level: "Intermediate" },
        { name: "PostgreSQL", progress: 70, category: "Database", yearsOfExperience: 2, level: "Intermediate" },
        { name: "GraphQL", progress: 65, category: "Backend", yearsOfExperience: 1, level: "Intermediate" },
        { name: "TensorFlow", progress: 60, category: "AI/ML", yearsOfExperience: 1, level: "Beginner" },
        { name: "PyTorch", progress: 50, category: "AI/ML", yearsOfExperience: 1, level: "Beginner" }
      ]);
    }

    const servicesCount = await Service.countDocuments();
    if (servicesCount === 0) {
      console.log("Seeding Services...");
      await Service.insertMany([
        {
          title: "Website Development",
          description: "Custom, performant, and scalable web applications built with modern technologies.",
          icon: "Globe",
          features: ["Next.js & React", "SEO Optimization", "Responsive Design", "Performance First"],
          startingPrice: "$500"
        },
        {
          title: "Landing Pages",
          description: "High-converting landing pages designed to turn visitors into loyal customers.",
          icon: "Layout",
          features: ["Conversion Optimized", "A/B Testing Ready", "Fast Loading", "Analytics Setup"],
          startingPrice: "$200"
        },
        {
          title: "Portfolio Websites",
          description: "Stand out from the crowd with a premium, custom-designed personal portfolio.",
          icon: "Smartphone",
          features: ["Custom Design", "CMS Integration", "Animations", "Domain Setup"],
          startingPrice: "$300"
        },
        {
          title: "Full-Stack Web Apps",
          description: "Complex web applications with databases, authentication, and API integrations.",
          icon: "Code",
          features: ["Database Design", "Secure Auth", "API Development", "Cloud Deployment"],
          startingPrice: "$1000"
        }
      ]);
    }

    const experienceCount = await Experience.countDocuments();
    if (experienceCount === 0) {
      console.log("Seeding Experience...");
      await Experience.insertMany([
        {
          title: "Full-Stack Developer Intern",
          organization: "Tech Solutions Inc.",
          startDate: new Date("2025-01-01"),
          current: true,
          description: "Developing scalable microservices using Node.js and React. Improved application load times by 40% through code optimization.",
          type: "Internship"
        },
        {
          title: "Technical Lead",
          organization: "University Coding Club",
          startDate: new Date("2024-08-01"),
          current: true,
          description: "Mentoring 50+ students in modern web development. Organized 3 hackathons and weekly coding workshops.",
          type: "Leadership"
        },
        {
          title: "Freelance Developer",
          organization: "Self-Employed",
          startDate: new Date("2023-01-01"),
          endDate: new Date("2024-12-31"),
          current: false,
          description: "Built and delivered 5+ custom websites for local businesses using Next.js and Tailwind CSS. Managed client relationships and project timelines.",
          type: "Work"
        }
      ]);
    }

    const certificatesCount = await Certificate.countDocuments();
    if (certificatesCount === 0) {
      console.log("Seeding Certificates...");
      await Certificate.insertMany([
        {
          title: "AWS Certified Developer – Associate",
          issuer: "Amazon Web Services",
          date: new Date("2025-05-01"),
          imageUrl: "/placeholder-project.svg",
          certificateUrl: "#"
        },
        {
          title: "Machine Learning Specialization",
          issuer: "Stanford Online",
          date: new Date("2024-08-01"),
          imageUrl: "/placeholder-project.svg",
          certificateUrl: "#"
        },
        {
          title: "Full-Stack Web Development",
          issuer: "FreeCodeCamp",
          date: new Date("2023-12-01"),
          imageUrl: "/placeholder-project.svg",
          certificateUrl: "#"
        }
      ]);
    }

    console.log("Seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
