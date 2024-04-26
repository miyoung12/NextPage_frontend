// import { Route } from 'react-router-dom'
// import Scenario from './scenario/page'
// // import { Switch } from 'react-router-dom'

// const App = () => {
//   return (
//     // <Switch>
//     <Route path="/scenario/:rootId" Component={Scenario}></Route>
//     // </Switch>
//   )
// }

import { BrowserRouter as Router } from 'react-router-dom'
import Scenario from './scenario/page'
function App() {
  return (
    <Router>
      <Scenario />
    </Router>
  )
}
