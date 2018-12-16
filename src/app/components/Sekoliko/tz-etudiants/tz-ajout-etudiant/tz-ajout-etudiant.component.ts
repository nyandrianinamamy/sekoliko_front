import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {User} from '../../../../shared/model/User';
import {Inscription} from '../../../../shared/model/Inscription';
import {DataService} from '../../../../shared/service/data.service';

@Component({
    selector: 'app-tz-ajout-etudiant',
    templateUrl: './tz-ajout-etudiant.component.html',
    styleUrls: ['./tz-ajout-etudiant.component.scss']
})
export class TzAjoutEtudiantComponent implements OnInit {

    validatingForm: FormGroup;
    etudiant: User;
    inscription: Inscription;

    constructor(private fb: FormBuilder,
                private dataService: DataService
                ) {
        this.validatingForm = fb.group({
            'required': [null, Validators.required],
        });
    }
    ngOnInit() {
    }
}
