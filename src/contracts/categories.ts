import { ICategory } from 'interfaces/ICategories'
import { request } from './request'

export const findCategories = async (title?: string) => request.post(`public/categories/${title}`)
export const getCategories = async () => request.get('public/categories')
export const updateCategory = async (data: ICategory) => request.put(`categories/${data.id}`, data)
