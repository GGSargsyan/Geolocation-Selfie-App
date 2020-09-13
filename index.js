const express = require('express');
const Datastore = require('nedb');
const app = express();
app.listen(process.env.PORT || 3003, () => console.log('listening at post 3003'));
app.use(express.static(__dirname + '/'));

//Gives server the ability to parse incoming data as json
app.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db');
//Gets the database file or creates new db if not in directory
database.loadDatabase();

app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if(err){
            response.end();
            return;
        }
        response.json(data);
    });
});


app.post('/api', (request, response) => {
    //Request
    console.log('request received');
    //console.log(request.body);
    //Response
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    
    response.json({
        status: 'success',
        timestamp: timestamp,
        lattitude: data.lat,
        longitude: data.lon,
        text: data.userSaid
    });
});
