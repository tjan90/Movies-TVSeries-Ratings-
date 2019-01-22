# Movies-TVSeries-Ratings-
Requesting details of movies or tv series to you telegram app using serverless platform


This is a simple function made for [Nuclio](https://nuclio.io), an open source and managed serverless platform that we can run on our home server. It uses [RabbitMQ](https://www.rabbitmq.com/) as broker to share MQTT messages around.

### Prerequisites
- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/) 

### How to use it
Clone this repository:
```
$ git clone https://github.com/tjan90/Movies-TVSeries-Ratings-.git
$ cd Movies-TVSeries-Ratings-
```
Start up a docker instance of Nuclio:
```
$ sudo docker run -p 8070:8070 -v /var/run/docker.sock:/var/run/docker.sock -v /tmp:/tmp nuclio/dashboard:stable-amd64
```
Start up a docker instance of RabbitMQ:
```
$ sudo docker run -p 9000:15672  -p 1883:1883 -p 5672:5672  cyrilix/rabbitmq-mqtt
```

Make an applet on [IFTTT](https://ifttt.com/) to forward the details found to Telegram app.
Obtain an API key from the OMDB's API and place them inside `logger.js`. Remember to add your IP in the right spot

Browse to http://localhost:8070, create a project, load the `mqttconsume2.yaml` file and deploy it. Anything should work just fine.

#### How to run the logger.js
Open a terminal, browse to the Movies-TVSeries-Ratings- folder and install the dependencies:
```
$ npm install
```
Run the file logger.js
```
$ node logger.js 
```

### Working
Note that every programmer has its own way of coding, so is mine. I am a little obsessed with using the code on my desktop apps so that why i wrote all of my code in a logger.js file.
The best practice will be to write the code inside the nuclio function where all the operation of  serverless take place.

So here is a little explanation of what actually if happening behind the scenes

You write name of the movie/tvseries with name of the IFTTT applet like "The Blackist,Telegram_notification" in the nuclio function body and press the test to pass the data to logger. The logger.js will look the details of Movie/Tvseries in OMDB. It will pull the Name, Total Seasons and Rating and then will forward it through Webhook via IFTTT applet.

### Further developement
This function pass the data through nuclio function body, further development can be made by integrating MQTT client. 

### Technology used
- [Nuclio](https://nuclio.io)
- [RabbitMQ](https://www.rabbitmq.com/)
- [IFTTT](https://ifttt.com/)

Also APIs from:
- [OMDB](https://www.omdbapi.com/)
