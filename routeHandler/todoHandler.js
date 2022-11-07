const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const checkLogin = require('../middlewares/checkLogin');

const todoSchema = require('../schemas/todoSchema');
const Todo = mongoose.model("Todo", todoSchema);

// Get All Todo.
router.get('/', checkLogin, function(req, res) {
    try{
        Todo.find().exec((err, data)=>{
            if(err){
                res.status(500).json({
                    Message: "Sewrver Error"
                });
            } else{
                res.status(200).json({
                    message: "Data Loded",
                    data: data
                });
            }
        });
    } catch(err){
        res.status(500).json({
            Message: "Sewrver Error"
        });
    }
});

// Get One Todo.
router.get('/:id', async function(req, res) {
    try{
        const todoId = req.params.id;
        const data = await Todo.find({_id: req.params.id});
        res.status(200).json({
            message: "Success",
            data: data,
            todoUrl: "http://localhost:3000/todo/"+ todoId
        })
    } catch(err){
        res.status(500).json({
            Message: "Sewrver Error"
        });
    }
});

// Update Todo.
router.put('/:id', function(req, res) {
    Todo.findByIdAndUpdate(
        { _id:req.params.id},
        { $set:{ title: req.body.title, description: req.body.description, status: req.body.status }, },
        { new: true, useFindAndModify: false,}, 
        (err)=>{
            if(err){
                res.status(500).json({
                    message: "Server Side Error"
                });
                }else{
                    res.status(500).json({
                    message: "Todo Updated"
                });
            }
        }
    )
});

// Delete Todo.
router.delete('/:id', function(req, res) {
    try{
        Todo.deleteOne({_id: req.params.id}, (err)=>{
            if(err){
                res.status(500).json({
                    error: "There was a server side error!",
                  });
            } else{
                res.status(200).json({
                    message: "Todo was deleted successfully!",
                  });
            }
        });
    } catch{

    }
});

// Create One Todo.
router.post('/', function(req, res) {
    const newTodo = new Todo(req.body);

    newTodo.save((err)=>{
        if(err){
            res.status(500).json({
                message: "Todo Not Saved."
            });
        } else{
            res.status(200).json({
                message: "Todo was inserted successfully!",
              });
        }
    })
});

// Create Miltiple Todo.
router.post('/all', function(req, res) {
    try{
        Todo.insertMany(req.body, (err)=>{
            if(err){
                res.status(500).json({
                    message: "There was a server side error!"
                });
            } else{
                res.status(200).json({
                    message: "Todo were inserted successfully!",
                  });
            }
        });
    } catch{
        res.status(500).json({
            message: "There was a server side error!"
          });
    }
    
});

module.exports = router;