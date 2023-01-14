import { request } from './request'

export const getGeneralInfo = async () => request.get('shop_info')
