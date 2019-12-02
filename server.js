const express = require('express');
const path = require('path');   
const compression = require('compression')
const app = express();   

app.use(compression());
app.use(express.static(__dirname + '/dist/job-ng'));

app.get('/*', function(req,res) {  
    res.sendFile(path.join(__dirname + '/dist/job-ng/index.html'));   
});

app.listen(process.env.PORT || 8080);
