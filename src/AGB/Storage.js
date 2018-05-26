// src/AGB/Storage.js

export default class Storage {
  status = 0;

  Start(cb) {
    AGB.Storage.status = 0;

    try {
      if (chrome.storage === undefined || chrome.storage.local === undefined) {
        throw new Error('unsupported storage engine');
      }

      let c = Math.floor(Date.now() / 1E3);

      chrome.storage.local.set({App_Start: c}, () => {
        chrome.storage.local.get(["App_Start"], (b) => {
          AGB.Storage.status = OBJ.is(b) && +b.App_Start === c ? 1 : 0;
          cb();
        });
      });
    } catch (err) {
      cb();
    }
  }

  Set({sync = 'local', key = null, data}, cb) {
    let b, d;

    b = sync;

    if (key) {
      d = {};
      d[key] = data;
    } else {
      d = data;
    }

    if (OBJ.is(d) && Object.keys(d).length) {
      if (cb) {
        chrome.storage[b].set(d, function () {
          c(chrome.runtime.lastError ? -1 :
            1
          )
        });
      } else {
        chrome.storage[b].set(d);
      }
    }
  }
  
  Get({sync = 'local', key = null}, c) {
    let b = sync;

    if (key && c) {
      if (OBJ.is(key)) {
        chrome.storage[b].get(Object.keys(key), c);
      } else {
        chrome.storage[b].get(key, function (b) {
          c(OBJ.is(b) ? b[key] || "" : "")
        });
      }

      return;
    }

    if (c) {
      c('');
    }
  }
  
  Remove({sync = 'local', key = null}) {
    let c = sync;

    if (key) {
      AGB.Core.Log("Delete - storage  - " + key, !0), chrome.storage[c].remove(key)
    }
  }

  List({filter = null}) {
    chrome.storage.local.get(null, (c) => {
      OBJ.iterate(c, (b) => {
        if (filter &&
          0 !== STR.check(b).indexOf(filter)
        ) {
          return;
        }
        
        AGB.Core.Log("List - storage  - " + b, !0);
      });
    });

    chrome.storage.sync.get(null, (c) => {
      OBJ.iterate(c, (b) => {
        if (filter && 0 !== STR.check(b).indexOf(filter)) {
          return;
        }
        
        AGB.Core.Log("List - sync  - " + b, !0);
      });
    });
  }

  RemoveFilter(a) {
    OBJ.is(a) && (chrome.storage.local.get(null, function (c) {
                                               OBJ.iterate(c, function (b) {
                                                               a.filter && 0 !== STR.check(b).indexOf(a.filter) || (AGB.Core.Log("Delete - storage  - " + b, !0), chrome.storage.local.remove(b)
                                                               )
                                                           }
                                               )
                                           }
    ), chrome.storage.sync.get(null, function (c) {
                                   OBJ.iterate(c,
                                               function (b) {
                                                   a.filter && 0 !== STR.check(b).indexOf(a.filter) || (AGB.Core.Log("Delete - sync  - " + b, !0), chrome.storage.sync.remove(b)
                                                   )
                                               }
                                   )
                               }
    )
    )
  }
  
  Sync(a) {
  }
}
