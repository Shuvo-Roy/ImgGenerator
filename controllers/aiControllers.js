const { response } = require("express");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const generateImage= async(req, res)=>{
    //input from user
    const {prompt, size} = req.body

    const imgSize = size==='small'? '256x256': size === 'medium'? '512x512' : '1024x1024';

    try {

        //response from open ai
        const response = await openai.createImage({
            prompt,
            n:1,
            size:imgSize
        })
        const imageUrl = response.data.data[0].url
            res.status(200).json({
                success: true,
                data:imageUrl
            })
    } catch (error) {
        //exact error message from open ai
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          } else {
            console.log(error.message);
          }
        res.status(400).json({
            success: false,
            error: 'The image not generated'
        })
    }
}

module.exports = {generateImage}