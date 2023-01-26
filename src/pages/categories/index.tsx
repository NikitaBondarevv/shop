import { useContext, useEffect, useState } from 'react'

import { getCategories } from 'contracts/getCategories'
import { UserContext } from 'contexts/userContext'
import { Authorised } from './authorised'
import { NoAuthorised } from './noAuthorised'
import { ICategory } from 'interfaces/ICategories'

export const Categories = () => {
  const { isAuthenticated } = useContext(UserContext)
  const [categories, setCategories] = useState<ICategory[]>([])

  const getData = async () => {
    setCategories(await getCategories())
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    isAuthenticated
    ? <Authorised categories={categories} getData={getData} />
    : <NoAuthorised categories={categories} />
  )
}
