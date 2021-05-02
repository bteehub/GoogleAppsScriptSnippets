function PushoverSendMessage(userKey, appToken, title, message)
{
  title = title.substring(0, Math.min(250, title.length));
  message = message.substring(0, Math.min(1024 - title.length, message.length));
  
  var postData = {
    "user": userKey,
    "token": appToken,
    "title": title,
    "message": message
  };
  
  var options = {
    "method": "post",
    "payload": postData
  };
  
  UrlFetchApp.fetch("https://api.pushover.net/1/messages.json", options);
}