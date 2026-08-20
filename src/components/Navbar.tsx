"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { OfferBanner } from "@/components/OfferBanner";
import { WebsiteRequestDialog } from "@/components/WebsiteRequestDialog";
import { FuturisticLogoEffect } from "@/components/FuturisticLogoEffect";
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

export function Navbar({ offer, requestForm }: { offer?: any; requestForm?: any }) {
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
      <OfferBanner offer={offer} requestForm={requestForm} />
      <div className="container mx-auto px-4 md:px-6">
        <div className={cn(
          "flex items-center justify-between transition-all duration-300",
          isLarge ? "h-24 md:h-28" : "h-16"
        )}>
          <Link href="/" className="flex items-center gap-2">
            <FuturisticLogoEffect>
              <Image 
                src="/logo.webp" 
                alt="Logo" 
                width={isLarge ? 72 : 40} 
                height={isLarge ? 72 : 40} 
                className="object-cover rounded-2xl border border-emerald-500/30 shadow-md shadow-emerald-500/10 hover:scale-105 transition-all duration-300" 
              />
            </FuturisticLogoEffect>
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
            "hidden md:flex items-center gap-3 transition-all duration-300",
            isLarge ? "scale-105 origin-right" : "scale-100 origin-right"
          )}>
            <ThemeToggle />
            <Link href="/resume.pdf" target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}>
              Resume
            </Link>
            <WebsiteRequestDialog requestForm={requestForm} />
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 md:hidden">
            <WebsiteRequestDialog 
              requestForm={requestForm}
              trigger={
                <Button size="sm" className="h-8 px-3 text-xs font-extrabold rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-black shadow-md shadow-emerald-500/20 gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{requestForm?.buttonText || "Request Website"}</span>
                </Button>
              }
            />
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
            <div className="pt-2 space-y-2">
              <Link href="/resume.pdf" target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: "outline" }), "w-full rounded-full justify-center")}>
                Resume
              </Link>
              <WebsiteRequestDialog 
                requestForm={requestForm}
                trigger={
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-extrabold rounded-full justify-center shadow-lg shadow-emerald-500/20 gap-2">
                    <Sparkles className="w-4 h-4" />
                    {requestForm?.buttonText || "Request a Website"}
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
