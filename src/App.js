import React, { Component } from 'react';
import autobind from 'react-autobind';
import Moment from 'moment';
import _ from 'lodash';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

import MonthComponent from './components/month';

class App extends Component {
  constructor(props) {
    super(props);
    autobind(this);
    this.state = {
      startDate: '',
      numberDays: 0,
      countryCode: '',
      isHide: true,
      calendar: [],
    };
  }
  calculateCalendar({ startDate, numberDays }) {
    const dates = [];
    for (let i = 0; i < numberDays; i++) {
      if (!dates.length) {
        dates.push({
          date: Moment(startDate).format('MM/DD/YYYY'),
          dayInWeek: Moment(startDate).day(),
          week: Moment(startDate).week(),
          month: Moment(startDate).month(),
          year: Moment(startDate).year(),
          id: i,
        });
      } else {
        dates.push({
          date: Moment(startDate).add(i, 'day').format('MM/DD/YYYY'),
          dayInWeek: Moment(startDate).add(i, 'day').day(),
          week: Moment(startDate).add(i, 'day').week(),
          month: Moment(startDate).add(i, 'day').month(),
          year: Moment(startDate).add(i, 'day').year(),
          id: i,
        });
      }
    }
    const datesByMonth = _.map(_.groupBy(dates, 'month'), month => month);
    return _.map(datesByMonth, month => _.groupBy(month, 'week'));
  }
  onChangeInput(e) {
    const value = e.target.value;
    const inputName = e.target.name;
    if (inputName === 'start-date') {
      this.setState({
        startDate: value,
      });
    } else if (inputName === 'number-days') {
      this.setState({
        numberDays: value,
      });
    } else if (inputName === 'country-code') {
      this.setState({
        countryCode: value,
      });
    }
  }
  onClickGenerate(e) {
    e.preventDefault();
    const { startDate, numberDays, countryCode } = this.state;
    if (startDate && numberDays > 0 && countryCode.length === 2) {
      this.setState({
        isHide: false,
        calendar: this.calculateCalendar({ startDate, numberDays }),
      });
    }
  }
  onClickReset(e) {
    e.preventDefault();
    this.setState({
      startDate: '',
      numberDays: 0,
      countryCode: '',
      isHide: true,
    });
    this.startDate.value = '';
    this.numberDays = '';
    this.countryCode = '';
  }
  render() {
    const {
      isHide,
      numberDays,
      startDate,
      countryCode,
      calendar,
    } = this.state;
    const weeks = _.map(calendar, (weeks, key) => (<MonthComponent key={key} weeks={weeks} />));
    return (
      <div className="app">
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <form className="form">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Start date:</span>
                  </div>
                  <input
                    ref={(bind) => { this.startDate = bind }}
                    type="date"
                    name="start-date"
                    className="form-control"
                    value={startDate}
                    onChange={this.onChangeInput}
                  />
                </div>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Number of days:</span>
                  </div>
                  <input
                    ref={(bind) => { this.numberDays = bind }}
                    type="number"
                    name="number-days"
                    className="form-control"
                    min="0"
                    value={numberDays}
                    onChange={this.onChangeInput}
                  />
                </div>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Country Code:</span>
                  </div>
                  <input
                    ref={(bind) => { this.countryCode = bind }}
                    type="text"
                    name="country-code"
                    className="form-control"
                    maxLength="2"
                    value={countryCode}
                    onChange={this.onChangeInput}
                  />
                </div>
                <div className="field">
                  <button
                    className="btn btn-primary"
                    onClick={this.onClickGenerate}
                  >
                    Generate calendar
                  </button>
                  <button
                    className={`btn btn-secondary ${isHide ? 'hide' : ''}`}
                    onClick={ this.onClickReset }
                  >
                      Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
          { !isHide ? (
            <div className="row">
              <div className="col-md d-flex justify-content-md-between flex-wrap">
                {weeks}
              </div>
            </div>
          ) : '' }
        </div>
      </div>
    );
  }
}

export default App;
