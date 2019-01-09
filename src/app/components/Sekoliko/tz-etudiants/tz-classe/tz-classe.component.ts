import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, RouterLinkActive} from '@angular/router';
import {DataService} from '../../../../shared/service/data.service';
import {urlList} from '../../../../Utils/api/urlList';
import {Classe} from '../../../../shared/model/Classe';
import {ConstantHTTP} from '../../../../Utils/ConstantHTTP';
import {Subject} from "rxjs";
import {MatPaginator, MatTableDataSource} from "@angular/material";

@Component({
    selector: 'app-tz-classe',
    templateUrl: './tz-classe.component.html',
    styleUrls: ['./tz-classe.component.scss']
})
export class TzClasseComponent implements OnInit {

    details = 'Cliquer pour voir les details';
    idClasse: number;
    classe: Classe[];
    loading: boolean;

    /**
     * Table
     */
    displayedColumns: string[] = ['ref', 'description', 'action'];
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private currentRoute: ActivatedRoute,
                private dataService: DataService,
                private router: Router
                ) {
    }

    ngOnInit() {
      this.idClasse = this.currentRoute.snapshot.paramMap.get('id') ? +this.currentRoute.snapshot.paramMap.get('id') : null;
      this.checkEnfantClasse(this.idClasse);
    }

    checkEnfantClasse(parentId: number) {
      this.loading = true;
      this.dataService.post(urlList.path_list_class_enfant, {parent: parentId}).subscribe(response => {
        if (response.code === ConstantHTTP.CODE_SUCCESS) {
          this.classe = response.data;
            this.dataSource= new MatTableDataSource<any>(this.classe);
            this.dataSource.paginator = this.paginator;
          this.loading = false;
        }
      });
    }

    retour(){
        this.router.navigate(['/menu/etudiant'])
    }

    /**
     * Fetch liste etudiant
     * @param idClasse
     */
    checkListEtudiant(idClasse: number) {
      this.router.navigate(['/menu/list-etudiant/' + idClasse]);
    }

    /**
     * Fetch edt liste
     * @param idClasse
     */
    checkListEdt(idClasse: number) {
        this.router.navigate(['/menu/edt/' + idClasse]);
    }

    /**
     * Table filter
     */
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        console.log(this.dataSource);
        // @ts-ignore
        if (this.dataSource.filteredData === 0) {
            // @ts-ignore
            console.log('null');
        }
    }
}
