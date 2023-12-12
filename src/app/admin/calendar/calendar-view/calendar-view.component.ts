import { Component, signal, ChangeDetectorRef, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId, initializeEvents } from './event-utils';
import { CalendarModel } from 'src/app/interfaces/calendar';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent {
  flag: number;

  calenderData: CalendarModel;


  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: initializeEvents(),
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)

  });
  currentEvents = signal<EventApi[]>([]);
  constructor(private changeDetector: ChangeDetectorRef, private apiService: ApiService) {
    this.flag = 0;


  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    if (title) {


      const eventToAdd = {
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      };
      
         calendarApi.addEvent(eventToAdd)
         console.log(eventToAdd);
       debugger;

       if (this.flag === 0) {
        this.apiService.getCalendarData().subscribe(res => {
          for (let x of res) {  calendarApi.addEvent(x); debugger; }
          this.flag = 1;
        })
        console.group(calendarApi);
        debugger

      }

      this.apiService.addCalenderEvent(eventToAdd).subscribe((res => {

      }))

    }

  }

  handleEventClick(clickInfo: EventClickArg) {

    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {

    this.changeDetector.detectChanges();
  }


}