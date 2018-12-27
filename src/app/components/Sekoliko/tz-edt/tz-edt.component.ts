import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
    OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import {MatiereParam} from "../../../shared/model/MatiereParam";
import {urlList} from "../../../Utils/api/urlList";
import {DataService} from "../../../shared/service/data.service";
import {ConstantHTTP} from "../../../Utils/ConstantHTTP";
import {User} from "../../../shared/model/User";
import {ClasseEnfant} from "../../../shared/model/ClasseEnfant";

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-tz-edt',
  templateUrl: './tz-edt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./tz-edt.component.scss']
})


export class TzEdtComponent implements OnInit {
  constructor(private modal: NgbModal,
              private dataService: DataService) {}

  /**
   * Fetch matiere
   */
  listMatiere: MatiereParam[];
  profs: User;
  classe : ClasseEnfant;

  getMatiere() {
    return this.dataService.post(urlList.path_list_matiere);
  }
  getProfs() {
    return this.dataService.post(urlList.path_find_user,{role:1})
  }
  getClasse(){
    return this.dataService.post(urlList.path_list_class_enfant)
  }
  ngOnInit(): void {
    this.getMatiere().subscribe(response=>{
      if(response.code === ConstantHTTP.CODE_SUCCESS){
        this.listMatiere = response.data;
      }
    });
    this.getProfs().subscribe(response=>{
      if(response.code === ConstantHTTP.CODE_SUCCESS){
        this.profs = response.data.list;
      }
    })
    this.getClasse().subscribe(response=>{
      if(response.code === ConstantHTTP.CODE_SUCCESS){
        this.classe = response.data;
      }
    })
  }

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-edit"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'Mathématiques',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: startOfDay(new Date()),
      title: 'Physique',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'Anglais',
      color: colors.blue,
      allDay: true
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'Bibliothèque',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  activeDayIsOpen: boolean = true;



  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
          (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
          events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd
                    }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

}
