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
import {Edt} from "../../../shared/model/EdtTs";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {UserConnectedService} from "../../../shared/service/user-connected.service";
import {ConstantRole} from "../../../Utils/ConstantRole";

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
              private dataService: DataService,
              private router:Router,
              private currentRoute: ActivatedRoute,
              private userConnected:UserConnectedService) {}

  /**
   * Fetch matiere
   */
  listMatiere: MatiereParam[];
  profs: User;
  classe : any;
  emploie:Edt;
  add:boolean;
  etudiant:boolean;
  edit:boolean;
  list:boolean;
  loading:boolean;
  classes:number;
  emploidutemps:any;
  refresh: Subject<any> = new Subject();
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
  events: CalendarEvent[] = [];

  /**
   * Fetch matiere liste
   */
  getMatiere() {
    return this.dataService.post(urlList.path_list_matiere);
  }

  /**
   * Fetch profs listes
   */
  getProfs() {
    return this.dataService.post(urlList.path_find_user,{role:1})
  }

  /**
   * Fetch classe listes
   */
  getClasse(){
    this.classes = this.currentRoute.snapshot.paramMap.get('id') ? + this.currentRoute.snapshot.paramMap.get('id') : null;
    return this.dataService.get(urlList.path_list_class_enfant_edt + 10)
  }

  ngOnInit(): void {
    this.getMatiere().subscribe(response=>{
      if(response.code === ConstantHTTP.CODE_SUCCESS){
        this.listMatiere = response.data;
      }
    });

    this.emploie = new Edt();

    this.getProfs().subscribe(response=>{
      if(response.code === ConstantHTTP.CODE_SUCCESS){
        this.profs = response.data.list;
      }
    });


    this.getEdtListe().subscribe(response=>{
      if (response.code === ConstantHTTP.CODE_SUCCESS){
          response.data.forEach(edt => {
            console.log(edt);
            this.events.push({
              id: edt.id,
              start:new Date( edt.start),
              end:  new Date( edt.end),
              title:edt.title,
              color: colors.red,
              allDay: true,
              resizable: {
                beforeStart: true,
                afterEnd: true
              },
              draggable: true
            });
            this.refresh.next();
            this.list= true
          });
      }
      this.loading = false;
    })
  }

  /**
   * Fetch inscription liste
   */
  getUserInsc(){
    let role = this.getUserConnected();
    return this.dataService.post(urlList.path_list_etudiants,{userid:role.user_id});
  }

  getEdtListe(){
    let role = this.getUserConnected();
    if (role.role_type.id === ConstantRole.ETUDIANT){
      this.etudiant = true;
      this.getUserInsc().subscribe(response => {
        if (response.code === ConstantHTTP.CODE_SUCCESS) {
          this.classes = response.data[0].id_classe.id;
          return this.dataService.post(urlList.path_edt_list,{classe: this.classes});
        }
      });
    }
    this.classes = this.currentRoute.snapshot.paramMap.get('id') ? + this.currentRoute.snapshot.paramMap.get('id') : null;
    return this.dataService.post(urlList.path_edt_list,{classe: this.classes});
  }

  addEdt(emploie:Edt){
    this.loading = true;
    this.dataService.post(urlList.path_edt_add , {classe:this.classes,title:emploie.title,start:emploie.start,end:emploie.end}).subscribe(response=>{
      if (response.code === ConstantHTTP.CODE_SUCCESS){
        this.router.navigateByUrl('/menu', {skipLocationChange: true}).then(() =>
            this.router.navigate(['/menu/edt/'+this.classes]));
        this.loading = false;
        this.add = false;
      }
    })
  }

  deleteEdt(id:number){
    this.loading = true;
    this.dataService.post(urlList.path_edt_del + id).subscribe(response=>{
      if (response.code === ConstantHTTP.CODE_SUCCESS){
        this.router.navigateByUrl('/menu', {skipLocationChange: true}).then(() =>
            this.router.navigate(['/menu/edt']));
        this.loading = false;
      }
    })
  }


  @ViewChild('mat-card')
  modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  dateData: {
    action: string;
    event: CalendarEvent;
  };







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
    this.dateData = { event, action };
    console.log(this.dateData.event);
    this.edit = true;
  }

  addEvent(): void {
    this.add = true;
    this.getClasse().subscribe(response=>{
      if(response.code === ConstantHTTP.CODE_SUCCESS){
        this.classe = response.data;
        console.log(this.classe);
      }
    });

  }

  editEvent(id:number,
            titre:string,
            debut:Date,
            fin:Date){
    this.loading = true;
    this.classes = this.currentRoute.snapshot.paramMap.get('id') ? + this.currentRoute.snapshot.paramMap.get('id') : null;
    this.dataService.post(urlList.path_edt_edit + id,{title:titre,start:debut,end:fin,classe:this.classes}).subscribe(response=>{
      if (response.code === ConstantHTTP.CODE_SUCCESS){
        this.router.navigateByUrl('/menu', {skipLocationChange: true}).then(() =>
            this.router.navigate(['/menu/edt/'+this.classes]));
        this.loading = false;
        this.add = false;
      }
    })
  }

  getUserConnected(){
    return this.userConnected.userConnected();
  }

}
