import { getSkills } from "@/actions/skills";
import { SkillTable } from "@/components/admin/SkillTable";
import { SkillDialog } from "@/components/admin/SkillDialog";

export default async function AdminSkills() {
  const skills = await getSkills();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Skills Management</h2>
          <p className="text-muted-foreground mt-2">Add and update your technical skills and proficiency.</p>
        </div>
        <SkillDialog />
      </div>

      <SkillTable skills={skills} />
    </div>
  );
}
