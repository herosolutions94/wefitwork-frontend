import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LGX4Q0J17S" />
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-LGX4Q0J17S');
          `,
          }}
        />
        {/* <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
            document.getElementById('call-button').addEventListener('click', function() {
              gtag('event', 'click', {
                'event_category': 'Button',
                'event_action': 'Call',
                'event_label': 'Call Now'
              });
            });
          `,
          }}
        /> */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
            document.getElementById('search-button').addEventListener('click', function() {
              gtag('event', 'search', {
                'event_category': 'Category Search',
                'event_label': document.getElementById('search-input').value
              });
            });
          `,
          }}
        />
        {/* <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
            document.getElementById('message-button').addEventListener('click', function() {
              gtag('event', 'click', {
                'event_category': 'Button',
                'event_action': 'Message',
                'event_label': 'Send SMS'
              });
            });
          `,
          }}
        /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
