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

    router.post('/username',  (req, res) => {
        knex
            .select('*') 
            .from('User')
            .where('username', req.body.username)
            .then(userData => {
                if(userData.length == 0){
                    res.json({status:"Username Available"})
                }else{
                    res.json({status:"Username Taken"})
                }
                
            })
            .catch(err => {
                // Send a error message in response
                res.json({status:"Error"})
            })
    })

    router.post('/email',  (req, res) => {
        knex
            .select('*') 
            .from('User')
            .where('email', req.body.email)
            .then(userData => {
                if(userData.length == 0){
                    res.json({status:"Email Available"})
                }else{
                    res.json({status:"Email Used"})
                }
                
            })
            .catch(err => {
                // Send a error message in response
                res.json({status:"Error"})
            })
    })

// Export router
module.exports = router