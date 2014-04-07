// qwest - Uses a modified version of https://github.com/pyrsmk/qwest v0.5.5
!function(a){"function"==typeof define?define(a):"undefined"!=typeof module?module.exports=a:this.qwest=a}(function(){var win=window,limit=null,requests=0,request_stack=[],getXHR=function(){return win.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")},version2=""===getXHR().responseType,qwest=function(method,url,data,options,before){data=data||null,options=options||{};var typeSupported=!1,xhr=getXHR(),async=void 0===options.async?!0:!!options.async,cache=options.cache,type=options.type?options.type.toLowerCase():"json",user=options.user||"",password=options.password||"",headers={},accepts={xml:"application/xml, text/xml",html:"text/html",json:"application/json, text/javascript",js:"application/javascript, text/javascript"},toUpper=function(a,b,c){return b+c.toUpperCase()},vars="",i,j,parseError="parseError",serialized,success_stack=[],error_stack=[],complete_stack=[],response,success,error,func,promises={success:function(a){return async?success_stack.push(a):success&&a.apply(xhr,[response]),promises},error:function(a){return async?error_stack.push(a):error&&a.apply(xhr,[response]),promises},complete:function(a){return async?complete_stack.push(a):a.apply(xhr),promises}},promises_limit={success:function(a){return request_stack[request_stack.length-1].success.push(a),promises_limit},error:function(a){return request_stack[request_stack.length-1].error.push(a),promises_limit},complete:function(a){return request_stack[request_stack.length-1].complete.push(a),promises_limit}},handleResponse=function(){var i,req,p;if(--requests,request_stack.length){for(req=request_stack.shift(),p=qwest(req.method,req.url,req.data,req.options,req.before),i=0;func=req.success[i];++i)p.success(func);for(i=0;func=req.error[i];++i)p.error(func);for(i=0;func=req.complete[i];++i)p.complete(func)}try{if(!/^2/.test(xhr.status))throw xhr.status+" ("+xhr.statusText+")";var responseText="responseText",responseXML="responseXML";if(typeSupported&&void 0!==xhr.response)response=xhr.response;else switch(type){case"json":try{response=win.JSON?win.JSON.parse(xhr[responseText]):eval("("+xhr[responseText]+")")}catch(e){throw"Error while parsing JSON body"}break;case"js":response=eval(xhr[responseText]);break;case"xml":if(!xhr[responseXML]||xhr[responseXML][parseError]&&xhr[responseXML][parseError].errorCode&&xhr[responseXML][parseError].reason)throw"Error while parsing XML body";response=xhr[responseXML];break;default:response=xhr[responseText]}if(success=!0,async)for(i=0;func=success_stack[i];++i)func.apply(xhr,[response])}catch(e){if(error=!0,response="Request to '"+url+"' aborted: "+e,async)for(i=0;func=error_stack[i];++i)func.apply(xhr,[response])}if(async)for(i=0;func=complete_stack[i];++i)func.apply(xhr)};if(limit&&requests==limit)return request_stack.push({method:method,url:url,data:data,options:options,before:before,success:[],error:[],complete:[]}),promises_limit;if(++requests,win.ArrayBuffer&&(data instanceof ArrayBuffer||data instanceof Blob||data instanceof Document||data instanceof FormData))"GET"==method&&(data=null);else{var values=[],enc=encodeURIComponent;for(i in data)void 0!==data[i]&&values.push(enc(i)+(data[i].pop?"[]":"")+"="+enc(data[i]));data=values.join("&"),serialized=!0}if("GET"==method&&(vars+=data),null==cache&&(cache="POST"==method),cache||(vars&&(vars+="&"),vars+="__t="+Date.now()),vars&&(url+=(/\?/.test(url)?"&":"?")+vars),xhr.open(method,url,async,user,password),type&&version2)try{xhr.responseType=type,typeSupported=xhr.responseType==type}catch(e){}version2?xhr.onload=handleResponse:xhr.onreadystatechange=function(){4==xhr.readyState&&handleResponse()};for(i in headers)j=i.replace(/(^|-)([^-])/g,toUpper),headers[j]=headers[i],delete headers[i],xhr.setRequestHeader(j,headers[j]);return!headers["Content-Type"]&&serialized&&"POST"==method&&xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),headers.Accept||xhr.setRequestHeader("Accept",accepts[type]),before&&before.apply(xhr),xhr.send("POST"==method?data:null),promises};return{get:function(a,b,c,d){return qwest("GET",a,b,c,d)},post:function(a,b,c,d){return qwest("POST",a,b,c,d)},xhr2:version2,limit:function(a){limit=a}}}());

(function(){

  // The HTML elements that will be matched for ad size
  var tagsToReplace = 'iframe, img, embed'
  // Give the ad 200ms to load before replacing them
  var delayBeforeReplacingAds = 2000;
  
  // IMGUR settings
  var imgurApiClientId = '589f5cc4c215981';
  var imgurApiUrl = 'https://api.imgur.com/3/album/';

  // Data about the doge ads
  var dogeAds = [
    {
      'name': '728x90',
      'width': 728,
      'height': 90,
      'imgurAlbumId': '7KlBQ'
    },
    {
      'name': '970x90',
      'width': 970,
      'height': 90,
      'imgurAlbumId': '7KlBQ'
    },
    {
      'name': '300x250',
      'width': 300,
      'height': 250,
      'imgurAlbumId': 'XKatw'
    },
    {
      'name': '160x600',
      'width': 160,
      'height': 600,
      'imgurAlbumId': 'DKzVu'
    },
    {
      'name': '336x280',
      'width': 336,
      'height': 280,
      'imgurAlbumId': 'XKatw'
    },
    {
      'name': '125x125',
      'width': 125,
      'height': 125,
      'imgurAlbumId': 'XKatw'
    }
  ];

  function getRandomAd(images) {
    return images[Math.floor(Math.random() * images.length)];
  }

  function matchAds(adWidth, adHeight, adImages) {
    var body, allPossibleAds, adWidth, adHeight, matchedAd;

    // Get the body - we will search it for tags
    body = document.getElementsByTagName('body');
    if (!body || !body.length) return;
    // There should only be one body tag so let's choose that one
    body = body[0];

    // Get all the tags that we want to match for this size
    allPossibleAds = body.querySelectorAll(tagsToReplace);

    if (!adWidth)
      adWidth = adImage.width;
    if (!adHeight)
      adHeight = adImage.height;

    Array.prototype.forEach.call(allPossibleAds, function(el, i) {
      if (el.offsetWidth == adWidth && el.offsetHeight == adHeight) {
        matchedAd = true;
        if (adImages) {
          el.outerHTML = '<div style="width:'+adWidth+'px; height:'+adHeight+'px; background: url('+getRandomAd(adImages).link+'); no-repeat fixed; -webkit-background-size: cover; border: 1px solid #ddd"></div>';
        }
      }
    });

    return !!matchedAd;
  }

  function requestImages(adData) {
    var data = {},
      options = { cache: true },
      setAuthorization = function(){
        this.setRequestHeader('Authorization', 'Client-ID ' + imgurApiClientId);
      };

    qwest.get(imgurApiUrl + adData.imgurAlbumId, data, options, setAuthorization)
      .success(function(response) {
        matchAds(adData.width, adData.height, response.data.images);
      });
  }

  setTimeout(function() {
    dogeAds.forEach(function(adData) {
      if (matchAds(adData.width, adData.height)) {
        requestImages(adData);
      }
    });
  }, delayBeforeReplacingAds);
})();