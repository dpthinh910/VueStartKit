import { LocalStorage } from 'quasar';
export function saveCurrenUserMutation(state, user) {
  state.currentUser = user.data.login.user;
  state.token = user.data.login.token;
  LocalStorage.set('USER_INFO', user.data.login.user);
  LocalStorage.set('USER_TOKEN', user.data.login.token);
  console.log(
    'saveCurrenUserMutation',
    user.data.login.user,
    user.data.login.token
  );
}
export function saveToken(state, token) {
  state.token = token;
  console.log('token', token);
}
export function saveUserStorage(userInfo) {
  LocalStorage.set('USER_INFO', userInfo);
}
