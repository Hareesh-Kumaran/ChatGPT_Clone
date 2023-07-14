import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
dotenv.config({ path: "./env/.env" });

let app = express();
app.use(cors());
app.use(express.json());

console.log('Key',process.env.API_KEY);

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/api", async (req, res) => {
  console.log("server-in")
  try {
    const userQuery=req.body.userQuery;

 const response = await openai.createChatCompletion({
   model: "gpt-3.5-turbo",
   messages: [{ role: "user", content:userQuery }],
   max_tokens:150
 });

    // console.log(response.data);
    res.send({"data":response.data.choices[0].message});

  } catch (error) {
    console.log("ERR", error);
  }
});


app.get('/api',(req,res)=>{
  res.send({"message":"Working"});
})

app.listen(7000, () => {
  console.log("Server is running @ 7000");
});


export default app;