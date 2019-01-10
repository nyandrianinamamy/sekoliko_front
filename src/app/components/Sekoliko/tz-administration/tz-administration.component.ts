import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {DataService} from "../../../shared/service/data.service";
import {User} from "../../../shared/model/User";
import {urlList} from "../../../Utils/api/urlList";
import {ConstantHTTP} from "../../../Utils/ConstantHTTP";
import {Role} from "../../../shared/model/Role";
import {Angular5Csv} from "angular5-csv/Angular5-csv";
import * as jsPDF from "../../../../assets/jq/jspdf.min";
import {ExcelService} from "../../../shared/service/excel.service";
import html2canvas from 'html2canvas'
import {UserConnectedService} from "../../../shared/service/user-connected.service";
import {ConstantRole} from "../../../Utils/ConstantRole";
import {Router} from "@angular/router";

@Component({
    selector: 'app-tz-administration',
    templateUrl: './tz-administration.component.html',
    styleUrls: ['./tz-administration.component.scss']
})

export class TzAdministrationComponent implements OnInit {
    etudiant: any[];
    admin: any[];
    utilisateur: User;
    listUtilisateur: any;
    roles: Role[];
    loading: boolean;
    listProff:any[];
    dataSource: MatTableDataSource<any>;
    displayedColumns: string[] = ['matricule', 'nom', 'prenom', 'adresse', 'contact', 'email', 'action'];
    constructor(private dataService: DataService,
                private excelService: ExcelService,
                private userConnected:UserConnectedService,
                private router:Router) { }
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngOnInit() {
        let role = this.getUserc();
        if (role.role_type.id !== ConstantRole.ADMIN && role.role_type.id != ConstantRole.SECRETARIAT){
            this.router.navigate(['/menu/not-found']);
        }
        this.utilisateur = new User();
        this.getTypeRole();
        this.getListAdmin();
    }

    /**
     * Get user connecté
     */
    getUserc(){
        return this.userConnected.userConnected();
    }

    getTypeRole() {
        this.loading = true;
        this.dataService.post(urlList.path_find_role).subscribe(response => {
            if (response.data.length != 0 && response.code === ConstantHTTP.CODE_SUCCESS){
                this.roles = response.data !== null ? response.data : [];
                console.log("roles" + this.roles);
                this.loading = false;
            }else {
                this.roles = response.data = [];
                console.log(this.roles)
            }
        });
    }

    getListAdmin() {
        this.loading = true;
        this.dataService.post(urlList.path_find_user, {role :4}).subscribe(response => {
            if (response.code === ConstantHTTP.CODE_SUCCESS) {
                this.admin = response.data.list;
                this.dataSource = new MatTableDataSource<any>(this.admin);
                this.loading = false;
            }
        });
    }

    /**
     * Export
     */
    exportCsv(){
        new Angular5Csv(this.admin,'liste_classe');
    }

    exportAsXLSX():void {
        this.excelService.exportAsExcelFile(this.admin, 'adminListe');
    }

    exportPdf()
    {
        var data = document.getElementById('adminListe');
        html2canvas(data).then(canvas => {
            var imgWidth = 208;
            var pageHeight = 295;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;

            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jsPDF('p', 'mm', 'a4');
            var position = 0;
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
            pdf.save('admin-liste.pdf');
        });
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
