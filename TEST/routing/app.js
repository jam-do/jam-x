import Symbiote, { html, AppRouter } from '../../symbiote/core/index.js';

AppRouter.initRoutingCtx('R', {
  home: {
    default: true,
    title: 'Homepage',
  },
  section: {
    title: 'Section',
  },
  error: {
    title: 'Error',
    error: true,
  },
  some: {
    
  }
});

class TestApp extends Symbiote {
  initCallback() {
    this.sub('R/route', (route) => {
      console.log(route);
      console.log(this.$['R/options']);
    });
  }
}

TestApp.template = html`
<h1>{{R/title}}</h1>
`;

TestApp.reg('test-app');

window.setInterval(() => {
  AppRouter.applyRoute('section', {
    title: 'SECTION ' + Math.round(Math.random() * 10),
    time: Date.now(),
  });
}, 3000);