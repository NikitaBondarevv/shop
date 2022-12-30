import { request } from './request'
import { IData } from 'interfaces/IData'

export const createUser = async (data: IData) => request.post('public/user', data)
export const updateUser = async (data: IData) => request.put('user', data)
