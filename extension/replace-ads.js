function replaceAds() {
  var body = document.getElementsByTagName('body');
  if (!body || !body.length) return;

  body = body [0];
  var allPossibleAds = body.querySelectorAll('iframe, img, embed');

  var adSizes = [
    {
      'name':'Leaderboard', 
      'width': 728, 
      'height': 90,
      'images': [
        'http://i.imgur.com/LDEy8k0.png',
        'http://i.imgur.com/nFdji0P.png',
        'http://i.imgur.com/yntRx43.png',
        'http://i.imgur.com/dUHohTR.png',
        'http://i.imgur.com/hKetzyR.png'
      ]
    },
    {
      'name':'Super Leaderboard', 
      'width': 970, 
      'height': 90,
      'images': [
        'http://i.imgur.com/LDEy8k0.png',
        'http://i.imgur.com/nFdji0P.png',
        'http://i.imgur.com/yntRx43.png',
        'http://i.imgur.com/dUHohTR.png',
        'http://i.imgur.com/hKetzyR.png'
      ]
    },
    {
      'name':'Medium Box', 
      'width': 300, 
      'height': 250,
      'images': [
        'http://i.imgur.com/lZw9kxK.gif',
        'http://static1.businessinsider.com/image/52f10e55eab8eae06bc2ff0e/reddits-hilarious-new-ad-sales-pitch-deck-with-doge-and-nicholas-cage-is-what-all-ad-sales-pitch-decks-should-be-like.jpg',
        'http://i.imgur.com/fwE8Uln.png',
        'http://i.imgur.com/DwPb4YS.png',
        'http://i.imgur.com/RHpg2vH.png',
        'http://i.imgur.com/oNkAKCA.png',
        'http://i.imgur.com/eoUG1VB.png',
        'http://i.imgur.com/4iZEHk3.png',
        'http://i.imgur.com/nGC8rXL.png',
        'http://i.imgur.com/9JhzBq6.png',
        'http://i.imgur.com/j7sUvyF.png',
        'http://i.imgur.com/7R624yW.png',
        'http://i.imgur.com/QfnRjuH.png',
        'http://i.imgur.com/YcoI4Z6.png',
        'http://i.imgur.com/LfoGwqi.png',
        'http://i.imgur.com/oDN2uj2.png',
        'http://i.imgur.com/rP8FG2Y.png',
        'http://i.imgur.com/3GFqXKX.png',
        'http://i.imgur.com/9kGYZ87.png',
        'http://i.imgur.com/2zAVpk9.gif',
        'http://i.imgur.com/AvqFjYf.gif',
        'http://i.imgur.com/ymemO8P.gif',
        'http://i.imgur.com/DE7lcsR.gif'
      ]
    },
    {
      'name': 'Skyscraper',
      'width': 160,
      'height': 600,
      'images': [
        'http://i.imgur.com/Xlm5ZbB.png',
        'http://i.imgur.com/jayUboX.png',
        'http://i.imgur.com/0SRPVAQ.png',
        'http://i.imgur.com/3G70mJI.png',
        'http://i.imgur.com/K3DTblP.png',
        'http://i.imgur.com/bauysYa.png'
      ]
    }
  ];

  Array.prototype.forEach.call(allPossibleAds, function(el, i){
    adSizes.forEach(function(adSize, i){
      if (el.offsetWidth == adSize.width && el.offsetHeight == adSize.height) {
        el.outerHTML = '<div style="width:'+adSize.width+'px; height:'+adSize.height+'px; background: url('+adSize.images[Math.floor(Math.random() * adSize.images.length)]+'); no-repeat fixed; -webkit-background-size: cover; border: 1px solid #ddd"></div>';
      }
    });
  });
}

setTimeout(function() { replaceAds(); }, 2000);