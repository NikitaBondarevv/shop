import { ICreateProduct } from 'interfaces/ICreateProduct'
import { IProduct } from 'interfaces/IProduct'
import { request } from './request'

export const getProducts = async () => request.get(`public/products`)
export const deleteProduct = async (id: number) => request.delete(`products/${id}`)
export const findProduct = async (title?: string) => request.post(`public/products/${title}`)
export const updateProduct = async (data: IProduct) => request.put(`products/${data.id}`, data)
export const createProduct = async (data: ICreateProduct) => request.post('products', data)
