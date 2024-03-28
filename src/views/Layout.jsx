
const React = require('react');

module.exports = function Layout({ children, user }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="stylesheet" href="/stylesheets/normalize.css" />
        <link rel="stylesheet" href="/stylesheets/style.css" />

        <script defer src="/js/application.js" />

        <title>Project</title>
      </head>

      <body>
       {children}
      </body>
    </html>
  );
};
