import { useContext, useEffect, useState } from 'react'

import { IProduct } from 'interfaces/IProduct'
import { getCategories } from 'contracts/getCategories'
import { UserContext } from 'contexts/userContext'
import { Authorised } from './authorised'
import { NoAuthorised } from './noAuthorised'

export const Categories = () => {
  const { isAuthenticated } = useContext(UserContext)
  const [categories, setCategories] = useState<IProduct[]>([])

  useEffect(() => {
    const getData = async () => {
      setCategories(await getCategories())
    }

    getData()
  }, [])

  return (
    isAuthenticated
    ? <Authorised categories={categories} setCategories={setCategories} />
    : <NoAuthorised categories={categories} />
  )
}
