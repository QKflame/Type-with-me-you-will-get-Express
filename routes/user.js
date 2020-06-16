const express = require('express')
const router = express.Router()
const sqlQuery = require('../utils/db').sqlQuery

router.get('/', async (req, res, next) => {
    const result = await sqlQuery('select * from user')
    res.json(result)
})

module.exports = router