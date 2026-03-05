import { notFound } from "next/navigation";
import React from "react";

import { getProjectById } from "../../../../config/projects";

import { ProjectDetailClient } from "./ProjectDetailClient";

interface ProjectDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
