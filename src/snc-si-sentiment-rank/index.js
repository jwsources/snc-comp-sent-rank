import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import capture from '../snc-si-sentiment-capture';
import timeline from '../snc-si-sentiment-timeline';
import list from '../snc-si-sentiment-list';

const view = (state, {updateState}) => {
	const {properties} = state;

	return (
		<div className="sentiment">
			<div className="sn-panel-header">
				<h2 className="sn-panel-header-title">Sentiment</h2>
			</div>
			<div className="sn-panel-body">
				<snc-si-sentiment-capture taskId={properties.sysId} tableName={properties.table}></snc-si-sentiment-capture>
				<snc-si-sentiment-timeline></snc-si-sentiment-timeline>
				<snc-si-sentiment-list taskId={properties.sysId} tableName={properties.table}></snc-si-sentiment-list>
			</div>
		</div>
	);
};

createCustomElement('snc-si-sentiment-rank', {
	renderer: {type: snabbdom},
	view,
	styles,
	properties: {
		"sysId": {
			default: false
		},
		"table": {
			default: false
		}
	}
});