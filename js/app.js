// app.js

// 检查浏览器是否支持 Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope: ', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker registration failed: ', error);
      });
  });
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // 阻止默认的提示弹出
  e.preventDefault();
  // 保存事件以便稍后触发
  deferredPrompt = e;

  // 可以在合适的时机自定义展示安装提示按钮
  const installButton = document.getElementById('install-button');
  installButton.style.display = 'block';

  installButton.addEventListener('click', () => {
    // 显示安装提示
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('用户安装了应用');
      } else {
        console.log('用户取消了安装');
      }
      deferredPrompt = null;
    });
  });
});