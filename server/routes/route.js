// Import express
const e = require('express')
const express = require('express')
const knex = require('../db.js')

// Create router
const router = express.Router()
    router.post('/login',  (req, res) => {
        if(req.body.email != '' && req.body.password !=''){
            knex
                .select('*') 
                .from('User')
                .where('email', req.body.email)
                .andWhere('password', req.body.password) 
                .then(userData => {
                    if(userData.length == 0){
                        res.json({ status:"Invalid Email/Password"})
                    }else{
                        res.json(userData)
                    }
                })
                .catch(err => {
                    // Send a error message in response
                    res.json({ status:"Invalid Email/Password"})
                })
        }else{
            return({status:'Empty Email/Password'})
        }
    })

    router.post('/register', (req, res) => {
        knex('User').insert({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                type:req.body.type
            })
            .then (function(result){
                res.json({success:true, message:"User created"})
            })
            .catch(err => {
            // Send a error message in response
                res.json({ message: `There was an error creating account: ${err}` })
            })
    })

// Export router
module.exports = router