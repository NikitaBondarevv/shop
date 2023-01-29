import { IProduct } from 'interfaces/IProduct'
import { request } from './request'

export const deleteProduct = async (data: IProduct) => request.delete(`products/${data.id}`)
export const findProducts = async (title?: string) => request.post(`public/products/${title}`)
export const updateProduct = async (data: IProduct) => request.put(`products/${data.id}`, data)
