function replaceAds() {
  var body = document.getElementsByTagName('body');
  if (!body || !body.length) return;

  body = body [0];
  var allPossibleAds = body.querySelectorAll('iframe, img');

  var adSizes = [
    {
      'name':'Leaderboard', 
      'width': 728, 
      'height': 90,
      'images': [
        'http://i.kinja-img.com/gawker-media/image/upload/t_k-bigpic/195no95aw7ue7png.png'
      ]
    },
    {
      'name':'Super Leaderboard', 
      'width': 970, 
      'height': 90,
      'images': [
        'http://i.kinja-img.com/gawker-media/image/upload/t_k-bigpic/195no95aw7ue7png.png'
      ]
    },
    {
      'name':'Medium Box', 
      'width': 300, 
      'height': 250,
      'images': [
        'http://i.imgur.com/lZw9kxK.gif',
        'http://static1.businessinsider.com/image/52f10e55eab8eae06bc2ff0e/reddits-hilarious-new-ad-sales-pitch-deck-with-doge-and-nicholas-cage-is-what-all-ad-sales-pitch-decks-should-be-like.jpg'
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

replaceAds();