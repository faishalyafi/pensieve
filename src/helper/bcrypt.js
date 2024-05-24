import bcrypt from 'bcryptjs';

function hash_password(password){
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

function compare(password, hash){
  return bcrypt.compareSync(password, hash)
}

export { hash_password, compare }