let count = 0;
const countElement = document.getElementById('count');
const increaseBtn = document.getElementById('increaseBtn');
const decreaseBtn = document.getElementById('decreaseBtn');

function updateCount() {
    countElement.textContent = count;
}

increaseBtn.addEventListener('click', () => {
    count++;
    updateCount();
});

decreaseBtn.addEventListener('click', () => {
    if (count > 0) {
        count--;
        updateCount();
    }
});

// 초기값 표시
updateCount();
