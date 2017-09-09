#!/usr/bin/env node

var amqplib = require('amqplib')
var fs = require('fs')

var creds = JSON.parse(fs.readFileSync('./creds.json', 'utf8'));

var q = "skurrrrr"
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

  channel.checkQueue(q).then(function (queue) {
    console.log('queue exists: ' + JSON.stringify(queue))
  }).catch(function (err) {
    console.log('error while checking queue: ' + err)
  })

}).catch(function (err) {
  console.log('could not establish connection: ' + err)
})