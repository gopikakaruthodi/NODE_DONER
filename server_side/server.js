const PORT=3000;
const http=require("http")
const fs=require("fs")
const url=require("url")
const queryString=require("querystring")
const {MongoClient,ObjectId}=require("mongodb");
const { log } = require("console");

// connect db
const client=new MongoClient("mongodb://127.0.0.1:27017/")

const app=http.createServer(async(req,res)=>{
    const path=url.parse(req.url);
    console.log(req.method);
    // create db
    const db=client.db("Donor");
    // create collection
    const collection=db.collection("donors");

    console.log(path);
    if(path.pathname=="/"){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../client-side/index.html"))

    }
    else if(path.pathname=="/add"){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../client-side/pages/addDoners.html"))

    }
    else if(path.pathname=="/js/custom.js"){
        res.writeHead(200,{"Content-Type":"text/js"});
        res.end(fs.readFileSync("../client-side/js/custom.js"))

    }
    else if(path.pathname=="/css/style.css"){
        res.writeHead(200,{"Content-Type":"text/css"});
        res.end(fs.readFileSync("../client-side/css/style.css"))

    }
    else if(path.pathname=="/css/doner.css"){
        res.writeHead(200,{"Content-Type":"text/css"});
        res.end(fs.readFileSync("../client-side/css/doner.css"))

    }
    else if(path.pathname=="/img/left-arrow.png"){
        res.writeHead(200,{"Content-Type":"text/png"});
        res.end(fs.readFileSync("../client-side/img/left-arrow.png"))

    }
    else if(path.pathname=="/intex.html"){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../client-side/index.html"))


    }


    if(req.method=="POST" && path.pathname=="/submit"){
        let body=""
        req.on("data",(chunk)=>{
            // console.log(chunk);
            body+=chunk.toString();
            console.log(body);

        })
    

        req.on("end",async()=>{
            if(body!=null){
                const formData=queryString.parse(body);
                console.log(formData);

                // insert data
                collection.insertOne(formData).then(()=>{
                    console.log("success");
                }).catch((error)=>{
                    console.log(error);
                })
            }
        });
            res.writeHead(200,{"Content-Type":"text/html"});
            res.end(fs.readFileSync("../client-side/index.html"))


    }

    // get data to database and send to frontend

    if(path.pathname=="/getdonors" && req.method=="GET"){
        const data=await collection.find().toArray();
        // console.log(data);
        const jsonData=JSON.stringify(data);
        console.log(jsonData);

        res.writeHead(200,{"Content-Type":"text/json"});
        res.end(jsonData);
    }

    // update

    if(req.method=="PUT" && path.pathname=="/update"){
        console.log("update on process");
        
        let body=""
        req.on("data",(chunk)=>{
            // console.log(chunk);
            body+=chunk.toString();
            console.log(body);

        })
        req.on("end",async()=>{
            let uData=JSON.parse(body);
            console.log(uData);
            let _id=new ObjectId(uData.id);
            console.log(_id);
            const updateData={name:uData.name,email:uData.email,phone:uData.phone,Bgroup:uData.Bgroup,gender:uData.gender};

            await collection.updateOne({_id},{$set:updateData}).then(()=>{
                res.writeHead(200,{"Content-Type":"text/plain"})
                res.end("Update")
            }).catch(()=>{
                res.writeHead(404,{"Content-Type":"text/plain"})
                res.end("Fail")

            })


        })
    }

     // delete
     if(path.pathname=="/delete" && req.method=="DELETE"){
        console.log("Delete on process");

        let  body=""
        req.on("data",(chunk)=>{
            // console.log(chunk);
            body+=chunk.toString()
            console.log(body);
           

        });

        req.on("end",async()=>{
            let _id=new ObjectId(body);
            // console.log(typeof(_id));
            collection.deleteOne({_id}).then(()=>{
                res.writeHead(200,{"Content-Type":"text/plain"});
                res.end("Success")
            }).catch((error)=>{
                res.writeHead(200,{"Content-Type":"text/plain"});
                res.end("Fail")
            })

        })


    }

    

});

client.connect().then(()=>{
    app.listen(PORT,()=>{
        console.log(`http://localhost:${PORT}`);
    });

}).catch((error)=>{
    console.log(error);
});

