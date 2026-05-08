import { test, expect } from '@playwright/test';

test('프로필 폼 정상 수정 및 저장 확인 (Happy Path)', async ({ page }) => {
  // 1. 페이지 진입 (playwright.config.js에 baseURL을 설정했으므로 뒤의 경로만 씁니다)
  await page.goto('/forms');

  // 2. 폼 데이터 자동 입력
  // 닉네임 입력칸을 찾아서 '테스트유저'라고 타이핑
  await page.getByPlaceholder('닉네임을 입력하세요').fill('테스트유저');
  
  // 자기소개 타이핑
  await page.getByPlaceholder('간단한 자기소개를 입력하세요 (선택)').fill('Playwright 로봇이 입력한 소개글입니다.');
  
  // 직업 선택 (shadcn/ui의 Select 컴포넌트 조작)
  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'developer' }).click();

  // 광고 수신 스위치 켜기
  await page.getByLabel('광고성 이메일 수신 동의').click();
  
  // 테마 선택
  await page.getByLabel('dark').click();

  // 3. 폼 제출
  await page.getByRole('button', { name: '저장' }).click();

  // 4. [핵심] 결과 검증 (Assertion)
  // 버튼을 누른 후, 화면에 "프로필 수정 완료!" 또는 "프로필 생성 완료!"라는 글자가 나타나는지 로봇이 감시합니다.
  const successToast = page.getByText(/프로필 (수정|생성) 완료!/);
  await expect(successToast).toBeVisible({ timeout: 5000 }); // 5초 안에 안 뜨면 실패 처리
});