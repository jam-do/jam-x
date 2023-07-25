import vars from './vars.css.js';

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
column-el {
  display: block;
  max-width: 960px;
  margin-left: auto;
	margin-right: auto;
  padding: var(--gap-mid);
}
card-el {
  display: block;
  background-color: var(--clr2);
  color: var(--clr1);
  padding: var(--gap-max);
  border-radius: var(--r2);
  margin-top: var(--gap-mid);
  margin-bottom: var(--gap-mid);
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
`;