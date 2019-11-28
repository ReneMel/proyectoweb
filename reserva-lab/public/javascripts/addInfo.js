let dataMaterias = document.getElementById('dataMaterias')
let dropdown= document.getElementById('materias')
let Solitbtn= document.getElementById('Solitbtn')
let Changebtn= document.getElementById('changeEbtn')
let denegbtn = document.getElementById('denegbtn')


denegbtn.addEventListener('click', async()=>{
    console.log('Aprestaste'+ Changebtn.value);
    
    await fetch(`http://localhost:3000/u?es=rechazada&&id=${Changebtn.value}`,
    {
        method: 'PUT',
        headers: {'Content-type': 'application/json; charset=UTF-8'},
        body: JSON.stringify({
            state: false
        })
    })
    .then(res=>{
        return res.json()
    })
    .then(data=>{
        console.log(date);
        
    })
    window.location.replace(window.location.pathname + window.location.search + window.location.hash);
    
})
Changebtn.addEventListener('click', async()=>{
        console.log('Aprestaste'+ Changebtn.value);
        
        await fetch(`http://localhost:3000/u?es=confirmada&&id=${Changebtn.value}`,
        {
            method: 'PUT',
            headers: {'Content-type': 'application/json; charset=UTF-8'},
            body: JSON.stringify({
                state: false
            })
        })
        .then(res=>{
            return res.json()
        })
        .then(data=>{
            console.log(date);
            
        })
    window.location.replace(window.location.pathname + window.location.search + window.location.hash);
       
})


document.addEventListener('DOMContentLoaded', async ()=>{

    await fetch(`http://localhost:3000/matBU`,)
    .then(res => {
          return res.json()
          
    })
    .then(data=>{
        console.log(data[0].nombre)
        let option;
    
    	for (let i = 0; i < data.length; i++) {
          option = document.createElement('option');
      	  option.text = data[i].nombre;
      	  option.value = data[i].codigo;
      	  dropdown.add(option);
        }
    })
    
});

/*
Solitbtn.addEventListener('click', async event=>{
    let dateInic= document.getElementById('DateInic')
    let dateFin = document.getElementById('DateFin')
    let Labo= document.getElementById('LaboSolicitud')
    //console.log(dateInic.value)

    event.preventDefault();

    fetch(`http://localhost:3000/calendar/evento`, {
        method: 'POST'
    })
    .then(res => {
        console.log(res);
        return res.json()
    })
    .then(data=>{
        console.log("f")
    })
    button( class="btn btn-primary" id='Solitbtn')='Solicitar'

})*/