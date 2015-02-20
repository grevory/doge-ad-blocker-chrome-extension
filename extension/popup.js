chrome.storage.sync.get('disabled', function(value) {
  if (value.disabled) {
    hideButton('disable-doge');
  } else {
    hideButton('enable-doge');
  }
});

function getMessageElement(index) {
  var elem = document.getElementById('message-block-' + (+index));
  if (!elem) {
    return getMessageElement();
  }
  return elem;
}


function waterfallMessages(messages, index) {
if (!index) {
  index = 0;
}
  function nextMessage(index) {
    if (index < messages.length-1) {
      return showMessage(messages[index+1], index+1, nextMessage);
    }
    return null;
  }

  if (!index) {
    index = 0;
  }
  // Show this message
  showMessage(messages[index], index, nextMessage);
}

function showMessage(message, index, callback) {
  var element = getMessageElement(index);
  element.innerHTML = message;
  element.style.opacity = 1;
  fadeMessage(index, 2, callback);
}

function fadeMessage(index, delay, callback) {
  var element = getMessageElement(index);
  // Convert delay to ms
  delay = (delay>100 ? delay : delay*1000);
  setTimeout(function(){
    if (callback) {
      callback(index);
    }
  }, delay/2);
  setTimeout(function(){
    element.style.opacity = 0;
  }, delay);
}


// function showMessage(message) {

//   var element = document.getElementById('message-block');

//   element.innerHTML = message;
//   element.style.width = 'auto';
//   element.style.opacity = 1;
//   setTimeout(function(){
//     element.style.opacity = 0;
//     setTimeout(function(){
//       element.style.width = '0px';
//     }, 1000);
//   }, 5000);
// }

function hideButton(elementId) {
  document.getElementById(elementId).style.display = 'none';
}
function showButton(elementId) {
  document.getElementById(elementId).style.display = 'inline-block';
}

function toggleButtons() {
  chrome.storage.sync.get('disabled', function(value) {
    if (value.disabled) {
      hideButton('disable-doge');
      showButton('enable-doge');
    } else {
      hideButton('enable-doge');
      showButton('disable-doge');
    }
  });
}

function disableExtension() {
  chrome.storage.sync.set({'disabled': true}, function() {
    // Notify that we saved.
    waterfallMessages(['So disable', 'Much ads', 'Wow']);
    toggleButtons();
  });
}
document.getElementById('disable-doge').addEventListener('click', disableExtension);

function enableExtension() {
  chrome.storage.sync.set({'disabled': false}, function() {
    // Notify that we saved.
    waterfallMessages(['Many Doge', 'Such Enable', 'Wow']);
    toggleButtons();
  });
}
document.getElementById('enable-doge').addEventListener('click', enableExtension);