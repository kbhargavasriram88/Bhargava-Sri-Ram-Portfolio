import { getCertificates } from "@/actions/certificates";
import { getSettings } from "@/actions/settings";
import { CertificateTable } from "@/components/admin/CertificateTable";
import { CertificateDialog } from "@/components/admin/CertificateDialog";
import { CertificatesVisibilityToggle } from "@/components/admin/CertificatesVisibilityToggle";

export const dynamic = "force-dynamic";

export default async function AdminCertificates() {
  const [certs, settingsRes] = await Promise.all([
    getCertificates(),
    getSettings(),
  ]);

  const isEnabled = settingsRes?.success ? (settingsRes.data?.certificates?.enabled !== false) : true;

  return (
    <div className="space-y-6 max-w-6xl pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Certifications Manager</h2>
          <p className="text-muted-foreground mt-1 text-sm">Manage your credentials and control live website visibility.</p>
        </div>
        <CertificateDialog />
      </div>

      {/* Control Toggle for Live Website Visibility */}
      <CertificatesVisibilityToggle initialEnabled={isEnabled} />

      {/* Certificates Data Table */}
      <CertificateTable certificates={certs} />
    </div>
  );
}
