const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

// 创建 token 类
class Jwt {
    constructor(data) {
        this.data = data
    }

    // 生成 token
    generateToken() {
        let data = this.data
        let created = Math.floor(Date.now() / 1000)
        let cert = fs.readFileSync(path.join(__dirname, '../pem/rsa_private_key.pem'))
        let token = jwt.sign({
            data,
            exp: created + 60 * 30
        }, cert, {
            algorithm: 'RS256'
        })
        return token
    }

    // 校验 token
    verifyToken() {
        let token = this.data
        let cert = fs.readFileSync(path.join(__dirname, '../pem/rsa_public_key.pem'))
        let res = null
        try {
            let reslt = jwt.verify(token, cert, {
                algorithms: ['RS256']
            }) || {}
            let { exp = 0 } = reslt
            let current = Math.floor(Date.now() / 1000)
        } catch (e) {
            res = 'err'
        }
        return res
    }
}

module.exports = Jwt