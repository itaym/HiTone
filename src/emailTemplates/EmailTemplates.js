import { HTML_TEMPLATES } from '@/src/enumerators'
import { minify } from 'html-minifier'
import path from 'path'
import { readFile } from 'node:fs/promises'

const filesMap = {
    [HTML_TEMPLATES.RESET_PASSWORD]: 'resetPassword.html'
}
const EmailTemplates = async (templateConst) => {
    const filePath = path.join(process.cwd(), '/src/emailTemplates/', filesMap[templateConst])
    const fileContent = (await readFile(filePath)).toString()
    return minify(fileContent)
}

export default EmailTemplates