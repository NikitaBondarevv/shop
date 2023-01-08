import { IUser } from 'interfaces/IUser'

export type TUser = {
  isAuthenticated?: boolean,
  user?: IUser,
  setUser: (user?: IUser) => void
}
