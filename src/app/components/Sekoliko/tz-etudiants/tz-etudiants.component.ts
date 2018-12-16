import {Component, OnInit, ViewChildren, QueryList, ElementRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {urlList} from '../../../Utils/api/urlList';
import {ConstantHTTP} from '../../../Utils/ConstantHTTP';
import {DataService} from '../../../shared/service/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tz-etudiants',
  templateUrl: './tz-etudiants.component.html',
  styleUrls: ['./tz-etudiants.component.scss']
})
export class TzEtudiantsComponent implements OnInit {
  niveau = [];
  // lentgh = this.niveau.length;
  details = 'Cliquer pour voir details';
  loading: boolean;

  constructor(private dataService: DataService,
              private router: Router) {
  }

  getNiveau() {
    return this.dataService.post(urlList.path_list_class_parent);
  }

  ngOnInit() {
    this.loading = true;
    this.getNiveau().subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        console.log('responece of response: ', response);
        response.data.forEach(element => {
          this.niveau.push({
            id: element.id,
            nom: element.description
          });
        });
        this.loading = false;
      }
    });
  }

  checkEnfant(id: number) {
    console.log('id find', id);
    this.router.navigate(['/menu/classe/' + id]);
  }
}
