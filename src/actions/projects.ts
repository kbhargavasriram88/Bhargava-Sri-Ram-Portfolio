"use server";

import dbConnect from "@/lib/mongodb";
import Project, { IProject } from "@/models/Project";
import { revalidatePath } from "next/cache";

export async function getProjects() {
  await dbConnect();
  const projects = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(projects));
}

export async function createProject(data: Partial<IProject>) {
  try {
    await dbConnect();
    await Project.create(data);
    revalidatePath("/admin/projects");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create project:", error);
    throw new Error(error.message || "Failed to create project");
  }
}

export async function updateProject(id: string, data: Partial<IProject>) {
  try {
    await dbConnect();
    await Project.findByIdAndUpdate(id, data);
    revalidatePath("/admin/projects");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update project:", error);
    throw new Error(error.message || "Failed to update project");
  }
}

export async function deleteProject(id: string) {
  try {
    await dbConnect();
    await Project.findByIdAndDelete(id);
    revalidatePath("/admin/projects");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete project:", error);
    throw new Error(error.message || "Failed to delete project");
  }
}
