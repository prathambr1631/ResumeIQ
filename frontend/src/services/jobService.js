import axios from "axios";


const API_BASE_URL = "http://127.0.0.1:8000/api";


export async function matchJob(
  resumeSkills,
  jobDescription
) {
  const response = await axios.post(
    `${API_BASE_URL}/jobs/match`,
    {
      resume_skills: resumeSkills,
      job_description: jobDescription,
    }
  );

  return response.data;
}