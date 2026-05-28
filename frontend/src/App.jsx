import AddProduct from "./components/Products/AddProduct";
import ProductList from "./components/Products/ProductsList";
import UpdateProduct from "./components/Products/UpdateProduct";


import AddStockIn from "./components/Stock_in/AddStock_in";
import StockInList from "./components/Stock_in/StockINList";
import UpdateStockIn from "./components/Stock_in/UpdateProduct";


import AddStockOut from "./components/Stock_out/AddStockOut";
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
          <Route path="/stockIn/list" element={<StockInList />}/>
          <Route path="/stockIn/update/:_id" element={<UpdateStockIn /> }/>

          {/* stockOut */}
          <Route path="/stockOut/AddNew" element={<AddStockOut /> }/>
        </Routes>
     </BrowserRouter>
  )
}

export default App
