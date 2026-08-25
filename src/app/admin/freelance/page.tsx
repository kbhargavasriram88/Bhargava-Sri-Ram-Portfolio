import { getWebsiteRequests } from "@/actions/websiteRequest";
import { getServices } from "@/actions/services";
import { getSettings } from "@/actions/settings";
import { FreelanceManager } from "@/components/admin/FreelanceManager";

export const dynamic = "force-dynamic";

export default async function AdminFreelancePage() {
  const [reqRes, services, settingsRes] = await Promise.all([
    getWebsiteRequests(),
    getServices(),
    getSettings(),
  ]);

  const requests = reqRes.success ? reqRes.data : [];
  const settings = settingsRes.success ? settingsRes.data : null;

  return (
    <FreelanceManager
      initialRequests={requests}
      initialServices={services}
      initialSettings={settings}
    />
  );
}
