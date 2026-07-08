/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FormInputs, CoverPageTemplate, PageElement, GlobalSettings } from './types';

// Beautiful SVG Vector Logos encoded in Base64
export const ACADEMIC_LOGO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><path d="M50 5 L15 20 V55 C15 75 35 90 50 95 C65 90 85 75 85 55 V20 L50 5 Z" fill="%231E3A8A" stroke="%23F59E0B" stroke-width="4"/><path d="M50 10 L20 23 V53 C20 71 37 85 50 90 C63 85 80 71 80 53 V23 L50 10 Z" fill="%232563EB"/><path d="M30 45 C35 45 45 42 50 45 C55 42 65 45 70 45 V65 C65 65 55 62 50 65 C45 62 35 65 30 65 Z" fill="%23FFFFFF"/><path d="M50 45 V65" stroke="%232563EB" stroke-width="2"/><polygon points="50,20 53,27 60,27 55,31 57,38 50,34 43,38 45,31 40,27 47,27" fill="%23F59E0B"/></svg>`;

export const IIT_DELHI_LOGO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <!-- Outer Gear Teeth -->
  <circle cx="60" cy="60" r="51" fill="none" stroke="%23DC2626" stroke-width="6" stroke-dasharray="5,3"/>
  <!-- Outer Ring -->
  <circle cx="60" cy="60" r="47" fill="none" stroke="%23DC2626" stroke-width="2"/>
  <!-- Inner text ring -->
  <circle cx="60" cy="60" r="33" fill="none" stroke="%23DC2626" stroke-width="1.5"/>
  <!-- Central Emblem circular boundary -->
  <circle cx="60" cy="60" r="23" fill="none" stroke="%23DC2626" stroke-width="1.5"/>
  
  <!-- Central Gear wheel -->
  <circle cx="60" cy="60" r="5" fill="none" stroke="%23DC2626" stroke-width="1.5"/>
  <circle cx="60" cy="60" r="8" fill="none" stroke="%23DC2626" stroke-width="1" stroke-dasharray="2,1"/>
  
  <!-- Classic arch curves (center) -->
  <path d="M 46 68 C 46 52, 52 46, 60 46 C 68 46, 74 52, 74 68" fill="none" stroke="%23DC2626" stroke-width="1.8"/>
  <path d="M 50 68 C 50 56, 55 51, 60 51 C 65 51, 70 56, 70 68" fill="none" stroke="%23DC2626" stroke-width="1.2"/>
  <path d="M 54 68 L 54 58 M 58 68 L 58 54 M 62 68 L 62 54 M 66 68 L 66 58" stroke="%23DC2626" stroke-width="0.8"/>
  
  <!-- Leaf decorations inside central area (Lotus shape) -->
  <path d="M 39 58 C 43 58, 44 63, 46 66 C 42 66, 39 63, 39 58 Z" fill="%23DC2626"/>
  <path d="M 81 58 C 77 58, 76 63, 74 66 C 78 66, 81 63, 81 58 Z" fill="%23DC2626"/>
  <path d="M 37 66 C 41 66, 43 70, 45 73 C 40 73, 37 70, 37 66 Z" fill="%23DC2626"/>
  <path d="M 83 66 C 79 66, 77 70, 75 73 C 80 73, 83 70, 83 66 Z" fill="%23DC2626"/>
  
  <!-- Flame/Crest at the top of arches -->
  <path d="M 60 38 C 58 42, 60 44, 60 44 C 60 44, 62 42, 60 38 Z" fill="%23DC2626"/>
  
  <!-- Stylized circular rings inside text band -->
  <circle cx="60" cy="60" r="40" fill="none" stroke="%23DC2626" stroke-width="0.5" stroke-dasharray="1,2"/>
  
  <!-- Boundary Dots -->
  <circle cx="34" cy="60" r="1.5" fill="%23DC2626"/>
  <circle cx="86" cy="60" r="1.5" fill="%23DC2626"/>
  <circle cx="60" cy="11" r="2.2" fill="%23DC2626"/>
</svg>`;

export const CORPORATE_LOGO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect x="20" y="20" width="60" height="60" rx="15" fill="%230D9488"/><circle cx="50" cy="50" r="18" fill="%23FFFFFF"/><path d="M38 50 C38 43.37 43.37 38 50 38 C56.63 38 62 43.37 62 50 C62 56.63 56.63 62 50 62" fill="none" stroke="%230D9488" stroke-width="6"/><circle cx="50" cy="50" r="8" fill="%230D9488"/></svg>`;

export const CERTIFICATE_CREST_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><circle cx="50" cy="50" r="42" fill="none" stroke="%23B45309" stroke-width="4" stroke-dasharray="2 2"/><circle cx="50" cy="50" r="36" fill="%23F59E0B" stroke="%2392400E" stroke-width="2"/><path d="M50 22 L55 35 L68 35 L58 43 L62 56 L50 48 L38 56 L42 43 L32 35 L45 35 Z" fill="%23FFFFFF"/><path d="M38 75 L30 90 L50 82 L70 90 L62 75 Z" fill="%2392400E"/></svg>`;

export const DEFAULT_FORM_INPUTS: FormInputs = {
  instituteName: 'INDIAN INSTITUTE OF TECHNOLOGY DELHI',
  reportTitle: 'GIPEDI INTERNSHIP REPORT',
  internName: 'Karuna Sharma',
  internId: '',
  internshipStart: '2026-05-15',
  internshipEnd: '2026-07-15',
  organizationName: 'Indian Institute of Technology Delhi',
  departmentName: 'Department of Electrical Engineering',
  supervisorName: 'Prof. Subrat Kar',
  mentorName: 'Mr. Utkarsh Roy',
  submissionMonthYear: 'July 2026',
  additionalNotes: 'New Delhi - 110016',
};

export const GLOBAL_DEFAULT_SETTINGS: GlobalSettings = {
  marginType: 'normal',
  showBorder: false,
  borderStyle: 'double',
  borderColor: '#1E3A8A',
  borderWidth: 4,
  backgroundColor: '#FFFFFF',
  accentColor: '#1E3A8A',
  primaryFont: 'Lora',
  secondaryFont: 'Lora',
};

// We define our 4 key templates:
// 1. IIT Delhi Internship Report (GIPEDI)
// 2. Generic Internship Report
// 3. Certificate of Internship
// 4. Project Report Template

export const DEFAULT_TEMPLATES: CoverPageTemplate[] = [
  {
    id: 'iit-delhi-gipedi',
    name: 'IIT Delhi GIPEDI Cover',
    description: 'The classic Indian Institute of Technology GIPEDI internship report front page style.',
    globalSettings: {
      ...GLOBAL_DEFAULT_SETTINGS,
      showBorder: false,
      primaryFont: 'Lora',
      secondaryFont: 'Lora',
    },
    elements: [
      {
        id: 'instituteName',
        type: 'text',
        label: 'Institute Name',
        text: 'INDIAN INSTITUTE OF TECHNOLOGY DELHI',
        x: 5,
        y: 7.5,
        width: 90,
        fontSize: 16,
        fontFamily: 'Lora',
        fontWeight: 'bold',
        color: '#000000',
        align: 'center',
        visible: true,
      },
      {
        id: 'instituteSubtitle',
        type: 'text',
        label: 'Institute Subtitle',
        text: 'New Delhi - 110016',
        x: 10,
        y: 10.5,
        width: 80,
        fontSize: 11,
        fontFamily: 'Lora',
        fontWeight: 'normal',
        color: '#000000',
        align: 'center',
        visible: true,
      },
      {
        id: 'instituteLogo',
        type: 'image',
        label: 'Institute Logo',
        src: IIT_DELHI_LOGO_SVG,
        x: 41.5,
        y: 16,
        width: 17,
        height: 12,
        visible: true,
      },
      {
        id: 'reportTitle',
        type: 'text',
        label: 'Report Title',
        text: 'GIPEDI INTERNSHIP REPORT',
        x: 10,
        y: 39,
        width: 80,
        fontSize: 24,
        fontFamily: 'Lora',
        fontWeight: 'bold',
        color: '#000000',
        align: 'center',
        visible: true,
      },
      {
        id: 'submittedSubtitle',
        type: 'text',
        label: 'Submission Subtitle',
        text: 'Submitted in fulfillment of the requirements for the Internship\nProgram',
        x: 10,
        y: 45,
        width: 80,
        fontSize: 12.5,
        fontFamily: 'Lora',
        fontWeight: 'normal',
        color: '#334155',
        align: 'center',
        visible: true,
      },
      {
        id: 'gipediTable',
        type: 'table',
        label: 'Internship Details Table',
        x: 23,
        y: 65,
        width: 60,
        fontSize: 11.5,
        fontFamily: 'Lora',
        color: '#000000',
        visible: true,
        tableRows: [
          { id: '1', label: 'Intern Name:', value: 'Karuna Sharma', labelBold: true, valueBold: false },
          { id: '2', label: 'Internship Period:', value: '15/05/2026 – 15/07/2026', labelBold: true, valueBold: false },
          { id: '3', label: 'Organization:', value: 'Department of Electrical Engineering\nIndian Institute of Technology Delhi', labelBold: true, valueBold: false },
          { id: '4', label: 'Supervisor:', value: 'Prof. Subrat Kar', labelBold: true, valueBold: false },
          { id: '5', label: 'Mentor:', value: 'Mr. Utkarsh Roy', labelBold: true, valueBold: false },
        ]
      },
      {
        id: 'submissionDate',
        type: 'text',
        label: 'Submission Date',
        text: 'July 2026',
        x: 10,
        y: 89,
        width: 80,
        fontSize: 12.5,
        fontFamily: 'Lora',
        fontWeight: 'normal',
        color: '#000000',
        align: 'center',
        visible: true,
      }
    ]
  },
  {
    id: 'generic-modern',
    name: 'Generic Modern Clean',
    description: 'A striking modern design with an asymmetric sidebar theme, perfect for high-growth tech startups and design reports.',
    globalSettings: {
      ...GLOBAL_DEFAULT_SETTINGS,
      showBorder: false,
      accentColor: '#0D9488', // Teal
      backgroundColor: '#FAFAFA',
    },
    elements: [
      {
        id: 'accentBand',
        type: 'border',
        label: 'Modern Left Accent Band',
        x: 0,
        y: 0,
        width: 8,
        height: 141.4, // fills exact height
        color: '#0D9488',
        visible: true,
      },
      {
        id: 'instituteName',
        type: 'text',
        label: 'Institute Name',
        text: 'INDIAN INSTITUTE OF TECHNOLOGY DELHI',
        x: 14,
        y: 8,
        width: 72,
        fontSize: 12,
        fontFamily: 'Space Grotesk',
        fontWeight: 'bold',
        color: '#6B7280',
        align: 'left',
        visible: true,
      },
      {
        id: 'reportTitle',
        type: 'text',
        label: 'Report Title',
        text: 'DEEP LEARNING ARCHITECTURES FOR REAL-TIME SPEECH SYNTHESIS IN EMBEDDED DEVICES',
        x: 14,
        y: 18,
        width: 72,
        fontSize: 24,
        fontFamily: 'Space Grotesk',
        fontWeight: 'bold',
        color: '#111827',
        align: 'left',
        lineHeight: 1.3,
        visible: true,
      },
      {
        id: 'dividerTop',
        type: 'line',
        label: 'Accent Line',
        x: 14,
        y: 38,
        width: 30,
        height: 4,
        color: '#0D9488',
        visible: true,
      },
      {
        id: 'gipediLabel',
        type: 'text',
        label: 'Sub-heading',
        text: 'Comprehensive Summer Internship Project Report',
        x: 14,
        y: 43,
        width: 72,
        fontSize: 13,
        fontFamily: 'Inter',
        color: '#4B5563',
        align: 'left',
        visible: true,
      },
      {
        id: 'internDetails',
        type: 'text',
        label: 'Intern Info Block',
        text: 'PREPARED BY:\nSiddharth Sen (2023CSB1024)\nDepartment of Computer Science & Engineering',
        x: 14,
        y: 56,
        width: 34,
        fontSize: 11,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        color: '#374151',
        align: 'left',
        lineHeight: 1.5,
        visible: true,
      },
      {
        id: 'supervisionDetails',
        type: 'text',
        label: 'Supervisor Details',
        text: 'SUPERVISED BY:\nDr. Arvinder Singh\nIIT Delhi\n\nMENTORED BY:\nMr. Rajeev Mehta\nGoogle AI Studio Labs',
        x: 52,
        y: 56,
        width: 34,
        fontSize: 11,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        color: '#374151',
        align: 'left',
        lineHeight: 1.5,
        visible: true,
      },
      {
        id: 'instituteLogo',
        type: 'image',
        label: 'Institute Logo',
        src: ACADEMIC_LOGO_SVG,
        x: 14,
        y: 84,
        width: 12,
        height: 9,
        visible: true,
      },
      {
        id: 'organizationLogo',
        type: 'image',
        label: 'Organization Logo',
        src: CORPORATE_LOGO_SVG,
        x: 29,
        y: 84,
        width: 12,
        height: 9,
        visible: true,
      },
      {
        id: 'organizationDetails',
        type: 'text',
        label: 'Company / Org Label',
        text: 'HOST ORGANIZATION:\nGoogle AI Studio Labs',
        x: 14,
        y: 94,
        width: 40,
        fontSize: 11,
        fontFamily: 'Inter',
        color: '#4B5563',
        align: 'left',
        visible: true,
      },
      {
        id: 'submissionDate',
        type: 'text',
        label: 'Submission Date',
        text: 'SUBMITTED ON:\nJuly, 2026',
        x: 58,
        y: 94,
        width: 28,
        fontSize: 11,
        fontFamily: 'Space Grotesk',
        color: '#0D9488',
        align: 'right',
        visible: true,
      }
    ]
  },
  {
    id: 'certificate-template',
    name: 'Internship Certificate Page',
    description: 'An elegant formal certificate of completion design that can serve as the second/acknowledgment page of your report.',
    globalSettings: {
      ...GLOBAL_DEFAULT_SETTINGS,
      borderColor: '#92400E', // Amber
      accentColor: '#D97706',
      borderStyle: 'solid',
      borderWidth: 6,
      backgroundColor: '#FFFDF9', // Warm parchment
    },
    elements: [
      {
        id: 'certificateCrest',
        type: 'image',
        label: 'Certificate Seal/Crest',
        src: CERTIFICATE_CREST_SVG,
        x: 42,
        y: 10,
        width: 16,
        height: 12,
        visible: true,
      },
      {
        id: 'certificateHeader',
        type: 'text',
        label: 'Certificate Header',
        text: 'CERTIFICATE OF INTERNSHIP',
        x: 10,
        y: 24,
        width: 80,
        fontSize: 22,
        fontFamily: 'Space Grotesk',
        fontWeight: 'bold',
        color: '#92400E',
        align: 'center',
        visible: true,
      },
      {
        id: 'certificateSubtext',
        type: 'text',
        label: 'Certify Text',
        text: 'This is to certify that',
        x: 10,
        y: 33,
        width: 80,
        fontSize: 12,
        fontFamily: 'Inter',
        fontStyle: 'italic',
        color: '#4B5563',
        align: 'center',
        visible: true,
      },
      {
        id: 'internDetails',
        type: 'text',
        label: 'Recipient Name',
        text: 'Siddharth Sen (Roll No. 2023CSB1024)',
        x: 10,
        y: 38,
        width: 80,
        fontSize: 18,
        fontFamily: 'Playfair Display',
        fontWeight: 'bold',
        color: '#111827',
        align: 'center',
        visible: true,
      },
      {
        id: 'certificateBody',
        type: 'text',
        label: 'Certificate Body',
        text: 'has successfully completed a Summer Internship under the GIPEDI Summer Program at Google AI Studio Labs. The internship was conducted from May 10, 2026 to July 10, 2026. During this period, the intern designed and built advanced deep learning architectures for real-time speech synthesis on embedded systems.',
        x: 15,
        y: 46,
        width: 70,
        fontSize: 11,
        fontFamily: 'Inter',
        color: '#374151',
        align: 'center',
        lineHeight: 1.8,
        visible: true,
      },
      {
        id: 'satisfactoryLabel',
        type: 'text',
        label: 'Performance Grade',
        text: 'The candidate has demonstrated exceptional technical expertise, diligence, and stellar problem-solving skills throughout the program.',
        x: 15,
        y: 65,
        width: 70,
        fontSize: 11,
        fontFamily: 'Inter',
        fontStyle: 'italic',
        color: '#4B5563',
        align: 'center',
        visible: true,
      },
      {
        id: 'dividerTop',
        type: 'line',
        label: 'Lower Line Accent',
        x: 35,
        y: 75,
        width: 30,
        height: 1,
        color: '#D97706',
        visible: true,
      },
      {
        id: 'supervisionDetails',
        type: 'text',
        label: 'Signature Lines',
        text: '_____________________________\nDr. Arvinder Singh\nAcademic Supervisor, IIT Delhi',
        x: 12,
        y: 84,
        width: 36,
        fontSize: 10,
        fontFamily: 'Inter',
        color: '#4B5563',
        align: 'center',
        lineHeight: 1.4,
        visible: true,
      },
      {
        id: 'mentorSignature',
        type: 'text',
        label: 'Industry Mentor Signature',
        text: '_____________________________\nMr. Rajeev Mehta\nIndustry Mentor, Google Labs',
        x: 52,
        y: 84,
        width: 36,
        fontSize: 10,
        fontFamily: 'Inter',
        color: '#4B5563',
        align: 'center',
        lineHeight: 1.4,
        visible: true,
      }
    ]
  },
  {
    id: 'project-report-minimal',
    name: 'Academic Project Cover',
    description: 'A sharp, modern research-focused design utilizing structural lines and monospace accent typography.',
    globalSettings: {
      ...GLOBAL_DEFAULT_SETTINGS,
      showBorder: true,
      borderColor: '#111827',
      accentColor: '#111827',
      borderStyle: 'solid',
      borderWidth: 1,
      backgroundColor: '#FFFFFF',
    },
    elements: [
      {
        id: 'instituteName',
        type: 'text',
        label: 'Department Header',
        text: 'DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING\nINDIAN INSTITUTE OF TECHNOLOGY DELHI',
        x: 10,
        y: 8,
        width: 80,
        fontSize: 11,
        fontFamily: 'JetBrains Mono',
        fontWeight: 'bold',
        color: '#111827',
        align: 'center',
        lineHeight: 1.4,
        visible: true,
      },
      {
        id: 'dividerTop',
        type: 'line',
        label: 'Top Double Bar',
        x: 10,
        y: 15,
        width: 80,
        height: 1,
        color: '#111827',
        visible: true,
      },
      {
        id: 'reportTitle',
        type: 'text',
        label: 'Project Title',
        text: 'DEEP LEARNING ARCHITECTURES FOR REAL-TIME SPEECH SYNTHESIS',
        x: 10,
        y: 28,
        width: 80,
        fontSize: 22,
        fontFamily: 'Space Grotesk',
        fontWeight: 'bold',
        color: '#111827',
        align: 'center',
        lineHeight: 1.3,
        visible: true,
      },
      {
        id: 'gipediLabel',
        type: 'text',
        label: 'Category Subtitle',
        text: 'SUMMER INTERNSHIP RESEARCH THESIS REPORT',
        x: 10,
        y: 42,
        width: 80,
        fontSize: 10,
        fontFamily: 'JetBrains Mono',
        color: '#6B7280',
        align: 'center',
        visible: true,
      },
      {
        id: 'dividerMid',
        type: 'line',
        label: 'Mid horizontal separator',
        x: 35,
        y: 47,
        width: 30,
        height: 1,
        color: '#E5E7EB',
        visible: true,
      },
      {
        id: 'submittedByLabel',
        type: 'text',
        label: 'Submitted By text',
        text: 'SUBMITTED BY:',
        x: 10,
        y: 53,
        width: 80,
        fontSize: 9,
        fontFamily: 'JetBrains Mono',
        color: '#9CA3AF',
        align: 'center',
        visible: true,
      },
      {
        id: 'internDetails',
        type: 'text',
        label: 'Intern Name and Roll',
        text: 'Siddharth Sen (Roll No. 2023CSB1024)\nUnder the GIPEDI Internship Scheme',
        x: 10,
        y: 57,
        width: 80,
        fontSize: 12,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        color: '#111827',
        align: 'center',
        lineHeight: 1.4,
        visible: true,
      },
      {
        id: 'underGuidanceLabel',
        type: 'text',
        label: 'Guided By text',
        text: 'RESEARCH SUPERVISED BY:',
        x: 10,
        y: 67,
        width: 80,
        fontSize: 9,
        fontFamily: 'JetBrains Mono',
        color: '#9CA3AF',
        align: 'center',
        visible: true,
      },
      {
        id: 'supervisionDetails',
        type: 'text',
        label: 'Supervisors list',
        text: 'Dr. Arvinder Singh (IIT Delhi)\nMr. Rajeev Mehta (Google AI Studio Labs)',
        x: 10,
        y: 71,
        width: 80,
        fontSize: 12,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        color: '#111827',
        align: 'center',
        lineHeight: 1.4,
        visible: true,
      },
      {
        id: 'instituteLogo',
        type: 'image',
        label: 'Primary Crest Logo',
        src: ACADEMIC_LOGO_SVG,
        x: 45,
        y: 81,
        width: 10,
        height: 8,
        visible: true,
      },
      {
        id: 'submissionDate',
        type: 'text',
        label: 'Date and Period',
        text: 'Date: July, 2026\nDuration: May 2026 - July 2026',
        x: 10,
        y: 91,
        width: 80,
        fontSize: 10,
        fontFamily: 'JetBrains Mono',
        color: '#4B5563',
        align: 'center',
        lineHeight: 1.4,
        visible: true,
      }
    ]
  }
];

export function syncFormWithElements(elements: PageElement[], inputs: FormInputs): PageElement[] {
  return elements.map(el => {
    switch (el.id) {
      case 'instituteName':
        return { ...el, text: inputs.instituteName.toUpperCase() };
      case 'reportTitle':
        return { ...el, text: inputs.reportTitle.toUpperCase() };
      case 'instituteSubtitle':
        return { ...el, text: inputs.additionalNotes };
      case 'gipediTable':
        {
          const formattedPeriod = `${formatShortDateDMY(inputs.internshipStart)} – ${formatShortDateDMY(inputs.internshipEnd)}`;
          const currentRows = el.tableRows || [
            { id: '1', label: 'Intern Name:', value: '', labelBold: true },
            { id: '2', label: 'Internship Period:', value: '', labelBold: true },
            { id: '3', label: 'Organization:', value: '', labelBold: true },
            { id: '4', label: 'Supervisor:', value: '', labelBold: true },
            { id: '5', label: 'Mentor:', value: '', labelBold: true }
          ];
          const updatedRows = currentRows.map(row => {
            if (row.id === '1') {
              return { ...row, value: inputs.internName };
            } else if (row.id === '2') {
              return { ...row, value: formattedPeriod };
            } else if (row.id === '3') {
              return { ...row, value: `${inputs.departmentName}\n${inputs.organizationName}` };
            } else if (row.id === '4') {
              return { ...row, value: inputs.supervisorName };
            } else if (row.id === '5') {
              return { ...row, value: inputs.mentorName };
            }
            return row;
          });
          return { ...el, tableRows: updatedRows };
        }
      case 'submissionDate':
        if (el.text && el.text.includes('Duration:')) {
          return { ...el, text: `Date: ${inputs.submissionMonthYear}\nDuration: ${formatShortDate(inputs.internshipStart)} - ${formatShortDate(inputs.internshipEnd)}` };
        }
        return { ...el, text: inputs.submissionMonthYear };
      case 'internDetails':
        // Detect layout format based on default template content
        if (el.text && el.text.includes('PREPARED BY:')) {
          return {
            ...el,
            text: `PREPARED BY:\n${inputs.internName} (${inputs.internId})\n${inputs.departmentName}`
          };
        } else if (el.text && el.text.includes('Roll No.')) {
          return {
            ...el,
            text: `${inputs.internName} (Roll No. ${inputs.internId})`
          };
        } else if (el.text && el.text.includes('Under GIPEDI')) {
          return {
            ...el,
            text: `${inputs.internName} (${inputs.internId})\nUnder GIPEDI Summer Program\nPeriod: ${inputs.internshipStart} to ${inputs.internshipEnd}`
          };
        } else {
          return {
            ...el,
            text: `${inputs.internName}\nRoll/ID: ${inputs.internId}\nPeriod: ${inputs.internshipStart} to ${inputs.internshipEnd}`
          };
        }
      case 'supervisionDetails':
        if (el.text && el.text.includes('SUPERVISED BY:')) {
          return {
            ...el,
            text: `SUPERVISED BY:\n${inputs.supervisorName}\n${inputs.instituteName.split(' ')[0] || 'Institute'}\n\nMENTORED BY:\n${inputs.mentorName}\n${inputs.organizationName}`
          };
        } else if (el.text && el.text.includes('___________________')) {
          return {
            ...el,
            text: `_____________________________\n${inputs.supervisorName}\nAcademic Supervisor, ${inputs.instituteName.split(' ').slice(-2).join(' ')}`
          };
        } else if (el.text && el.text.includes('& Mr.')) {
          return {
            ...el,
            text: `${inputs.supervisorName} (Academic Supervisor)\n& ${inputs.mentorName} (Industry Mentor)`
          };
        } else {
          return {
            ...el,
            text: `${inputs.supervisorName} (${inputs.instituteName})\n${inputs.mentorName} (${inputs.organizationName})`
          };
        }
      case 'mentorSignature':
        return {
          ...el,
          text: `_____________________________\n${inputs.mentorName}\nIndustry Mentor, ${inputs.organizationName}`
        };
      case 'organizationDetails':
        return {
          ...el,
          text: `${inputs.departmentName}\n${inputs.organizationName}`
        };
      case 'certificateBody':
        return {
          ...el,
          text: `has successfully completed a Summer Internship under the GIPEDI Summer Program at ${inputs.organizationName}. The internship was conducted from ${formatLongDate(inputs.internshipStart)} to ${formatLongDate(inputs.internshipEnd)}. During this period, the intern designed and built advanced deep learning architectures for real-time speech synthesis on embedded systems.`
        };
      default:
        return el;
    }
  });
}

function formatShortDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  } catch (e) {
    return dateStr;
  }
}

function formatLongDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  } catch (e) {
    return dateStr;
  }
}

function formatShortDateDMY(dateStr: string): string {
  if (!dateStr) return '';
  try {
    if (dateStr.includes('-')) {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
    }
    return dateStr;
  } catch (e) {
    return dateStr;
  }
}
