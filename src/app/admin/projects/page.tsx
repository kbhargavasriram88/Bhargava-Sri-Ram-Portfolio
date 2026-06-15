import { getProjects } from "@/actions/projects";
import { ProjectTable } from "@/components/admin/ProjectTable";
import { ProjectDialog } from "@/components/admin/ProjectDialog";

export default async function AdminProjects() {
  const projects = await getProjects();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Projects Management</h2>
          <p className="text-muted-foreground mt-2">Create, update, and manage your portfolio projects.</p>
        </div>
        <ProjectDialog />
      </div>

      <ProjectTable projects={projects} />
    </div>
  );
}
