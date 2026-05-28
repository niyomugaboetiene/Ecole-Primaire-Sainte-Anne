import AddProduct from "./components/Products/AddProduct";
import ProductList from "./components/Products/ProductsList";
import UpdateProduct from "./components/Products/UpdateProduct";
import AddStockIn from "./components/Stock_in/AddStock_in";

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {

  return (
     <BrowserRouter>
        <Routes>
          <Route path="/products/AddNew" element={<AddProduct />}/>
          <Route path="/products/list" element={<ProductList />}/>
          <Route path="/products/update/:_id" element={<UpdateProduct /> }/>

          {/* stockIn */}
          <Route path="/stockIn/AddNew" element={<AddStockIn />}/>
        </Routes>
     </BrowserRouter>
  )
}

export default App
