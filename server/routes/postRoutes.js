 
import express from "express";
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_APIKEY,
  api_secret: process.env.CLOUDINARY_CLOUD_APISECRET,
});

// GET ROUTE
router.route("/").get(async(req, res) => {

  
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message }); 
  }
});

// POST ROUTE
router.route('/').post(async (req, res) => {

  try {

      const { name, prompt, photo } = req.body;

      if (!name || typeof name !== 'string') throw new Error("Invalid or missing 'name'");
      if (!prompt || typeof prompt !== 'string') throw new Error("Invalid or missing 'prompt'");
      if (!photo || typeof photo !== 'string') throw new Error("Invalid or missing 'photo'");


      const photoUrl = await cloudinary.uploader.upload(photo);

      const newPost = await Post.create({
          name,
          prompt,
          photo: photoUrl.url,
      });

      res.status(201).json({ success: true, data: newPost });
  } catch (err) {
      console.error("Error in POST route:", err.message);
      res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

