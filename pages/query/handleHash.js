const crypto = require('crypto')
const MD5 = require('crypto-js/MD5')
const { promisify } = require('util')
const pbkdf2 = promisify(crypto.pbkdf2)

function createHashPassword(saltlength, iterations, keylength, digest) {
  return async function hashPassword(password) {
    const salt = crypto.randomBytes(saltlength).toString('base64')
    const hashBuffer = await pbkdf2(
      password,
      salt,
      iterations,
      keylength,
      digest
    )
    const hash = hashBuffer.toString('hex')
    const secret = 'nextnft'
    const finalHash = MD5(hash, secret).toString()

    return { finalHash, hash, salt, iterations, keylength, digest }
  }
}

async function isPasswordCorrect(hashPassword, input) {
  const hashBuffer = await pbkdf2(
    input,
    hashPassword.salt,
    hashPassword.iterations,
    hashPassword.keylength,
    hashPassword.digest
  )
  const hashedInput = hashBuffer.toString('hex')
  const secret = 'nextnft'
  const finalHashedInput = MD5(hashedInput, secret).toString()
  return hashPassword.finalHash == finalHashedInput
}

module.exports = { createHashPassword, isPasswordCorrect }
