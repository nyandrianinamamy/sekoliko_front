import {Component, OnInit} from '@angular/core';
import {DataService} from "../../../../shared/service/data.service";
import {urlList} from "../../../../Utils/api/urlList";
import {ConstantHTTP} from "../../../../Utils/ConstantHTTP";
import {Classe} from "../../../../shared/model/Classe";
import {ClasseEnfant} from "../../../../shared/model/ClasseEnfant";
import {Router} from "@angular/router";

@Component({
    selector: 'app-tz-add-enfant',
    templateUrl: './tz-add-enfant.component.html',
    styleUrls: ['./tz-add-enfant.component.scss']
})
export class TzAddEnfantComponent implements OnInit {

    loading: boolean;
    listNiveau: Classe;
    classe: ClasseEnfant;

    constructor(private dataService: DataService,
                private router: Router) {
    }

    ngOnInit() {
        this.loading = true;
        this.classe = new ClasseEnfant();
        this.getClasseParent().subscribe(response => {
            if (response.code === ConstantHTTP.CODE_SUCCESS) {
                console.log(response.data);
                this.listNiveau = response.data
                this.loading = false;
            }
        })
    }

    /**
     * Ajouter nouveau classe enfant
     * @param classe
     */
    save(classe: ClasseEnfant) {
        console.log(classe);
        this.loading = true
        this.dataService.post(urlList.path_edit_class_enfant, classe).subscribe((response) => {
            if (response.code === ConstantHTTP.CODE_SUCCESS) {
                this.loading = false
                this.router.navigate(['/menu/list-classe-eft']);
            }
        });
    }

    /**
     * Fetch classe parent
     */
    getClasseParent() {
        return this.dataService.post(urlList.path_list_class_parent);
    }
}
