// to support babel
import "babel-core/register";
import "babel-polyfill";

import Koa from 'koa';
import historyApiFallback from 'koa-history-api-fallback';
import session from 'koa-session';
import bodyParser from 'koa-bodyparser';
import fs from 'fs';
import path from 'path';
import serve from 'koa-static';
import mount from 'koa-mount';
import router from './router'


function copyFile(source, target, cb) {
  var cbCalled = false;

  var rd = fs.createReadStream(source);
  rd.on("error", function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on("error", function(err) {
    done(err);
  });
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}


console.log(path.resolve(__dirname + '/../'));

let app = new Koa();

// app.use(serve(path.resolve(__dirname + '/../../image')));
// app.use(serve(path.resolve(__dirname + '/../../')));
// app.use(serve(path.resolve(__dirname + '/../')));
const imagepath = path.resolve(__dirname + '/../../');


// static root
app.use(mount('/', serve(__dirname + '/../')));
// app.use(route.post('/profile', upload.single('avatar')));
app.use(historyApiFallback());
let ObjectId = require('mongodb').ObjectId;


// users.find({"user_name":"admin"}).then((val)=>{
//   console.log(val);
// }).catch((err)=> {
//   console.log("fuck up");
// })
// users.insert({"user_name":"123", "password": "321"}).then(()=>{
//   console.log("success");
// }).catch((err)=>console.log(err));
var timeStamp = Math.floor(Date.now());
console.log(Intl.DateTimeFormat().year);

var currentdate = new Date();
var datetime = "Last Sync: " + currentdate.getDate() + "/"
  + (currentdate.getMonth()+1)  + "/"
  + currentdate.getFullYear() + " @ "
  + currentdate.getHours() + ":"
  + currentdate.getMinutes() + ":"
  + currentdate.getSeconds();

console.log(datetime)

// console.log(timeStamp + "timezone is " +timezone);

app.use(bodyParser());
app.keys = ['some secret hurr'];

const CONFIG = {
  key: 'login',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
};

app.use(session(CONFIG, app));
app.use(router.routes()).use(router.allowedMethods());
const ui = new Koa();
ui.use(serve(path.resolve(__dirname + '/../')));
// for image
ui.use(serve(path.resolve(__dirname + '/../../')));
ui.use(serve(path.resolve(__dirname + '/../../image')));
app.use(mount('/', ui));

app.listen(3000);




