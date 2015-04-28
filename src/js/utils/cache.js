module.exports = {
  set(key, val) {
    sessionStorage.setItem(key, JSON.stringify(val));
    return val;
  },

  get(key) {
    var item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  },

  remove(key) {
    sessionStorage.removeItem(key);
  },

  clear() {
    sessionStorage.clear();
  }
};