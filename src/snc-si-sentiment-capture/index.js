import { createCustomElement } from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import { createHttpEffect } from '@servicenow/ui-effect-http';
import styles from './styles.scss';
import icon from '../snc-si-sentiment-icon';

const view = (state, { updateState }) => {
    return (
        <div className="rank">
            <div className="icons">
                <snc-si-sentiment-icon score={1}></snc-si-sentiment-icon>
                <snc-si-sentiment-icon score={2}></snc-si-sentiment-icon>
                <snc-si-sentiment-icon score={3}></snc-si-sentiment-icon>
                <snc-si-sentiment-icon score={4}></snc-si-sentiment-icon>
                <snc-si-sentiment-icon score={5}></snc-si-sentiment-icon>
            </div>
            <div className="message">
                Please rate sentiment
            </div>
        </div>
    );
};

createCustomElement('snc-si-sentiment-capture', {
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
