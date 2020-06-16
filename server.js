const express = require('express')
const app = express()
const JwtUtil = require('./utils/jwt')

const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')

// 设置路由请求白名单
const routeWhiteList = ['/auth/login', '/auth/register']

// 验证 token
app.use((req, res, next) => {
    // 如果路由不在白名单中，则验证token
    if (routeWhiteList.indexOf(req.url) === -1) {
        let token = req.headers.token
        let jwt = new JwtUtil(token)
        let result = jwt.verifyToken()

        // 如果验证通过就 next, 否则返回登录信息不正确
        if (result === 'err') {
            res.send({
                status: 403,
                msg: '登录已过期，请重新登录'
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/user', userRouter)
app.use('/auth', authRouter)

app.listen(3000, () => {
    console.log('Server is rurning on port 3000') 
})