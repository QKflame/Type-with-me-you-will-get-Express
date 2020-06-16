const express = require('express')
const router = express.Router()
const JwtUtil = require('../utils/jwt')
const sqlQuery = require('../utils/db').sqlQuery

// 登录接口
router.post('/login', async (req, res, next) => {
    const userName = req.body.userName
    const password = req.body.password

    try {
        let result = await sqlQuery(`select id,password from user where username = '${userName}'`)
        const pass = result[0].password
        if (password === pass) {
            let userId = result[0].id.toString()
            let jwt = new JwtUtil(userId)
            let token = jwt.generateToken()
            res.send({
                status: 200,
                msg: '登录成功',
                token: token
            })
        } else {
            res.send({
                status: 400,
                msg: '账号密码错误'
            })
        }
    } catch (e) {
        console.log(e)
        res.send({
            status: 500,
            msg: '账号密码错误'
        })
    }
})

module.exports = router