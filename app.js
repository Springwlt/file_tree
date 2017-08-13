var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
var bodyParser  =  require("body-parser");
var json = require('format-json');
var extract = require('esprima-extract-comments');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('view engine', 'ejs');
app.get('/',function (req,res) {
    res.render('home');
});

app.post('/file/getContent',function (req,res) {
    var filePath = req.body.path;
    if(filePath.split('.')[1] == 'js'){
        var contentText = fs.readFileSync(filePath,'utf-8');
        var comments = extract(contentText);
        var apiString = '';
        for(var i = 0; i < comments.length;i++ ){
            apiString += "-"+ comments[i].value+ '\r\n';
        }
        res.send({data:'ok',doc:apiString});
    }else if(filePath.split('.')[1] == 'json'){
        fs.readFile(filePath, 'utf-8', function(err, doc) {
            if (err) {
                throw err;
            }
            json.plain(doc);
            res.send({data:'ok',doc:doc});
        });

    } else{
        fs.readFile(filePath, 'utf-8', function(err, doc) {
            if (err) {
                throw err;
            }
            res.send({data:'ok',doc:doc});
        });
    }
});

var server = app.listen(8000,function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});