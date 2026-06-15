"use server";

import dbConnect from "@/lib/mongodb";
import Skill, { ISkill } from "@/models/Skill";
import { revalidatePath } from "next/cache";

export async function getSkills() {
  await dbConnect();
  const skills = await Skill.find().sort({ category: 1, level: -1 }).lean();
  return JSON.parse(JSON.stringify(skills));
}

export async function createSkill(data: Partial<ISkill>) {
  await dbConnect();
  await Skill.create(data);
  revalidatePath("/admin/skills");
  revalidatePath("/#skills");
  return { success: true };
}

export async function updateSkill(id: string, data: Partial<ISkill>) {
  await dbConnect();
  await Skill.findByIdAndUpdate(id, data);
  revalidatePath("/admin/skills");
  revalidatePath("/#skills");
  return { success: true };
}

export async function deleteSkill(id: string) {
  await dbConnect();
  await Skill.findByIdAndDelete(id);
  revalidatePath("/admin/skills");
  revalidatePath("/#skills");
  return { success: true };
}
