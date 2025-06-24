import './style.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import './wdyr';

const App = () => {
	return (
		<>
			<h1 className="text-8xl font-bold underline">
				Hello world!
			</h1>
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