import Manager from 'AGB/Manager';

if ( ! AGB ) { var AGB = {}; }

window.AGB.Config = {

	id													: '',
	beta												: 0,					// 0 final,		1 beta, log		2  alpha, log + constant.js		3 alpha, log + constant.js +  log content to background
	version												: '',
	
	pathSkin											: ''
 };





window.AGB.Core = {

		

	Log: function( text, force )						{ if ( window.AGB.Config.beta || force ) { window.console.log( 'AntiGameOriginX:  ' + text ); } },



	setTimeout: function( callback, delay )				{ return window.setTimeout( callback, delay ); },
		
		
		
	clearTimeout: function( timer )						{ if ( timer ) { window.clearTimeout( timer ); timer = null; } },
		

		
	resourceFile: function( file ) {
		var request;
		
		if ( file ) {
		
			try {
			
				request									= new XMLHttpRequest();
				request.open( 'GET', chrome.extension.getURL( file ), false );
				request.overrideMimeType( 'text/plain' );														//	"text/plain;charset=UTF-8"
				request.send( null );																			// Synchron !
				
				return request.responseText || '';
			}
			catch (e)									{ return ''; }
		}
		return ''; 
	}
};
	
	

window.setTimeout( function() {
  if ( window.AGB.Manager ) {
    // window.AGB.Manager.Start();
    const manager = new Manager(window.AGB);

    manager.Start();
  }
}, 1000 );							// Use a timeout
