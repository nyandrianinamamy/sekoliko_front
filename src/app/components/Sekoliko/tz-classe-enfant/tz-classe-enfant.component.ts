import {Component, OnInit, ViewChild} from '@angular/core';
import {Angular5Csv} from "angular5-csv/Angular5-csv";
import html2canvas from 'html2canvas'
import {ExcelService} from "../../../shared/service/excel.service";
import {DataService} from "../../../shared/service/data.service";
import {ClasseEnfant} from "../../../shared/model/ClasseEnfant";
import * as jsPDF from "../../../../assets/jq/jspdf.min";
import {urlList} from "../../../Utils/api/urlList";
import {ConstantHTTP} from "../../../Utils/ConstantHTTP";
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {Router} from "@angular/router";
import {Classe} from "../../../shared/model/Classe";
import {ConstantRole} from "../../../Utils/ConstantRole";
import {UserConnectedService} from "../../../shared/service/user-connected.service";

@Component({
    selector: 'app-tz-classe-enfant',
    templateUrl: './tz-classe-enfant.component.html',
    styleUrls: ['./tz-classe-enfant.component.scss']
})
export class TzClasseEnfantComponent implements OnInit {

    /**
     * Table
     */
    loading: boolean;
    description: string;
    parent: any;
    listNiveau: Classe;
    classe: ClasseEnfant;
    displayedColumns: string[] = ['numero', 'nom', 'action'];
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    classeEnfant: ClasseEnfant[];

    constructor(private excelService: ExcelService,
                private dataService: DataService,
                private router: Router,
                private userConnected:UserConnectedService) {
    }

    ngOnInit() {
        let role = this.getUserc();
        if (role.role_type.id !== ConstantRole.ADMIN && role.role_type.id != ConstantRole.SECRETARIAT){
            this.router.navigate(['/menu/not-found']);
        }

        this.classe = new ClasseEnfant();
        this.getClasseEnfant().subscribe(response => {
            if (response.code === ConstantHTTP.CODE_SUCCESS) {
                this.classeEnfant = response.data;
                this.dataSource = new MatTableDataSource<any>(this.classeEnfant);
                this.dataSource.paginator = this.paginator;
            }
        });
        this.getClasseParent().subscribe(response => {
            if (response.code === ConstantHTTP.CODE_SUCCESS) {
                this.listNiveau = response.data
                this.loading = false;
            }
        })
    }

    /**
     * Get user connecté
     */
    getUserc(){
        return this.userConnected.userConnected();
    }

    /**
     * Fetch classe enfant
     */
    getClasseEnfant() {
        return this.dataService.post(urlList.path_list_class_enfant);
    }

    /**
     * Modification classe enfant
     * @param id
     */
    editClasse(id: number) {
        this.loading = true;
        this.dataService.post(urlList.path_edit_class_enfant + '/' + id,
            {parent:this.parent.id,description:this.description}).subscribe(
                response => {
                            if (response.code === ConstantHTTP.CODE_SUCCESS) {
                                this.router.navigateByUrl('/menu', {skipLocationChange: true}).then(() =>
                                    this.router.navigate(['/menu/list-classe-eft']));
                                this.loading = false;
                            }
        });
    }

    /**
     * Suppression classe enfant
     * @param id
     */
    deleteClasse(id: number) {
        this.loading = true;
        this.dataService.post(urlList.path_delete_class_enfant + id).subscribe(response => {
            if (response.code === ConstantHTTP.CODE_SUCCESS) {
                this.router.navigateByUrl('/menu', {skipLocationChange: true}).then(() =>
                    this.router.navigate(['/menu/list-classe-eft']));
                this.loading = false;
            }
        })
    }

    /**
     * fetch classe parent
     */
    getClasseParent() {
        return this.dataService.post(urlList.path_list_class_parent);
    }

    /**
     * Fetch liste matiere
     * @param idClasse
     */
    checkListEtudiant(idClasse: number) {
        this.router.navigate(['/menu/matiere-list/' + idClasse]);
    }

    /**
     * Table filter
     */
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        console.log(this.dataSource);
        // @ts-ignore
        if (this.dataSource.filteredData == 0) {
            // @ts-ignore
            console.log('null')
        }
    }

    /**
     * Export
     */
    exportCsv() {
        new Angular5Csv(this.classeEnfant, 'liste_classe');
    }

    exportAsXLSX(): void {
        this.excelService.exportAsExcelFile(this.classeEnfant, 'classListe');
    }

    exportPdf() {
        var data = document.getElementById('classListe');
        html2canvas(data).then(canvas => {
            var imgWidth = 208;
            var pageHeight = 295;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;

            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jsPDF('p', 'mm', 'a4');
            var position = 0;
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
            pdf.save('classe-liste.pdf');
        });
    }

}
