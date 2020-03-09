import { createCustomElement, actionTypes } from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import { createHttpEffect } from '@servicenow/ui-effect-http';
import nowLoader from '@servicenow/now-loader';
import nowAlert from '@servicenow/now-alert';
import styles from './styles.scss';
import icon from '../snc-si-sentiment-icon';

const { COMPONENT_BOOTSTRAPPED } = actionTypes;

const view = (state, { updateState, dispatch }) => {

    const { properties } = state;

    if (state.isLoading) {
        return (
            <div><now-loader label="Loading..."></now-loader></div>
        )
    }

    const rate = function rate (rating) {
        console.log(rating);
        dispatch('SNC_SI_SENTIMENT_CAPTURE#RATE', { rating: rating });
    }

    if (state.canCreate) {
        return (
            <div className="rank">
                <div className="icons">
                    <snc-si-sentiment-icon score={1} on-click={() => {rate(1)}}></snc-si-sentiment-icon>
                    <snc-si-sentiment-icon score={2} on-click={() => {rate(2)}}></snc-si-sentiment-icon>
                    <snc-si-sentiment-icon score={3} on-click={() => {rate(3)}}></snc-si-sentiment-icon>
                    <snc-si-sentiment-icon score={4} on-click={() => {rate(4)}}></snc-si-sentiment-icon>
                    <snc-si-sentiment-icon score={5} on-click={() => {rate(5)}}></snc-si-sentiment-icon>
                </div>
                <div className="message">
                    Rate user sentiment by selecting an emotion
                </div>
            </div>
        );
    }

    return (
        <div className="rank"><strong>Thanks for submitting a rating.</strong> You can submit ratings once an hour.</div>
    )

    
};

createCustomElement('snc-si-sentiment-capture', {
    renderer: { type: snabbdom },
    view,
    styles,
    initialState: {
        isLoading: true,
		canCreate: false
	},
    actionHandlers: {
        [COMPONENT_BOOTSTRAPPED]({ dispatch, properties: { userId } }) {
            dispatch('SNC_SI_SENTIMENT_CAPTURE#LIST_FETCHED', { userId: userId });
        },
        'SNC_SI_SENTIMENT_CAPTURE#LIST_FETCHED': createHttpEffect('/api/x_snc_snt_rnk_cmp/sentrank/canCreate/:userId', {
			method: 'GET',
			pathParams: ['userId'],
            successActionType: 'SNC_SI_SENTIMENT_CAPTURE#FETCH_SUCCEEDED',
            errorActionType: 'SNC_SI_SENTIMENT_CAPTURE#FETCH_FAILED',
            batch: false
		}),
		'SNC_SI_SENTIMENT_CAPTURE#FETCH_SUCCEEDED': ({ action, updateState }) => {
			updateState({
                canCreate: action.payload.result.canCreate,
                isLoading: false
			});
		},
        'SNC_SI_SENTIMENT_CAPTURE#FETCH_FAILED': ({ action }) => alert('User fetch failed!'),
        'SNC_SI_SENTIMENT_CAPTURE#RATE': ({ properties, updateState, dispatch, action: { payload: { rating }} }) => {
            //console.log(action);
            dispatch('SNC_SI_SENTIMENT_CAPTURE#SUBMITRATE', { requestData: {
                score: rating,
                userId: properties.userId,
                tableName: 'sn_customerservice_case',
                tableSysId: 'dd2a6d1adbe60010992da2b44496194b'
            } });
            updateState({
                canCreate: false
			});
        },
        'SNC_SI_SENTIMENT_CAPTURE#SUBMITRATE': createHttpEffect('/api/x_snc_snt_rnk_cmp/sentrank/create', {
			method: 'POST',
            dataParam: 'requestData',
            batch: false
        }),
        
    },
    properties: {
        userId: {
			default: '681ccaf9c0a8016400b98a06818d57c7'
		}
    }
});
