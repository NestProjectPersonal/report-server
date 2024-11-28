import type { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces"
import { DateFormatter } from "src/helpers"

const logo: Content = {
    image: 'src/assets/tucan-banner.png',
    width: 100,
    height: 30,
    margin: [10, 30,]
}
const styles: StyleDictionary = {
    header: {
        fontSize: 20,
        bold: true,
        margin: [0, 50, 0, 0]
    }

}

export const orderByIdReport = (): TDocumentDefinitions => {


    return {
        styles: styles,
        header: logo,
        pageMargins: [10, 40, 40, 60],
        content: [{
            text: 'Tucan Code',
            style: 'header',
        },
        {
            columns: [
                {
                    text: 'Calle del Prado, 21, 28014 Madrid, España',
                },
                {
                    text: `Recibo No. $156161\n Fecha del recibo ${DateFormatter.getDDMMMMYYYY(new Date())}\n Pagar antes de:  ${DateFormatter.getDDMMMMYYYY(new Date())}\n `,
                    alignment: 'right',
                }
            ]
        }
        ],
    }
}