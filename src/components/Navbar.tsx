"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "Projects", href: "/#projects" },
  { name: "Services", href: "/#services" },
  { name: "Experience", href: "/#experience" },
  { name: "Certifications", href: "/#certifications" },
  { name: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLarge = pathname === "/" && !isScrolled;

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-border shadow-sm py-0"
          : "bg-transparent border-transparent py-2"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className={cn(
          "flex items-center justify-between transition-all duration-300",
          isLarge ? "h-24 md:h-28" : "h-16"
        )}>
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/logo.webp" 
              alt="Logo" 
              width={isLarge ? 72 : 40} 
              height={isLarge ? 72 : 40} 
              className="object-contain transition-all duration-300" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "font-medium transition-all duration-300 hover:text-primary",
                  isLarge ? "text-base lg:text-lg" : "text-sm",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className={cn(
            "hidden md:flex items-center gap-4 transition-all duration-300",
            isLarge ? "scale-110 origin-right" : "scale-100 origin-right"
          )}>
            <ThemeToggle />
            <Link href="/resume.pdf" target="_blank" rel="noreferrer" className={cn(buttonVariants(), "rounded-full")}>
              Resume
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border absolute w-full">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/resume.pdf" target="_blank" rel="noreferrer" className={cn(buttonVariants(), "w-full rounded-full")}>
              Resume
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
