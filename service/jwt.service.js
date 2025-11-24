const jwt = require('jsonwebtoken')

// Segredo fixo (apenas para estudo em aula)
const SECRET = "minha_senha_super_secreta"

// gera um token jwt por 3 horas
function generateToken(payload){
    return jwt.sign(payload, SECRET, { expiresIn: '3h'})
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