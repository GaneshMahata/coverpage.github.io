/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CoverPageTemplate } from '../types';
import {
  FileText,
  Printer,
  Download,
  RotateCcw,
  Undo2,
  Redo2,
  Plus,
  Trash2,
  Sparkles,
  Save,
  Check
} from 'lucide-react';

interface HeaderProps {
  templates: CoverPageTemplate[];
  activeTemplateId: string;
  onSelectTemplate: (id: string) => void;
  onSaveCustomTemplate: (name: string) => void;
  onDeleteCustomTemplate: (id: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onPrint: () => void;
  onExportPDF: () => void;
  onReset: () => void;
  isExporting: boolean;
}

export default function Header({
  templates,
  activeTemplateId,
  onSelectTemplate,
  onSaveCustomTemplate,
  onDeleteCustomTemplate,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onPrint,
  onExportPDF,
  onReset,
  isExporting,
}: HeaderProps) {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [customTemplateName, setCustomTemplateName] = useState('');
  const [isSavedSuccessfully, setIsSavedSuccessfully] = useState(false);

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTemplateName.trim()) return;
    onSaveCustomTemplate(customTemplateName.trim());
    setIsSavedSuccessfully(true);
    setTimeout(() => {
      setIsSavedSuccessfully(false);
      setShowSaveModal(false);
      setCustomTemplateName('');
    }, 1500);
  };

  const activeTemplate = templates.find((t) => t.id === activeTemplateId);

  return (
    <header className="bg-white text-slate-800 h-14 px-4 flex items-center justify-between border-b border-slate-200 select-none no-print shrink-0">
      {/* Brand Logo */}
      <div className="flex items-center gap-2">
        <div className="bg-slate-50 p-1.5 rounded-lg text-slate-700 flex items-center justify-center border border-slate-200/60">
          <FileText className="w-4 h-4 text-slate-600" />
        </div>
        <div>
          <h1 className="font-bold text-sm tracking-tight text-slate-900 font-sans">
            InternReport Builder
          </h1>
          <p className="text-[9px] text-slate-400 font-semibold tracking-wider uppercase">Cover Creator</p>
        </div>
      </div>

      {/* Template Selectors */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
          <span className="text-[11px] text-slate-500 font-medium">Template:</span>
          <select
            value={activeTemplateId}
            onChange={(e) => onSelectTemplate(e.target.value)}
            className="bg-transparent text-xs text-slate-800 font-semibold focus:outline-none pr-1 cursor-pointer max-w-[180px] truncate"
          >
            <optgroup label="Default Presets" className="bg-white text-slate-700">
              {templates.filter(t => !t.isCustom).map((t) => (
                <option key={t.id} value={t.id} className="text-slate-800 bg-white">
                  {t.name}
                </option>
              ))}
            </optgroup>
            {templates.some(t => t.isCustom) && (
              <optgroup label="Your Custom Designs" className="bg-white text-slate-600 font-medium">
                {templates.filter(t => t.isCustom).map((t) => (
                  <option key={t.id} value={t.id} className="text-slate-800 bg-white font-semibold">
                    ⭐ {t.name}
                  </option>
                ))}
              </optgroup>
            )}
          </select>

          {/* Delete custom template if active */}
          {activeTemplate?.isCustom && (
            <button
              onClick={() => onDeleteCustomTemplate(activeTemplate.id)}
              title="Delete custom template"
              className="p-1 hover:bg-red-50 text-red-500 rounded cursor-pointer transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Save Custom Template Trigger */}
        <button
          onClick={() => setShowSaveModal(true)}
          className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-xs text-slate-700 border border-slate-200 px-2.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer"
          title="Save layout & styling parameters as a reuseable custom template"
        >
          <Save className="w-3.5 h-3.5 text-slate-500" />
          <span>Save Preset</span>
        </button>
      </div>

      {/* Center/Actions: Undo & Redo & Reset */}
      <div className="flex items-center gap-1">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo action"
          className={`p-1.5 rounded-md transition-colors ${
            canUndo ? 'text-slate-700 hover:bg-slate-150 cursor-pointer' : 'text-slate-300 cursor-not-allowed'
          }`}
        >
          <Undo2 className="w-4 h-4" />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo action"
          className={`p-1.5 rounded-md transition-colors ${
            canRedo ? 'text-slate-700 hover:bg-slate-150 cursor-pointer' : 'text-slate-300 cursor-not-allowed'
          }`}
        >
          <Redo2 className="w-4 h-4" />
        </button>
        
        <div className="w-[1px] h-4 bg-slate-200 mx-1"></div>

        <button
          onClick={onReset}
          title="Reset template back to its defaults"
          className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-md transition-colors hover:text-slate-900 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Right: Export & PDF download buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPrint}
          className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-xs text-slate-700 border border-slate-200 font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          title="Print page or save with browser print dialog"
        >
          <Printer className="w-4 h-4 text-slate-500" />
          <span>Print / System PDF</span>
        </button>

        <button
          onClick={onExportPDF}
          disabled={isExporting}
          className={`flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
            isExporting ? 'opacity-80 cursor-wait' : ''
          }`}
          title="Download vector PDF"
        >
          {isExporting ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Generating A4...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </>
          )}
        </button>
      </div>

      {/* Save Template Dialog Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 w-full max-w-sm shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-slate-600" />
              <span>Save Custom Template</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter a name for your custom layout. All positioned coordinates, spacing parameters, and logo configurations will be stored.
            </p>
            <form onSubmit={handleSaveSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  required
                  placeholder="e.g., My IIT Delhi Theme 2"
                  value={customTemplateName}
                  onChange={(e) => setCustomTemplateName(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-850 bg-slate-50 text-slate-800 transition-all"
                  maxLength={30}
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-end gap-2 text-xs pt-1">
                <button
                  type="button"
                  onClick={() => setShowSaveModal(false)}
                  className="px-3 py-1.5 hover:bg-slate-50 text-slate-600 rounded-lg cursor-pointer font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavedSuccessfully}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold transition-all cursor-pointer"
                >
                  {isSavedSuccessfully ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <span>Confirm Save</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
