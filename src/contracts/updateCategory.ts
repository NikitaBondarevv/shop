import { ICategory } from 'interfaces/ICategories'
import { request } from './request'

export const updateCategory = async (data: ICategory) => request.put(`categories/${data.id}`, data)
