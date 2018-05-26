// js/XDom.js
export default class XDom {
  static query(a, b) {
    return "string" === typeof a ? b ? "object" === typeof b ? b.querySelector(a) : "id" === b ? document.getElementById(a) : document.getElementById(b) ? document.getElementById(b).querySelector(a) : null : document.querySelector(a) : a
  }
}
