self.addEventListener("push", (event) => {
  if (!event.data) return;

  const { title, message } = event.data.json();

  const options = {
    body: message,
    icon: "/favi-black.png",
    badge: "/favi-black.png",
  };

  event.waitUntil(
    (async () => {
      // Mostra a notificação
      await self.registration.showNotification(title, options);

      // Envia mensagem para todas as janelas abertas do site
      const windows = await clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });
      windows.forEach((win) => {
        win.postMessage({ type: "playSound" });
      });
    })()
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow("/home"));
});
