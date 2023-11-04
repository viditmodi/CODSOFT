import React from 'react'
import { useNavigate } from 'react-router-dom'

const AuthFormContainer = (props) => {
  const navigate = useNavigate()

  const handleCloseContainer = ()=>{
    navigate(`${props.closeURL}`)
  }
  return (
    <div className='auth-container'>
      <div className="auth-container__left"></div>
      <div className="auth-container__right">
        {props.children}
      </div>

      <button className="auth-container__btn btn" onClick={handleCloseContainer}>
      <span className="material-symbols-outlined">
cancel
</span>
      </button>
    </div>
  )
}

export default AuthFormContainer
