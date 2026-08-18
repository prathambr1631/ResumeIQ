import api from "./api";

export async function matchJob(
  resumeText,
  resumeSkills,
  jobDescription
) {
  const response = await api.post(
    "/api/jobs/match",
    {
      resume_text: resumeText,
      resume_skills: resumeSkills,
      job_description: jobDescription,
    }
  );

  return response.data;
}