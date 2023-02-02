import { IProduct } from 'interfaces/IProduct'
import { request } from './request'

export const getProducts = async () => request.get(`public/products`)
export const deleteProduct = async (id: number) => request.delete(`products/${id}`)
export const findProducts = async (title?: string) => request.post(`public/products/${title}`)
export const updateProduct = async (data: IProduct) => request.put(`products/${data.id}`, data)
