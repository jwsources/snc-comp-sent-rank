import { createCustomElement, actionTypes } from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import { createHttpEffect } from '@servicenow/ui-effect-http';
import { createAmbSubscriptionEffect } from '@servicenow/ui-effect-amb';
import nowLoader from '@servicenow/now-loader';
import styles from './styles.scss';

const { COMPONENT_BOOTSTRAPPED } = actionTypes;
const RECORD_WATCHER_UPDATED = 'RECORD_WATCHER_UPDATED';
const RW_ACTIONS = {
	SUBSCRIPTION_STARTED: 'SUBSCRIPTION_STARTED',
	SUBSCRIPTION_SUCCEEDED: 'SUBSCRIPTION_SUCCEEDED',
	SUBSCRIPTION_FAILED: 'SUBSCRIPTION_FAILED',
	MESSAGE_RECEIVED: 'MESSAGE_RECEIVED',
	SUBSCRIPTION_UNSUBSCRIBED: 'SUBSCRIPTION_UNSUBSCRIBED'
}



const view = (state, { updateState }) => {

	const { properties } = state;

	if (!state.items) {
		return (
			<div><now-loader label="Loading list..."></now-loader></div>
		)
	} else {
		``
		return (
			<div className="sentiment-list">
				<table>
					<thead>
						<td>Date</td>
						<td>Agent</td>
						<td>Score</td>
					</thead>
					{state.items.map((item) => {
						return (
							<tr>
								<td>{item.date}</td>
								<td>{item.agent}</td>
								<td>{item.score}</td>
							</tr>
						)
					})}
				</table>
			</div>
		)
	}
};

createCustomElement('snc-si-sentiment-list', {
	renderer: { type: snabbdom },
	view,
	styles,
	initialState: {
		items: false
	},

	actionHandlers: {
		[COMPONENT_BOOTSTRAPPED]({ dispatch, properties: { userId } }) {
			dispatch('LIST_FETCHED', { userId: userId });
			const filter = btoa(`source_id=${userId}^source_table=sys_user^instance.state=complete`).replace(/=/g, '-');
			dispatch('RECORD_WATCHED', { filter: filter });
		},
		'LIST_FETCHED': createHttpEffect('/api/x_snc_snt_rnk_cmp/sentrank/list/:userId', {
			method: 'GET',
			pathParams: ['userId'],
			successActionType: 'FETCH_SUCCEEDED',
			batch: false
		}),
		'RECORD_WATCHED': createAmbSubscriptionEffect('/rw/default/asmt_assessment_instance_question/:filter', {
			subscribeStartedActionType: 'SUB_STARTED',
			subscribeSucceededActionType: RW_ACTIONS.SUBSCRIPTION_SUCCEEDED,
			subscribeFailedActionType: RW_ACTIONS.SUBSCRIPTION_FAILED,
			messageReceivedActionType: RW_ACTIONS.MESSAGE_RECEIVED,
			unsubscribeSucceededActionType: RW_ACTIONS.SUBSCRIPTION_UNSUBSCRIBED
		}),
		'SUB_STARTED': () => {
			console.log('sub started');
		},
		'FETCH_SUCCEEDED': ({ action, updateState }) => {
			updateState({
				items: action.payload.result
			});
		},
		'FETCH_FAILED': ({ action }) => alert('User fetch failed!'),
		
        [RW_ACTIONS.SUBSCRIPTION_SUCCEEDED]: () => {
			console.log('sub started');
		},
        [RW_ACTIONS.SUBSCRIPTION_FAILED]: () => {
			console.log('sub started');
		},
        [RW_ACTIONS.MESSAGE_RECEIVED]: () => {
			console.log('sub started');
		},
        [RW_ACTIONS.SUBSCRIPTION_UNSUBSCRIBED]: () => {
			console.log('sub started');
		}
	},
	properties: {
		userId: {
			default: '681ccaf9c0a8016400b98a06818d57c7'
		}
	}
});