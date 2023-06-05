import  express  from "express";
import cors from'cors';
import dotenv from 'dotenv';
import axios from "axios";
dotenv.config();

let app=express();
app.use(cors());
app.use(express.json());



console.log(`Bearer ${process.env.API_KEY}`);
app.get('/completions',async(req,res)=>{
    
    try {
       const response= await axios.post('https://api.openai.com/v1/chat/completions',{
        model:"gpt-4",
        message:[{role:"user",content:"Who are you"}],
        max_token:100,
    },{
        Authorization:`Bearer ${process.env.API_KEY}`,
       });

       console.log(response);
       return res.send(response);

    } catch (error) {
        console.log("ERROR",error)
    }
})


app.listen(7000,()=>{
    console.log('Server is running @ 7000');
});