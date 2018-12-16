import { Component, OnInit } from '@angular/core';
// import {LiveAnnouncer} from "@angular/cdk/a11y";
// import {Overlay} from "@angular/cdk/overlay";
// import {IKeyboardLayouts, MatKeyboardService} from '@ngx-material-keyboard/core';

@Component({
  selector: 'app-tz-payements-ajout',
  templateUrl: './tz-payements-ajout.component.html',
  styleUrls: ['./tz-payements-ajout.component.scss']
})



export class TzPayementsAjoutComponent implements OnInit {
  //
  // /**
  //  * Reference to the current keyboard in the view *at this level* (in the Angular injector tree).
  //  * If there is a parent keyboard service, all operations should delegate to that parent
  //  * via `_openedKeyboardRef`.
  //  */
  // private _keyboardRefAtThisLevel: MatKeyboardRef<any> | null = null;
  //
  // private _availableLocales: ILocaleMap = {};
  //
  // /** Reference to the currently opened keyboard at *any* level. */
  // private get _openedKeyboardRef(): MatKeyboardRef<MatKeyboardComponent> | null {
  //   const parent = this._parentKeyboard;
  //   return parent ? parent._openedKeyboardRef : this._keyboardRefAtThisLevel;
  // }
  //
  // private set _openedKeyboardRef(value: MatKeyboardRef<MatKeyboardComponent>) {
  //   if (this._parentKeyboard) {
  //     this._parentKeyboard._openedKeyboardRef = value;
  //   } else {
  //     this._keyboardRefAtThisLevel = value;
  //   }
  // }
  // overlay: Overlay, _live: LiveAnnouncer, _defaultLocale: string, _layouts: IKeyboardLayouts, _parentKeyboard: MatKeyboardService

  constructor() { }

  ngOnInit() {
  }

  dismiss() {
    // if (this._openedKeyboardRef) {
    //   this._openedKeyboardRef.dismiss();
    // }
  }


}
