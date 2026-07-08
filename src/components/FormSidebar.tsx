/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FormInputs } from '../types';
import { BookOpen, Calendar, Building, Sparkles, Trash2, ClipboardPaste } from 'lucide-react';
import { DEFAULT_FORM_INPUTS } from '../data';

interface FormSidebarProps {
  inputs: FormInputs;
  onChange: (inputs: FormInputs) => void;
  onClear: () => void;
  onLoadSample: () => void;
}

export default function FormSidebar({
  inputs,
  onChange,
  onClear,
  onLoadSample,
}: FormSidebarProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <div id="form-sidebar" className="w-80 bg-neutral-50 border-r border-slate-200/60 flex flex-col h-full select-none no-print">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-200/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-slate-600" />
          <h2 className="font-bold text-slate-800 text-xs uppercase tracking-wider font-sans">Report Information</h2>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={onLoadSample}
            title="Load sample data"
            className="p-1.5 hover:bg-slate-200/60 text-slate-700 rounded-md transition-colors flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
          >
            <ClipboardPaste className="w-3.5 h-3.5" />
            <span>Sample</span>
          </button>
          <button
            onClick={onClear}
            title="Clear all fields"
            className="p-1.5 hover:bg-slate-200/60 text-slate-700 rounded-md transition-colors flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Form Fields Scroll Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Academic details */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            <span>Academic Institution</span>
          </div>
          
          <div className="space-y-2.5">
            <div>
              <label htmlFor="instituteName" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Institute Name</label>
              <textarea
                id="instituteName"
                name="instituteName"
                value={inputs.instituteName}
                onChange={handleInputChange}
                rows={2}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-500 bg-white transition-all shadow-xs resize-none text-slate-800 placeholder-slate-400"
                placeholder="e.g. Indian Institute of Technology Delhi"
              />
            </div>
            
            <div>
              <label htmlFor="reportTitle" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Report Title</label>
              <textarea
                id="reportTitle"
                name="reportTitle"
                value={inputs.reportTitle}
                onChange={handleInputChange}
                rows={3}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-500 bg-white transition-all shadow-xs resize-none text-slate-800 placeholder-slate-400"
                placeholder="Enter internship project title"
              />
            </div>

            <div>
              <label htmlFor="submissionMonthYear" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Submission Month & Year</label>
              <input
                id="submissionMonthYear"
                type="text"
                name="submissionMonthYear"
                value={inputs.submissionMonthYear}
                onChange={handleInputChange}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-500 bg-white transition-all shadow-xs text-slate-800 placeholder-slate-400"
                placeholder="e.g. July, 2026"
              />
            </div>
          </div>
        </div>

        {/* Intern Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Intern & Period</span>
          </div>

          <div className="space-y-2.5">
            <div>
              <label htmlFor="internName" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Intern Name</label>
              <input
                id="internName"
                type="text"
                name="internName"
                value={inputs.internName}
                onChange={handleInputChange}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-500 bg-white transition-all shadow-xs text-slate-800 placeholder-slate-400"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="internId" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Roll Number / Student ID</label>
              <input
                id="internId"
                type="text"
                name="internId"
                value={inputs.internId}
                onChange={handleInputChange}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-500 bg-white transition-all shadow-xs text-slate-800 placeholder-slate-400"
                placeholder="e.g. 2023CSB1024"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="internshipStart" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Start Date</label>
                <input
                  id="internshipStart"
                  type="date"
                  name="internshipStart"
                  value={inputs.internshipStart}
                  onChange={handleInputChange}
                  className="w-full text-xs px-2 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-500 bg-white transition-all shadow-xs text-slate-800"
                />
              </div>
              <div>
                <label htmlFor="internshipEnd" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">End Date</label>
                <input
                  id="internshipEnd"
                  type="date"
                  name="internshipEnd"
                  value={inputs.internshipEnd}
                  onChange={handleInputChange}
                  className="w-full text-xs px-2 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-500 bg-white transition-all shadow-xs text-slate-800"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Organization / Mentor details */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            <Building className="w-3.5 h-3.5 text-slate-400" />
            <span>Organization & Advisors</span>
          </div>

          <div className="space-y-2.5">
            <div>
              <label htmlFor="organizationName" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Host Organization</label>
              <input
                id="organizationName"
                type="text"
                name="organizationName"
                value={inputs.organizationName}
                onChange={handleInputChange}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-500 bg-white transition-all shadow-xs text-slate-800 placeholder-slate-400"
                placeholder="e.g. Google AI Studio Labs"
              />
            </div>

            <div>
              <label htmlFor="departmentName" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Academic Department</label>
              <input
                id="departmentName"
                type="text"
                name="departmentName"
                value={inputs.departmentName}
                onChange={handleInputChange}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-500 bg-white transition-all shadow-xs text-slate-800 placeholder-slate-400"
                placeholder="e.g. Dept of Computer Science & Engineering"
              />
            </div>

            <div>
              <label htmlFor="supervisorName" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Academic Supervisor</label>
              <input
                id="supervisorName"
                type="text"
                name="supervisorName"
                value={inputs.supervisorName}
                onChange={handleInputChange}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-500 bg-white transition-all shadow-xs text-slate-800 placeholder-slate-400"
                placeholder="e.g. Dr. Arvinder Singh"
              />
            </div>

            <div>
              <label htmlFor="mentorName" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Industry Mentor</label>
              <input
                id="mentorName"
                type="text"
                name="mentorName"
                value={inputs.mentorName}
                onChange={handleInputChange}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-500 bg-white transition-all shadow-xs text-slate-800 placeholder-slate-400"
                placeholder="e.g. Mr. Rajeev Mehta"
              />
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <label htmlFor="additionalNotes" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Additional Notes (Optional)</label>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            value={inputs.additionalNotes}
            onChange={handleInputChange}
            rows={2}
            className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-500 bg-white transition-all shadow-xs resize-none text-slate-800 placeholder-slate-400"
            placeholder="Add any extra comments, serial codes, or identifiers"
          />
        </div>
      </div>

      {/* Helpful Tip footer */}
      <div className="p-3 bg-neutral-100/50 border-t border-slate-200/50 text-[10px] text-slate-500 leading-relaxed text-center font-medium">
        💡 Fill inputs above to instantly sync, or click any preview element to position and style it directly!
      </div>
    </div>
  );
}
