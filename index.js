const express = require('express');
const app = express();
app.listen(3003, () => console.log('listening at post 3003'));
app.use(express.static(__dirname + '/'));

//Gives server the ability to parse incoming data as json
app.use(express.json({limit: '1mb'}));

const database = [];

app.post('/api', (request, response) => {
    //Request
    console.log('request received');
    //console.log(request.body);
    //Response
    const data = request.body;
    database.push(data);
    console.log(database);
    response.json({
        status: 'success',
        lattitude: data.lat,
        longitude: data.lon
    });
});
