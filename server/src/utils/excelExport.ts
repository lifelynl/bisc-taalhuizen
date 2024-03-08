import { Column, stream } from 'exceljs'
import { Writable } from 'stream'

export class ExcelExport {
    private workbook: stream.xlsx.WorkbookWriter

    public constructor(writableStream: Writable) {
        this.workbook = new stream.xlsx.WorkbookWriter({
            useStyles: true,
            useSharedStrings: true,
            stream: writableStream,
        })
    }

    public addWorksheet(name: string, columns: Partial<Column>[]) {
        const sheet = this.workbook.addWorksheet(name, { views: [{ state: 'frozen', ySplit: 1 }] })

        sheet.columns = columns
        sheet.getRow(1).font = { bold: true }

        return sheet
    }

    public async commitWorkbook() {
        await this.workbook.commit()
    }

    public static getFormattedDate(date?: Date | null) {
        if (!date) {
            return ''
        }

        date = new Date(date)

        return `${date.getDate().toString().padStart(2, '0')}-${date.getMonth() + 1}-${date.getFullYear()}`
    }
}
