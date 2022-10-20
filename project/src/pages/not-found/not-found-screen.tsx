import {Link} from 'react-router-dom';

export default function NotFoundScreen (): JSX.Element {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8"/>
        <title>WTW</title>
        <meta name="robots" content="noindex, nofollow"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="stylesheet" href="css/main.min.css"/>
      </head>

      <body>
        <div className="user-page">
          <header className="page-header user-page__head">
            <div className="logo">
              <a href="main.html" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <h1 className="page-title user-page__title">Page not found</h1>
          </header>

          <div className="user-page__title">
            <h1 className="user-page__head" style={{fontSize: '100px'}}>404</h1>
            <Link to="/" className="sign-in__link">Return to home page</Link>
          </div>

        </div>
      </body>
    </html>
  );
}
