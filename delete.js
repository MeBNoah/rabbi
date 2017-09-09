#!/usr/bin/env node

var q = "tasks"
var open = require('amqplib').connect('amqp://localhost')

open.then(function (connection) {
  console.log('connection established')
  return connection.createChannel()
}).then(function (channel) {
  console.log('channel created')

  channel.deleteQueue(q).then(function (queue) {
    console.log('queue deleted: ' + JSON.stringify(queue))
  }).catch(function (err) {
    console.log('error while deleting queue: ' + err)
  })

}).catch(function (err) {
  console.log('could not establish connection: ' + err)
})