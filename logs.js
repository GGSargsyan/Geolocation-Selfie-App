getData();

async function getData(){
    const response = await fetch('/api');
    const data = await response.json();

    for(e of data){
        const root = document.createElement('p');
        const talk = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');
        const image = document.createElement('img');

        talk.textContent = `User Said: ${e.userText}`;
        geo.textContent = `${e.lat}°, ${e.lon}°`;
        const dateString = new Date(e.timestamp).toLocaleString();
        date.textContent = dateString;
        image.src = e.imageBase64;
        image.alt = "Picture of user from webcam";

        root.append(talk, geo, date, image);
        document.body.append(root);
    }
    console.log(data);
}