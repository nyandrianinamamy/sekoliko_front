import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../../shared/service/data.service';
import {urlList} from '../../../Utils/api/urlList';
import {ConstantHTTP} from '../../../Utils/ConstantHTTP';
import {Subject} from 'rxjs';
import {Salle} from '../../../shared/model/Salle';
import {Router} from "@angular/router";
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-tz-salle',
    templateUrl: './tz-salle.component.html',
    styleUrls: ['./tz-salle.component.scss']
})



export class TzSalleComponent implements OnInit {

    _salle: Salle[];
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    loading: boolean;
    salle: Salle;
    public description: string;
    classe: 'text-center';

    /**
     * Table
     */
    displayedColumns: string[] = ['id', 'nom', 'action'];
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;


    constructor(private dataService: DataService,
                private router: Router,
                public dialog: MatDialog
                ) {
    }

    ngOnInit() {

        /**
         * Table
         */
        this.salle = new Salle();
        this.loading = true;
        this.getListSalle().subscribe((data: any) => {
            if (data.code === ConstantHTTP.CODE_SUCCESS) {
                this.loading = false;
                this._salle = data.data;
                this.dataSource = new MatTableDataSource<any>(this._salle);
                this.dataSource.paginator = this.paginator;
                this.dtTrigger.next();
            }
        })

    }

    /**
     * Function list , edit , delete , Modifiable
     */
    getListSalle() {
        return this.dataService.post(urlList.path_list_salle);
    }

    deleteSalle(id: number) {
        this.loading = true;
        return this.dataService.post(urlList.path_delete_salle + id).subscribe(response => {
            if (response.code == ConstantHTTP.CODE_SUCCESS) {
                this.router.navigateByUrl('/menu', {skipLocationChange: true}).then(() =>
                    this.router.navigate(['/menu/salle']));
                this.loading = false
            }
        });
    }

    editSalle(id: number) {
        this.loading = true;
        this.dataService.post(urlList.path_mod_salle + id, {
            "description": this.description
        }).subscribe(response => {
            if (response.code === ConstantHTTP.CODE_SUCCESS) {
                this.router.navigateByUrl('/menu', {skipLocationChange: true}).then(() =>
                    this.router.navigate(['/menu/salle']));
                this.loading = false
            }
        })
    }

    save(salle: Salle) {
        this.loading = true;
        this.dataService.post(urlList.path_edit_salle, salle).subscribe(response => {
            if (response.code === ConstantHTTP.CODE_SUCCESS) {
                this.router.navigateByUrl('/menu', {skipLocationChange: true}).then(() =>
                    this.router.navigate(['/menu/salle']));
                this.loading = false
            }
        })
    }

    ngOnDestroy() {
        this.dtTrigger.unsubscribe();
    }

    openDialog() {
        const dialogRef = this.dialog.open(DialogContentExampleDialog);
        dialogRef.afterClosed().subscribe(() => { });
    }

}

@Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: 'add-modal.html',
})
export class DialogContentExampleDialog {}