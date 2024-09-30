import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';
import { headerSection } from './sections/header.section';

interface ReportValues {
  employerName: string;
  employerPosition: string;
  companyName: string;
  employeeName: string;
  employeePosition: string;
  startDate: Date;
  weeklyHours: number;
  workSchedule: string;
}
const styles: StyleDictionary = {
  title: {
    bold: true,
    alignment: 'center',
    fontSize: 20,
    margin: [0, 40, 0, 20],
  },
  body: {
    alignment: 'justify',
    lineHeight: 1.5,
    margin: [0, 0, 0, 80],
  },
  signature: {
    bold: true,
    fontSize: 14,
  },
};

export const getEmployeeLetterReportById = (values: ReportValues) => {
  const {
    employerName,
    employerPosition,
    companyName,
    employeeName,
    employeePosition,
    startDate,
    weeklyHours,
    workSchedule,
  } = values;
  const docDefinition: TDocumentDefinitions = {
    header: headerSection({}),
    pageMargins: [40, 80],
    content: [
      {
        text: 'CERTIFICADO DE EMPLEO',
        style: 'title',
      },
      {
        text: [
          `Yo, ${employerName}, en mi calidad de ${employerPosition} de ${companyName}, por medio de la presente certifico que `,
          { text: employeeName, bold: true },
          ` ha sido empleado en nuestra empresa desde el ${DateFormatter.getFullDate(startDate)}.\n\nDurante su empleo, el Sr./Sra. `,
          { text: employeeName, bold: true },
          ` ha desempeñado el cargo de ${employeePosition}, demostrando responsabilidad, compromiso y habilidades profesionales en sus labores.\n\n La jornada laboral del Sr./Sra. `,
          { text: employeeName, bold: true },
          ` es de ${weeklyHours} horas semanales, con un horario de ${workSchedule}, cumpliendo con las políticas y procedimientos establecidos por la empresa.\n\n Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.`,
        ],
        style: 'body',
      },
      {
        text: `
        Atentamente
        ${employerName}
        ${employerPosition}
        ${companyName}
        ${DateFormatter.getFullDate(new Date())}`,
        style: 'signature',
      },
    ],
    footer: [
      {
        text: 'Este documento es una constancia de empleo y no representa un compromiso laboral.',
        alignment: 'center',
        italics: true,
        margin: [0, 40],
        fontSize: 10,
      },
    ],
    styles: styles,
  };

  return docDefinition;
};
