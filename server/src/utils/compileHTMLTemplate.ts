import Handlebars from 'handlebars'

export function compileHTMLTemplate(htmlTemplate: string, data: Record<string, unknown>) {
    const template = Handlebars.compile(htmlTemplate)
    return template(data)
}
