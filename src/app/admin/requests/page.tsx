import { getWebsiteRequests } from "@/actions/websiteRequest";
import { WebsiteRequestTable } from "@/components/admin/WebsiteRequestTable";
import { FileText } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminRequestsPage() {
  const res = await getWebsiteRequests();
  const requests = res.success ? res.data : [];

  return (
    <div className="space-y-6 max-w-6xl pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary" />
            Website Requests
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage incoming custom website and project proposals submitted by visitors.
          </p>
        </div>
      </div>

      <WebsiteRequestTable requests={requests} />
    </div>
  );
}
