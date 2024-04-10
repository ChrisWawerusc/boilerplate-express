require('dotenv').config();
let bodyParser=require("body-parser");
let express = require('express');
let app = express();

app.use(bodyParser.urlencoded({extended: false}));



// //route handler with query parameters
app.route("/name")
.get((req,res)=>{
   var firstname=req.query.first;
   var lastname=req.query.last;
   res.json({name: `${firstname} ${lastname}`});
})
.post((req,res)=>{
   var firstname=req.body.first;
   var lastname=req.body.last;
   res.json({name: `${firstname} ${lastname}`});

})

// //chaining middleware within a route definition
app.get('/now', function(req,res,next){
   req.time=new Date().toString();
   next();
}, function(req,res){
   res.json({time:req.time});
});

// //route handler with route parameters
app.get("/:word/echo",(req,res)=>{
   const word=req.params.word;
   res.json({echo:word});
})

// //Logging middleware
// app.use((req,res,next)=>{
//    console.log(`${req.method} ${req.path} - ${req.ip}`);
//    next();
// })

// //basic route handler
app.get("/",(req,res)=>{
    absolutePath=__dirname+'/views/index.html';
    res.sendFile(absolutePath);
})





// //middleware
app.use('/public',express.static(__dirname + '/public'));

// //route handler
// app.get("/json",(req,res)=>{
  
//    if(process.env.MESSAGE_STYLE==="uppercase"){
//      res.json({"message":"HELLO JSON"});
//   }else{
//     res.json({"message":"Hello json"});
//  }
// });



module.exports = app;
