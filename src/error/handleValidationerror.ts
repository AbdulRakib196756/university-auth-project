import mongoose from 'mongoose'
import { IGenericErrorMessage } from '../interfaces/error'
import { IGenericResponse } from '../interfaces/common'

const handleValidationerror = (
  err: mongoose.Error.ValidationError,
): IGenericResponse => {
  const Error: IGenericErrorMessage[] = Object.values(err.errors).map(el => {
    return {
      path: el?.path,
      message: el?.message,
    }
  })
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: Error,
  }
}

export default handleValidationerror
