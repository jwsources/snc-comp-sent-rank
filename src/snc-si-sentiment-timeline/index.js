import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import timeline from './timeline.svg';

const view = (state, {updateState}) => {
	return (
		<img src={timeline}></img>
	);
};

createCustomElement('snc-si-sentiment-timeline', {
	renderer: {type: snabbdom},
	view,
	styles
});
