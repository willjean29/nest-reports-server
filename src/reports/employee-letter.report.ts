import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
const styles: StyleDictionary = {
  title: {
    bold: true,
    alignment: 'center',
    fontSize: 20,
    margin: [0, 0, 0, 20],
  },
  body: {
    alignment: 'justify',
    lineHeight: 1.5,
    margin: [0, 0, 0, 30],
  },
  signature: {
    bold: true,
  },
};
export const getEmployeeLetterReport = () => {
  const docDefinition: TDocumentDefinitions = {
    content: [
      {
        text: 'CERTIFICADO DE EMPLEO',
        style: 'title',
      },
      {
        text: 'Yo, [Nombre del Empleador], en mi calidad de [Cargo del Empleador] de [Nombre de la Empresa], por medio de la presente certifico que [Nombre del Empleado] ha sido empleado en nuestra empresa desde el [Fecha de Inicio del Empleado].Durante su empleo, el Sr./Sra.\n\n [Nombre del Empleado] ha desempeñado el cargo de [Cargo del Empleado], demostrando responsabilidad, compromiso y habilidades profesionales en sus labores.\n\n La jornada laboral del Sr./ Sra. [Nombre del Empleado] es de [Número de Horas] horas semanales, con un horario de [Horario de Trabajo], cumpliendo con las políticas y procedimientos establecidos por la empresa.\n\n Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.',
        style: 'body',
      },
      {
        text: `
        Atentamente
        [Nombre del Empleador]
        [Cargo del Empleador] 
        [Nombre de la Empresa] 
        [Fecha de Emisión]`,
        style: 'signature',
      },
    ],
    styles: styles,
  };

  return docDefinition;
};
