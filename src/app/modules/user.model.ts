import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import {
  TUser,
  TFullName,
  TAddress,
  TOrders,
  UserInterfaceModel,
} from './user.interface'
import config from '../config'

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
})

const TAddress = new Schema<TAddress>({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
})

const TOrders = new Schema<TOrders>({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
})

const UserSchema = new Schema<TUser, UserInterfaceModel>({
  userId: { type: Number, required: [true, 'Invalid User Id'], unique: true },
  username: {
    type: String,
    required: [true, 'Username taken Already! Try Another'],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  fullName: {
    type: fullNameSchema,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Invalid email address'],
    unique: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  hobbies: {
    type: [String],
    required: true,
  },
  address: {
    type: TAddress,
    required: true,
  },
  orders: {
    type: [TOrders],
  },
})

// create custom static method

UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  )
  next()
})

UserSchema.pre('findOneAndUpdate', async function (next) {
  // get updated data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateData: any = this.getUpdate()

  // hash password
  updateData.$set.password = await bcrypt.hash(
    updateData.$set.password,
    Number(config.bcrypt_salt_round),
  )
  next()
})

UserSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

UserSchema.pre('find', function (next) {
  this.find().select({ password: 0, orders: 0, __v: 0, _id: 0 })
  next()
})

UserSchema.pre('findOne', function (next) {
  this.find().select({ password: 0, __v: 0, _id: 0 })
  next()
})

UserSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await UserModel.findOne({ userId })
  return existingUser
}

export const UserModel = model<TUser, UserInterfaceModel>('User', UserSchema)
