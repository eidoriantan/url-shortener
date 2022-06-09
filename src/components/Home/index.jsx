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

import './styles.scss';
import SubmitForm from '../SubmitForm';
import StatisticsForm from '../StatisticsForm';

class Home extends React.Component {
  render () {
    return (
      <React.Fragment>
        <section>
          <h2>About</h2>
          <p>
            Easily shorten your URLs by using this tool. Reduce the length of
            long URLs into more nice and manageable links. You'll also be able
            to monitor traffic statistics of your links such as number of visits
            and referer.
          </p>

          <p>No accounts needed.</p>
        </section>

        <section>
          <SubmitForm />
        </section>

        <section>
          <h2>Get statistics</h2>
          <StatisticsForm />
        </section>
      </React.Fragment>
    );
  }
}

export default Home;
