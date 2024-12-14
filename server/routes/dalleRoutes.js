import express, { response } from "express";
import * as dotenv from 'dotenv';
import leonardoai from '@api/leonardoai';
import axios from 'axios';

dotenv.config();

const apiKey = process.env.LEONARDOAI_API_KEY;
const router = express.Router();
    
router.route('/').get((req, res) => {
    res.send('Hello from Leonardoai api Musbah');
    console.log(apiKey);
});

router.post("/", async (req, res) => {
    const { prompt } = req.body;
  
      
        const generationOptions = {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            authorization: `Bearer ${apiKey}`,
          },
          data: JSON.stringify({
            alchemy: true,
            height: 768,
            modelId: "b24e16ff-06e3-43eb-8d33-4416c2d75876",
            num_images: 1,
            presetStyle: "DYNAMIC",
            prompt,
            width: 1024,
          }),
          url: "https://cloud.leonardo.ai/api/rest/v1/generations",
        };
      
        try {
          // Step 1: Generate Image
          const generationResponse = await axios(generationOptions);
          const { generationId } = generationResponse.data.sdGenerationJob;
      
          // Step 2: Polling for Image Generation Completion
          let imageResponse;
          let attempts = 0;
          const maxAttempts = 10;
      
          while (attempts < maxAttempts) {
            imageResponse = await axios.get(
              `https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`,
              {
                headers: {
                  accept: "application/json",
                  authorization: `Bearer ${apiKey}`,
                },
              }
            );
      
            const status = imageResponse.data.generations_by_pk.status;
            if (status === "COMPLETED") {
              break;
            } else {
              attempts++;
              await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for 3 seconds
            }
          }
      
          if (imageResponse.data.generations_by_pk.generated_images.length === 0) {
            return res.status(400).json({ error: "No images generated." });
          }
      
          res.status(200).json(imageResponse.data);
        } catch (error) {
          console.error("Error:", error.response ? error.response.data : error.message);
          res.status(500).send(error?.response?.data?.message || "Something went wrong");
        }
      });
      

export default router;