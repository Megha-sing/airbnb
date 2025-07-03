const express = require("express");
const path=require('path');
const userRouter=require("./routes/userRouter");
const {hostRouter} = require("./routes/hostRouter");
const rootDir=require("./utils/pathUtil");
const app = express();
app.set("view engine","ejs");
app.set("views","views");

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
  res.status(404).render("404");
})
const port = 3001;
app.listen(port, () => {
  console.log(`server listening on http://localhost:${port}`);
});
