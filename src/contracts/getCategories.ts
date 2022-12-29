import { request } from './request'

export const getCategories = async () => request.get('shop_info')
