import mongoose from 'mongoose'

import config from './config/index'
import app from './app'

async function bootstrap() {
  try {
    await mongoose.connect(config.databaseurl as string)
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
    console.log('data base successfully connected')
  } catch (error) {
    console.log('faild to run', error)
  }
}
bootstrap()
