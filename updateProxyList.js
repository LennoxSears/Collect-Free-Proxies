//Updating all available proxies every 15 minutes

const fs = require('fs')
const {spawnSync} = require('child_process');
var ProxyVerifier = require('proxy-verifier');
var geoip = require('geoip-lite')

var y = require('events').EventEmitter.prototype._maxListeners = 1000;
//Updating Proxy Source
function updateProxySource() {
    const child = spawnSync('node', ['getProxies.js']);
    console.log('Proxy source updated!');
}

var proxyArray = new Array();
exports.proxyArray = proxyArray;
var proxyIndex = 0;
exports.proxyIndex = proxyIndex;

//Update proxies from fate0 File
function updateFate0Proxies() {
      console.log('Rogue That, Fate0');
      var content = fs.readFileSync('fate0Proxies.txt', 'utf8');

      var fate0proxy = content.split('\n');
      //console.log('proxies length is ' + fate0proxy.length);
      for(var n = 0; n < fate0proxy.length - 1; n++) {
        proxyArray.push(fate0proxy[n]);
        console.log('Got ' + proxyArray.length + ' proxies available now.');
      }
}

//Update proxies from chill File
function updateChillProxies() {
      console.log('Rogue That, Chill');
      var content = fs.readFileSync('proxies.txt', 'utf8');

      var fate0proxy = content.split('\n');
      //console.log('proxies length is ' + fate0proxy.length);
      for(var n = 0; n < fate0proxy.length - 1; n++) {
        proxyArray.push(fate0proxy[n]);
        console.log('Got ' + proxyArray.length + ' proxies available now.');
      }
}

//Update proxies from proxies24
function update24Proxies() {
      console.log('Rogue That, 24');
      var content = fs.readFileSync('Proxies24.txt', 'utf8');

      var fate0proxy = content.split('\n');
      //console.log('proxies length is ' + fate0proxy.length);
      for(var n = 0; n < fate0proxy.length - 1; n++) {
        proxyArray.push(fate0proxy[n]);
        console.log('Got ' + proxyArray.length + ' proxies available now.');
      }
}

//Check proxies
var checkedProxies = new Array();
function check(proxyT) {
    var valid = false;
    var proxy = {
    	ipAddress: proxyT.split(':')[0],
    	port: proxyT.split(':')[1],
    	protocol: 'http'
    };
    ProxyVerifier.testAll(proxy, function(error, result) {
    	if (error) {
    		// Some unusual error occurred.
    	} else {
    		//console.log('Proxy:' + proxyT + '' + JSON.stringify(result));
        if(result.protocols.http.ok && result.anonymityLevel == 'elite') {
          if(geoip.lookup(proxyT.split(':')[0])) {
            if(geoip.lookup(proxyT.split(':')[0])) {
              console.log(geoip.lookup(proxyT.split(':')[0]).country);
              checkedProxies.push(proxyT);
              console.log('Valid Proxy Found ' + proxyT);
              console.log(JSON.stringify(result));
              console.log(checkedProxies.length + ' Valid Proxies in Pool!!!');
            }
          }
        }
    	}
    });
    return valid;
}

//Update total avaiable proxy list
function updateTotalProxies () {
  console.log('Enemy down');
  updateProxySource();
  updateFate0Proxies();
  updateChillProxies();
  update24Proxies();
  setTimeout(function(){
    var uniqProxy = [ ...new Set(proxyArray) ];
    proxyArray.length = 0;
    console.log(uniqProxy.length + ' Proxies Found!');
    checkedProxies.length = 0;
    for(var n = 0; n < uniqProxy.length; n++) {
      check(uniqProxy[n]);
    }
  },60000);
  setTimeout(function(){
    fs.writeFileSync('totalProxyList.txt', '', 'utf8');
    for(var n = 0; n < checkedProxies.length; n++) {
      fs.appendFile('totalProxyList.txt', checkedProxies[n] + '\n', function(err) {
        if (err) throw err;
      });
    }
  }, 850000)
}

////////////////////////////////////////////////////////////////////////////////
updateTotalProxies();


setInterval(function() {
  updateTotalProxies();
}, 900000)
