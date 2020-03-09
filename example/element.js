delete window.WebSocket;

import '../src/snc-si-sentiment-rank';
import styles from './styles.scss';

const el = document.createElement('DIV');
document.body.appendChild(el);
const st = document.createElement('style');
document.body.appendChild(st);
st.innerHTML = styles;

el.innerHTML = `<div class="component"><snc-si-sentiment-rank></snc-si-sentiment-rank></div>`;