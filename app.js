const express = require("express");
const path=require('path');
const userRouter=require("./routes/userRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir=require("./utils/pathUtil");
const app = express();

//css
app.use(express.static(path.join(rootDir,"public")));

//request body
app.use(express.urlencoded()); 

//user-side
app.use(userRouter);

//host-side 
app.use("/host",hostRouter)

//404 error
app.use((req,res,next)=>{
 res.sendFile(path.join(rootDir,"views","404.html"));
})
const port = 3001;
app.listen(port, () => {
  console.log(`server listening on http://localhost:${port}`);
});
