function replaceAds() {
  var body = document.getElementsByTagName('body');
  if (!body || !body.length) return;

  body = body [0];
  var allPossibleAds = body.querySelectorAll('iframe, img');

  var dogeUrl = 'http://i.imgur.com/SAcQS1n.gif';
  var adSizes = [
    {'name':'Leaderboard', 'width': 728, 'height': 90},
    {'name':'Medium Box', 'width': 300, 'height': 250}
  ];

  Array.prototype.forEach.call(allPossibleAds, function(el, i){

    adSizes.forEach(function(adSize, i){
      if (el.offsetWidth == adSize.width && el.offsetHeight == adSize.height) {
        el.outerHTML = '<div style="width:'+adSize.width+'px; height:'+adSize.height+'px; background: url('+dogeUrl+'); border: 1px solid #ddd"></div>';
      }
    });
  });
}

replaceAds();