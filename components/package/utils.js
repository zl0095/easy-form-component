export function isMobile() {
    if (window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
        return true; // 移动端
    }
    else {
        return false; // PC端
    }
}

export function getDistance(element) {
    // 获取元素的位置信息
    const rect = element.getBoundingClientRect();
    // 计算元素底部距离视口底部的距离
    const distanceToBottom = window.innerHeight - rect.bottom;
    return [distanceToBottom, rect];
}
