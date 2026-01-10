function updateClock() {
    const now = new Date();
    
    // 시간, 분, 초를 2자리 숫자로 포맷팅
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // 시:분:초 형식으로 표시
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    // DOM 요소에 시간 표시
    const timeElement = document.getElementById('time');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// 페이지 로드 시 즉시 시간 표시
updateClock();

// 1초마다 시간 갱신
setInterval(updateClock, 1000);
