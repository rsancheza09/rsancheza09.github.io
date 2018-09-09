import React from 'react';
import _ from 'lodash';
import Moment from 'moment';

import './month.css';

const uniqueKey = () => Math.random().toString(36).slice(2);

const fillAllWeek = (array) => _.map(array, () => <td key={uniqueKey()} className="empty">&nbsp;</td>);

const monthBase = props => {
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const { weeks } = props;
	let monthName = null;
	const allMonth = [];
	let allWeek = new Array(7);
	allWeek = fillAllWeek(allWeek);
	_.forEach(weeks, week => {
		_.forEach(week, (day, key) => {
			allWeek[day.dayInWeek] = <td key={`${uniqueKey()}-${uniqueKey()}`}>{Moment(day.date).date()}</td>;
			monthName = `${months[Moment(day.date).month()]} - ${Moment(day.date).year()}`;
		});
		allMonth.push(allWeek);
		allWeek = new Array(7);
		allWeek = fillAllWeek(allWeek);
	});
	return (
		<div className="month">
			<table>
				<thead>
					<tr>
						{
							dayNames.map((day, key) => <th key={`${uniqueKey()}-${uniqueKey()}`}>{day.substr(0, 1)}</th>)
						}
					</tr>
					<tr>
						<th colSpan="7">{monthName || 'January - 2018'}</th>
					</tr>
				</thead>
				<tbody>
					{ allMonth.map(week => (
						<tr key={`${uniqueKey()}-${uniqueKey()}`} className="week">
							{week}
						</tr>
					)) }
				</tbody>
			</table>
		 </div>
	);
	
};
export default monthBase;
