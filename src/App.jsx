/**
 *  URL Shortener
 *  Copyright (C) 2022, Adriane Justine Tan
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react';

import './styles/app.scss';
import Home from './components/Home';

class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        <header>
          <nav>
            <a href="/" className="header-brand">
              <img src="/images/logo.png" alt="URL Shortener Logo" width={42} height={42} />
              <span className="header-title">URL Shortener</span>
            </a>

            <a href="https://github.com/eidoriantan/url-shortener">
              <img src="/images/socials/github.png" alt="GitHub Mark Logo" width={32} height={32} />
            </a>
          </nav>
        </header>

        <main>
          <Home />
        </main>

        <footer>
          Copyright &copy; 2022 <a href="https://eidoriantan.me">Adriane Justine Tan</a>
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
