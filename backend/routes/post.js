const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcyrpt = require('bcrypt')
const Post = require('../models/Post')
const Comment = require('../models/Comments')
const verifyToken = require('../verifyToken')

//Create
router.post("/create", verifyToken,async(req, res) => {
    try{
        const newPost = new Post(req.body)
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    }
    catch(err){
        res.status(500).json(err)
    }
})


//Update
router.put("/:id", verifyToken, async(req, res) => {
    try{
        const updatedPost = await Post.findByIdAndUpdate(req.params.id,
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(updatedPost)
    }
    catch(err){
        res.status(500)
    }
})


//Delete
router.delete("/:id", async(req, res) => {
    try{
        await Post.findByIdAndDelete({userId: req.params.id})
        await Comment.deleteMany({PostId:req.params.id})
        res.status(200).json("Post deleted")
    }
    catch(err){
        res.status(500).json(err)
    }
})


/// Get Post Details
router.get("/:id", async(req,res) => {
    try{
        const post = await Post.findByIdAnd(req.params.id)
        res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
})

/// Get Post
router.get("/", async(req,res) => {
    try{
        const searchFilter = {
            title:{$regex: express.query.search, $option:"i"}
        }
        const posts = await post.find(express.query.search? searchFilter:null)
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//Get User post
router.get("/user/:userId", async(req,res) => {
    try{
        const posts = await Post.find({userId:req.params.userId})
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports = router