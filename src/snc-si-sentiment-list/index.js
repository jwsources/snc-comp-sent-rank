import { createCustomElement } from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import { createHttpEffect } from '@servicenow/ui-effect-http';
import styles from './styles.scss';

const view = (state, { updateState }) => {
	return (
		<div className="sentiment-list">
			<table>
				<thead>
					<td>Date</td>
					<td>Agent</td>
					<td>Score</td>
				</thead>
				<tr>
					<td>March 1, 2020</td>
					<td>Joe Employee</td>
					<td>5</td>
				</tr>
				<tr>
					<td>March 02, 2020</td>
					<td>Fred Luddy</td>
					<td>4</td>
				</tr>
				<tr>
					<td>March 3, 2020</td>
					<td>Julie Smith</td>
					<td>3</td>
				</tr>
				<tr>
					<td>March 4, 2020</td>
					<td>Joe Employee</td>
					<td>5</td>
				</tr>
				<tr>
					<td>March 5, 2020</td>
					<td>Fred Luddy</td>
					<td>4</td>
				</tr>
			</table>
		</div>
	);
};

createCustomElement('snc-si-sentiment-list', {
	renderer: { type: snabbdom },
	view,
	styles,
	properties: {
		"taskId": {
			default: false
		},
		"tableName": {
			default: false
		}
	}
});
