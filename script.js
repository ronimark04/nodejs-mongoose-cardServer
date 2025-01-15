// const axios = require('axios');

const fetchData = () => {
    fetch("http://localhost:8181/cards")
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));

};

fetchData();