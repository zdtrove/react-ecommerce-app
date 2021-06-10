import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/HOC/PrivateRoute';
import Home from './containers/Home'
import Signin from './containers/Signin'
import Signup from './containers/Signup'


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
