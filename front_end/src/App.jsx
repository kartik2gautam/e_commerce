import { Login } from './Forms/Login';
import { Signup } from './Forms/Signup';
import {Home} from './Home/Home';
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { ActionCategory } from './Categories/ActionCategory';
import { AdventureCategory } from './Categories/AdventureCategory';
import { FightingCategory } from './Categories/FightingCategory';
import { RacingCategory } from './Categories/RacingCategory';
import { HorrorCategory } from './Categories/HorrorCategory';
import { GamingConsoleCategory } from './Categories/GamingConsoleCategory';
import {AddProductForm} from './Forms/AddProductForm';
import { UpdateProductForm } from './Forms/UpdateProductForm';
import { SingleProductView } from './SingleProduct/SingleProductView';
import { DeleteProduct } from './Functions/DeleteProduct';
import { AuthProvider } from './AuthProvider';
import { Logout } from './Functions/Logout';
import { Cart } from './Cart/Cart';
import { UpdateProfile } from './Forms/UpdateProfile';
import { Checkout } from './Checkout/Checkout';
import { OrderHistory } from './OrderHistory/OrderHistory';
import { PrivateRoute } from './PrivateRoute';
import { AdminRouter } from './AdminRouter';
import { ChangePassword } from './Forms/ChangePassword';
import { ForgetPassword } from './Forms/ForgetPassword';
function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/signup/' element={<Signup/>}></Route>
      <Route path='/forgetpassword/' element={<ForgetPassword/>}></Route>
      <Route path='/Site' element={<PrivateRoute/>}>
        <Route path='/Site/logout/' element={<Logout/>}></Route>
        <Route path='/Site/home/' element={<AuthProvider><Home/></AuthProvider>}></Route>
        <Route path='/Site/home/cart/' element={<Cart/>}></Route>
        <Route path='/Site/home/orderhistory/' element={<OrderHistory/>}></Route>
        <Route path='/Site/home/cart/Checkout' element={<Checkout/>}></Route>
        <Route path='/Site/home/updateprofile/' element={<UpdateProfile/>}></Route>
        <Route path='/Site/home/action/' element={<ActionCategory/>}></Route>
        <Route path='/Site/home/adventure/' element={<AdventureCategory/>}></Route>
        <Route path='/Site/home/racing/' element={<RacingCategory/>}></Route>
        <Route path='/Site/home/fighting/' element={<FightingCategory/>}></Route>
        <Route path='/Site/home/horror/' element={<HorrorCategory/>}></Route>
        <Route path='/Site/home/changepassword/' element={<ChangePassword/>}></Route>
        <Route path='/Site/home/gamingconsoles/' element={<GamingConsoleCategory/>}></Route>
        <Route path='/Site/home/admin/' element={<AdminRouter/>}>
          <Route path='/Site/home/admin/addproduct/' element={<AddProductForm/>}></Route>
          <Route path="/Site/home/admin/update-product/:productId/" element={<UpdateProductForm/>}></Route>
          <Route path="/Site/home/admin/delete-product/:product_id/" element={<DeleteProduct/>}></Route>
          </Route>
        <Route path="/Site/home/single-product-view/:productId/" element={<SingleProductView/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}


export default App;