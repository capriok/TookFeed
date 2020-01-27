import React, { useState } from 'react'
import passpeek from '../img/passpeek.png'
import passhide from '../img/passhide.png'
import { useStateValue } from '../../state'
import axios from 'axios'
import '../stylesheets//profile.css'

export default function Profile() {
  const [{ auth }, dispatch] = useStateValue()
  const [descInputOpen, setDescInputOpen] = useState(false)
  const [editUsernameOpen, setEditUsernameOpen] = useState(false)
  const [peek, setPeek] = useState(false)
  const [description, setDescription] = useState('')
  const [edit, setEdit] = useState('')
  const dig = JSON.parse(localStorage.getItem('TF-user'))
  const seed = dig.seed
  const url = `https://avatars.dicebear.com/v2/jdenticon/${seed}.svg`
  const username = dig.username
  const password = dig.password
  const id = dig._id
  const getDesc = localStorage.getItem(`${id}description`)

  const toggleDescInput = () => setDescInputOpen(!descInputOpen)
  const toggleEditUsername = () => setEditUsernameOpen(!editUsernameOpen)
  const killSubmit = e => e.preventDefault()
  const editDesc = () => toggleDescInput()
  const changeUsername = () => toggleEditUsername()

  const confirmDescEdit = () => {
    localStorage.setItem(`${id}description`, description)
    toggleDescInput()
  }

  const togglePeek = () => {
    let p = document.getElementById('pass')
    if (p.type === 'password') {
      setPeek(true)
      p.type = 'text'
    } else {
      setPeek(false)
      p.type = 'password'
    }
  }

  const EditUsernameButton = () =>
    !editUsernameOpen ? (
      <div className='change' onClick={changeUsername}>
        Change Username
      </div>
    ) : (
      <>
        {' '}
        <div className='change' onClick={toggleEditUsername}>
          Cancel
        </div>
        <div className='change left' onClick={confirmUsernameEdit}>
          Confirm
        </div>
      </>
    )

  const confirmUsernameEdit = async () => {
    if (
      window.confirm('Are you sure you want to change your username?') === true
    ) {
      axios
        .post('http://localhost:5000/users/update', { id: id, username: edit })
        .then(res => {
          console.log(res)
        })
        .catch(err => console.log(err))
      // window.location.href = '/'
      // localStorage.removeItem('token')
      // localStorage.removeItem('user')
      //    .catch(error => console.log(error))
      // dispatch({
      //    type: 'logout'
      // })
    }
    toggleEditUsername()
  }

  const deleteAccount = () => {
    const pop = window.prompt(
      'To delete your account, enter the username below. \n THIS CANNOT BE UNDONE'
    )

    if (pop === username) {
      axios.post('http://localhost:5000/users/delete', { id: id })
      window.location.href = '/'
      localStorage.removeItem('token')
      localStorage.removeItem('user').catch(error => console.log(error))
      dispatch({
        type: 'logout'
      })
    } else {
      window.alert('Invalid confirmation')
    }
  }

  return (
    <div className='card'>
      <div className='avatar'>
        <img className='ava' src={url} alt=''></img>
        <h3>{auth.user.username}</h3>
        {!descInputOpen && (
          <>
            <div className='descriptionbtn' onClick={editDesc}>
              Edit description
            </div>
            <li className='desc'>{getDesc || 'type a status'}</li>
          </>
        )}
        {descInputOpen && (
          <>
            <div className='descriptionbtn' onClick={toggleDescInput}>
              Cancel
            </div>
            <div className='descriptionbtn left' onClick={confirmDescEdit}>
              Confirm
            </div>

            <textarea
              onChange={e => setDescription(e.target.value)}
              type='text'
              className='descriptioninput'
              placeholder='Something about yourself'
              rows='4'
              maxLength='120'></textarea>
          </>
        )}
      </div>
      <div className='midspace'></div>
      <div className='overview'>
        <h3>Overview</h3>
        <li>Date joined: {dig.joined}</li>
        <li>Logged in since: {localStorage.getItem('TF-lastLogin')}</li>
      </div>
      <div className='longspace'></div>
      <div className='settings'>
        <h3>Account Settings</h3>
        <li className='huser'>Username</li>
        {!editUsernameOpen && (
          <input
            id='username'
            type='text'
            className='settingsinput'
            value={auth.user.username}
            autoComplete='off'
            disabled
          />
        )}
        {editUsernameOpen && (
          <form onSubmit={killSubmit}>
            <input
              id='username'
              type='text'
              className='settingsinput'
              onChange={e => setEdit(e.target.value)}
              value={edit}
              autoFocus={true}
              autoComplete='off'
            />
          </form>
        )}
        <div className='halfwrap'>
          <li>
            <EditUsernameButton />
          </li>
        </div>
        <li className='hpass'>Password</li>
        <input
          id='pass'
          className='settingsinput'
          type='password'
          value={password}
          autoComplete='off'
          disabled
        />

        <img
          src={peek ? passpeek : passhide}
          className='peek'
          onClick={togglePeek}
          alt=''></img>
        <li className='deletebtn' onClick={deleteAccount}>
          Delete Account
        </li>
      </div>
    </div>
  )
}
