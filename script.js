const homeButton = document.getElementById('homeButton');
const aboutButton = document.getElementById('aboutButton');
const appElement = document.getElementById('app');

function renderContent(content) {
    appElement.innerHTML = content;
}

function navigateToPage(pageName) {
    const pageTitle = pageName.charAt(0).toUpperCase() + pageName.slice(1); // Capitalize pageName
    const pageContent = `<h1>${pageTitle}</h1><p>${pageName === 'home' ? 'Welcome to the Home Page!' : 'We are a simple SPA.'}</p>`;
    
    renderContent(pageContent);

    // 更新 URL 路由
    history.pushState({ page: pageName }, pageTitle, `/${pageName}`);
}

homeButton.addEventListener('click', function() {
    navigateToPage('home');
});

aboutButton.addEventListener('click', function() {
    navigateToPage('about');
});

// 在浏览器前进后退时更新页面内容
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.page) {
        navigateToPage(event.state.page);
    }
});

// 初始化页面为首页
navigateToPage('home');
