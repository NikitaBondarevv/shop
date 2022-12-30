import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserForm } from 'components/userForm'
import { updateUser } from 'contracts/user'
import { IUser } from 'interfaces/IUser'
import { UserContext } from 'contexts/userContext'

export const Profile = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const submitHandler = async (data: IUser) => {
    await updateUser(data)
    
    navigate('/')
  }

  return (
    <UserForm user={user} onSubmit={submitHandler} disabledFields={['email']} />
  )
}
