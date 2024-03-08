import { readFileSync } from 'fs'
import { executablePath, launch } from 'puppeteer'
import { DomainError } from 'src/errors/DomainError'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

export class PDFExport {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    public static async generate(html: string, customCss?: string): Promise<Buffer> {
        const browser = await launch({
            args: ['--no-sandbox', '--font-render-hinting=none'],
            executablePath: process.env.PUPPETEER_CHROMIUM_EXECUTABLE_PATH || executablePath(),
        })

        const baseCss = readFileSync(path.resolve('src/utils/pdfExport.css'), 'utf8')

        try {
            const page = await browser.newPage()

            await page.setContent(html)
            await page.addStyleTag({ content: baseCss })

            if (customCss) {
                await page.addStyleTag({ content: customCss })
            }

            await page.addStyleTag({ url: 'https://fonts.googleapis.com/css2?family=Faustina&display=swap' })
            await page.addStyleTag({ url: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap' })

            // wait until fonts are loaded
            await page.setContent(await page.content(), { waitUntil: 'networkidle2' })
            await page.focus('body')

            const pdf = await page.pdf({
                format: 'A4',
                margin: { top: '2.9cm', right: '2.1cm', bottom: '2.9cm', left: '2.1cm' },
            })

            await browser.close()

            return pdf
        } catch (e) {
            console.log(e)
            browser.close()
            throw new DomainError('PDF could not be generated')
        }
    }
}
