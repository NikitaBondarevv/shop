import { request } from './request'

export const getCategories = async () => request.get('public/categories')
