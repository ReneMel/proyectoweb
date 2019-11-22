let dataMaterias = document.getElementById('dataMaterias')
let dropdown= document.getElementById('materias')


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
    /*.then(data => {
        //let dropdown = $('#materias');

        //dropdown.empty();
        
        //dropdown.append('<option selected="true" disabled>Elija materia</option>');
        //dropdown.prop('selectedIndex', 0);
        
        /*
        data.map((object,index)=>{
            
            $.each(object, function (key, entry) {
                
                
                dropdown.append($('<option>').attr('value', entry.nombre).text(entry.nombre));
                console.log(entry.nombre);
                
               //dropdown.append($("<option />").val(entry.nombre).text(entry.nombre));
                
               dropdown.append($('<option></option>').attr('value', entry.abbreviation).text(entry.name));


              })

        // Populate dropdown with list of provinces
        
        })


        
    })*/
});
