// src/AGB/Manager.js
import Config from './Config';
import Storage from './Storage';

export default class Manager {
  context;

  constructor(context) {
    this.context = context;

    this.context.Storage = new Storage();

    this.onInit();
  }

  onInit() {
    chrome.tabs.onUpdated.addListener(this.Check.bind(this));
    chrome.runtime.onMessage.addListener((a, c, b) => {
      b = "function" === typeof b ? b : null;
      if ((c = "object" === typeof c && c.tab ? c.tab.id : ""
          ) && "object" === typeof a && ("Log" === a.page ? window.console.log("AntiGameOrigin:  " + a.para) : "Storage" === a.page ? "Set" === a.role ? this.context.Storage.Set(a.para) : "Get" === a.role ? this.context.Storage.Get(a.para, b) : "Remove" === a.role ? this.context.Storage.Remove(a.para) : "RemoveFilter" === a.role && this.context.Storage.RemoveFilter(a.para, b) : "Update" === a.page ? "Check" === a.role && chrome.runtime.requestUpdateCheck(function (c) {
                                                                                                                                                                                                                                                                                                                                                                                                                                          this.message(a.para,
                                                                                                                                                                                                                                                                                                                                                                                                                                                              "Menu", "Install", c
                                                                                                                                                                                                                                                                                                                                                                                                                                          )
                                                                                                                                                                                                                                                                                                                                                                                                                                      }
          ) : a.page && OBJ.is(this.context[a.page]) && "function" === typeof this.context[a.page].Messages && this.context[a.page].Messages(a.role, a.para, b, c), b
          )) {
          return !0
      }
    });
  }

  initConfig() {
    this.context.Config = Config.createFromSystem();
  }

  initDataBase() {
    this.context.DataBase ? this.context.DataBase.Start(window) : this.context.DataBase = {};
  }

  initStorage() {
    this.context.Storage.Start(() => {
      let a = 1 < this.context.Config.beta ? "  - Development mode" : "";
      a += this.context.Storage.status ? "  Storage Quota: local " +
                                chrome.storage.local.QUOTA_BYTES + "  sync " + chrome.storage.local.QUOTA_BYTES : "  Something wrong with chrome.storage";
      this.context.Core.Log("Start  Storage: " + this.context.Storage.status + "  DataBase: " + this.context.DataBase.status + (a || ""
                    ), !0
      )
    });
  }

  Start() {
    this.context.status = 1;

    this.initConfig();
    this.initDataBase();
    this.initStorage();
  }
  
  Check(a, c, b) {
      OBJ.is(b) && OBJ.is(c) && "loading" === c.status && (c = this.context.App.Check(b.url), OBJ.is(c) && c.mode && this.Load(c, a)
      );
  }

  Load(a, c) {
      1 === a.mode && chrome.tabs.executeScript(c, {file: "js/coordinates.js", runAt: "document_start"})
  }
  
  loadScripts(a, c) {
      var b;
      if (OBJ.is(a) &&
          c) {
          for (b = 0; b < a.length; b++) {
              a[b] && chrome.tabs.executeScript(c, {
                                                    file: "js/" + a[b] + ".js",
                                                    runAt: "document_start"
                                                }
              )
          }
      }
  }

  message(a, c, b, d) {
      var f;
      (f = this.context.App.getPlayer(a)
      ) && chrome.tabs.query({url: "*://*.ogame.gameforge.com/*"}, function (a) {
                                var e;
                                for (e = 0; e < a.length; e++) {
                                    a[e] && a[e].id && chrome.tabs.sendMessage(a[e].id, {
                                                                                    player: f,
                                                                                    page: c,
                                                                                    role: b,
                                                                                    data: d
                                                                                }
                                    )
                                }
                            }
      )
  }
}
