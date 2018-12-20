import {Component, OnInit, ViewChild} from '@angular/core';
import {Subject} from "rxjs";
import {DataService} from "../../../shared/service/data.service";
import {urlList} from "../../../Utils/api/urlList";
import {ConstantHTTP} from "../../../Utils/ConstantHTTP";
import {Router} from "@angular/router";
import {MatiereParam} from "../../../shared/model/MatiereParam";
import {MatPaginator, MatTableDataSource} from "@angular/material";

@Component({
    selector: 'app-tz-matiere',
    templateUrl: './tz-matiere.component.html',
    styleUrls: ['./tz-matiere.component.scss']
})

export class TzMatiereComponent implements OnInit {

    listMatiere: MatiereParam[];
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();

    /**
     * Table
     */
    displayedColumns: string[] = ['nom', 'coefficient', 'action'];
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    loading: boolean;
    id: number;
    nom: string;
    coeff: number;
    class: number;
    matiere: number;

    constructor(
        private dataService: DataService,
        private router: Router) {
    }

    ngOnInit() {
        this.loading = true;
        this.getMatiere().subscribe((response: any) => {
            if (response.code === ConstantHTTP.CODE_SUCCESS) {
                this.loading = false;
                this.listMatiere = response.data;
                this.dataSource = new MatTableDataSource<any>(this.listMatiere);
                this.dataSource.paginator = this.paginator;
                console.log(this.listMatiere);
                this.dtTrigger.next();
            }
        });
    }

    getMatiere() {
        return this.dataService.post(urlList.path_list_matiere);
    }

    editMatiere(id: number) {
        this.loading = true;
        const matiere = {
            "nom": this.nom,
            "coeff": this.coeff,
            "class": 7,
            "prof": 6,
        };
        this.dataService.post(urlList.path_edit_matiere + id, matiere).subscribe((data:any) => {
            if (data.code === ConstantHTTP.CODE_SUCCESS) {
                this.loading = false;
                this.ngOnInit();
                this.dtTrigger.next();
            }
        });
    }

    deleteMatiere(id: number) {
        this.loading = true;
         return this.dataService.post(urlList.path_delete_matiere + id).subscribe(response => {
            if (response.code === ConstantHTTP.CODE_SUCCESS) {
                this.router.navigateByUrl('/menu', {skipLocationChange: true}).then(()=>
                this.router.navigate(['/menu/matiere-list']));
                this.loading = false;
            }
        });
    }
}
