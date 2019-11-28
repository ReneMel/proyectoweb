import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
let Changebtn;
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
        className: 'confirmadas',
        url: `http://localhost:3000/evento?Labo=${opt}`, // use the `url` property
        color: 'green',    // an option!
        textColor: 'white'  // an option!
      },
      {
        className: 'mantenimiento',
        url: `http://localhost:3000/sp?Labo=${opt}`,
        color:'blue',  
        textColor:'white'
      },
      //logs de usuario
      {
        className: 'pendiente',
        url: `http://localhost:3000/eByu`,
        color: 'Gray',
        textColor: 'Black',
        description: 'Estado Pendiente'
      }
      // any other sources...
  
    ],
    eventClick: function(info) {
        console.log($(info).attr("textColor"));
        console.log(info.event)
        console.log(info.event._def.publicId);
        
        let publicid =info.event._def.publicId;
        
        console.log(info.el.classList[5]);
        
        console.log
        ('Event: ' + info.event.title);
        console.log
        ('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
        console.log
        ('View: ' + info.view.type);
        console.log(info);
        Changebtn= document.getElementById('changeEbtn')
        console.log(Changebtn.value);

        if(info.el.classList[5]=='pendiente'){
          $('#ConfirmModal').modal('show');
          $('#modal-title').html(info.el.title);
          info.el.style.borderColor = 'red';
          $('#changeEbtn').val(publicid) 
          $('#denegbtn').val(publicid) 
        }
        
    }
    
  }); 
  //agregando comentarios para poder commitear 
  
  calendar.render();
});

