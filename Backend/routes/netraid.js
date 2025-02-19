
const express = require('express');
const axios = require('axios');
const  StudentDetail=require('../models/studentDetails');
const { message } = require('statuses');
const router = express.Router();
require('dotenv').config();

router.post('/def-token', async (req, res) => {
    const {id}=req.body;
    console.log(req.body);
    const student=await StudentDetail.findOne({ _id: id});

    let superhost = JSON.parse(process.env.superhost);
        if (superhost.hasOwnProperty(student.firstname)) {
            student.phone=superhost[student.firstname];
        } 

    try {
        console.log(student.phone+" "+student.lastname);
        const response = await axios.post('http://apps.teleuniv.in/api/auth/netralogin.php?college=KMIT', {
            mobilenumber: student.phone,
            password: student.lastname
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // try {
            
        //     const student = await StudentDetail.findOne({ phone: mobileNumber });
        //     // console.log(student);
        //     if (student) {
        //         if(student.lastname!=="Kmit123$"){
        //             student.lastname = "Kmit123$";
        //         await student.save();
        //         }
        //     }
        //   } catch (dbError) {
        //     console.error('Error fetching profile views from external database:', dbError);
        //     return res.status(500).json({ error: 'Error fetching profile views from database' });
        //   }
        // if(response.data.success==0){
        //     return res.status(400).json({ message:"passsword is changed" });
        // }
        // console.log(response.data)
        return res.json(response.data);
        
    } catch (error) {
        console.error('Error fetching token  with Default Password:', error);
        res.status(500).json({ error: 'Failed to fetch token from Netra API with Default Password' });
    }
});

router.post('/get-token', async (req, res) => {
    const { id, password } = req.body;
    const student=await StudentDetail.findOne({ _id: id});
    let host=false;
    let superhost = JSON.parse(process.env.superhost);
        if (superhost.hasOwnProperty(student.firstname)) {
            student.phone=superhost[student.firstname];
            student.hallticketno="32BDHOST";
            host=true;
        }
    try {
     
        const response = await axios.post('http://apps.teleuniv.in/api/auth/netralogin.php?college=KMIT', {
            mobilenumber: student.phone,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        try {
            if (response.data.success===1) {
                student.lastname = password;
                console.log("hellobaby");
                if(host){
                    student.phone=" ";
                }
                await student.save();
            }
          } catch (dbError) {
            console.error('Error fetching profile views from external database:', dbError);
            return res.status(500).json({ error: 'Error fetching profile views from database' });
          }

        // console.log(response.data);
        res.json(response.data);
        
    } catch (error) {
        console.error('Error fetching token:', error);
        res.status(500).json({ error: 'Failed to fetch token from Netra API' });
    }
});

module.exports = router;