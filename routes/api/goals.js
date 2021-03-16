const express = require('express');
var router = express.Router();
var ObjectID = require('mongoose').Types.ObjectId;


const Goal = require('../../models/Goal')

router.post('/search', (req, res) => {
    Goal.find(req.body, (err, docs) => {
        if(!err) res.send(docs)
        else console.log('Error while retrieving all records: '+JSON.stringify(err, undefined, 2))
    })
})

router.post('/otherSearch', (req, res) => {
    Goal.find(req.body, (err, docs) => {
        if(!err) res.send(docs)
        else console.log('Error while retrieving all records: '+JSON.stringify(err, undefined, 2))
    })
})

router.post('/', (req, res) => {
    var newRecord = new Goal({
        goal: req.body.goal,
        isComplete: req.body.isComplete,
        isEdit: req.body.isEdit,
        createTime: req.body.createTime,
        completeTime: req.body.completeTime,
        week: req.body.week,
        userId: req.body.userId,
        userName: req.body.userName
    })
    
    newRecord.save((err, docs) => {
        if(!err) res.send(docs)
        else console.log('Error while creating new record : '+JSON.stringify(err, undefined, 2))
    })
})

router.put('/:id', (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('No record with given id: '+req.params.id)

    var updateRecord = {
        goal: req.body.goal,
        isComplete: req.body.isComplete,
        isEdit: req.body.isEdit,
        createTime: req.body.createTime,
        completeTime: req.body.completeTime,
        week: req.body.week,
        userId: req.body.userId,
        userName: req.body.userName
    }
    Goal.findByIdAndUpdate(req.params.id, {$set: updateRecord}, {new: true}, (err, docs) => {
        if(!err) res.send(docs)
        else console.log('Error while updating a record : '+JSON.stringify(err, undefined, 2))
    })
})

router.delete('/:id', (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('No record with given id: '+req.params.id)
    
    Goal.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err) res.send(docs)
        else console.log('Error while deleting a record : '+JSON.stringify(err, undefined, 2))
    })
})

module.exports = router