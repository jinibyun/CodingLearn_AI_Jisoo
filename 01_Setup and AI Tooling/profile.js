// 명함 페이지 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('명함 페이지가 로드되었습니다.');
    
    // QR 코드 클릭 이벤트 (선택사항)
    const qrCode = document.querySelector('.qr-code');
    if (qrCode) {
        qrCode.addEventListener('click', function() {
            console.log('QR 코드가 클릭되었습니다.');
            // 실제 구현 시 QR 코드 스캔 기능을 추가할 수 있습니다.
        });
    }
});
