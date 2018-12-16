import {environment} from '../../../environments/environment';

const _api = environment.base_url_api + '/';

export const urlList = {
  path_login: _api + 'users/login',
  path_list_class_parent: _api + 'classe/find',
  path_list_class_enfant: _api + 'classe-enfant/find',
  path_edit_class: _api + 'class/edit/',
  path_list_salle: _api + 'salle/find',
  path_edit_salle: _api + 'salle/edit/',
  path_teste_user: _api + 'users',
  path_list_etudiants: _api + 'ins/find',
  path_list_proffesseurs: _api + 'prof/find',
  path_delete_salle: _api + 'salle/delete/',
  path_list_matiere: _api + 'matiere/find',
  path_delete_matiere: _api + 'matiere/delete/',
};
