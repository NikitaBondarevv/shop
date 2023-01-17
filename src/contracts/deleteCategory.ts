import { request } from './request'

export const deleteCategory = async (id: number) => request.delete(`categories/${id}`)
