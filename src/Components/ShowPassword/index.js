import './index.css'

const bgClassNames = ['yellow-bg', 'green-bg', 'orange-bg', 'blue-bg', 'red-bg']

const ShowPassword = props => {
  const {passwordDetails, isChecked, onDeletePassword} = props
  const {id, website, password, username} = passwordDetails
  const letter = website[0].toUpperCase()
  const num = Math.floor(Math.random() * 4)
  const bgColor = bgClassNames[num]

  const deletePassword = () => {
    onDeletePassword(id)
  }

  return (
    <li className="password-item">
      <p className={`char ${bgColor}`}>{letter}</p>
      <div className="password-container">
        <p className="website-para">{website}</p>
        <p className="website-para">{username}</p>
        {isChecked && <p className="website-para">{password}</p>}
        {!isChecked && (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars"
          />
        )}
      </div>
      <button
        className="delete-btn"
        type="button"
        testid="delete"
        onClick={deletePassword}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-logo"
        />
      </button>
    </li>
  )
}

export default ShowPassword
