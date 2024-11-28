import { TDocumentDefinitions } from "pdfmake/interfaces";


export const getHelloTest = ():TDocumentDefinitions =>{

    const docDefinition: TDocumentDefinitions = {
        content: ['test'],
      };

      return docDefinition
}