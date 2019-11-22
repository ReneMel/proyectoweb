const requestBtn = document.getElementById('requestBtn');

requestBtn.addEventListener('click', async event=>{
    event.preventDefault();
    const fechaSol = document.getElementById('fechaSol');
    const fechaIni = document.getElementById('fechaIni');
    const horaIni = document.getElementById('horaIni');
    const horaFin = document.getElementById('horaFin');
    const nombreLab = document.getElementById('nombreLab');
    const estadoSol = document.getElementById('estadoSol');
    const nombreMat = document.getElementById('nombreMat');
    const carnetResponsable = document.getElementById('carnetResponsable');

    await fetch(`http://localhost:3000/informe/advancedRequest?fechaSol=${fechaSol.value}&fechaIni=${fechaIni.value}&horaIni=${horaIni.value}&horaFin=${horaFin.value}&nombreLab=${nombreLab.value}&estadoSol=${estadoSol.value}&nombreMat=${nombreMat.value}&carnetResponsable=${carnetResponsable.value}`)
    .then(res=>{
        return res.json();
    })
    .then(data=>{
        console.log(data);
    })
})