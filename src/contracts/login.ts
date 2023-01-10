import { IUser } from 'interfaces/IUser'
import { request } from './request'

export const login = (email: string, password: string) => request.post('public/login', { email, password } as IUser)
