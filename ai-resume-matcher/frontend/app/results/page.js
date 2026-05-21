'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Results() {
  const router = useRouter();
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    // Load results from localStorage
    const saved = localStorage.getItem('analysisResult');
    if (!saved) {
      router.push('/');
      return;
    }
    setAnalysis(JSON.parse(saved));
  }, []);

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Loading results...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Analysis Results</h1>
          <button
            onClick={() => router.push('/')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Analyze Another
          </button>
        </div>

        {/* ATS Score */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-800">
          <h2 className="text-gray-400 text-sm font-medium mb-2">ATS SCORE</h2>
          <div className="flex items-center gap-4">
            <span className={`text-6xl font-bold ${
              analysis.atsScore >= 70 ? 'text-green-400' :
              analysis.atsScore >= 50 ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {analysis.atsScore}
            </span>
            <span className="text-gray-500 text-2xl">/100</span>
          </div>
          {/* Progress bar */}
          <div className="mt-4 bg-gray-800 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all ${
                analysis.atsScore >= 70 ? 'bg-green-400' :
                analysis.atsScore >= 50 ? 'bg-yellow-400' : 'bg-red-400'
              }`}
              style={{ width: `${analysis.atsScore}%` }}
            />
          </div>
          {/* Summary */}
          <p className="text-gray-400 mt-4 text-sm leading-relaxed">
            {analysis.summary}
          </p>
        </div>

        {/* Matched Skills */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-800">
          <h2 className="text-gray-400 text-sm font-medium mb-4">✅ MATCHED SKILLS</h2>
          <div className="flex flex-wrap gap-2">
            {analysis.matchedSkills.map((skill, i) => (
              <span key={i} className="bg-green-900/50 text-green-300 border border-green-700 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-800">
          <h2 className="text-gray-400 text-sm font-medium mb-4">❌ MISSING SKILLS</h2>
          <div className="flex flex-wrap gap-2">
            {analysis.missingSkills.map((skill, i) => (
              <span key={i} className="bg-red-900/50 text-red-300 border border-red-700 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Strengths */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-800">
          <h2 className="text-gray-400 text-sm font-medium mb-4">💪 STRENGTHS</h2>
          <ul className="space-y-2">
            {analysis.strengths.map((s, i) => (
              <li key={i} className="text-gray-300 text-sm flex gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-800">
          <h2 className="text-gray-400 text-sm font-medium mb-4">⚠️ WEAKNESSES</h2>
          <ul className="space-y-2">
            {analysis.weaknesses.map((w, i) => (
              <li key={i} className="text-gray-300 text-sm flex gap-2">
                <span className="text-yellow-400 mt-0.5">•</span>
                {w}
              </li>
            ))}
          </ul>
        </div>

        {/* Suggestions */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-800">
          <h2 className="text-gray-400 text-sm font-medium mb-4">💡 SUGGESTIONS</h2>
          <ul className="space-y-3">
            {analysis.suggestions.map((s, i) => (
              <li key={i} className="text-gray-300 text-sm flex gap-3">
                <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Analyze Another Button */}
        <button
          onClick={() => router.push('/')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-colors"
        >
          Analyze Another Resume
        </button>

      </div>
    </main>
  );
}