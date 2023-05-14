import dotenv from 'dotenv';
dotenv.config();
 
function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  db: {
    host: required('DB_HOST'),
  }
}

export const googleConfig = {
  user: required('USERNAME'),
  pass: required('PASSWORD')
}
