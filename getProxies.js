//Get proxies from different source

const { spawn } = require('child_process');
const request = require("request");
var fs = require('fs');
const Chromeless = require('chromeless').Chromeless;
const Chromelauncher = require('chrome-launcher');


//Get proxies from chill's project
function getChillProxies() {
  const child = spawn('proxy-lists', ['getProxies', '--protocols="http"']);
  console.log('ChillProxies Updated!');
}

//Get proxies from fate0's project
function getFate0Proxy() {
  var url = 'https://raw.githubusercontent.com/fate0/proxylist/master/proxy.list'

  request({
      url: url,
      json: true
  }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
          var proxylist = body.split('\n');
          fs.writeFileSync('fate0Proxies.txt', '', 'utf8');
          for(var n = 0; n <  proxylist.length - 1; n++) {
              var proxytype = JSON.parse(proxylist[n]).type;
              if(proxytype === 'http') {
                fs.appendFile('fate0Proxies.txt', JSON.parse(proxylist[n]).host + ':' + JSON.parse(proxylist[n]).port + '\n', function (err) {
                  if (err) throw err;
                });
              }
          }
          console.log('Fate0Proxy Updated!');
      }
      else {
         console.log('Response Code is ' + response.statusCode);
      }
  });
}

async function getProxies24() {
    const chrome = await Chromelauncher.launch({
      port: 9222,
      chromeFlags: [
        '--window-size=1200,800',
        '--disable-gpu',
        '--headless'
      ]
    });

    const chromeless = new Chromeless({
      launchChrome: false
    })

    var proxyContent = await chromeless
    .goto('http://www.proxyserverlist24.top/')
    .wait(10000)
    .click('div.date-posts > div.post-outer:first-child > div > h3 > a')
    .wait(10000)
    .evaluate(function() {
      var content = document.querySelector('pre.alt2').innerHTML;
      return content;
    })

    await chromeless.end();

    var proxylist = proxyContent.split('\n');
    fs.writeFileSync('Proxies24.txt', '', 'utf8');
    for(var n = 1; n <  proxylist.length - 1; n++) {
        fs.appendFile('Proxies24.txt', proxylist[n] + '\n', function (err) {
          if (err) throw err;
        });
    }
    console.log('Proxies24 Updated!');
}


//////////////////////////////////////////////////////////////////////////////////////
getChillProxies();
getFate0Proxy();
getProxies24();

setTimeout(function() {
  process.exit();
}, 60000);
