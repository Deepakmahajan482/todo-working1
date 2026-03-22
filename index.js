const express=require('express');
const app=express();
const notes=[];//this is bad -eventually we'll learn about databases
// post -create a note
app.use(express.json())
app.post("/notes",(req,res)=>{
 const note=req.body.note;
 notes.push(note);
 console.log(note);
 res.json({
  message:"Done"
 })
})

app.get("/notes",(req,res)=>{
  res.json({
    notes
  })
})

app.get("/",(req,res)=>{
  res.sendFile("D:/mern/caseStudies/express/notes-app/frontend/index.html")
})
app.listen(3000,()=>{
  console.log("server is running");

})
