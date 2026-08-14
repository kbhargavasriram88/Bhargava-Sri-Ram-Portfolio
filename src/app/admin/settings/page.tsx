"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSettings, updateSettings } from "@/actions/settings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Save, Plus, Trash2, Sparkles } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await getSettings();
      if (res.success) {
        setSettings(res.data);
      } else {
        setError(res.error || "Failed to load settings");
      }
    } catch (err) {
      setError("An error occurred while fetching settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    setSuccessMsg("");

    try {
      const res = await updateSettings(settings);
      if (!res.success) {
        setError(res.error || "Failed to save settings");
      } else {
        setSuccessMsg("Settings updated successfully!");
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred while saving settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handleHeroChange = (field: string, value: any) => {
    setSettings((prev: any) => ({ ...prev, hero: { ...prev.hero, [field]: value } }));
  };

  const handleAboutChange = (field: string, value: any) => {
    setSettings((prev: any) => ({ ...prev, about: { ...prev.about, [field]: value } }));
  };

  const handleSocialChange = (field: string, value: string) => {
    setSettings((prev: any) => ({ ...prev, socialLinks: { ...prev.socialLinks, [field]: value } }));
  };

  const handleOfferChange = (field: string, value: any) => {
    setSettings((prev: any) => ({
      ...prev,
      offer: {
        ...(prev?.offer || {
          enabled: false,
          title: "",
          description: "",
          badgeText: "",
          buttonText: "",
          buttonLink: "",
          discountCode: "",
        }),
        [field]: value
      }
    }));
  };

  const handleRequestFormChange = (field: string, value: any) => {
    setSettings((prev: any) => ({
      ...prev,
      requestForm: {
        ...(prev?.requestForm || {
          enabled: true,
          title: "Request a Custom Website",
          description: "Tell me about your idea, requirements, and budget to get a custom proposal within 24 hours.",
          badgeText: "Start Your Project",
          buttonText: "Request a Website",
          budgetOptions: ["$200 - $500", "$500 - $1,000", "$1,000 - $2,500", "$2,500+"],
          timelineOptions: ["Urgent (1-3 Days)", "1-2 Weeks", "3-4 Weeks", "Flexible"]
        }),
        [field]: value
      }
    }));
  };

  const handleAddEducation = () => {
    setSettings((prev: any) => ({
      ...prev,
      about: {
        ...prev.about,
        education: [...prev.about.education, { title: "", status: "" }]
      }
    }));
  };

  const handleEducationChange = (index: number, field: string, value: string) => {
    const newEdu = [...settings.about.education];
    newEdu[index][field] = value;
    setSettings((prev: any) => ({ ...prev, about: { ...prev.about, education: newEdu } }));
  };

  const handleRemoveEducation = (index: number) => {
    const newEdu = [...settings.about.education];
    newEdu.splice(index, 1);
    setSettings((prev: any) => ({ ...prev, about: { ...prev.about, education: newEdu } }));
  };

  if (isLoading) return <div className="flex items-center justify-center h-64">Loading settings...</div>;
  if (!settings) return <div className="text-destructive text-center p-4">Error loading settings.</div>;

  return (
    <div className="max-w-4xl space-y-6 pb-12">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground mt-2">Manage your Hero, About, and Social Links data.</p>
      </div>

      {error && <div className="p-4 bg-destructive/10 text-destructive rounded-md border border-destructive/20">{error}</div>}
      {successMsg && <div className="p-4 bg-emerald-500/10 text-emerald-500 rounded-md border border-emerald-500/20">{successMsg}</div>}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* HERO SECTION */}
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
            <CardDescription>The main landing section of your portfolio.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="hero-heading">Heading</Label>
              <Input id="hero-heading" value={settings.hero.heading} onChange={(e) => handleHeroChange("heading", e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="hero-subheading">Subheading</Label>
              <Input id="hero-subheading" value={settings.hero.subheading} onChange={(e) => handleHeroChange("subheading", e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="hero-description">Description</Label>
              <Textarea id="hero-description" rows={3} value={settings.hero.description} onChange={(e) => handleHeroChange("description", e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="hero-resume">Resume URL</Label>
              <Input id="hero-resume" value={settings.hero.resumeUrl} onChange={(e) => handleHeroChange("resumeUrl", e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="hero-profile-image">Profile Image URL</Label>
              <Input id="hero-profile-image" value={settings.hero.profileImageUrl} onChange={(e) => handleHeroChange("profileImageUrl", e.target.value)} placeholder="/placeholder-profile.svg or https://..." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="hero-background-image">Background Image URL</Label>
              <Input id="hero-background-image" value={settings.hero.backgroundImageUrl || ""} onChange={(e) => handleHeroChange("backgroundImageUrl", e.target.value)} placeholder="/hero-bg.jpg or https://..." />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Available for Hire</Label>
                <p className="text-sm text-muted-foreground">Show an indicator that you are currently open to opportunities.</p>
              </div>
              <Switch checked={settings.hero.availableForHire} onCheckedChange={(checked) => handleHeroChange("availableForHire", checked)} />
            </div>
          </CardContent>
        </Card>

        {/* ABOUT SECTION */}
        <Card>
          <CardHeader>
            <CardTitle>About Section</CardTitle>
            <CardDescription>Your journey, goals, and education timeline.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="about-journey">My Journey</Label>
              <Textarea id="about-journey" rows={4} value={settings.about.journey} onChange={(e) => handleAboutChange("journey", e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="about-goals">Career Goals</Label>
              <Textarea id="about-goals" rows={4} value={settings.about.careerGoals} onChange={(e) => handleAboutChange("careerGoals", e.target.value)} required />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base">Education Timeline</Label>
                <Button type="button" variant="outline" size="sm" onClick={handleAddEducation}>
                  <Plus className="w-4 h-4 mr-2" /> Add Item
                </Button>
              </div>
              {settings.about.education.map((edu: any, index: number) => (
                <div key={index} className="flex items-start gap-4 p-4 border rounded-md relative group">
                  <div className="grid grid-cols-2 gap-4 flex-1">
                    <div className="space-y-2">
                      <Label>Degree / Title</Label>
                      <Input value={edu.title} onChange={(e) => handleEducationChange(index, "title", e.target.value)} placeholder="e.g. B.Tech CSE" required />
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Input value={edu.status} onChange={(e) => handleEducationChange(index, "status", e.target.value)} placeholder="e.g. Present, Completed" required />
                    </div>
                  </div>
                  <Button type="button" variant="destructive" size="icon" onClick={() => handleRemoveEducation(index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* SOCIAL LINKS */}
        <Card>
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
            <CardDescription>Links for footer and contact buttons.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="social-github">GitHub URL</Label>
              <Input id="social-github" value={settings.socialLinks.github} onChange={(e) => handleSocialChange("github", e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="social-linkedin">LinkedIn URL</Label>
              <Input id="social-linkedin" value={settings.socialLinks.linkedin} onChange={(e) => handleSocialChange("linkedin", e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="social-email">Email Address</Label>
              <Input id="social-email" type="email" value={settings.socialLinks.email} onChange={(e) => handleSocialChange("email", e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="social-whatsapp">WhatsApp URL</Label>
              <Input id="social-whatsapp" value={settings.socialLinks.whatsapp} onChange={(e) => handleSocialChange("whatsapp", e.target.value)} placeholder="https://wa.me/..." />
            </div>
          </CardContent>
        </Card>

        {/* OFFER BANNER & ANNOUNCEMENT MODAL */}
        <Card className="border-emerald-500/50 bg-gradient-to-br from-emerald-950/20 via-card to-background shadow-lg shadow-emerald-500/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-emerald-500 text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-lg shadow-md flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Featured Promo
          </div>
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              Offer Banner & Announcement Modal
            </CardTitle>
            <CardDescription>Display a prominent promotional banner or offer modal above the navbar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4 bg-muted/20">
              <div className="space-y-0.5">
                <Label className="text-base font-semibold">Enable Offer Banner</Label>
                <p className="text-sm text-muted-foreground">Show or hide the announcement banner across the top of the website.</p>
              </div>
              <Switch 
                checked={settings.offer?.enabled || false} 
                onCheckedChange={(checked) => handleOfferChange("enabled", checked)} 
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="offer-title">Banner Title / Heading</Label>
              <Input 
                id="offer-title" 
                value={settings.offer?.title || ""} 
                onChange={(e) => handleOfferChange("title", e.target.value)} 
                placeholder="🔥 Special Offer: 20% Off Web Development Services" 
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="offer-description">Description / Subtitle</Label>
              <Input 
                id="offer-description" 
                value={settings.offer?.description || ""} 
                onChange={(e) => handleOfferChange("description", e.target.value)} 
                placeholder="Get a custom, high-converting portfolio or business website built in 5 days." 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="offer-badge">Badge Tag Text</Label>
                <Input 
                  id="offer-badge" 
                  value={settings.offer?.badgeText || ""} 
                  onChange={(e) => handleOfferChange("badgeText", e.target.value)} 
                  placeholder="Limited Offer" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="offer-discount">Discount / Promo Code</Label>
                <Input 
                  id="offer-discount" 
                  value={settings.offer?.discountCode || ""} 
                  onChange={(e) => handleOfferChange("discountCode", e.target.value)} 
                  placeholder="DEV20" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="offer-button-text">Button Text</Label>
                <Input 
                  id="offer-button-text" 
                  value={settings.offer?.buttonText || ""} 
                  onChange={(e) => handleOfferChange("buttonText", e.target.value)} 
                  placeholder="Claim Offer" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="offer-button-link">Button Link (URL or Anchor)</Label>
                <Input 
                  id="offer-button-link" 
                  value={settings.offer?.buttonLink || ""} 
                  onChange={(e) => handleOfferChange("buttonLink", e.target.value)} 
                  placeholder="/#contact or https://wa.me/..." 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* WEBSITE REQUEST MODAL CONFIGURATION */}
        <Card className="border-emerald-500/50 bg-gradient-to-br from-emerald-950/20 via-card to-background shadow-lg shadow-emerald-500/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-emerald-500 text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-lg shadow-md flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Client Modal Control
          </div>
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              Website Request Form & Modal Control
            </CardTitle>
            <CardDescription>
              Enable or disable the Website Request modal, customize proposal headings, button labels, budget options, and timelines.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4 bg-muted/20">
              <div className="space-y-0.5">
                <Label className="text-base font-semibold">Enable Website Request Modal</Label>
                <p className="text-sm text-muted-foreground">Allow visitors to open the Website Request proposal form across the site.</p>
              </div>
              <Switch 
                checked={settings.requestForm?.enabled !== false} 
                onCheckedChange={(checked) => handleRequestFormChange("enabled", checked)} 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="req-form-title">Modal Title / Heading</Label>
                <Input 
                  id="req-form-title" 
                  value={settings.requestForm?.title || ""} 
                  onChange={(e) => handleRequestFormChange("title", e.target.value)} 
                  placeholder="Request a Custom Website" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="req-form-badge">Badge Tagline</Label>
                <Input 
                  id="req-form-badge" 
                  value={settings.requestForm?.badgeText || ""} 
                  onChange={(e) => handleRequestFormChange("badgeText", e.target.value)} 
                  placeholder="Start Your Project" 
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="req-form-desc">Modal Subtitle / Description</Label>
              <Input 
                id="req-form-desc" 
                value={settings.requestForm?.description || ""} 
                onChange={(e) => handleRequestFormChange("description", e.target.value)} 
                placeholder="Tell me about your idea, requirements, and budget to get a custom proposal within 24 hours." 
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="req-form-btn-text">CTA Button Text (Navbar & Services)</Label>
              <Input 
                id="req-form-btn-text" 
                value={settings.requestForm?.buttonText || ""} 
                onChange={(e) => handleRequestFormChange("buttonText", e.target.value)} 
                placeholder="Request a Website" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="req-budget-opts">Budget Options (Comma-Separated)</Label>
                <Input 
                  id="req-budget-opts" 
                  value={Array.isArray(settings.requestForm?.budgetOptions) ? settings.requestForm.budgetOptions.join(", ") : (settings.requestForm?.budgetOptions || "")} 
                  onChange={(e) => handleRequestFormChange("budgetOptions", e.target.value.split(",").map((s: string) => s.trim()))} 
                  placeholder="₹5,000 - ₹15,000, ₹15,000 - ₹35,000, ₹35,000 - ₹75,000, ₹75,000+" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="req-timeline-opts">Timeline Options (Comma-Separated)</Label>
                <Input 
                  id="req-timeline-opts" 
                  value={Array.isArray(settings.requestForm?.timelineOptions) ? settings.requestForm.timelineOptions.join(", ") : (settings.requestForm?.timelineOptions || "")} 
                  onChange={(e) => handleRequestFormChange("timelineOptions", e.target.value.split(",").map((s: string) => s.trim()))} 
                  placeholder="Urgent (1-3 Days), 1-2 Weeks, 3-4 Weeks, Flexible" 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isSaving} className="w-full sm:w-auto">
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Saving Changes..." : "Save All Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}
