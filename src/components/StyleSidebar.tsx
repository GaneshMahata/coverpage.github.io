/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageElement, GlobalSettings, ElementType } from '../types';
import {
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Sliders,
  Sparkles,
  Settings,
  PlusCircle,
  FileText,
  FileBadge,
  Eye,
  Minimize,
  Maximize,
  Compass,
  Palette
} from 'lucide-react';

interface StyleSidebarProps {
  elements: PageElement[];
  activeElementId: string | null;
  globalSettings: GlobalSettings;
  onUpdateElement: (id: string, updated: Partial<PageElement>) => void;
  onUpdateGlobalSettings: (updated: Partial<GlobalSettings>) => void;
  onAddElement: (type: ElementType) => void;
  onSelectElement: (id: string | null) => void;
}

const PRESET_COLORS = [
  '#000000', // Black
  '#1E3A8A', // Royal Blue
  '#0D9488', // Teal
  '#92400E', // Amber
  '#B91C1C', // Red
  '#4F46E5', // Indigo
  '#475569', // Slate
];

const PRESET_BG_COLORS = [
  '#FFFFFF', // Pure White
  '#FAFAFA', // Cool White
  '#FDFBF7', // Parchment
  '#FFFDF9', // Antique Warm
  '#EEF2F6', // Pale Blue-Gray
];

const FONT_FAMILIES = [
  { value: 'Inter', label: 'Inter (Sans)' },
  { value: 'Space Grotesk', label: 'Space Grotesk (Tech)' },
  { value: 'Playfair Display', label: 'Playfair Display (Serif)' },
  { value: 'JetBrains Mono', label: 'JetBrains Mono (Code)' },
  { value: 'Lora', label: 'Lora (Editorial Serif)' },
  { value: 'Outfit', label: 'Outfit (Geometric)' },
];

export default function StyleSidebar({
  elements,
  activeElementId,
  globalSettings,
  onUpdateElement,
  onUpdateGlobalSettings,
  onAddElement,
  onSelectElement,
}: StyleSidebarProps) {
  const [activeTab, setActiveTab] = useState<'element' | 'global' | 'add'>('element');

  const activeElement = elements.find((el) => el.id === activeElementId);

  // Auto-switch tabs when element selection changes to give perfect UX!
  React.useEffect(() => {
    if (activeElementId) {
      setActiveTab('element');
    } else {
      setActiveTab('global');
    }
  }, [activeElementId]);

  return (
    <div id="style-sidebar" className="w-80 bg-neutral-50 border-l border-slate-200/60 flex flex-col h-full select-none no-print">
      {/* Sidebar Navigation Tabs */}
      <div className="flex border-b border-slate-200/50 p-1 bg-slate-100/50">
        <button
          onClick={() => setActiveTab('element')}
          disabled={!activeElementId}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
            activeTab === 'element'
              ? 'bg-white text-slate-800 shadow-xs border border-slate-200/60 font-bold'
              : activeElementId
              ? 'text-slate-500 hover:text-slate-800'
              : 'text-slate-300 cursor-not-allowed'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Style Element</span>
        </button>

        <button
          onClick={() => setActiveTab('global')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
            activeTab === 'global'
              ? 'bg-white text-slate-800 shadow-xs border border-slate-200/60 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Canvas Setup</span>
        </button>

        <button
          onClick={() => setActiveTab('add')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
            activeTab === 'add'
              ? 'bg-white text-slate-800 shadow-xs border border-slate-200/60 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Add Blocks</span>
        </button>
      </div>

      {/* Main Options Area Scroll Container */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* TAB 1: Element Formatting */}
        {activeTab === 'element' && activeElement && (
          <div className="space-y-5 animate-in fade-in duration-150">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-slate-200/50 pb-3">
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Selected Element</span>
                <h3 className="text-xs font-bold text-slate-800">{activeElement.label}</h3>
              </div>
              <button
                onClick={() => onSelectElement(null)}
                className="text-[10px] text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
              >
                Deselect
              </button>
            </div>

            {/* Editable Raw Text (if type text) */}
            {activeElement.type === 'text' && (
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Edit Text Wording</label>
                <textarea
                  value={activeElement.text || ''}
                  onChange={(e) => onUpdateElement(activeElement.id, { text: e.target.value })}
                  rows={3}
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-500 bg-white resize-y transition-all text-slate-800 shadow-xs"
                />
              </div>
            )}

            {/* Editable Table Rows (if type table) */}
            {activeElement.type === 'table' && (
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Edit Table Cells</label>
                  <span className="text-[9px] text-slate-500 font-medium">Invisible/transparent lines</span>
                </div>
                
                <div className="space-y-2 max-h-80 overflow-y-auto pr-1 border border-slate-100 rounded-lg p-2 bg-slate-50/50">
                  {(activeElement.tableRows || []).map((row, index) => (
                    <div key={row.id} className="p-2 bg-white rounded-md border border-slate-200/65 shadow-xs space-y-2">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold text-slate-400">Row {index + 1}</span>
                        <div className="flex items-center gap-1">
                          {/* Move up */}
                          <button
                            disabled={index === 0}
                            onClick={() => {
                              const rows = [...(activeElement.tableRows || [])];
                              const temp = rows[index];
                              rows[index] = rows[index - 1];
                              rows[index - 1] = temp;
                              onUpdateElement(activeElement.id, { tableRows: rows });
                            }}
                            className="p-1 hover:bg-slate-100 rounded disabled:opacity-30 disabled:hover:bg-transparent text-slate-500 cursor-pointer"
                            title="Move Row Up"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"/></svg>
                          </button>
                          {/* Move down */}
                          <button
                            disabled={index === (activeElement.tableRows || []).length - 1}
                            onClick={() => {
                              const rows = [...(activeElement.tableRows || [])];
                              const temp = rows[index];
                              rows[index] = rows[index + 1];
                              rows[index + 1] = temp;
                              onUpdateElement(activeElement.id, { tableRows: rows });
                            }}
                            className="p-1 hover:bg-slate-100 rounded disabled:opacity-30 disabled:hover:bg-transparent text-slate-500 cursor-pointer"
                            title="Move Row Down"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                          </button>
                          {/* Delete row */}
                          <button
                            onClick={() => {
                              const rows = (activeElement.tableRows || []).filter(r => r.id !== row.id);
                              onUpdateElement(activeElement.id, { tableRows: rows });
                            }}
                            className="p-1 hover:bg-red-50 text-red-500 rounded hover:text-red-600 cursor-pointer"
                            title="Delete Row"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {/* Label Field */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-semibold text-slate-500">Label</span>
                            <button
                              onClick={() => {
                                const rows = (activeElement.tableRows || []).map(r => r.id === row.id ? { ...r, labelBold: !r.labelBold } : r);
                                onUpdateElement(activeElement.id, { tableRows: rows });
                              }}
                              className={`px-1 rounded text-[8px] font-bold ${row.labelBold ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'} cursor-pointer`}
                              title="Toggle bold for label"
                            >
                              B
                            </button>
                          </div>
                          <input
                            type="text"
                            value={row.label}
                            onChange={(e) => {
                              const rows = (activeElement.tableRows || []).map(r => r.id === row.id ? { ...r, label: e.target.value } : r);
                              onUpdateElement(activeElement.id, { tableRows: rows });
                            }}
                            className="w-full text-xs px-2 py-1 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-400 bg-white text-slate-800"
                          />
                        </div>
                        
                        {/* Value Field */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-semibold text-slate-500">Value</span>
                            <button
                              onClick={() => {
                                const rows = (activeElement.tableRows || []).map(r => r.id === row.id ? { ...r, valueBold: !r.valueBold } : r);
                                onUpdateElement(activeElement.id, { tableRows: rows });
                              }}
                              className={`px-1 rounded text-[8px] font-bold ${row.valueBold ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'} cursor-pointer`}
                              title="Toggle bold for value"
                            >
                              B
                            </button>
                          </div>
                          <textarea
                            value={row.value}
                            onChange={(e) => {
                              const rows = (activeElement.tableRows || []).map(r => r.id === row.id ? { ...r, value: e.target.value } : r);
                              onUpdateElement(activeElement.id, { tableRows: rows });
                            }}
                            rows={1}
                            className="w-full text-xs px-2 py-1 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-400 bg-white text-slate-800 resize-y"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => {
                    const rows = [...(activeElement.tableRows || [])];
                    rows.push({
                      id: `row-${Date.now()}`,
                      label: 'New Item:',
                      value: 'New Value',
                      labelBold: true,
                      valueBold: false
                    });
                    onUpdateElement(activeElement.id, { tableRows: rows });
                  }}
                  className="w-full py-1.5 border border-dashed border-slate-300 hover:border-slate-400 text-slate-600 hover:text-slate-800 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 bg-white shadow-xs transition-all cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Add Table Row</span>
                </button>
              </div>
            )}

            {/* Typography Section (if type text or table) */}
            {(activeElement.type === 'text' || activeElement.type === 'table') && (
              <div className="space-y-4 pt-1">
                <div className="border-t border-slate-200/50 pt-3">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Typography & Style</span>
                  
                  {/* Font Family selection */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] text-slate-500">Font Family</label>
                    <select
                      value={activeElement.fontFamily || 'Inter'}
                      onChange={(e) => onUpdateElement(activeElement.id, { fontFamily: e.target.value })}
                      className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-md focus:outline-none bg-white text-slate-800 shadow-xs cursor-pointer"
                    >
                      {FONT_FAMILIES.map((f) => (
                        <option key={f.value} value={f.value}>
                          {f.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Font Size slider */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] text-slate-500">Font Size ({activeElement.fontSize || 12} pt)</label>
                  </div>
                  <input
                    type="range"
                    min={8}
                    max={54}
                    value={activeElement.fontSize || 12}
                    onChange={(e) => onUpdateElement(activeElement.id, { fontSize: parseInt(e.target.value) })}
                    className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
                  />
                </div>

                {/* Alignment and Formatting Triggers */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  {/* Alignment Button group */}
                  <div className="space-y-1">
                    <label className="block text-[10px] text-slate-500">Alignment</label>
                    <div className="flex border border-slate-200 rounded-md overflow-hidden divide-x divide-slate-100 bg-white shadow-xs">
                      {(['left', 'center', 'right'] as const).map((align) => {
                        const Icon = align === 'left' ? AlignLeft : align === 'center' ? AlignCenter : AlignRight;
                        return (
                          <button
                            key={align}
                            onClick={() => onUpdateElement(activeElement.id, { align })}
                            className={`flex-1 py-1.5 flex items-center justify-center transition-colors cursor-pointer ${
                              activeElement.align === align ? 'bg-slate-100 text-slate-900 font-semibold' : 'bg-white text-slate-500 hover:bg-slate-50'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Font Weights Buttons */}
                  <div className="space-y-1">
                    <label className="block text-[10px] text-slate-500">Font Decor</label>
                    <div className="flex border border-slate-200 rounded-md overflow-hidden divide-x divide-slate-100 bg-white shadow-xs">
                      {/* Bold */}
                      <button
                        onClick={() =>
                          onUpdateElement(activeElement.id, {
                            fontWeight: activeElement.fontWeight === 'bold' ? 'normal' : 'bold',
                          })
                        }
                        className={`flex-1 py-1.5 flex items-center justify-center transition-colors cursor-pointer ${
                          activeElement.fontWeight === 'bold' ? 'bg-slate-100 text-slate-900 font-semibold' : 'bg-white text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        <Bold className="w-3.5 h-3.5" />
                      </button>
                      
                      {/* Italic */}
                      <button
                        onClick={() =>
                          onUpdateElement(activeElement.id, {
                            fontStyle: activeElement.fontStyle === 'italic' ? 'normal' : 'italic',
                          })
                        }
                        className={`flex-1 py-1.5 flex items-center justify-center transition-colors cursor-pointer ${
                          activeElement.fontStyle === 'italic' ? 'bg-slate-100 text-slate-900 font-semibold' : 'bg-white text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        <Italic className="w-3.5 h-3.5" />
                      </button>

                      {/* Underline */}
                      <button
                        onClick={() =>
                          onUpdateElement(activeElement.id, {
                            textDecoration: activeElement.textDecoration === 'underline' ? 'none' : 'underline',
                          })
                        }
                        className={`flex-1 py-1.5 flex items-center justify-center transition-colors cursor-pointer ${
                          activeElement.textDecoration === 'underline' ? 'bg-slate-100 text-slate-900 font-semibold' : 'bg-white text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        <Underline className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Color swatches */}
                <div className="space-y-2 pt-1">
                  <label className="block text-[10px] text-slate-500">Text Color</label>
                  <div className="flex flex-wrap gap-1.5 items-center">
                    {PRESET_COLORS.map((col) => (
                      <button
                        key={col}
                        onClick={() => onUpdateElement(activeElement.id, { color: col })}
                        className={`w-6 h-6 rounded-full border border-slate-200 transition-transform cursor-pointer relative flex items-center justify-center ${
                          activeElement.color === col ? 'scale-110 ring-2 ring-slate-800 ring-offset-1' : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: col }}
                      >
                        {activeElement.color === col && (
                          <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        )}
                      </button>
                    ))}
                    
                    {/* Custom Hex input */}
                    <div className="flex items-center border border-slate-200 rounded-md overflow-hidden bg-white shadow-xs ml-1">
                      <div className="w-5 h-5 ml-1 border rounded-xs" style={{ backgroundColor: activeElement.color }} />
                      <input
                        type="text"
                        value={activeElement.color || '#000000'}
                        onChange={(e) => onUpdateElement(activeElement.id, { color: e.target.value })}
                        className="w-16 text-[10px] text-center font-mono focus:outline-none py-1 border-0 text-slate-700 uppercase bg-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Line Height and Letter Spacing sliders */}
                <div className="space-y-3 pt-1 border-t border-slate-200/50 mt-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-500 block">Line Spacing ({activeElement.lineHeight || 1.4})</label>
                    <input
                      type="range"
                      min={1.0}
                      max={2.4}
                      step={0.1}
                      value={activeElement.lineHeight || 1.4}
                      onChange={(e) => onUpdateElement(activeElement.id, { lineHeight: parseFloat(e.target.value) })}
                      className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-500 block">Letter Spacing ({activeElement.letterSpacing || 0} px)</label>
                    <input
                      type="range"
                      min={0}
                      max={12}
                      step={1}
                      value={activeElement.letterSpacing || 0}
                      onChange={(e) => onUpdateElement(activeElement.id, { letterSpacing: parseInt(e.target.value) })}
                      className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Shared Position and Size Sliders (For ALL element types) */}
            <div className="space-y-3.5 pt-3 border-t border-slate-200/50">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-slate-400" />
                <span>Layout & Fine Positioning</span>
              </span>

              {/* Width Slider */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>Block Width</span>
                  <span className="font-mono">{activeElement.width}%</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={100}
                  value={activeElement.width}
                  onChange={(e) => onUpdateElement(activeElement.id, { width: parseInt(e.target.value) })}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
                />
              </div>

              {/* Horizontal Center Position Slider */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>Horizontal Axis (X)</span>
                  <span className="font-mono">{activeElement.x}%</span>
                </div>
                <input
                  type="range"
                  min={-10}
                  max={100}
                  step={0.5}
                  value={activeElement.x}
                  onChange={(e) => onUpdateElement(activeElement.id, { x: parseFloat(e.target.value) })}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
                />
              </div>

              {/* Vertical Height Axis Position Slider */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>Vertical Axis (Y)</span>
                  <span className="font-mono">{activeElement.y}%</span>
                </div>
                <input
                  type="range"
                  min={-10}
                  max={100}
                  step={0.5}
                  value={activeElement.y}
                  onChange={(e) => onUpdateElement(activeElement.id, { y: parseFloat(e.target.value) })}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
                />
              </div>

              {/* Rotation Slider */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>Rotation Angle</span>
                  <span className="font-mono">{activeElement.rotation || 0}°</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={360}
                  value={activeElement.rotation || 0}
                  onChange={(e) => onUpdateElement(activeElement.id, { rotation: parseInt(e.target.value) })}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'element' && !activeElement && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 py-16">
            <Sliders className="w-10 h-10 text-slate-300 mb-3" />
            <p className="text-xs font-semibold text-slate-600">No Active Selection</p>
            <p className="text-[10px] text-slate-400 mt-1 max-w-[180px] leading-normal">
              Click on any text or image block directly in the preview center to unlock high-fidelity formatting controls!
            </p>
          </div>
        )}

        {/* TAB 2: Global Page Setup */}
        {activeTab === 'global' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            {/* Page Borders Section */}
            <div className="space-y-3 pb-3">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-slate-400" />
                <span>Page Layout Border</span>
              </span>

              {/* Show Border Checkbox */}
              <div className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-md shadow-xs">
                <span className="text-xs text-slate-700 font-semibold">Show outer border lines</span>
                <input
                  type="checkbox"
                  checked={globalSettings.showBorder}
                  onChange={(e) => onUpdateGlobalSettings({ showBorder: e.target.checked })}
                  className="w-4 h-4 rounded text-slate-800 focus:ring-slate-500 border-slate-300 cursor-pointer"
                />
              </div>

              {globalSettings.showBorder && (
                <>
                  {/* Border Style dropdown */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] text-slate-500">Border Accent Style</label>
                    <select
                      value={globalSettings.borderStyle}
                      onChange={(e) => onUpdateGlobalSettings({ borderStyle: e.target.value as any })}
                      className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-md focus:outline-none bg-white text-slate-800 shadow-xs cursor-pointer"
                    >
                      <option value="solid">Single Solid Line</option>
                      <option value="double">Classic Academic Double Line</option>
                      <option value="dashed">Creative Dashed Line</option>
                      <option value="accent">Modern Bold Offset Box</option>
                    </select>
                  </div>

                  {/* Border Width Slider */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>Border Width</span>
                      <span>{globalSettings.borderWidth} px</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={globalSettings.borderWidth}
                      onChange={(e) => onUpdateGlobalSettings({ borderWidth: parseInt(e.target.value) })}
                      className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
                    />
                  </div>

                  {/* Border Color selection */}
                  <div className="space-y-2">
                    <label className="block text-[10px] text-slate-500">Border Color</label>
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {PRESET_COLORS.map((col) => (
                        <button
                          key={col}
                          onClick={() => onUpdateGlobalSettings({ borderColor: col })}
                          className={`w-6 h-6 rounded-full border border-slate-200 transition-transform cursor-pointer relative flex items-center justify-center ${
                            globalSettings.borderColor === col ? 'scale-110 ring-2 ring-slate-800 ring-offset-1' : 'hover:scale-105'
                          }`}
                          style={{ backgroundColor: col }}
                        >
                          {globalSettings.borderColor === col && (
                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Page Sheet Background Colors */}
            <div className="space-y-2 pt-3 border-t border-slate-200/50">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Parchment Color / Backing</span>
              <div className="flex flex-wrap gap-2 items-center">
                {PRESET_BG_COLORS.map((col) => (
                  <button
                    key={col}
                    onClick={() => onUpdateGlobalSettings({ backgroundColor: col })}
                    className={`w-7 h-7 rounded-md border border-slate-200 transition-transform cursor-pointer relative flex items-center justify-center ${
                      globalSettings.backgroundColor === col ? 'scale-110 ring-2 ring-slate-800 ring-offset-1' : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: col }}
                    title={col === '#FFFFFF' ? 'Pure white' : col === '#FDFBF7' ? 'Parchment warm' : 'Tinted'}
                  >
                    {globalSettings.backgroundColor === col && (
                      <div className="w-2 h-2 bg-slate-900 rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Document Margins Selection */}
            <div className="space-y-1.5 pt-3 border-t border-slate-200/50">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">A4 Outer Margin Spacing</span>
              <div className="grid grid-cols-2 gap-2">
                {(['none', 'narrow', 'normal', 'wide'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => onUpdateGlobalSettings({ marginType: m })}
                    className={`py-1.5 px-3 border rounded-md text-xs font-semibold capitalize transition-all cursor-pointer ${
                      globalSettings.marginType === m
                        ? 'bg-slate-100 border-slate-300 text-slate-900 font-bold shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600 shadow-xs'
                    }`}
                  >
                    {m === 'none' ? 'Borderless' : m}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Add Custom Elements */}
        {activeTab === 'add' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Insert Cover Elements</span>
            
            <div className="space-y-3">
              {/* Insert custom Text block */}
              <button
                onClick={() => onAddElement('text')}
                className="w-full flex items-center gap-3 p-3 bg-white border border-slate-200/80 hover:border-slate-400 hover:bg-slate-50/50 rounded-lg text-left transition-all cursor-pointer group shadow-xs"
              >
                <div className="bg-slate-100 group-hover:bg-slate-200/80 p-2 rounded-md text-slate-700 shrink-0">
                  <Type className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Add Text block</h4>
                  <p className="text-[10px] text-slate-400 leading-tight">Add a custom editable heading, label, or subtext anywhere.</p>
                </div>
              </button>

              {/* Insert horizontal line separator */}
              <button
                onClick={() => onAddElement('line')}
                className="w-full flex items-center gap-3 p-3 bg-white border border-slate-200/80 hover:border-slate-400 hover:bg-slate-50/50 rounded-lg text-left transition-all cursor-pointer group shadow-xs"
              >
                <div className="bg-slate-100 group-hover:bg-slate-200/80 p-2 rounded-md text-slate-700 shrink-0">
                  <div className="w-4 h-[2px] bg-slate-700" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Add Line separator</h4>
                  <p className="text-[10px] text-slate-400 leading-tight">Insert a solid horizontal accent bar to structured layouts.</p>
                </div>
              </button>

              {/* Insert organization logo block */}
              <button
                onClick={() => onAddElement('image')}
                className="w-full flex items-center gap-3 p-3 bg-white border border-slate-200/80 hover:border-slate-400 hover:bg-slate-50/50 rounded-lg text-left transition-all cursor-pointer group shadow-xs"
              >
                <div className="bg-slate-100 group-hover:bg-slate-200/80 p-2 rounded-md text-slate-700 shrink-0">
                  <FileBadge className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Add Logo / Image Block</h4>
                  <p className="text-[10px] text-slate-400 leading-tight">Create a placeholder frame to upload custom SVG, PNG or JPEG files.</p>
                </div>
              </button>
            </div>

            <div className="p-3 bg-slate-100/50 rounded-md border border-slate-200/40 text-[10px] text-slate-500 leading-normal mt-5">
              💡 Newly added blocks appear in the center area. Click them to select, move, scale, or edit their specific style attributes!
            </div>
          </div>
        )}
      </div>

      {/* Selected Element Quick Details */}
      {activeElement && (
        <div className="p-3 bg-neutral-100/50 border-t border-slate-200/50 text-[10px] text-slate-500 flex items-center justify-between">
          <span>Active Layer ID: <code>{activeElement.id.slice(0, 12)}</code></span>
          <button 
            onClick={() => onUpdateElement(activeElement.id, { locked: !activeElement.locked })}
            className={`font-semibold cursor-pointer text-slate-600 hover:text-slate-900`}
          >
            {activeElement.locked ? '🔓 Unlock Dragging' : '🔒 Lock Position'}
          </button>
        </div>
      )}
    </div>
  );
}
