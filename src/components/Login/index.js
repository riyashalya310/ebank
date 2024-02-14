import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    errorMsg: '',
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const details = {
      user_id: userId,
      pin,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(details),
    }
    const response = await fetch(
      'https://assets.ccbp.in/frontend/react-js/ebank',
      options,
    )
    if (response.ok) {
      this.onSubmitSuccess(response.jwt_token)
    } else {
      this.onSubmitFailure(response.error_msg)
    }
  }

  render() {
    const {userId, pin, errorMsg} = this.state
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
          alt="website login"
        />
        <div>
          <h1>Welcome Back!</h1>
          <form onSubmit={this.onSubmitForm}>
            <label htmlFor="userId">User ID</label>
            <input
              type="text"
              id="userId"
              placeholder="Enter User Id"
              value={userId}
              onChange={this.onChangeUserId}
            />
            <label htmlFor="pin">PIN</label>
            <input
              type="password"
              id="pin"
              placeholder="Enter PIN"
              value={pin}
              onChange={this.onChangePin}
            />
            <button type="submit">Login</button>
            <p>{errorMsg}</p>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
