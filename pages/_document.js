import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <script src="https://www.google.com/recaptcha/api.js" async="" defer=""></script> */}
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
      document.addEventListener('DOMContentLoaded', function() {
        var searchButton = document.getElementById('search-button');
        if (searchButton) {
          searchButton.addEventListener('click', function() {
            gtag('event', 'search', {
              'event_category': 'Category Search',
              'event_label': document.getElementById('search-input').value
            });
          });
        }
      });
    `,
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TFGLN7HW');
          `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:4947019,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
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
