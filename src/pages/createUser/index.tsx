import { UserForm } from 'components/userForm'
import { createUser } from 'contracts/user'
import { IUser } from 'interfaces/IUser'

export const CreateUser = () => {

  const submitHandler = async (data: IUser) => {
    await createUser(data)
  }

  return (
    <UserForm onSubmit={submitHandler} />
  )
}
