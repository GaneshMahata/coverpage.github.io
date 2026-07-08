/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  PageElement,
  GlobalSettings,
  FormInputs,
  CoverPageTemplate,
  ElementType
} from './types';
import {
  DEFAULT_TEMPLATES,
  DEFAULT_FORM_INPUTS,
  GLOBAL_DEFAULT_SETTINGS,
  syncFormWithElements
} from './data';
import Header from './components/Header';
import FormSidebar from './components/FormSidebar';
import A4Preview from './components/A4Preview';
import StyleSidebar from './components/StyleSidebar';
import { FileText, Sparkles, BookOpen } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function App() {
  // 1. Core state
  const [formInputs, setFormInputs] = useState<FormInputs>(() => {
    try {
      const saved = localStorage.getItem('internreport_form_inputs');
      return saved ? JSON.parse(saved) : DEFAULT_FORM_INPUTS;
    } catch {
      return DEFAULT_FORM_INPUTS;
    }
  });

  const [activeTemplateId, setActiveTemplateId] = useState<string>(() => {
    try {
      return localStorage.getItem('internreport_active_template_id') || DEFAULT_TEMPLATES[0].id;
    } catch {
      return DEFAULT_TEMPLATES[0].id;
    }
  });

  // Load custom templates list
  const [templates, setTemplates] = useState<CoverPageTemplate[]>(() => {
    const defaults = [...DEFAULT_TEMPLATES];
    try {
      const saved = localStorage.getItem('internreport_custom_templates');
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...defaults, ...parsed];
      }
    } catch (e) {
      console.error('Error loading custom templates:', e);
    }
    return defaults;
  });

  // Current elements & global settings on the canvas
  const [elements, setElements] = useState<PageElement[]>([]);
  const [globalSettings, setGlobalSettings] = useState<GlobalSettings>(GLOBAL_DEFAULT_SETTINGS);
  const [activeElementId, setActiveElementId] = useState<string | null>(null);

  // 2. Undo / Redo History Stack
  const [history, setHistory] = useState<{ elements: PageElement[]; globalSettings: GlobalSettings }[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isExporting, setIsExporting] = useState(false);

  // 3. Initialize current elements when active template changes
  useEffect(() => {
    const template = templates.find((t) => t.id === activeTemplateId) || DEFAULT_TEMPLATES[0];
    
    // Sync the template's elements with current form inputs immediately on load!
    const synchronizedElements = syncFormWithElements(template.elements, formInputs);
    
    setElements(synchronizedElements);
    setGlobalSettings(template.globalSettings);
    setActiveElementId(null);

    // Reset history stack for the new template layout
    setHistory([{ elements: synchronizedElements, globalSettings: template.globalSettings }]);
    setHistoryIndex(0);

    localStorage.setItem('internreport_active_template_id', activeTemplateId);
  }, [activeTemplateId]);

  // Persist form inputs to localStorage
  useEffect(() => {
    localStorage.setItem('internreport_form_inputs', JSON.stringify(formInputs));
  }, [formInputs]);

  // Sync elements whenever form inputs are modified
  const handleFormInputChange = (newInputs: FormInputs) => {
    setFormInputs(newInputs);
    setElements((prev) => {
      const synced = syncFormWithElements(prev, newInputs);
      // Push history state upon form changes
      pushToHistory(synced, globalSettings);
      return synced;
    });
  };

  // 4. History Helpers
  const pushToHistory = (newElements: PageElement[], newSettings: GlobalSettings) => {
    // Avoid redundant commits if nothing changed
    if (history.length > 0) {
      const current = history[historyIndex];
      if (
        JSON.stringify(current.elements) === JSON.stringify(newElements) &&
        JSON.stringify(current.globalSettings) === JSON.stringify(newSettings)
      ) {
        return;
      }
    }

    const nextHistory = history.slice(0, historyIndex + 1);
    const updatedHistory = [...nextHistory, { elements: newElements, globalSettings: newSettings }];
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      const state = history[prevIndex];
      setElements(state.elements);
      setGlobalSettings(state.globalSettings);
      setHistoryIndex(prevIndex);
      setActiveElementId(null);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      const state = history[nextIndex];
      setElements(state.elements);
      setGlobalSettings(state.globalSettings);
      setHistoryIndex(nextIndex);
      setActiveElementId(null);
    }
  };

  // 5. Canvas mutations
  const handleUpdateElement = (id: string, updated: Partial<PageElement>) => {
    setElements((prev) => {
      const next = prev.map((el) => (el.id === id ? { ...el, ...updated } : el));
      // Push history
      pushToHistory(next, globalSettings);
      return next;
    });
  };

  const handleUpdateGlobalSettings = (updated: Partial<GlobalSettings>) => {
    setGlobalSettings((prev) => {
      const next = { ...prev, ...updated };
      // Push history
      pushToHistory(elements, next);
      return next;
    });
  };

  const handleAddElement = (type: ElementType) => {
    const randomId = `block-${Date.now()}`;
    let newElement: PageElement;

    if (type === 'text') {
      newElement = {
        id: randomId,
        type: 'text',
        label: 'Custom Text',
        text: 'CLICK TO EDIT THIS TEXT WORDING',
        x: 20,
        y: 40,
        width: 60,
        fontSize: 14,
        fontFamily: 'Inter',
        color: '#111827',
        align: 'center',
        visible: true,
      };
    } else if (type === 'line') {
      newElement = {
        id: randomId,
        type: 'line',
        label: 'Horizontal Line',
        x: 25,
        y: 50,
        width: 50,
        height: 2,
        color: globalSettings.accentColor || '#4F46E5',
        visible: true,
      };
    } else if (type === 'table') {
      newElement = {
        id: randomId,
        type: 'table',
        label: 'Custom Details Table',
        x: 20,
        y: 50,
        width: 60,
        fontSize: 12,
        fontFamily: 'Inter',
        color: '#111827',
        visible: true,
        tableRows: [
          { id: '1', label: 'Item 1:', value: 'Value 1', labelBold: true },
          { id: '2', label: 'Item 2:', value: 'Value 2', labelBold: true },
        ]
      };
    } else {
      // Image/Logo element placeholder
      newElement = {
        id: randomId,
        type: 'image',
        label: 'Custom Logo Image',
        x: 42,
        y: 45,
        width: 16,
        height: 12,
        visible: true,
      };
    }

    const updatedElements = [...elements, newElement];
    setElements(updatedElements);
    pushToHistory(updatedElements, globalSettings);
    setActiveElementId(randomId); // set active immediately
  };

  const handleDeleteElement = (id: string) => {
    const filtered = elements.filter((el) => el.id !== id);
    setElements(filtered);
    pushToHistory(filtered, globalSettings);
    if (activeElementId === id) {
      setActiveElementId(null);
    }
  };

  // 6. Template Preset operations
  const handleSelectTemplate = (id: string) => {
    setActiveTemplateId(id);
  };

  const handleSaveCustomTemplate = (name: string) => {
    const newTemplate: CoverPageTemplate = {
      id: `custom-${Date.now()}`,
      name,
      description: `User customized layout. Stored on ${new Date().toLocaleDateString()}`,
      elements: elements.map(el => ({ ...el, locked: false })), // unlock for reuses
      globalSettings,
      isCustom: true,
    };

    const updatedList = [...templates, newTemplate];
    setTemplates(updatedList);
    localStorage.setItem('internreport_custom_templates', JSON.stringify(updatedList.filter(t => t.isCustom)));
    setActiveTemplateId(newTemplate.id);
  };

  const handleDeleteCustomTemplate = (id: string) => {
    const filtered = templates.filter((t) => t.id !== id);
    setTemplates(filtered);
    localStorage.setItem('internreport_custom_templates', JSON.stringify(filtered.filter(t => t.isCustom)));
    
    // Fall back to original default preset
    setActiveTemplateId(DEFAULT_TEMPLATES[0].id);
  };

  const handleResetTemplate = () => {
    const originalTemplate = DEFAULT_TEMPLATES.find((t) => t.id === activeTemplateId) || DEFAULT_TEMPLATES[0];
    const originalSynced = syncFormWithElements(originalTemplate.elements, formInputs);
    setElements(originalSynced);
    setGlobalSettings(originalTemplate.globalSettings);
    setActiveElementId(null);
    pushToHistory(originalSynced, originalTemplate.globalSettings);
  };

  const handleClearForm = () => {
    const cleared: FormInputs = {
      instituteName: '',
      reportTitle: '',
      internName: '',
      internId: '',
      internshipStart: '',
      internshipEnd: '',
      organizationName: '',
      departmentName: '',
      supervisorName: '',
      mentorName: '',
      submissionMonthYear: '',
      additionalNotes: '',
    };
    handleFormInputChange(cleared);
  };

  const handleLoadSample = () => {
    handleFormInputChange(DEFAULT_FORM_INPUTS);
  };

  // 7. Core Export triggers
  const handlePrint = () => {
    setActiveElementId(null); // deselect to hide handles
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const handleExportPDF = async () => {
    setActiveElementId(null); // Deselect handles before screenshot
    setIsExporting(true);

    // Wait short delay to guarantee state is drawn
    setTimeout(async () => {
      try {
        const domElement = document.getElementById('a4-document-root');
        if (!domElement) return;

        // html2canvas captures at highly crisp retina scale
        const canvas = await html2canvas(domElement, {
          scale: 3, // 3x high-fidelity scale factor
          useCORS: true,
          allowTaint: true,
          backgroundColor: null,
          logging: false,
        });

        const dataUrl = canvas.toDataURL('image/jpeg', 0.98);

        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });

        // Exact standard physical A4 millimeter dimensions
        pdf.addImage(dataUrl, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
        
        // Clean filename formatting
        const rawFilename = formInputs.internName || 'Intern_Report';
        const formattedName = rawFilename.toLowerCase().replace(/[^a-z0-9]+/g, '_');
        pdf.save(`${formattedName}_cover_page.pdf`);
      } catch (err) {
        console.error('Error generating PDF:', err);
      } finally {
        setIsExporting(false);
      }
    }, 200);
  };

  return (
    <div id="app-root" className="flex flex-col h-screen overflow-hidden bg-neutral-100/60">
      {/* App Toolbar Header */}
      <Header
        templates={templates}
        activeTemplateId={activeTemplateId}
        onSelectTemplate={handleSelectTemplate}
        onSaveCustomTemplate={handleSaveCustomTemplate}
        onDeleteCustomTemplate={handleDeleteCustomTemplate}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onPrint={handlePrint}
        onExportPDF={handleExportPDF}
        onReset={handleResetTemplate}
        isExporting={isExporting}
      />

      {/* Main Workspace Frame */}
      <main className="flex-1 flex overflow-hidden min-h-0 relative">
        {/* Left Side: Metadata Input Form */}
        <FormSidebar
          inputs={formInputs}
          onChange={handleFormInputChange}
          onClear={handleClearForm}
          onLoadSample={handleLoadSample}
        />

        {/* Center: Live Interactive A4 Board */}
        <A4Preview
          elements={elements}
          globalSettings={globalSettings}
          activeElementId={activeElementId}
          onSelectElement={setActiveElementId}
          onUpdateElement={handleUpdateElement}
          onDeleteElement={handleDeleteElement}
        />

        {/* Right Side: Visual Formatting Options */}
        <StyleSidebar
          elements={elements}
          activeElementId={activeElementId}
          globalSettings={globalSettings}
          onUpdateElement={handleUpdateElement}
          onUpdateGlobalSettings={handleUpdateGlobalSettings}
          onAddElement={handleAddElement}
          onSelectElement={setActiveElementId}
        />
      </main>
    </div>
  );
}
