import { ContactsIcon } from 'components/header/svgIcons/contacts'
import { HomeIcon } from 'components/header/svgIcons/home'
import { MenuIcon } from 'components/header/svgIcons/menu'
import { ProductsIcon } from 'components/header/svgIcons/products'

export const navigation = [
  { text: 'Home', value: '', icon: HomeIcon },
  { text: 'Categories', value: 'categories', icon: MenuIcon },
  { text: 'Products', value: 'products', icon: ProductsIcon },
  { text: 'Contacts', value: 'contacts', icon: ContactsIcon }
]
