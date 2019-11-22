const requestBtn = document.getElementById('requestBtn');

function objectToCsv(data) {
    const csvRows = [];

    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));
    
    for(const row of data) {
        const values = headers.map(header =>{
            const escaped = (''+row[header]).replace(/"/g, '\\"');
            return `"${escaped}"`;
        })
        csvRows.push(values.join(','));
    }
    
    return csvRows.join('\n');
};

function download(cvsData){
    const blob = new Blob([cvsData], {type: 'text/csv'});
    const url = window.URL.createObjectURL(blob);
    const informe = document.createElement('a');
    informe.setAttribute('hidden','');
    informe.setAttribute('href',url);
    informe.setAttribute('download','download.csv');
    document.body.appendChild(informe);
    informe.click();
    document.body.removeChild(informe);
};

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
            data.map((object, index)=>({
                No_de_solicitud: object.No_de_solicitud,
                Fecha_de_solicitud: object.Fecha_de_solicitud,
                Fecha_de_reserva: object.Fecha_de_reserva,
                Duracion: object.Duracion,
                Estado_de_solicitud: object.Estado_de_solicitud,
                Laboratorio_solicitado: object.Laboratorio_solicitado,
                Materia: object.Materia,
                Responsable: object.Responsable
            }))
            const cvsData = objectToCsv(data);
            download(cvsData);
        })
})