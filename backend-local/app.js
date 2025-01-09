var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http')
const cors = require('cors');
var { Server: SocketServer } = require('socket.io')
const { exec } = require('child_process');
const pty = require('@cdktf/node-pty-prebuilt-multiarch');

const fs = require('node:fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Allow CORS from all origins
app.use(cors());


// Socket Io Configuration
var server = http.createServer(app)
var io = new SocketServer({
  cors: "*"
})
io.attach(server)




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});







// Code 



const shell = process.platform === 'win32' ? process.env.COMSPEC : 'bash';


var ptyProcess = pty.spawn(shell, [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: "./user",
  env: process.env
});








ptyProcess.on('data', function (data) {
  io.emit('terminal:data', data)
  // console.log(data);
});



// handle File Content Function  
async function GetFileContent(path) {
  try {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      io.emit('content', data)
    });
  } catch (err) {

  }
}




// handle File Save unction
async function SaveFileContent(path, content) {
  try {
    fs.writeFile(path, content, err => {
      console.log("new Content " + content)
      if (err) {
        console.error(err);
      } else {
        // file written successfully
        console.log("file written successfully");
        io.emit("Saved", "Saved")
      }
    });
  } catch (err) {
  }
}




io.on('connection', (socket) => {
  // console.log("socket connected", socket.id)

  socket.on('terminal:write', (data) => {
    ptyProcess.write(data)
  })



  socket.on('terminal:run', (data) => {
    ptyProcess.write(data + `\n`)

  })



  // Getting File Content
  socket.on('fileToView', (data) => {
    console.log(data)
    GetFileContent(data)
  })


  // Saving New Content In File
  socket.on('fileWrite', (data) => {
    const { path, content } = data
    // console.log(content)
    SaveFileContent(path, content)
  })

  // Creating file
  socket.on('createFile', (data) => {

    // Defining New terminal
    var NewptyProcess = pty.spawn(shell, [], {
      name: 'xterm-color',
      cols: 80,
      rows: 30,
      cwd: "./user",
      env: process.env
    });


    const { path, name } = data
    // Navigating to outermost path
    NewptyProcess.write("cd /" + `\n`)
    // Navigating to excat path
    NewptyProcess.write(`cd ${path}` + `\n`)
    // Creating file with name
    NewptyProcess.write(`touch ${name}` + `\n`)
  })


  socket.on('createFolder', (data) => {

    // Defining New terminal
    var NewptyProcess = pty.spawn(shell, [], {
      name: 'xterm-color',
      cols: 80,
      rows: 30,
      cwd: "./user",
      env: process.env
    });

    const { path, name } = data
    // Navigating to outermost path
    NewptyProcess.write("cd /" + `\n`)
    // Navigating to excat path
    NewptyProcess.write(`cd ${path}` + `\n`)
    // Creating file with name
    NewptyProcess.write(`mkdir ${name}` + `\n`)
  })


  
  socket.on('deleteItem', (data) => {

    // Defining New terminal
    var NewptyProcess = pty.spawn(shell, [], {
      name: 'xterm-color',
      cols: 80,
      rows: 30,
      cwd: "./user",
      env: process.env
    });

    const { path, name } = data
    // Navigating to outermost path
    NewptyProcess.write("cd /" + `\n`)
    // Navigating to excat path
    NewptyProcess.write(`cd ${path}` + `\n`)
    // Creating file with name
    NewptyProcess.write(`rm -rf ${name}` + `\n`)
  })


})








server.listen(5000, '0.0.0.0', () => {
  console.log('Server is running on port 5000');
});

module.exports = app;