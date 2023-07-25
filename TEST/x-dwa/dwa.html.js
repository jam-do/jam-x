export default /*html*/ `
<h1>HELLO!</h1>
<div>${(await import('./dwa-esm.js')).default}</div>
`;