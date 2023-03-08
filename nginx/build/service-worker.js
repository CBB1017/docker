self.addEventListener("install", function (e) {
    console.log("fcm sw install..");
    self.skipWaiting();
});

self.clients.matchAll().then(all => all.forEach(client => {
    client.postMessage("/*...message here...*/");
}));

self.addEventListener("push", function (e) {
    console.log(e)
    if (!e.data.json()) return;

    const resultData = e.data.json().notification;
    const notificationTitle = resultData.title;
    const notificationOptions = {
        body: resultData.body,
        icon: resultData.image, // 웹 푸시 이미지는 icon
        tag: resultData.tag,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
    console.log("notification click");
    const url = "/";
    event.notification.close();
    event.waitUntil(clients.openWindow(url));
});

// function requestPermission() {
// 	console.log("권한 요청 중...");
// 	Notification.requestPermission().then((permission) => {
// 		if (permission === "granted") {
// 			console.log("알림 권한이 허용됨");
// 		} else {
// 			console.log("알림 권한 허용 안됨");
// 		}
// 	});
// }
useEffect(() => {
    if('serviceWorker' in navigator){
        const registInit = async () => {
            const registration = await navigator.serviceWorker.register('/service-worker.js');

            registration?.waiting?.postMessage({ type: 'SKIP_WAITING' });
            // const installingWorker = registration.installing;
            // if (installingWorker == null) {
            // 	console.log('null')
            // 	return;
            // }
            // installingWorker.onstatechange = () => {
            // 	if (installingWorker.state === 'installed') {
            // 		if (navigator.serviceWorker.controller) {
            // 			toast("test");
            // 		}
            // 	}
            // }
            requestPermission();
            navigator.serviceWorker.addEventListener('message', event => {
                // use `event.data`
            });
        }
        registInit();


    }
}, [])