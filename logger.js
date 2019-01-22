
/*
Copyright 2018 University of Salerno.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
//Libraries
var amqp = require('amqplib');
var req = require('request');

//Global Variables for OMDB

function OMDB(series, event_name){
    var key = '663960d5';
    //var series = 'GameofThrones';
    var omdbapi = "http://www.omdbapi.com/?t="+series+"&apikey="+key+"";
    var tvseries = {}
    console.log(series);
    req(omdbapi, function(err, response, body) {
    if(err){
        console.log('error: ', error);
    } else {
    var json = JSON.parse(body);
    tvseries["value1"] = json.Title;
    tvseries["value2"] = json.totalSeasons;
    tvseries["value3"] = json.imdbRating;
    //console.log('values copied');
    //var trg = {values1, value2, value3};
    var eventname = event_name;
        //console.log(tvseries);
     send_telegram();   
}
function send_telegram(){
    console.log(tvseries);
    
    req.post({
        headers: {'content-type' : 'application/json'},
        url: 'https://maker.ifttt.com/trigger/'+eventname+'/with/key/bNFveDXVqkLNSu0xCzidQX',
        body: JSON.stringify(tvseries)
         }, function(error, response, body) {
        console.log(body);
       }) ;
      
    }});
};//function Send_telegram ends

amqp.connect('amqp://guest:guest@172.19.3.52:5672').then(function(conn) {
  process.once('SIGINT', function() { conn.close(); });
  return conn.createChannel().then(function(ch) {

    var ok = ch.assertQueue('iot/logs', {durable: false});

    ok = ok.then(function(_qok) {
      return ch.consume('iot/logs', function(msg) {
         //var eventname = 'tvseries_info';
        var str = msg.content.toString();
        var array = str.split(",");
         //console.log(array[0]); //movie_name
          //console.log(array[1]); //event_name
          var event_name = array[1];
          var series =  array[0].replace(/ /g,'%20');
          //console.log(series);
          OMDB(series, event_name );
        //console.log(" [x] Received '%s'", msg.content.toString());
      }, {noAck: true});
    });

    return ok.then(function(_consumeOk) {
      console.log(' [*] Waiting for messages. To exit press CTRL+C');
    });
  });
}).catch(console.warn);
