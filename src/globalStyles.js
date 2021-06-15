import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`


	div {
		display: flex;
		flex-basis: auto;
		flex-direction: column;
		flex-shrink: 0;
		margin: 0;
		padding: 0;
		border: 0 solid black;
		align-items: stretch;
		box-sizing: border-box;
		min-width: 0px;
		min-height: 0px;
		position: relative;
		z-index: 0;
	}

  input:focus {
border: none 
}
	body {
		margin: 0;
		padding: 0;
	  font-family: -apple-system, BlinkMacSystemFont, Segoe UI'', Roboto, Helvetica, Arial, sans-serif;'
	}


`;

export default GlobalStyle;
