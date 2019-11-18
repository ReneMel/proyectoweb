//const db = require('models/connection');

const aModal = document.getElementsByClassName("a-modal");
console.log(aModal);

const addClickEvent = ()=>{
    for (let i = 0; i < tdModal.length; i++) {
        aModal[i].addEventListener('click', async ()=>{
            const carnet = aModal[i].innerHTML;
            console.log(carnet);
            
            const userName = document.getElementById('userName');
            const userPass = document.getElementById('userPass');
            const userEmail = document.getElementById('userEmail');
            const userType = document.getElementById('userType');
            let xhttp = new XMLHttpRequest();
            const user = await db.connection.any(`SELECT nombre 
            FROM usuario WHERE nombre = '${carnet}'`)
            //xhttp.open('GET')

        });
        
    }
}

// function loadData() {

// }