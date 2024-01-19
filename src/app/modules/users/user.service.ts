import config from '../../../config'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateUser } from './user.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto generated id
  const id = await generateUser()

  user.id = id

  //default password
  if (!user.password) {
    user.password = config.default_user_password as string
  }
  //service part
  const CreatedUser = await User.create(user)

  if (!CreatedUser) {
    throw new Error('fialed to create user')
  }
  return CreatedUser
}

export default {
  createUser,
}
