const billAmountInput = document.getElementById('billAmount');
const tipButtons = document.querySelectorAll('.tip-btn');
const tipAmountDisplay = document.getElementById('tipAmount');
const totalAmountDisplay = document.getElementById('totalAmount');
const darkModeToggle = document.getElementById('darkModeToggle');

let billAmount = 0;
let tipPercent = 0;

// 팁 버튼 클릭 이벤트
tipButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 모든 버튼에서 active 클래스 제거
        tipButtons.forEach(btn => btn.classList.remove('active'));
        // 클릭한 버튼에 active 클래스 추가
        button.classList.add('active');
        // 팁 퍼센트 업데이트
        tipPercent = parseFloat(button.getAttribute('data-tip'));
        calculateTotal();
    });
});

// 음식 가격 입력 이벤트
billAmountInput.addEventListener('input', (e) => {
    billAmount = parseFloat(e.target.value) || 0;
    calculateTotal();
});

// 총액 계산 함수
function calculateTotal() {
    const tipAmount = billAmount * (tipPercent / 100);
    const totalAmount = billAmount + tipAmount;

    // 결과 표시 (천 단위 구분자 추가)
    tipAmountDisplay.textContent = `₩${formatNumber(tipAmount)}`;
    totalAmountDisplay.textContent = `₩${formatNumber(totalAmount)}`;
}

// 숫자 포맷팅 함수 (천 단위 구분자)
function formatNumber(num) {
    return Math.round(num).toLocaleString('ko-KR');
}

// 다크 모드 토글
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // 아이콘 변경 (🌙 -> ☀️)
    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = '☀️';
    } else {
        darkModeToggle.textContent = '🌙';
    }
    
    // 로컬 스토리지에 저장
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// 페이지 로드 시 다크 모드 상태 복원
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
}
