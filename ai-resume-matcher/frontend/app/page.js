'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { uploadResume, analyzeResume } from '../lib/api';

export default function Home() {
  const router = useRouter();

  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState('');

  async function handleSubmit() {
    // Validate inputs
    if (!file) {
      setError('Please upload your resume PDF');
      return;
    }
    if (!jobDescription || jobDescription.trim().length < 50) {
      setError('Please enter a job description (minimum 50 characters)');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Step 1 — upload resume
      setStep('Uploading and parsing resume...');
      await uploadResume(file);

      // Step 2 — analyze
      setStep('Analyzing with AI...');
      const result = await analyzeResume(jobDescription);

      // Save results to localStorage for results page
      localStorage.setItem('analysisResult', JSON.stringify(result.analysis));

      // Go to results page
      router.push('/results');

    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
      setLoading(false);
      setStep('');
    }
  }

  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-3">
            AI Resume Matcher
          </h1>
          <p className="text-gray-400 text-lg">
            Upload your resume and paste a job description to get AI-powered analysis
          </p>
        </div>

        {/* Card */}
        <div className="bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-800">

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Upload Resume (PDF)
            </label>
            <div className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
                id="fileInput"
              />
              <label htmlFor="fileInput" className="cursor-pointer">
                {file ? (
                  <div>
                    <p className="text-green-400 font-medium">✅ {file.name}</p>
                    <p className="text-gray-500 text-sm mt-1">Click to change file</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-4xl mb-2">📄</p>
                    <p className="text-gray-400">Click to upload your resume PDF</p>
                    <p className="text-gray-600 text-sm mt-1">Max size: 5MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Job Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              rows={6}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
            />
            <p className="text-gray-600 text-sm mt-1">
              {jobDescription.length} characters
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-sm">
              ❌ {error}
            </div>
          )}

          {/* Loading status */}
          {loading && (
            <div className="mb-4 p-3 bg-blue-900/50 border border-blue-700 rounded-lg text-blue-300 text-sm">
              ⏳ {step}
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors text-lg"
          >
            {loading ? 'Analyzing...' : '🚀 Analyze Resume'}
          </button>

        </div>
      </div>
    </main>
  );
}