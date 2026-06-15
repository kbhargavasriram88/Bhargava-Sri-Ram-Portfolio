import { getServices } from "@/actions/services";
import { ServiceTable } from "@/components/admin/ServiceTable";
import { ServiceDialog } from "@/components/admin/ServiceDialog";

export default async function AdminServices() {
  const services = await getServices();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Services Management</h2>
          <p className="text-muted-foreground mt-2">Manage the services you offer to clients.</p>
        </div>
        <ServiceDialog />
      </div>

      <ServiceTable services={services} />
    </div>
  );
}
