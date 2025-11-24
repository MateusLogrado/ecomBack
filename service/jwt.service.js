const jwt = require('jsonwebtoken')

// Segredo fixo (apenas para estudo em aula)
const SECRET = process.env.JWT_SECRET

// gera um token jwt por 3 horas
function generateToken(payload){
    return jwt.sign(payload, SECRET, { expiresIn: process.env.JWT_EXPIRES_IN})
}

// verifica e decodifica um token jwt
function verifyToken(token){
    try{
        return jwt.verify(token, SECRET)
    }catch(err){
        console.error('Erro ao verificar o token')
        return null
    }
}

module.exports = { generateToken, verifyToken }