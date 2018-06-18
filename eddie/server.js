const express=require('express');
const app=express();
const port=10061;
app.listen(port);
app.use(express.static(__dirname+'/public'));
