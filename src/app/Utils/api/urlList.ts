import {environment} from '../../../environments/environment';

const _api = environment.base_url_api + '/';

export const urlList = {
  path_login: _api + 'users/login',
};
