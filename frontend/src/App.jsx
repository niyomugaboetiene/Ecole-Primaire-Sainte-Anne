import AddProduct from "./components/Products/AddProduct";
import ProductList from "./components/Products/ProductsList";
import UpdateProduct from "./components/Products/UpdateProduct";


import AddStockIn from "./components/Stock_in/AddStock_in";
import StockInList from "./components/Stock_in/StockINList";
import UpdateStockIn from "./components/Stock_in/UpdateStockIn";


import AddStockOut from "./components/Stock_out/AddStockOut";
import StockOutList from "./components/Stock_out/StockOutList";
import UpdateStockOut from "./components/Stock_out/UpdateStockOut";

import Report from "./components/Stock_out/Report";
import ReportDeatils from "./components/Stock_out/ReportDeatils";

import NavBar from "./components/dashboard/NavBar";

// auth
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Footer from "./components/dashboard/Footer";

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {

  return (
     <BrowserRouter>
     <div className="pb-34">
       <NavBar />

     </div>

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
          <Route path="/stockOut/list" element={<StockOutList /> }/>
          <Route path="/stockOut/update/:_id" element={<UpdateStockOut /> }/>

          <Route path="/report" element={<Report />} />
          <Route path="/stockIn/view/:Product_Id" element={<ReportDeatils />} />

          <Route path="/auth/login" element={<Login /> }/>
          <Route path="/auth/register" element={<Register /> }/>
          <Route path="/footer" element={<Footer /> }/>



        </Routes>
     </BrowserRouter>
  )
}

export default App
