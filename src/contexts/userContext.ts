import { createContext } from 'react'
import { TUser } from './types'

export const UserContext = createContext<TUser>({
  setUser: _ => _
})
