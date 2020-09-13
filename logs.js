getData();

const posts = [];
document.getElementById('time').addEventListener('click', event => {
    sortData((a, b) => b.time - a.time);
});


function sortData(compare) {
    for (let e of posts) {
      e.elt.remove();
    }
    posts.sort(compare);
    for (let e of posts) {
      document.body.append(e.elt);
    }
  }

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
        posts.push({ elt: root, time: e.timestamp });
        document.body.append(root);
    }
    console.log(data);
}