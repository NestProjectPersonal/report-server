import type { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces"
import { CurrencyFormatter, DateFormatter } from "src/helpers"
import { footerSection } from "./sections/footer.section"

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

export interface CompleteOrder {
    order_id: number;
    customer_id: number;
    order_date: Date;
    customers: Customers;
    order_details: OrderDetail[];
}

export interface Customers {
    customer_id: number;
    customer_name: string;
    contact_name: string;
    address: string;
    city: string;
    postal_code: string;
    country: string;
}

export interface OrderDetail {
    order_detail_id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    products: Products;
}

export interface Products {
    product_id: number;
    product_name: string;
    category_id: number;
    unit: string;
    price: string;
}

interface ReportValues {
    title?: string;
    subTitle?: string;
    data: CompleteOrder;
}

export const orderByIdReport = (value: ReportValues): TDocumentDefinitions => {

    const { data } = value;

    const { customers, order_details } = data;

    const subTotal = order_details.reduce(
        (acc, detail) => acc + detail.quantity * +detail.products.price,
        0,
    );

    const total = subTotal * 1.15;
    return {
        styles: styles,
        header: logo,
        pageMargins: [10, 40, 40, 60],
        footer: footerSection,
        content: [{
            text: 'Tucan Code',
            style: 'header',
        },
        {
            columns: [
                {
                    text: 'Calle del Prado, 21, 28014 Bogota, Colombia',
                },
                {
                    text: [
                        { text: `Recibo No.  156161`, bold: true },
                        `\n Fecha del recibo ${DateFormatter.getDDMMMMYYYY(new Date())}\n Pagar antes de:  ${DateFormatter.getDDMMMMYYYY(new Date())}\n `,
                    ],
                    alignment: 'right',
                }
            ]
        },
        {
            qr: 'https://github.com/jaavella07',
            fit: 100,
            alignment: 'right'
        },
        {
            text: [
                {
                    text: `Cobrar a: \n`, bold: true
                },
                `
                Razon Social: Group Seb ANDEAN
                Colombia +57
                `
            ]
        },
        {
            layout: 'headerLineOnly',
            margin: [0, 20],
            table: {
                headerRows: 1,
                widths: [50, '*', 'auto', 'auto', 'auto'],
                body: [
                    ['ID', 'Descripción', 'Cantidad', 'Precio', 'Total'],

                    ...order_details.map((detail) => [
                        detail.order_detail_id.toString(),
                        detail.products.product_name,
                        detail.quantity.toString(),
                        {
                            text: CurrencyFormatter.formatCurrency(+detail.products.price),
                            alignment: 'right',
                        },
                        {
                            text: CurrencyFormatter.formatCurrency(
                                +detail.products.price * detail.quantity,
                            ),
                            alignment: 'right',
                        },
                    ]),
                ],
            },
        },

            // Salto de línea
            '\n',

        // Totales
        {
            columns: [
                {
                    width: '*',
                    text: '',
                },
                {
                    width: 'auto',
                    layout: 'noBorders',
                    table: {
                        body: [
                            [
                                'Subtotal',
                                {
                                    text: CurrencyFormatter.formatCurrency(subTotal),
                                    alignment: 'right',
                                },
                            ],
                            [
                                { text: 'Total', bold: true },
                                {
                                    text: CurrencyFormatter.formatCurrency(total),
                                    alignment: 'right',
                                    bold: true,
                                },
                            ],
                        ],
                    },
                },
            ],
        },
        ],

    }
}