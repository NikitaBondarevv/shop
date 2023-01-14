import { request } from './request'

export const findCategories = async (title?: string) => request.post(`public/categories/${title}`)
