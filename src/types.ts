/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ElementType = 'text' | 'image' | 'border' | 'line' | 'table';

export interface TableRow {
  id: string;
  label: string;
  value: string;
  labelBold?: boolean;
  valueBold?: boolean;
}

export interface PageElement {
  id: string;
  type: ElementType;
  label: string;
  
  // Content
  text?: string;
  src?: string; // base64 or URL
  tableRows?: TableRow[]; // for table elements
  
  // Placement (Percentage relative to A4 canvas width: 0-100, height: 0-100)
  x: number;
  y: number;
  width: number;
  height?: number;
  rotation?: number; // degrees (0-360)
  
  // Typography
  fontSize?: number; // in pt or px equivalent scaled
  fontFamily?: string; // 'Inter' | 'Times New Roman' | 'Playfair Display' | 'Space Grotesk' | 'JetBrains Mono' | 'Georgia'
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
  textDecoration?: 'none' | 'underline';
  color?: string; // hex
  align?: 'left' | 'center' | 'right';
  lineHeight?: number; // relative: 1.0, 1.2, 1.5, etc.
  letterSpacing?: number; // relative or px
  
  // Status
  visible: boolean;
  locked?: boolean;
}

export interface GlobalSettings {
  marginType: 'none' | 'normal' | 'wide' | 'narrow';
  showBorder: boolean;
  borderStyle: 'solid' | 'double' | 'dashed' | 'accent';
  borderColor: string;
  borderWidth: number; // px
  backgroundColor: string; // hex
  accentColor: string; // hex
  primaryFont: string;
  secondaryFont: string;
}

export interface CoverPageTemplate {
  id: string;
  name: string;
  description: string;
  elements: PageElement[];
  globalSettings: GlobalSettings;
  thumbnailUrl?: string;
  isCustom?: boolean;
}

export interface FormInputs {
  instituteName: string;
  reportTitle: string;
  internName: string;
  internId: string; // roll number/ID
  internshipStart: string;
  internshipEnd: string;
  organizationName: string;
  departmentName: string;
  supervisorName: string;
  mentorName: string;
  submissionMonthYear: string;
  additionalNotes: string;
}
