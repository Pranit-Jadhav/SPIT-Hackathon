import express from "express";
import { prisma } from "./db.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

///  Routes


app.get("/",(req,res)=>{
    res.send("Hello ");
})


app.post("/signup", async (req, res) => {
  // const { username, password, name } = req.body;
//   const { success, data } = createUserScheme.safeParse(req.body);
//   if (!success) {
//     res.json({
//       message: "fOllow proper schema",
//     });
//     return;
//   }
  const {name,email,password,roleId} = req.body;
    const passwordHash = password;
  try {
    await prisma.user.create({
      data: {
       name,email,passwordHash,roleId
        
      },
    });


    res.json({ message: "signed up successful!" });

  } catch (error) {
    console.log(error);
    res.json("Username already exists");
  }
});


// app.get("/users", async (req, res) => {
//   const users = await prismaClient.user.findMany();
//   res.json(users);
// });




app.listen(PORT,()=>{
    console.log(`server running on the port ${PORT}`);
})
