const express = require('express');
const router = express.Router();

// Get All Todo.
router.get('/', function(req, res) {
    try{
        res.status(200).json({
            message: "Data Loded"
        });
    } catch(err){
        res.status(500).json({
            message: "Error"
        });
    };
});

// Get One Todo.
router.get('/:id', function(req, res) {
    res.status(200).json({
        message: "Get One Todo"
    })
});

// Update Todo.
router.put('/:id', function(req, res) {
    res.status(200).json({
        message: "Update Todo"
    })
});

// Delete Todo.
router.delete('/:id', function(req, res) {
    res.status(200).json({
        message: "Delect Todo"
    })
});

// Create One Todo.
router.post('/', function(req, res) {
    res.status(200).json({
        message: "Insert One Todo"
    })
});

// Create Miltiple Todo.
router.post('/all', function(req, res) {
    res.status(200).json({
        message: "Insert Multiple Todo"
    })
});

module.exports = router;