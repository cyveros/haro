// src/AGB/Config.js

export default class Config {
  id = '';
	beta = 0; // 0 final,		1 beta, log		2  alpha, log + constant.js		3 alpha, log + constant.js +  log content to background
	version	= '';
  pathSkin = '';
  
  static createFromSystem() {
    let config = new Config();

    config.pathSkin = chrome.extension.getURL("/skin/");
    config.id = chrome.runtime.id;
    config.version = chrome.runtime.getManifest().version;
    config.name = STR.check(chrome.runtime.getManifest().name);
    config.beta = -1 < config.name.indexOf("Alpha") ? 2 : -1 < config.name.indexOf("Beta") ? 1 : 0;

    return config;
  }
}
