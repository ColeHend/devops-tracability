const express = require('express');
const app = express()
const path = require('path')
const port = process.env.PORT || 4545
//------rollbar
// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '78decb6f54b54aeaa763dc94d462a1ae',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')
//-----------------------
app.use(express.json())
app.use(express.static(path.join(__dirname,'../public')))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'))
})

app.listen(port,()=>{
    console.log(`listening on port: ${port}`);
})