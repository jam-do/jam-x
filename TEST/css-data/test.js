import Symbiote, { html, css } from '../../symbiote/core/Symbiote.js';

class TestApp extends Symbiote {}

let colorProcessor = (cssTxt) => {
  return cssTxt.replace('#f00', '#00f');
}

css.useProcessor(colorProcessor);
TestApp.rootStyles = css`
:root {
  --header: 'CSS Data';
  --text: 'Hello!';
}
test-app {
  color: #f00;
}
`;

TestApp.template = html`
<h1>{{--header}}</h1>
<div>{{--text}}</div>
<div>{{--none}}</div>
`;

TestApp.reg('test-app');