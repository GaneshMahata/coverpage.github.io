/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { PageElement, GlobalSettings } from '../types';
import { Upload, Trash2, ShieldAlert, EyeOff, RotateCw, Move } from 'lucide-react';

interface A4PreviewProps {
  elements: PageElement[];
  globalSettings: GlobalSettings;
  activeElementId: string | null;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (id: string, updated: Partial<PageElement>) => void;
  onDeleteElement: (id: string) => void;
}

export default function A4Preview({
  elements,
  globalSettings,
  activeElementId,
  onSelectElement,
  onUpdateElement,
  onDeleteElement,
}: A4PreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [containerWidth, setContainerWidth] = useState(600); // base width
  const [targetLogoId, setTargetLogoId] = useState<string | null>(null);

  // Dragging state
  const [dragState, setDragState] = useState<{
    id: string;
    startX: number;
    startY: number;
    startElX: number;
    startElY: number;
  } | null>(null);

  // Resizing state
  const [resizeState, setResizeState] = useState<{
    id: string;
    startX: number;
    startWidth: number;
  } | null>(null);

  // Rotating state
  const [rotateState, setRotateState] = useState<{
    id: string;
    centerX: number;
    centerY: number;
    startAngle: number;
    startRotation: number;
  } | null>(null);

  // Measure container dimensions
  useEffect(() => {
    if (!containerRef.current) return;
    
    const measure = () => {
      setContainerWidth(containerRef.current?.offsetWidth || 600);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(containerRef.current);
    
    return () => observer.disconnect();
  }, []);

  const containerHeight = containerWidth * 1.4142; // standard A4 ratio
  const scale = containerWidth / 600; // Reference width is 600px

  // Drag element handler
  const handleElementDragStart = (e: React.MouseEvent | React.TouchEvent, el: PageElement) => {
    if (el.locked) return;
    onSelectElement(el.id);
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    setDragState({
      id: el.id,
      startX: clientX,
      startY: clientY,
      startElX: el.x,
      startElY: el.y,
    });

    e.stopPropagation();
  };

  // Resize element handler
  const handleResizeStart = (e: React.MouseEvent | React.TouchEvent, el: PageElement) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    
    setResizeState({
      id: el.id,
      startX: clientX,
      startWidth: el.width,
    });

    e.stopPropagation();
    e.preventDefault();
  };

  // Rotate element handler
  const handleRotateStart = (e: React.MouseEvent | React.TouchEvent, el: PageElement) => {
    if (!containerRef.current) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    // Get element bounding rect
    const elIdStr = `element-box-${el.id}`;
    const elDom = document.getElementById(elIdStr);
    if (!elDom) return;

    const rect = elDom.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const startAngle = Math.atan2(dy, dx);

    setRotateState({
      id: el.id,
      centerX,
      centerY,
      startAngle,
      startRotation: el.rotation || 0,
    });

    e.stopPropagation();
    e.preventDefault();
  };

  // Global mouse/touch move event listener
  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      // Handle element dragging
      if (dragState) {
        const dx = clientX - dragState.startX;
        const dy = clientY - dragState.startY;
        
        // Convert pixel delta to percentage
        const dxPercent = (dx / containerWidth) * 100;
        const dyPercent = (dy / containerHeight) * 100;

        // Snapping helper (snap to vertical center if close to 50% or matching left aligns)
        let newX = dragState.startElX + dxPercent;
        let newY = dragState.startElY + dyPercent;

        // Keep inside boundary bounds
        newX = Math.max(-10, Math.min(100, newX));
        newY = Math.max(-10, Math.min(100, newY));

        // Subtle snapping to vertical center
        if (Math.abs((newX + elements.find(el => el.id === dragState.id)!.width / 2) - 50) < 1.5) {
          const elWidth = elements.find(el => el.id === dragState.id)!.width;
          newX = 50 - elWidth / 2;
        }

        onUpdateElement(dragState.id, { x: parseFloat(newX.toFixed(2)), y: parseFloat(newY.toFixed(2)) });
      }

      // Handle element resizing
      if (resizeState) {
        const dx = clientX - resizeState.startX;
        const dxPercent = (dx / containerWidth) * 100;
        
        let newWidth = resizeState.startWidth + dxPercent;
        newWidth = Math.max(5, Math.min(100, newWidth)); // constraints 5% - 100%

        onUpdateElement(resizeState.id, { width: parseFloat(newWidth.toFixed(1)) });
      }

      // Handle element rotation
      if (rotateState) {
        const dx = clientX - rotateState.centerX;
        const dy = clientY - rotateState.centerY;
        const currentAngle = Math.atan2(dy, dx);
        
        const deltaAngle = currentAngle - rotateState.startAngle;
        let newRotation = rotateState.startRotation + (deltaAngle * 180 / Math.PI);
        
        // Snap to multiples of 45 or exact 0 if close
        newRotation = (newRotation + 360) % 360;
        if (newRotation < 5 || newRotation > 355) newRotation = 0;
        else if (Math.abs(newRotation - 90) < 5) newRotation = 90;
        else if (Math.abs(newRotation - 180) < 5) newRotation = 180;
        else if (Math.abs(newRotation - 270) < 5) newRotation = 270;

        onUpdateElement(rotateState.id, { rotation: Math.round(newRotation) });
      }
    };

    const handleEnd = () => {
      setDragState(null);
      setResizeState(null);
      setRotateState(null);
    };

    if (dragState || resizeState || rotateState) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [dragState, resizeState, rotateState, containerWidth, containerHeight, elements, onUpdateElement]);

  // Handle local file upload
  const triggerLogoUpload = (e: React.MouseEvent, elId: string) => {
    e.stopPropagation();
    setTargetLogoId(elId);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !targetLogoId) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result && typeof event.target.result === 'string') {
        onUpdateElement(targetLogoId, { src: event.target.result });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = ''; // reset
  };

  // Margin spacing utility
  const getMarginStyle = () => {
    switch (globalSettings.marginType) {
      case 'none': return 'p-0';
      case 'narrow': return 'p-4';
      case 'wide': return 'p-12';
      default: return 'p-8'; // normal
    }
  };

  // Border style utility
  const getBorderStyle = () => {
    if (!globalSettings.showBorder) return 'border-0';
    
    const style = globalSettings.borderStyle;
    const color = globalSettings.borderColor;
    const width = globalSettings.borderWidth * scale;

    const borderInnerStyle: React.CSSProperties = {
      borderColor: color,
      borderWidth: `${width}px`,
    };

    if (style === 'double') {
      return {
        ...borderInnerStyle,
        borderStyle: 'double',
        borderWidth: `${width * 2}px`,
      };
    } else if (style === 'accent') {
      return {
        ...borderInnerStyle,
        borderStyle: 'solid',
        borderWidth: `${width}px`,
        boxShadow: `0 0 0 ${2 * scale}px ${globalSettings.accentColor}`,
      };
    }
    
    return {
      ...borderInnerStyle,
      borderStyle: style, // solid, dashed, double
    };
  };

  return (
    <div 
      className="flex-1 overflow-auto p-8 flex items-center justify-center bg-neutral-100/60 grid-bg relative h-full select-none"
      onClick={() => onSelectElement(null)}
    >
      {/* Hidden file input for logo upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleLogoFileChange}
        className="hidden"
      />

      {/* A4 Canvas Sheet */}
      <div
        ref={containerRef}
        id="a4-document-root"
        className="print-page-target a4-container bg-white relative overflow-hidden flex flex-col shrink-0 shadow-[0_12px_40px_rgba(0,0,0,0.05)] border border-neutral-200/80"
        style={{
          width: '100%',
          maxWidth: '560px', // standard preview width
          height: `${containerHeight}px`,
          backgroundColor: globalSettings.backgroundColor,
          transition: 'all 0.2s',
        }}
      >
        {/* Document Border */}
        {globalSettings.showBorder && (
          <div
            className="absolute inset-4 pointer-events-none rounded"
            style={getBorderStyle() as React.CSSProperties}
          />
        )}

        {/* Outer content container with margins */}
        <div className={`w-full h-full relative ${getMarginStyle()}`}>
          {/* Elements layer */}
          {elements
            .filter((el) => el.visible)
            .map((el) => {
              const isActive = activeElementId === el.id;
              
              // Custom styled parameters
              const fontStyle = {
                fontFamily: el.fontFamily,
                fontSize: el.fontSize ? `${el.fontSize * scale}px` : undefined,
                fontWeight: el.fontWeight || 'normal',
                fontStyle: el.fontStyle || 'normal',
                textDecoration: el.textDecoration || 'none',
                color: el.color || '#111827',
                textAlign: el.align || 'center',
                lineHeight: el.lineHeight || 1.4,
                letterSpacing: el.letterSpacing ? `${el.letterSpacing * scale}px` : 'normal',
                whiteSpace: 'pre-line' as const,
              };

              const elementStyle: React.CSSProperties = {
                position: 'absolute',
                left: `${el.x}%`,
                top: `${el.y}%`,
                width: `${el.width}%`,
                height: el.height ? `${el.height}%` : 'auto',
                transform: `rotate(${el.rotation || 0}deg)`,
                transformOrigin: 'center center',
                zIndex: isActive ? 40 : 10,
              };

              return (
                <div
                  key={el.id}
                  id={`element-box-${el.id}`}
                  style={elementStyle}
                  className={`group relative select-none rounded cursor-grab active:cursor-grabbing ${
                    isActive ? 'ring-2 ring-slate-800 ring-offset-1' : 'hover:ring-1 hover:ring-slate-300'
                  }`}
                  onMouseDown={(e) => handleElementDragStart(e, el)}
                  onTouchStart={(e) => handleElementDragStart(e, el)}
                  title="Drag to reposition, click to edit"
                >
                  {/* Element Types */}
                  {el.type === 'text' && (
                    <div style={fontStyle} className="w-full">
                      {el.text}
                    </div>
                  )}

                  {el.type === 'table' && (
                    <table className="w-full border-none border-collapse bg-transparent" style={{ fontSize: fontStyle.fontSize, color: el.color || '#000000', fontFamily: el.fontFamily || 'Lora', lineHeight: el.lineHeight || 1.5, letterSpacing: fontStyle.letterSpacing }}>
                      <tbody>
                        {(el.tableRows || []).map((row) => (
                          <tr key={row.id} className="border-none bg-transparent">
                            <td
                              style={{
                                width: '35%',
                                padding: `${1 * scale}px ${3 * scale}px`,
                                fontWeight: row.labelBold ? 'bold' : 'normal',
                                fontStyle: el.fontStyle || 'normal',
                                textDecoration: el.textDecoration || 'none',
                                textAlign: 'left',
                                verticalAlign: 'top',
                                border: 'none',
                              }}
                            >
                              {isActive ? (
                                <input
                                  type="text"
                                  value={row.label}
                                  onChange={(e) => {
                                    const updatedRows = (el.tableRows || []).map(r => r.id === row.id ? { ...r, label: e.target.value } : r);
                                    onUpdateElement(el.id, { tableRows: updatedRows });
                                  }}
                                  onMouseDown={(e) => e.stopPropagation()}
                                  onTouchStart={(e) => e.stopPropagation()}
                                  className="w-full bg-transparent border-none outline-none focus:outline-none p-0 m-0"
                                  style={{
                                    fontFamily: 'inherit',
                                    fontSize: 'inherit',
                                    fontWeight: 'inherit',
                                    color: 'inherit',
                                    textAlign: 'inherit',
                                  }}
                                />
                              ) : (
                                <span>{row.label}</span>
                              )}
                            </td>
                            <td
                              style={{
                                width: '65%',
                                padding: `${1 * scale}px ${3 * scale}px`,
                                fontWeight: row.valueBold ? 'bold' : 'normal',
                                fontStyle: el.fontStyle || 'normal',
                                textDecoration: el.textDecoration || 'none',
                                textAlign: 'left',
                                verticalAlign: 'top',
                                border: 'none',
                                whiteSpace: 'pre-line',
                              }}
                            >
                              {isActive ? (
                                <textarea
                                  value={row.value}
                                  onChange={(e) => {
                                    const updatedRows = (el.tableRows || []).map(r => r.id === row.id ? { ...r, value: e.target.value } : r);
                                    onUpdateElement(el.id, { tableRows: updatedRows });
                                  }}
                                  onMouseDown={(e) => e.stopPropagation()}
                                  onTouchStart={(e) => e.stopPropagation()}
                                  rows={row.value.split('\n').length || 1}
                                  className="w-full bg-transparent border-none outline-none focus:outline-none p-0 m-0 resize-none overflow-hidden"
                                  style={{
                                    fontFamily: 'inherit',
                                    fontSize: 'inherit',
                                    fontWeight: 'inherit',
                                    color: 'inherit',
                                    textAlign: 'inherit',
                                    lineHeight: 'inherit',
                                  }}
                                />
                              ) : (
                                <span>{row.value}</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {el.type === 'image' && (
                    <div className="w-full h-full flex items-center justify-center relative">
                      {el.src ? (
                        <img
                          src={el.src}
                          alt={el.label}
                          className="max-w-full max-h-full object-contain pointer-events-none"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="border border-dashed border-slate-300 rounded p-2 flex flex-col items-center justify-center bg-neutral-50 text-slate-400 aspect-square">
                          <Upload className="w-5 h-5 mb-1 text-slate-400" />
                          <span className="text-[9px] font-semibold text-center leading-tight">No image</span>
                        </div>
                      )}

                      {/* Overlays for custom image upload */}
                      {isActive && (
                        <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded">
                          <button
                            onClick={(e) => triggerLogoUpload(e, el.id)}
                            className="bg-white/95 hover:bg-white text-slate-800 p-1.5 rounded text-[10px] font-bold flex items-center gap-1.5 shadow-md cursor-pointer pointer-events-auto"
                            title="Upload custom logo file"
                          >
                            <Upload className="w-3 h-3" />
                            <span>Upload</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {el.type === 'line' && (
                    <div
                      style={{
                        backgroundColor: el.color || '#E5E7EB',
                        height: el.height ? `${el.height * scale}px` : `${2 * scale}px`,
                        width: '100%',
                      }}
                    />
                  )}

                  {el.type === 'border' && (
                    <div
                      style={{
                        backgroundColor: el.color || '#3B82F6',
                        width: '100%',
                        height: '100%',
                        borderRadius: '0.125rem',
                      }}
                    />
                  )}

                  {/* Active Selection Borders and Drag/Resize/Rotate Handles */}
                  {isActive && (
                    <>
                      {/* Top rotate indicator */}
                      <div
                        className="absolute -top-7 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-alias"
                        onMouseDown={(e) => handleRotateStart(e, el)}
                        onTouchStart={(e) => handleRotateStart(e, el)}
                        title="Drag to rotate element"
                      >
                        <div className="w-4 h-4 bg-white border-2 border-slate-800 rounded-full flex items-center justify-center hover:scale-115 transition-transform shadow-md">
                          <RotateCw className="w-2.5 h-2.5 text-slate-800" />
                        </div>
                        <div className="w-[1.5px] h-3 bg-slate-800" />
                      </div>

                      {/* Right resize handle */}
                      <div
                        className="absolute top-0 -right-1.5 bottom-0 w-3 cursor-ew-resize flex items-center justify-center"
                        onMouseDown={(e) => handleResizeStart(e, el)}
                        onTouchStart={(e) => handleResizeStart(e, el)}
                        title="Drag to adjust width"
                      >
                        <div className="w-2 h-4 bg-white border-2 border-slate-800 rounded-sm hover:scale-125 transition-transform shadow" />
                      </div>

                      {/* Left resize handle (mirrored style for visual balance) */}
                      <div className="absolute top-0 -left-1.5 bottom-0 w-1 border-l-2 border-dashed border-slate-800/40 pointer-events-none" />

                      {/* Element quick action panel (delete element/hide) */}
                      <div className="absolute -bottom-8 right-0 flex items-center gap-1.5 bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow-md pointer-events-auto shrink-0">
                        <span className="font-semibold text-slate-400 px-0.5 truncate max-w-[80px]">{el.label}</span>
                        {el.type === 'image' && (
                          <button
                            onClick={(e) => triggerLogoUpload(e, el.id)}
                            className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white rounded transition-colors cursor-pointer"
                            title="Replace Image"
                          >
                            <Upload className="w-3 h-3" />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteElement(el.id);
                          }}
                          className="p-1 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded transition-colors cursor-pointer"
                          title="Remove element"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
