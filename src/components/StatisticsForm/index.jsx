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
import variables from '../../variables';

class StatisticsForm extends React.Component {
  constructor (props) {
    super(props);

    this.action = variables.apiRoot + '/api/shorts';
    this.state = {
      loading: false,
      error: false,
      message: '',
      result: null
    };

    this.submitForm = this.submitForm.bind(this);
  }

  async submitForm (event) {
    event.preventDefault();

    this.setState({
      loading: true,
      error: false,
      message: '',
      result: null
    });

    const form = event.target;
    const buttons = form.querySelectorAll('button[type="submit"]');
    const link = form.querySelector('#link').value;
    const regex = /([a-zA-Z0-9.-]+)$/
    const alias = regex.exec(link);

    buttons.forEach(element => {
      element.disabled = true;
    });

    try {
      if (alias === null) throw new Error('Invalid link');

      const action = form.action + '/' + alias[1];
      const response = await fetch(action);
      const res = await response.json();

      if (res.success) {
        this.setState({
          message: '',
          result: res.short
        });
      } else {
        this.setState({
          error: true,
          message: res.message
        });
      }
    } catch (error) {
      this.setState({
        error: true,
        message: error.message
      });
    }

    this.setState({ loading: false });

    buttons.forEach(element => {
      element.disabled = false;
    });
  }

  render () {
    const messageClass = this.state.message ? 'd-block' : 'd-none';
    const errorClass = `stats-error ${messageClass}`;
    const loading = (
      <React.Fragment>
        <img src="/images/loader.gif" alt="Loading" width={32} height={32} />
        Submitting...
      </React.Fragment>
    );

    let result = null;
    if (this.state.result !== null) {
      const visits = this.state.result.visits;
      const referrers = [];

      for (let i = 0; i < this.state.result.referrers.length; i++) {
        const referrer = this.state.result.referrers[i];
        referrers.push(
          <tr key={i}>
            <td>{ referrer.name }</td>
            <td align="center">{ referrer.visits }</td>
          </tr>
        );
      }

      result = (
        <div className="stats-results mt-2">
          <h4 className="my-1">Traffic Statistics of "{ this.state.result.short_id }"</h4>
          <div className="my-1">Total Visits: { visits }</div>
          <table className="stats-table">
            <thead>
              <tr>
                <th scope="col">Referrer</th>
                <th scope="col">Visits</th>
              </tr>
            </thead>

            <tbody>
              { referrers }
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <React.Fragment>
        <form action={this.action} method="post" className="form-stats" onSubmit={this.submitForm}>
          <div className="form-group mb-1">
            <label htmlFor="link">Enter link or alias:</label>
            <input type="text" id="link" name="link" required />
          </div>

          <div className={errorClass}>
            <span>{this.state.message}</span>
          </div>

          <button type="submit" className="btn">
            { this.state.loading ? loading : 'Submit' }
          </button>
        </form>

        { this.state.result && result }
      </React.Fragment>
    );
  }
}

export default StatisticsForm;
