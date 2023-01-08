import { IUser } from 'interfaces/IUser'

export type TUserForm = {
  disabledFields: string[]
  user: IUser
  onSubmit: (user: IUser) => Promise<void>
}

export type TTarget = {
  target: {
    value: string
    name: string
  }
}

export type TField = {
  label: string
  reg: RegExp
  secure?: boolean
}

type TRegisterField = Record<string, string>

export type TRegisterFields = Record<string, TRegisterField>
