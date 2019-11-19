const searchBtn = document.getElementById('searchBtn');
const editBtn = document.getElementById('editBtn');

//Searching by id
searchBtn.addEventListener('click', async event=>{
    event.preventDefault();
    const carnet = document.getElementById('searchIn').value;
    await fetch(`http://localhost:3000/users/search?carnet=${carnet}`)
    .then(res=>{
        return res.json();    
    })
    .then(res=>{
        console.log(res);
        res.map((object, index)=>{
            let new_row = document.createElement('tr');
            let table_body = document.getElementById('table_body');
            
            table_body.innerHTML = '';
            let stateU, color, classN, btn, role;
            if (object.estado) {
                stateU = 'Activado';
                color = '#83f52c';
                classN = 'btn btn-danger';
                btn = 'Desactivar';
            }
            else {
                stateU = 'Desactivado';
                color = '#FB2B11';
                classN = 'btn btn-success';
                btn = 'Activar';
            }
            if(object.is_admin) {
                role = 'Admin';
            }
            else {
                role = 'Usuario'
            }

            new_row.innerHTML =  
            `<th scope = 'row'>
                <a href='users/show' class='a-modal' data-toggle='modal' data-target='#exampleModalCenter'>${object.carnet}</a>
            </th>
            <td>${object.nombre}</td>
            <td>${object.correo}</td>
            <td>${object.tipo}</td>
            <td>${role}</td>
            <td style='color: ${color}'>${stateU}</td>
            <td>
                <a href='#' class=${classN}>${btn}</a>
            </td>`;
            table_body.appendChild(new_row);

        });
    })
});
//Loading data to the modals
$("#exampleModalCenter").on("show.bs.modal", async e=>{
    const carnet = e.relatedTarget.innerText;
    const userCarnet = document.getElementById('userCarnet');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const userType = document.getElementById('userType');
    
    await fetch(`http://localhost:3000/users/show?carnet=${carnet}`)
      .then(res => {
          return res.json()
      })
      .then(res => {
          res.map((object,index)=>{
            userCarnet.innerText = object.carnet;
            userName.value = object.nombre;
            userEmail.value = object.correo;
            userType.value = object.tipo;
          });
      })
});
//Editing user inside the modal 
editBtn.addEventListener('click', async event=>{
    event.preventDefault();
    const userCarnet = document.getElementById('userCarnet');
    const userName = document.getElementById('userName');
    const userPass = document.getElementById('userPass');
    const userEmail = document.getElementById('userEmail');
    const userType = document.getElementById('userType');

    await fetch(`http://localhost:3000/users/edit?carnet=${userCarnet.innerText}`,
    {
        method: 'PUT',
        headers: {'Content-type': 'application/json; charset=UTF-8'},
        body: JSON.stringify({
            name: userName.value,
            pass: userPass.value,
            email: userEmail.value,
            type: userType.value
        })
    })
    .then(res=>{
        return res.json();
    })
    .then(data=>{
        data.map((object,index)=>{
             userName.value = object.nombre;
             userPass.value = '';
             userEmail.value = object.correo;
             userType.value = object.tipo;
        })
    })
    .catch(err=>{
        console.log(err);
    });
    /*?carnet=${userCarnet.innerText}?
    userName=${userName.value}?userPass=${userPass.value}?userEmail=${userEmail.value}?
    userType=${userType.value}*/
});
