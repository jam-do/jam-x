export default /*css*/ `
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

loader-el {
  display: inline-block;
  height: var(--gap-max);
  width: var(--gap-max);
  border-radius: 100%;
  border: 3px solid transparent;

  animation-name: loader-segments, loader-rotation;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes loader-segments {
  0% {
    border: 3px solid transparent;
    border-bottom-color: currentColor;
    border-left-color: currentColor;
  }
  25% {
    border: 3px solid transparent;
    border-left-color: currentColor;
    border-top-color: currentColor;
  }
  50% {
    border: 3px solid transparent;
    border-top-color: currentColor;
    border-right-color: currentColor;
  }
  75% {
    border: 3px solid transparent;
    border-right-color: currentColor;
    border-bottom-color: currentColor;
  }
  100% {
    border: 3px solid transparent;
    border-bottom-color: currentColor;
    border-left-color: currentColor;
  }
}

@keyframes loader-rotation {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
`;