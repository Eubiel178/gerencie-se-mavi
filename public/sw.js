// public/sw.js
self.addEventListener("push", (event) => {
  if (!event.data) return;

  const { title, message } = event.data.json();

  const options = {
    body: message,
    icon: "/favi-black.png", // opcional
    badge: "/favi-black.png", // opcional
  };

  // Mostra a notificação
  event.waitUntil(self.registration.showNotification(title, options));

  // Envia mensagem para todas as janelas abertas do site
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windows) => {
        windows.forEach((win) => {
          win.postMessage({ type: "playSound" }); // mensagem para tocar som
        });
      })
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow("/home"));
});
