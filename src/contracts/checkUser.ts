import { request } from './request'

export const checkUser = async () => request.get('public/checkUser')
