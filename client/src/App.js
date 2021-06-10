import { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/HOC/PrivateRoute';
import Home from './containers/Home'
import Signin from './containers/Signin'
import Signup from './containers/Signup'
import { useDispatch, useSelector } from 'react-redux'
import { isUserLoggedIn } from './redux/actions'

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
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
