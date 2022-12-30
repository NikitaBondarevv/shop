import { request } from './request'

export const logout = async () => request.get('logout')
