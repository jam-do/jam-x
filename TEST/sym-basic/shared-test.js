import { Symbiote, html, css } from '../../symbiote/core/Symbiote.js';

class SharedTestCom extends Symbiote {

  init$ = {
    '*data': 'INITIAL',
  }

}

SharedTestCom.template = html`
<h1>Shared data: {{*data}}</h1>
`;

SharedTestCom.reg('shared-test-com');