import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

//join current directory and .env

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  databaseurl: process.env.DATABASE_URL,
  default_student_password: process.env.DEFAULT_STUDENT_PASS,
};
