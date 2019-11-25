(async function loadCareer(){
    const career = document.getElementById('career');
    await fetch(`http://localhost:3000/signUp/career`)
    .then(res=>{
        return res.json()
    })
    .then(data=>{
        console.log(data);
        data.map((object,index)=>{
            const new_option = document.createElement('option');
            new_option.innerText = object.nombre;
            career.appendChild(new_option);
        });
    })
    .catch(err=>{
        next(err);
    })
})();