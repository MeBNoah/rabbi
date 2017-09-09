#!/usr/bin/env node

var amqplib = require('amqplib')
var fs = require('fs')

var creds = JSON.parse(fs.readFileSync('./creds.json', 'utf8'));

var q = "tasks"
var uri = 'amqp://localhost'

if (undefined != creds) {
  uri = 'amqp://' + creds.username + ':' + creds.password + '@localhost:5672'
}

var open = amqplib.connect(uri)
open.then(function (connection) {
  console.log('connection established')
  return connection.createChannel()
}).then(function (channel) {
  console.log('channel created')
  return channel.sendToQueue(q, new Buffer('something to do'), { persistent: true });
}).then(function () {
  console.log('written to queue')
}).catch(function (err) {
  console.log('could not establish connection: ' + err)
})
