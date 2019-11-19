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
    events: [
      {
        title: 'All Day Event',
        start: '2019-11-01',
      },
      {
        title: 'Long Event',
        start: '2019-11-07',
        end: '2019-11-10'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2019-11-09T16:00:00'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2019-11-16T16:00:00'
      },
      {
        title: 'Conference',
        start: '2019-11-11',
        end: '2019-11-13'
      },
      {
        title: 'Meeting',
        start: '2019-11-12T10:30:00',
        end: '2019-11-12T12:30:00'
      },
      {
        title: 'Lunch',
        start: '2019-11-12T12:00:00'
      },
      {
        title: 'Meeting',
        start: '2019-11-12T14:30:00'
      },
      {
        title: 'Happy Hour',
        start: '2019-11-12T17:30:00'
      },
      {
        title: 'Dinner',
        start: '2019-11-12T20:00:00'
      },
      {
        title: 'Birthday Party',
        start: '2019-11-13T07:00:00'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2019-11-28'
      }
    ]
  });
  //agregando comentarios para poder commitear 
  
  calendar.render();
});