import { getCertificates } from "@/actions/certificates";
import { CertificateTable } from "@/components/admin/CertificateTable";
import { CertificateDialog } from "@/components/admin/CertificateDialog";

export default async function AdminCertificates() {
  const certs = await getCertificates();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Certifications</h2>
          <p className="text-muted-foreground mt-2">Manage your professional credentials and certificates.</p>
        </div>
        <CertificateDialog />
      </div>

      <CertificateTable certificates={certs} />
    </div>
  );
}
