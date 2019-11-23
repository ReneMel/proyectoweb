let dataMaterias = document.getElementById('dataMaterias')
let dropdown= document.getElementById('materias')
let Solitbtn= document.getElementById('Solitbtn')


document.addEventListener('DOMContentLoaded', async ()=>{

    await fetch(`http://localhost:3000/matBU`)
    .then(res => {
          return res.json()
          
    })
    .then(data=>{
        console.log(data[0].nombre)
        let option;
    
    	for (let i = 0; i < data.length; i++) {
          option = document.createElement('option');
      	  option.text = data[i].nombre;
      	  option.value = data[i].nombre;
      	  dropdown.add(option);
        }
    })
    
});


Solitbtn.addEventListener('click', async event=>{
    let dateInic= document.getElementById('DateInic')
    let dateFin = document.getElementById('DateFin')
    let Labo= document.getElementById('LaboSolicitud')
    console.log(dateInic.value)
    Conso

    event.preventDefault();
    await fetch('http://localhost:3000/Evento?Labo=0')
    .then(res=>{
        return res.json();
    })
    .then(data=>{
        console.log(data);

        for (let i = 0; i < data.length; i++) {
            
            
        }

        
        
    })

})