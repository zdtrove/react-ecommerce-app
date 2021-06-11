import { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/HOC/PrivateRoute';
import Home from './containers/Home'
import Signin from './containers/Signin'
import Signup from './containers/Signup'
import { useDispatch, useSelector } from 'react-redux'
import { isUserLoggedIn } from './redux/actions'
import Products from './containers/Products';
import Orders from './containers/Orders';
import Category from './containers/Category';

function App() {
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isUserLoggedIn())
    }
  }, [dispatch, auth.authenticated])

  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/orders" component={Orders} />
        <PrivateRoute path="/category" component={Category} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
