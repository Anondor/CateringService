import { EventInput } from '@fullcalendar/core';
import { v4 as uuidv4 } from 'uuid';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  
  {
    id: createEventId(),
    title: 'All-day event',
    start: TODAY_STR
  },
  {
    id: createEventId(),
    title: 'Timed event check',
    start: TODAY_STR + 'T00:00:00',
    end: TODAY_STR + 'T03:00:00'
  },
  {
    id: createEventId(),
    
    title: 'Timed out event',
    start: TODAY_STR + 'T12:00:00',
    end: TODAY_STR + 'T15:00:00'
  }
  
];

export function initializeEvents()
{
     

   return INITIAL_EVENTS;  

}


export function createEventId() {

  
  return uuidv4();
}
