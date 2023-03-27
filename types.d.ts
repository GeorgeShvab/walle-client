export type Font = 'Rubik' | 'Roboto Slab' | 'Roboto'
export type Mode = 'light' | 'dark'

export interface Hehe {
  font: string
}

export interface User {
  id: string
  email: string
  registeredWithGoogle: boolean
  activated: boolean
  mode: Mode
  color: sring
  font: Font
}

export interface RegistrationArgs {
  password: string
  email: string
  name: string
}

export interface LoginArgs {
  password: string
  email: string
}

export interface PasswordUpdationArgs {
  password: string
  oldPassword: string
}

export interface FailedResponse<T> {
  status: number
  data: T
}

export interface ValidationError {
  errors: {
    email?: string
    password?: string
    name?: string
  }
}

export interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
}

export type Page = 'home' | 'documents' | 'login' | 'registration'

export type DocumentType = 'json' | 'txt' | 'xml'

export interface Document {
  id: string
  title: string
  text: string
  type: DocumentType
  owner: ObjectId
  access: AccessLevel
  createdAt: string
  updatedAt: string
}

export type SettingsSection = 'account' | 'interface'

export interface SettingsRequestBody {
  mode?: Mode
  color?: string
  font?: Font
}

export interface DialogPropsType extends Document {
  open: boolean
  onClose: () => void
}

export type AccessType = 'private' | 'restricted' | 'public'

interface DocumentUpdationRequestBody {
  access?: AccessType
  title?: string
  text?: string
  type?: string
  id: string
}
