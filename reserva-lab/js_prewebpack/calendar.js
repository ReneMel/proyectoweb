import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';




document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  

  var calendar = new Calendar(calendarEl, {
    plugins: [ interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin ],
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    defaultDate: '2019-11-12',
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    eventSources: [

      // your event source
      {
        url: 'http://localhost:3000/json', // use the `url` property
        color: 'yellow',    // an option!
        textColor: 'black'  // an option!
      },
      {
        url: 'http://localhost:3000/jsonsoporte',
        color:'blue',  
        textColor:'white'
      }
  
      // any other sources...
  
    ]
  });
  //agregando comentarios para poder commitear 
  
  calendar.render();
});