import { createCustomElement } from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import face1 from './face1.svg';
import face2 from './face2.svg';
import face3 from './face3.svg';
import face4 from './face4.svg';
import face5 from './face5.svg';

const view = (state, { updateState }) => {
	const {properties} = state;

	const faces = [face1, face2, face3, face4, face5];

	return (
		<img src={faces[properties.score - 1]}/>
	)
};

createCustomElement('snc-si-sentiment-icon', {
	renderer: { type: snabbdom },
	view,
	styles,
	properties: {
		score: {
			default: 1
		}
	}
});