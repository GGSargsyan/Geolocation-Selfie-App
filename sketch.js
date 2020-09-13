function setup(){

    noCanvas();
    const video = createCapture(VIDEO);
    video.size(320, 240);

    if('geolocation' in navigator) {
    console.log('geolocation available');

    navigator.geolocation.getCurrentPosition(async position => 
    {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        document.getElementById('latitude').textContent = lat;
        document.getElementById('longitude').textContent = lon;

        document.getElementById('submit').addEventListener('click', async event =>{
            //API POST functionality
            const userText = document.getElementById('userSaid').value;
            video.loadPixels();
            const imageBase64 = video.canvas.toDataURL();
            //Later on try to store the image to a file and put that file
            //into the database instead of the image string
            const data = {lat, lon, userText, imageBase64};
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            const response = await fetch('/api', options);
            const json = await response.json();
            console.log(data);
        });
        
    });
    } else {
        console.log('geolocation not available');
    }
}