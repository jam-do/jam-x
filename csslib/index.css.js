import vars from './vars.css.js';
import elements from './elements.css.js';

export default /*css*/ `
${vars}
html, body {
  padding: 0;
  margin: 0;
  background-color: var(--clr1);
  color: var(--clr2);
  font-family: sans-serif;
}
a {
  color: currentColor;
}
p {
  display: block;
  padding-top: var(--gap-max);
  padding-bottom: var(--gap-max);
  margin: 0;
}
blockquote {
  display: block;
  margin: 0;
  padding-left: var(--gap-max);
  border-left: 2px solid currentColor;
  box-sizing: border-box;
}
[style-red] {
  --clr1: #fff;
  --clr2: #e05353;
}
[style-green] {
  --clr1: #fff;
  --clr2: #29c729;
}
[style-blue] {
  --clr1: #fff;
  --clr2: #5a5aee;
}
[style-grey] {
  --clr1: #fff;
  --clr2: #212121;
}

${elements}
`;