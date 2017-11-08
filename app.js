var express = require("express");
var app = express();
var request = require("request");
var bodyparser = require("body-parser");
var bitcore = require("bitcore-lib");

app.use(bodyparser.urlencoded({
    extend: true
}));

app.use(bodyparser.json());

function brainWallet(uinput, callback){
    
    var input = new Buffer(uinput);
    var hash = bitcore.crypto.Hash.sha256(input);
    var bn = bitcore.crypto.BN.fromBuffer(hash);
    var pk = new bitcore.PrivateKey(bn).toWIF();
    var add = new bitcore.PrivateKey(bn).toAddress();
    callback(pk, add);
};

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/wallet", function(req, res){
    var brainsrc = req.body.brainsrc;
    console.log(brainsrc);
    brainWallet(brainsrc, function(priv, addr){
       res.send("Brain wallet of: " + brainsrc + "<br> Address: " + addr + "<br>Private Key: " + priv); 
    });
});

app.listen(40, function(){
    console.log("Check the price");
});