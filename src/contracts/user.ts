import { request } from './request'
import { IUser } from 'interfaces/IUser'

export const createUser = async (data: IUser) => request.post('public/user', data)
export const updateUser = async (data: IUser) => request.put('user', data)
