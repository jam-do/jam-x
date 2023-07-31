import { X, html, css } from '../../core/index.js';

export class AppShell extends X {

  init$ = {
    doc: 'HELLO JAM-X!'
  }

  async initCallback() {
    let dwaSrc = window.location.search.replace('?', '');
    console.log(dwaSrc);
    if (dwaSrc) {
      let mdlPath = this.getAbsolutePath(dwaSrc);
      let doc = (await import(mdlPath)).default;
      this.$.doc = doc;
    }
  }

}

AppShell.rootStyles = css`
html, body {
  padding: 0;
  margin: 0;
}
app-shell {
  display: grid;
  height: 100vh;
  grid-template-columns: auto min-content;
}
panel-ui {
  display: block;
  background-color: #000;
  color: #fff;
}
tb-block-ui {
  display: flex;
  padding: 10px;
  background-color: rgba(255, 255, 255, .2);
  border-radius: 6px;
  margin: 2px;
}
iframe {
  display: block;
  height: 100%;
  width: 100%;
  border: 0;
  outline: 2px solid #0ff;
}
`;

AppShell.template = html`
<iframe ${{srcdoc: 'doc'}}></iframe>
<panel-ui>

  <tb-block-ui>
    <button>SAVE</button>
  </tb-block-ui>
  
</panel-ui>
`;

AppShell.reg('app-shell');