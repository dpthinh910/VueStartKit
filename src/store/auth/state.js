import { LocalStorage } from 'quasar';
export default {
  getCurrentUserGetter: LocalStorage.getItem('USER_INFO'),
  currentUser: LocalStorage.getItem('USER_INFO'),
};
