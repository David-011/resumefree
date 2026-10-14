'use client';

import { useState, useEffect } from 'react';

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface Education {
  degree: string;
  school: string;
  year: string;
}

interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: string;
}

export default function ResumeBuilder() {
  const [resume, setResume] = useState<ResumeData>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: '',
    experiences: [{ title: '', company: '', period: '', description: '' }],
    education: [{ degree: '', school: '', year: '' }],
    skills: '',
  });

  const [showPreview, setShowPreview] = useState(false);
  const [template, setTemplate] = useState<'classic' | 'modern' | 'minimal'>('classic');

  function addExperience() {
    setResume({
      ...resume,
      experiences: [...resume.experiences, { title: '', company: '', period: '', description: '' }],
    });
  }

  function removeExperience(index: number) {
    if (resume.experiences.length === 1) return;
    setResume({
      ...resume,
      experiences: resume.experiences.filter((_, i) => i !== index),
    });
  }

  function updateExperience(index: number, field: keyof Experience, value: string) {
    const newExp = [...resume.experiences];
    newExp[index] = { ...newExp[index], [field]: value };
    setResume({ ...resume, experiences: newExp });
  }

  function addEducation() {
    setResume({
      ...resume,
      education: [...resume.education, { degree: '', school: '', year: '' }],
    });
  }

  function removeEducation(index: number) {
    if (resume.education.length === 1) return;
    setResume({
      ...resume,
      education: resume.education.filter((_, i) => i !== index),
    });
  }

  function updateEducation(index: number, field: keyof Education, value: string) {
    const newEdu = [...resume.education];
    newEdu[index] = { ...newEdu[index], [field]: value };
    setResume({ ...resume, education: newEdu });
  }

  function handlePrint() {
    setShowPreview(true);
    setTimeout(() => window.print(), 500);
  }

  const skillsList = resume.skills.split(',').map(s => s.trim()).filter(s => s);

  if (showPreview) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-8 print:p-0">
        <button
          onClick={() => setShowPreview(false)}
          className="print:hidden mb-6 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
        >
          ← Back to Editor
        </button>

        <div className={`border border-gray-200 rounded-2xl p-8 print:border-0 print:rounded-none ${template === 'modern' ? 'bg-gray-50' : ''}`}>
          {/* Header */}
          <div className={`mb-6 ${template === 'modern' ? 'bg-blue-600 text-white p-6 rounded-xl print:rounded-none -m-8 mb-6 p-8' : template === 'minimal' ? 'border-b border-gray-200 pb-4' : 'border-b-2 border-gray-900 pb-4'}`}>
            <h1 className={`text-3xl font-bold ${template === 'modern' ? 'text-white' : 'text-gray-900'}`}>{resume.fullName || 'Your Name'}</h1>
            <div className={`flex flex-wrap gap-3 mt-2 text-sm ${template === 'modern' ? 'text-blue-100' : 'text-gray-600'}`}>
              {resume.email && <span>{resume.email}</span>}
              {resume.phone && <span>• {resume.phone}</span>}
              {resume.location && <span>• {resume.location}</span>}
              {resume.website && <span>• {resume.website}</span>}
            </div>
          </div>

          {/* Summary */}
          {resume.summary && (
            <div className="mb-6">
              <h2 className={`text-sm font-bold uppercase tracking-wider mb-2 ${template === 'minimal' ? 'text-gray-500' : 'text-gray-900'}`}>Professional Summary</h2>
              <p className="text-sm text-gray-700 leading-relaxed">{resume.summary}</p>
            </div>
          )}

          {/* Experience */}
          {resume.experiences.some(e => e.title || e.company) && (
            <div className="mb-6">
              <h2 className={`text-sm font-bold uppercase tracking-wider mb-3 ${template === 'minimal' ? 'text-gray-500' : 'text-gray-900'}`}>Experience</h2>
              {resume.experiences.map((exp, i) => (
                (exp.title || exp.company) && (
                  <div key={i} className="mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">{exp.title}</p>
                        <p className="text-sm text-gray-600">{exp.company}</p>
                      </div>
                      {exp.period && <p className="text-sm text-gray-500">{exp.period}</p>}
                    </div>
                    {exp.description && <p className="text-sm text-gray-700 mt-1 leading-relaxed">{exp.description}</p>}
                  </div>
                )
              ))}
            </div>
          )}

          {/* Education */}
          {resume.education.some(e => e.degree || e.school) && (
            <div className="mb-6">
              <h2 className={`text-sm font-bold uppercase tracking-wider mb-3 ${template === 'minimal' ? 'text-gray-500' : 'text-gray-900'}`}>Education</h2>
              {resume.education.map((edu, i) => (
                (edu.degree || edu.school) && (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">{edu.degree}</p>
                        <p className="text-sm text-gray-600">{edu.school}</p>
                      </div>
                      {edu.year && <p className="text-sm text-gray-500">{edu.year}</p>}
                    </div>
                  </div>
                )
              ))}
            </div>
          )}

          {/* Skills */}
          {skillsList.length > 0 && (
            <div className="mb-6">
              <h2 className={`text-sm font-bold uppercase tracking-wider mb-3 ${template === 'minimal' ? 'text-gray-500' : 'text-gray-900'}`}>Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skillsList.map((skill, i) => (
                  <span
                    key={i}
                    className={`text-xs px-3 py-1 rounded-full ${template === 'modern' ? 'bg-blue-100 text-blue-700' : template === 'minimal' ? 'bg-gray-100 text-gray-700' : 'bg-gray-900 text-white'}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-gray-100 text-center print:hidden">
            <p className="text-xs text-gray-400">Generated with ResumeFree — resumefree.vercel.app</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      {/* Ad Top */}
      <div className="w-full my-6">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-6737852115186889"
          data-ad-slot="4455667788"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>

      {/* Template Selector */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
            <span className="text-purple-600 text-lg">🎨</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Choose Template</h2>
            <p className="text-sm text-gray-500">Select a style for your resume</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {(['classic', 'modern', 'minimal'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTemplate(t)}
              className={`p-4 rounded-xl border-2 transition-all text-center ${template === t ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <span className="text-2xl">{t === 'classic' ? '📋' : t === 'modern' ? '🎯' : '✨'}</span>
              <p className={`text-sm font-medium mt-1 capitalize ${template === t ? 'text-purple-600' : 'text-gray-700'}`}>{t}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <span className="text-blue-600 text-lg">👤</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
            <p className="text-sm text-gray-500">Your contact details</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
            <input type="text" placeholder="John Doe" value={resume.fullName} onChange={(e) => setResume({ ...resume, fullName: e.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input type="email" placeholder="john@example.com" value={resume.email} onChange={(e) => setResume({ ...resume, email: e.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
            <input type="tel" placeholder="+1 (555) 123-4567" value={resume.phone} onChange={(e) => setResume({ ...resume, phone: e.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
            <input type="text" placeholder="New York, NY" value={resume.location} onChange={(e) => setResume({ ...resume, location: e.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Website / LinkedIn</label>
            <input type="text" placeholder="linkedin.com/in/johndoe" value={resume.website} onChange={(e) => setResume({ ...resume, website: e.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
            <span className="text-emerald-600 text-lg">💬</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Professional Summary</h2>
            <p className="text-sm text-gray-500">A brief overview of your career</p>
          </div>
        </div>
        <textarea placeholder="Experienced web developer with 5+ years building modern applications..." value={resume.summary} onChange={(e) => setResume({ ...resume, summary: e.target.value })} rows={4} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
      </div>

      {/* Ad Middle */}
      <div className="w-full my-6">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-6737852115186889"
          data-ad-slot="5566778899"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>

      {/* Experience */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <span className="text-amber-600 text-lg">💼</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Work Experience</h2>
              <p className="text-sm text-gray-500">Your professional history</p>
            </div>
          </div>
          <button onClick={addExperience} className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">+ Add</button>
        </div>
        <div className="space-y-6">
          {resume.experiences.map((exp, i) => (
            <div key={i} className="relative border border-gray-100 rounded-xl p-5">
              {resume.experiences.length > 1 && (
                <button onClick={() => removeExperience(i)} className="absolute top-3 right-3 text-red-400 hover:text-red-600 text-lg">×</button>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Job Title</label>
                  <input type="text" placeholder="Senior Developer" value={exp.title} onChange={(e) => updateExperience(i, 'title', e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Company</label>
                  <input type="text" placeholder="Acme Corp" value={exp.company} onChange={(e) => updateExperience(i, 'company', e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Period</label>
                  <input type="text" placeholder="Jan 2022 - Present" value={exp.period} onChange={(e) => updateExperience(i, 'period', e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                  <textarea placeholder="Led development of..." value={exp.description} onChange={(e) => updateExperience(i, 'description', e.target.value)} rows={2} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
              <span className="text-rose-600 text-lg">🎓</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Education</h2>
              <p className="text-sm text-gray-500">Your academic background</p>
            </div>
          </div>
          <button onClick={addEducation} className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">+ Add</button>
        </div>
        <div className="space-y-6">
          {resume.education.map((edu, i) => (
            <div key={i} className="relative border border-gray-100 rounded-xl p-5">
              {resume.education.length > 1 && (
                <button onClick={() => removeEducation(i)} className="absolute top-3 right-3 text-red-400 hover:text-red-600 text-lg">×</button>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Degree</label>
                  <input type="text" placeholder="B.S. Computer Science" value={edu.degree} onChange={(e) => updateEducation(i, 'degree', e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">School</label>
                  <input type="text" placeholder="MIT" value={edu.school} onChange={(e) => updateEducation(i, 'school', e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Year</label>
                  <input type="text" placeholder="2020" value={edu.year} onChange={(e) => updateEducation(i, 'year', e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
            <span className="text-cyan-600 text-lg">⚡</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
            <p className="text-sm text-gray-500">Separate skills with commas</p>
          </div>
        </div>
        <input type="text" placeholder="JavaScript, React, Node.js, Python, SQL, Git" value={resume.skills} onChange={(e) => setResume({ ...resume, skills: e.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
        {skillsList.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {skillsList.map((skill, i) => (
              <span key={i} className="text-xs px-3 py-1 rounded-full bg-cyan-50 text-cyan-700">{skill}</span>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handlePrint}
          className="flex-1 rounded-xl bg-purple-600 px-4 py-3.5 text-white font-semibold hover:bg-purple-700 active:bg-purple-800 transition-colors shadow-md shadow-purple-600/20"
        >
          📄 Preview & Print / Save PDF
        </button>
      </div>

      {/* Ad Bottom */}
      <div className="w-full my-6">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-6737852115186889"
          data-ad-slot="6677889900"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
