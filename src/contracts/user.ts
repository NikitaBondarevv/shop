import { request } from './request'
import { IUser } from 'interfaces/IUser'

export const createUser = async <T extends IUser>(data: T) => request.post('public/user', data)
export const updateUser = async <T extends IUser>(data: T) => request.put('user', data)
