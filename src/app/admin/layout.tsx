import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LayoutDashboard, LogOut, Settings as SettingsIcon, MessageSquare, Briefcase, Award, Code, FolderGit2 } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import Settings from "@/models/Settings";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  await dbConnect();
  const settingsDoc = await Settings.findOne();
  const backgroundImageUrl = settingsDoc?.hero?.backgroundImageUrl || "/hero-bg.jpg";

  const ADMIN_LINKS = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Projects", href: "/admin/projects", icon: FolderGit2 },
    { name: "Skills", href: "/admin/skills", icon: Code },
    { name: "Services", href: "/admin/services", icon: Briefcase },
    { name: "Experience", href: "/admin/experience", icon: Briefcase },
    { name: "Certificates", href: "/admin/certificates", icon: Award },
    { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
    { name: "Messages", href: "/admin/messages", icon: MessageSquare },
    { name: "Settings", href: "/admin/settings", icon: SettingsIcon },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Admin Background Layer */}
      <div className="fixed top-0 left-0 w-screen h-screen z-[-1] pointer-events-none">
        <Image 
          src={backgroundImageUrl} 
          alt="Admin Background" 
          fill 
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
      </div>

      {/* Sidebar */}
      <aside className="w-64 bg-card/40 backdrop-blur-xl border-r hidden md:flex flex-col">
        <div className="p-6 border-b border-border/50">
          <Link href="/admin" className="text-xl font-bold tracking-tight text-primary">Admin Panel</Link>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {ADMIN_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors"
              >
                <Icon className="w-4 h-4" />
                {link.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border/50 mt-auto">
          <Link href="/api/auth/signout" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-card/40 backdrop-blur-xl border-b border-border/50 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
          <h1 className="text-lg font-semibold md:hidden">Admin Panel</h1>
          <div className="ml-auto flex items-center gap-4">
            <Link href="/" target="_blank" className="text-sm text-muted-foreground hover:text-foreground">View Site</Link>
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
