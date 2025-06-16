import { createRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
// import './wdyr';
import './index.css';
const App = () => {
	return (
		<>
			<h1>1111</h1>
		</>
	);
};
const container = document.getElementById('app');
if(!container) {
	throw new Error('Failed to find the root element');
}
const root = createRoot(container);

root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
)