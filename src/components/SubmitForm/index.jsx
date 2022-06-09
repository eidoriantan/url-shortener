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

class SubmitForm extends React.Component {
  constructor (props) {
    super(props);

    this.action = variables.apiRoot + '/api/shorts';
    this.state = {
      loading: false,
      error: false,
      message: '',
      shorten: ''
    };

    this.submitForm = this.submitForm.bind(this);
  }

  async submitForm (event) {
    event.preventDefault();

    this.setState({
      loading: true,
      error: false,
      message: '',
      shorten: ''
    });

    const form = event.target;
    const buttons = form.querySelectorAll('button[type="submit"]');
    const action = form.action;
    const method = form.method;
    const formData = new FormData(form);
    const data = {}

    buttons.forEach(element => {
      element.disabled = true;
    });

    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      const response = await fetch(action, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const res = await response.json();
      const link = res.short ? variables.apiRoot + res.short.short_url : '';

      if (res.success) {
        this.setState({
          message: 'Success!',
          shorten: link
        });
      } else {
        this.setState({
          error: true,
          message: res.message,
          shorten: link
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
    const errorClass = this.state.error ? 'submit-error' : 'submit-info';
    const messageClass = this.state.message ? 'd-block' : 'd-none';
    const shortenClass = this.state.shorten ? 'ml-1' : 'd-none';
    const statusClass = `submit-status ${errorClass} ${messageClass}`;
    const loading = (
      <React.Fragment>
        <img src="/images/loader.gif" alt="Loading" width={32} height={32} />
        Submitting...
      </React.Fragment>
    );

    return (
      <form action={ this.action } method="post" className="form-submit" onSubmit={this.submitForm}>
        <div className="form-group mb-1">
          <label htmlFor="url">Paste URL to shorten:</label>
          <input type="url" id="url" name="url" placeholder="https://..." required />
        </div>

        <div className="form-group mb-1">
          <label htmlFor="alias">Alias (leave blank for random):</label>
          <input type="text" id="alias" name="alias" placeholder="alias" />
          <span className="form-help">Used as follows: { process.env.PUBLIC_URL }/alias</span>
        </div>

        <div className={statusClass}>
          <span>{this.state.message}</span>
          <a href={this.state.shorten} className={shortenClass}>{this.state.shorten}</a>
        </div>

        <button type="submit" className="btn">
          { this.state.loading ? loading : 'Submit' }
        </button>
      </form>
    );
  }
}

export default SubmitForm;
