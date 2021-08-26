console.log(window)
console.log('Notification' in window)

consoel.log(window.Notification)

Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
