// lib/api.js
// All API calls to our backend live here
// This keeps frontend components clean

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Upload resume PDF
export async function uploadResume(file) {
  const formData = new FormData();
  formData.append('resume', file);

  const response = await axios.post(`${API_URL}/api/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
}

// Analyze resume against job description
export async function analyzeResume(jobDescription) {
  const response = await axios.post(`${API_URL}/api/analyze`, {
    jobDescription
  });

  return response.data;
}