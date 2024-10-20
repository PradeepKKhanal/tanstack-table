import { BrowserRouter } from "react-router-dom";

import ProductTable from "./pages/ProductTable";

function App() {
	return (
		<>
			<BrowserRouter>
				<ProductTable/>
			</BrowserRouter>
		</>
	);
}

export default App;
