let dataMaterias = document.getElementById('dataMaterias')


document.addEventListener('DOMContentLoaded', async ()=>{

    await fetch(`http://localhost:3000/matBU`)
    .then(res => {
          return res.json()
    })
    .then(data => {
        let dropdown = $('#materias');

        dropdown.empty();
        
        dropdown.append('<option selected="true" disabled>Elija materia/Province</option>');
        dropdown.prop('selectedIndex', 0);
        
        
        data.map((res,index)=>{
            console.log(res);
            

        // Populate dropdown with list of provinces
        $.getJSON(res, function (data) {
            console.log(data);
            
          $.each(data, function (key, entry) {
              console.log(entry)
            dropdown.append($('<option></option>').attr('value', entry.abbreviation).text(entry.nombre));
          })
        });
        })
        
    })
});
