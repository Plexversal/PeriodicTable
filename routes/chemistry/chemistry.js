const express = require('express');
let router = express.Router()
const queryString = require('querystring');
const tableData = require('../../periodic-table-data.json')

router.route('/periodictable')
    .get((req, res) => {
        res.render('periodicTable.ejs')
    })

router.route('/periodictable/data')
.get((req, res) => {
    res.header('content-type', 'application/json')
    res.json(tableData)
})

module.exports = router