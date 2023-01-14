import { request } from './request'

export const findProducts = async (title: string) => request.post(`public/products/${title}`)
