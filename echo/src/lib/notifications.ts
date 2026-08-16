export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) return 'denied'
  if (Notification.permission === 'granted') return 'granted'
  return await Notification.requestPermission()
}

export function showNotification(title: string, body: string): void {
  if (!('Notification' in window) || Notification.permission !== 'granted') return
  navigator.serviceWorker?.ready.then((reg) => {
    reg.showNotification(title, {
      body,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: 'note-keeper',
      vibrate: [200, 100, 200],
    } as NotificationOptions)
  }).catch(() => {
    new Notification(title, { body, icon: '/icon-192.png' })
  })
}
