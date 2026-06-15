import { getExperience } from "@/actions/experience";
import { ExperienceTable } from "@/components/admin/ExperienceTable";
import { ExperienceDialog } from "@/components/admin/ExperienceDialog";

export default async function AdminExperience() {
  const experience = await getExperience();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Experience & Timeline</h2>
          <p className="text-muted-foreground mt-2">Manage your work history, education, and volunteer roles.</p>
        </div>
        <ExperienceDialog />
      </div>

      <ExperienceTable experience={experience} />
    </div>
  );
}
