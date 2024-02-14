import Cookies from 'js-cookie'
import {Redirect, Route} from 'react-router-dom'

const ProtectedRoute = props => {
  const jwtToken = Cookies.get('jwt-token')
  if (jwtToken === undefined) {
    return <Redirect to="/ebank/login" />
  }
  return <Route {...props} />
}
export default ProtectedRoute
