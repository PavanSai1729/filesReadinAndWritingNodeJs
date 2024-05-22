 // import http module
 const http = require("http");
 const fs = require("fs");
 
//create server 
 const server = http.createServer((req,res) => {
    
    const url = req.url;
    const method = req.method;
    

    if(url === '/'){

    // send response to the web page
    fs.readFile("message.txt", {encoding: "utf-8"}, (error,data)=>{
        if(error){
            console.log(error);
        }
        
        console.log("data from file : ", data);
        res.setHeader("Content-Type",'text/html');
        res.write('<html>');
        res.write('<head><title>Enter Message: </title></head>');
        res.write(`<body>${data}</body>`);
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    
    });

   
    }

    if(url === "/message" && method === "POST"){
        const body = [];
        req.on('data', (chunk)=>{
            body.push(chunk);
            console.log(chunk);
        });

        return req.on("end", ()=>{
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split("=")[1];
            
            fs.writeFile("message.txt", message, (error)=>{
                res.statusCode = 302;
                res.setHeader("Location", "/");
                return res.end();
           
            });

        });
    }
    // send response to the web page
    // res.setHeader("Content-Type",'text/html');
    // res.write('<html>');
    // res.write('<head><title>My first web page</title></head>');
    // res.write('<body><h1>Hello from Node.js</h1></body>');
    // res.write('</html>');
    // res.end();
 });

 //listen from port 1234
 server.listen(2020);