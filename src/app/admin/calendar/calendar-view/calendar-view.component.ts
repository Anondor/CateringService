import { Component, signal, ChangeDetectorRef, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, ViewApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { createEventId, initializeEvents } from './event-utils';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent  implements OnInit{
  flag: number;
  calendarVisible = signal(true);
  selectInfo: DateSelectArg;
  calendarApi:ViewApi;

  constructor(private changeDetector: ChangeDetectorRef, private apiService: ApiService) {
    this.flag = 0;

  }
  ngOnInit(): void {

    this.apiService.getCalendarData().subscribe(res => {
      for (let x of res) {  this.calendarApi?.calendar?.view?.calendar?.addEvent(x)}
      this.flag = 1;
    })
       
  }


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

  handleDateSelect(selectInfo: DateSelectArg) {

    const title = prompt('Please enter a new title for your event');
const calendarApi=selectInfo.view.calendar;
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

       if (this.flag === 0) {

        this.apiService.getCalendarData().subscribe(res => {
          for (let x of res) {  calendarApi.addEvent(x); }
          this.flag = 1;

        })
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