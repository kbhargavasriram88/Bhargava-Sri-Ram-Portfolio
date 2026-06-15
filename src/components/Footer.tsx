import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t bg-background/50 backdrop-blur-sm relative">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Image src="/logo.webp" alt="Logo" width={40} height={40} className="object-contain" />
            </Link>
            <p className="text-muted-foreground max-w-sm">
              Building scalable web applications and intelligent digital experiences.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
              <Link href="/#projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">Projects</Link>
              <Link href="/#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</Link>
              <Link href="/#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Connect</h4>
            <div className="flex items-center space-x-4">
              <Link href="https://github.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <FaGithub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <FaLinkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="mailto:hello@example.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Bhargava Sri Ram. All rights reserved.
          </p>
          <Link href="#" className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full")}>
            <ArrowUp className="h-5 w-5" />
            <span className="sr-only">Back to top</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
