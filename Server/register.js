const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var mongoose = require('mongoose');
// default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/sapna_nodepractical';
mongoose.connect(mongoDB, { useUnifiedTopology: true,useNewUrlParser: true });
//Get the default connection
var db = mongoose.connection;
var users = require('./model/registermodel');
var hobbies = require('./model/hobbies');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App listening on port ' + port));
// register user
app.post('/register',async function(req,res){
  const data = await users.create(req.body);
  res.send(data);
});
// login user
app.get('/login',function(req,res){
  users.find({ $or:[ {'email':req.query.email}, {'username':req.query.email}] , password : req.query.password },function(err,result){
    if(err){
      res.send(err);
    }
    else{
      res.send(result);
    }
  });
});
//get users registered in system
app.get('/userlist',async function(req,res){
  const data = await users.find({});
  res.send(data);
});
// get current user friend list
app.get('/friendlist',async function(req,res){
  const data = await users.find({_id : req.query.id});
  res.send(data);
});
// update friend list when user accept request
app.post('/updateFriendList',async function(req,res){
  const resdata = await users.update({_id : req.body.data._id },{ $set : {friends : req.body.data.friends , pendingrequests : req.body.data.pendingrequests }});
  const updsateddata = await users.update({_id : req.body.id },{ $push : { friends : req.body.data._id }});
  res.send(resdata);
});
// send request to add friend
app.post('/sendrequest',async function(req,res){
  const updateddata = await users.update({_id : req.body.requestid },{ $push : { pendingrequests : req.body.id }});
  res.send(updateddata);
});
// update list when user decline friend request
app.post('/updatependingRequestList',async function(req,res){
  const resdata = await users.update({_id : req.body.data._id },{ $set : {pendingrequests : req.body.data.pendingrequests}});
  res.send(resdata);
});
// list hobbies 
app.get('/hobbies',async function(req,res){
  var data = await hobbies.find({});
  res.send(data);
});
