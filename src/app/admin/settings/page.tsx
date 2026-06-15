"use client";

import { useEffect, useState } from "react";
import { getSettings, updateSettings } from "@/actions/settings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Save, Plus, Trash2 } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

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

    try {
      const res = await updateSettings(settings);
      if (!res.success) {
        setError(res.error || "Failed to save settings");
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
