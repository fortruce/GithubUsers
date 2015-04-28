module.exports = {
  set(key, val) {
    console.log('setting:', key);
    sessionStorage.setItem(key, val);
    return val;
  },

  get(key) {
    console.log('getting:', key);
    return sessionStorage.getItem(key);
  },

  remove(key) {
    sessionStorage.removeItem(key);
  },

  clear() {
    sessionStorage.clear();
  }
};