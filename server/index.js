import express from "express";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

///  Routes
app.get("/",(req,res)=>{
    res.send("Hello ");
})



app.listen(PORT,()=>{
    console.log(`server running on the port ${PORT}`);
})
