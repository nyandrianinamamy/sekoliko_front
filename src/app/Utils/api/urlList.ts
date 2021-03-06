import {environment} from '../../../environments/environment';

const _api = environment.base_url_api + '/';

export const urlList = {
  path_login: _api + 'users/login',
  path_anne_scolaire: _api + 'addas',
  path_anne_list: _api + 'listans',
  path_edt_list: _api + 'edt/find',
  path_edt_add: _api + 'edt/edit',
  path_edt_edit: _api + 'edt/edit/',
  path_edt_del: _api + 'edt/delete/',
  path_list_class_parent: _api + 'classe/find',
  path_list_class_enfant: _api + 'classe-enfant/find',
  path_list_class_enfant_edt: _api + 'classe-enfant/find/',
  path_edit_class_enfant: _api + 'classe-enfant/edit',
  path_delete_class_enfant: _api + 'classe-enfant/delete/',
  path_edit_class: _api + 'classe/edit',
  path_mod_class: _api + 'classe/edit/',
  path_delete_class: _api + 'classe/delete/',
  path_list_salle: _api + 'salle/find',
  path_list_classe: _api + 'classe-enfant/find',
  path_edit_salle: _api + 'salle/edit',
  path_mod_salle: _api + 'salle/edit/',
  path_teste_user: _api + 'users',
  path_list_etudiants: _api + 'ins/find',
  path_list_proffesseurs: _api + 'prof/find',
  path_delete_salle: _api + 'salle/delete/',
  path_list_matiere: _api + 'matiere/find',
  path_delete_matiere: _api + 'matiere/delete/',
  path_add_matiere: _api + 'matiere/edit',
  path_edit_matiere: _api + 'matiere/edit/',
  path_user_find: _api + 'user/edit',
  path_type_role: _api + 'user/role',
  path_find_role: _api + 'role/find',
  path_find_user: _api + 'user/find',
  path_find_annee_scolaire: _api + 'listans',
  path_add_inscription: _api + 'addins',
  path_reservation_salle: _api + 'salle/reservation/',
  path_add_note: _api + 'addnote',
  path_edit_note: _api + 'editnote',
  path_get_note: _api + 'notes/find/',
  path_get_note_etudiant: _api + 'notes-etudiant/find',
  path_ets: _api + 'etablissement/find'
};
