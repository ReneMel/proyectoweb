import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
//import $  from '../node_modules/jquery';
//import bootstrap from '../node_modules/bootstrap/js';
//let modalconfirm = document.getElementById('ConfirmModa')

//import bootstrap from ('../node_modules/bootstrap');
//import modal from('../node_modules/bootstrap-modal-js');
//import moment from '../node_modules/moment'


let btntrigger= document.getElementById('buttonTrigger');



document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  let modalconfirm = document.getElementById('ConfirmModal')
  //alert("The URL of this page is: " + window.location.href);
  var loc=window.location.href;
  var opt=0;
  var opt2='confirmado';

  for (let i = 0; i < loc.length; i++) {
    if(loc.charAt(i)=='=' && loc.charAt(i-1)=='l'){
     opt = loc.charAt(i+1);
    }
    if(loc.charAt(i)=='=' && loc.charAt(i-1)=='e'){
      opt2='confirmado'
     // console.log(opt2);
      //console.log(opt);
    }
  }
  
  var calendar = new Calendar(calendarEl, 
  {
    plugins: [ interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin ],
    header: {
      left: 'prev,next today',
      center: 'title' ,
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    defaultDate: '2019-11-12',
    navLinks: true, // can click day/week names to navigate views
    editable: false,
    eventLimit: true, // allow "more" link when too many events
    eventSources: [

      // your event source
      {
        url: `http://localhost:3000/evento?Labo=${opt}`, // use the `url` property
        color: 'yellow',    // an option!
        textColor: 'black'  // an option!
      },
      {
        url: `http://localhost:3000/sp?Labo=${opt}`,
        color:'green',  
        textColor:'black'
      },
      //logs de usuario
      {
        url: `http://localhost:3000/eByu`,
        color: 'Gray',
        textColor: 'Black',
        description: 'Estado Pendiente'
      }
      // any other sources...
  
    ],
    eventClick: function(info) {
      $('#ConfirmModal').modal('show');
      info.el.style.borderColor = 'red';
    }
    
  }); 
  //agregando comentarios para poder commitear 
  
  calendar.render();
});





