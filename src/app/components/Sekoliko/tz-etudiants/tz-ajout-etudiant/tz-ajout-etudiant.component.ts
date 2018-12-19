import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';

@Component({
    selector: 'app-tz-ajout-etudiant',
    templateUrl: './tz-ajout-etudiant.component.html',
    styleUrls: ['./tz-ajout-etudiant.component.scss']
})
export class TzAjoutEtudiantComponent implements OnInit {

    validatingForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.validatingForm = fb.group({
            'required': [null, Validators.required],
        });
    }

    // constructor() {
    // }

    ngOnInit() {
    }
}
