import {Component} from 'react'

import {v4} from 'uuid'

import ShowPassword from '../ShowPassword'

import './index.css'

class PasswordManager extends Component {
  state = {
    website: '',
    password: '',
    username: '',
    searchInput: '',
    passwordsList: [],
    checked: false,
  }

  onDeletePassword = id => {
    const {passwordsList} = this.state
    const filteredLists = passwordsList.filter(
      eachPassword => eachPassword.id !== id,
    )
    this.setState({passwordsList: filteredLists})
  }

  searchPasswords = () => {
    const {passwordsList, searchInput} = this.state
    const filteredList = passwordsList.filter(eachPassword =>
      eachPassword.website.includes(searchInput),
    )
    return filteredList
  }

  onSubmitPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const newPassword = {
      id: v4(),
      website,
      username,
      password,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      website: '',
      username: '',
      password: '',
    }))
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeChecked = () => {
    this.setState(prevState => ({checked: !prevState.checked}))
  }

  renderAllPasswords = () => {
    const {checked} = this.state
    const searchPasswordsList = this.searchPasswords()

    return (
      <ul className="password-list">
        {searchPasswordsList.map(eachPassword => (
          <ShowPassword
            key={eachPassword.id}
            passwordDetails={eachPassword}
            isChecked={checked}
            onDeletePassword={this.onDeletePassword}
          />
        ))}
      </ul>
    )
  }

  renderPasswords = () => {
    const {searchInput} = this.state
    const searchPasswordsList = this.searchPasswords()
    const res = searchPasswordsList.length === 0

    return (
      <div>
        <div className="my-passwords-container">
          <div className="container-2">
            <h1 className="no-of-passwords-heading">Your Passwords</h1>
            <p className="no-of-passwords">{searchPasswordsList.length}</p>
          </div>
          <div className="search-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              alt="search"
              className="logo"
            />
            <input
              className="input-type"
              type="search"
              placeholder="Search"
              value={searchInput}
              onChange={this.onChangeSearch}
            />
          </div>
        </div>
        <hr />
        <div className="show-passwords-container">
          <input
            type="checkbox"
            id="showCheckbox"
            onChange={this.onChangeChecked}
          />
          <label htmlFor="showCheckbox" className="check">
            Show Passwords
          </label>
        </div>
        {res && (
          <div className="no-password-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              alt="no passwords"
              className="no-password-logo"
            />
            <p className="para">No passwords</p>
          </div>
        )}
        {!res && this.renderAllPasswords()}
      </div>
    )
  }

  render() {
    const {username, password, website} = this.state
    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="password-manager-container">
          <div className="form-container">
            <form className="form-control" onSubmit={this.onSubmitPassword}>
              <h1 className="form-heading">Add New Password</h1>
              <div className="container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="logo"
                />
                <input
                  className="input-type"
                  type="text"
                  placeholder="Enter Website"
                  value={website}
                  onChange={this.onChangeWebsite}
                />
              </div>
              <div className="container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="logo"
                />
                <input
                  className="input-type"
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="logo"
                />
                <input
                  className="input-type"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>
              <button className="add-btn" type="submit">
                Add
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-logo"
          />
        </div>
        <div className="passwords-container">{this.renderPasswords()}</div>
      </div>
    )
  }
}

export default PasswordManager
