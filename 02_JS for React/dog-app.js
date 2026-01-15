const fetchBtn = document.getElementById('fetchBtn');
const dogImage = document.getElementById('dogImage');
const loading = document.getElementById('loading');
const API_URL = 'https://dog.ceo/api/breeds/image/random';

// 강아지 사진 가져오기 함수
async function fetchDogImage() {
    try {
        // 로딩 상태 표시
        loading.style.display = 'block';
        dogImage.style.display = 'none';
        fetchBtn.disabled = true;

        // API 호출
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('강아지 사진을 가져오는데 실패했습니다.');
        }

        const data = await response.json();
        
        // 이미지 로드 대기
        dogImage.src = data.message;
        
        // 이미지가 로드되면 표시
        dogImage.onload = () => {
            loading.style.display = 'none';
            dogImage.style.display = 'block';
            fetchBtn.disabled = false;
        };

        // 이미지 로드 실패 시
        dogImage.onerror = () => {
            loading.textContent = '이미지를 불러올 수 없습니다.';
            loading.style.display = 'block';
            dogImage.style.display = 'none';
            fetchBtn.disabled = false;
        };

    } catch (error) {
        console.error('Error:', error);
        loading.textContent = '오류가 발생했습니다. 다시 시도해주세요.';
        loading.style.display = 'block';
        dogImage.style.display = 'none';
        fetchBtn.disabled = false;
    }
}

// 버튼 클릭 이벤트
fetchBtn.addEventListener('click', fetchDogImage);

// 페이지 로드 시 첫 강아지 사진 가져오기
fetchDogImage();
