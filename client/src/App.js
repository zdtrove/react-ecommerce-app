import { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/HOC/PrivateRoute';
import HomeAdmin from './containers/admin/Home'
import SigninAdmin from './containers/admin/Signin'
import SignupAdmin from './containers/admin/Signup'
import { useDispatch, useSelector } from 'react-redux'
import { getInitialData, isUserLoggedIn } from './redux/actions'
import ProductsAdmin from './containers/admin/Products';
import OrdersAdmin from './containers/admin/Orders';
import CategoryAdmin from './containers/admin/Category';
import Home from './containers/Home';
import ProductList from './containers/ProductList';

function App() {
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isUserLoggedIn())
    }
    dispatch(getInitialData())
  }, [dispatch, auth.authenticated])

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/:slug" component={ProductList} />
        <PrivateRoute exact path="/admin" component={HomeAdmin} />
        <PrivateRoute path="/admin/products" component={ProductsAdmin} />
        <PrivateRoute path="/admin/orders" component={OrdersAdmin} />
        <PrivateRoute path="/admin/category" component={CategoryAdmin} />
        <Route path="/admin/signin" component={SigninAdmin} />
        <Route path="/admin/signup" component={SignupAdmin} />
      </Switch>
    </div>
  );
}

export default App;
