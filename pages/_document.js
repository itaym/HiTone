import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {

    static async getInitialProps (ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render () {
        // noinspection HtmlRequiredTitleElement
        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
// noinspection JSUnusedGlobalSymbols
export default MyDocument
