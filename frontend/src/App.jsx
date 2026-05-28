import AddProduct from "./components/Products/AddProduct";
import ProductList from "./components/Products/ProductsList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {

  return (
     <BrowserRouter>
        <Routes>
          <Route path="/products/AddNew" element={<AddProduct />}/>
          <Route path="/products/list" element={<ProductList />}/>
        </Routes>
     </BrowserRouter>
  )
}

export default App
