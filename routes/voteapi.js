const express = require('express');
const voteInfo = require('../models/vote');
const router = express.Router();

router.get('/getvote', (req, res) => {
    voteInfo.find({})
    .then((data) => {
        res.status(200).json(data);
    })
    .catch(err => console.log(err));
});

router.get('/getvotecount/:stuid', async (req, res) => {
    await voteInfo.find({studentid: req.params.stuid})
    .then((data) => {
        res.json({ countdata: data.length, data: data})    
    })
    .catch(err => console.log(err));
});

router.get('/allcount', async(req, res) => {
    await voteInfo.find({})
    .then((data) => {

    })
})
router.post('/postvote', (req, res) => {
        const votes = {
        phoneid: req.body.phoneid,
        studentid: req.body.studentid,
        studentname: req.body.studentname,
        points:1
        }
        const voting = new voteInfo(votes);
        voting.save()
        .then((data) => {
            res.send('success');
            console.log(data);
        })
        .catch(err => console.log(err));
    
})

module.exports = router;