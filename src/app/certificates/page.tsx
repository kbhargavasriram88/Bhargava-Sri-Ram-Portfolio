import { getSettings } from "@/actions/settings";
import { getCertificates } from "@/actions/certificates";
import { CertificationsSection } from "@/sections/Certifications";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settingsRes = await getSettings();
  const settings = settingsRes.success ? settingsRes.data : null;
  const title = settings?.certificates?.title || "Certifications";

  return {
    title: `${title} | Bhargava Sri Ram`,
    description: settings?.certificates?.description || "Verified licenses, credentials, and achievements demonstrating technical competency.",
  };
}

export default async function CertificatesPage() {
  const [settingsRes, certificates] = await Promise.all([
    getSettings(),
    getCertificates(),
  ]);

  const settings = settingsRes.success ? settingsRes.data : null;

  // If certificates are disabled by admin, redirect to homepage
  if (settings?.certificates?.enabled === false) {
    redirect("/");
  }

  return (
    <div className="flex flex-col w-full min-h-screen pt-8 pb-16">
      <CertificationsSection certificates={certificates} />
    </div>
  );
}
