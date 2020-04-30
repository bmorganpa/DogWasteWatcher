import React from "react";
import Document, {
  DocumentContext,
  Head,
  Main,
  NextScript,
} from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: [
        <React.Fragment key="styles">
          {initialProps.styles}
          {sheets.getStyleElement()}
        </React.Fragment>,
      ],
    };
  }

  render() {
    return (
      <html>
        <Head>
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.css"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
