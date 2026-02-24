import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/navbar'

export const metadata = {
  title: '지수의 포트폴리오',
  description: '지수의 포트폴리오 사이트에 오신 것을 환영합니다. 이 작품은 Next.js 프레임워크를 활용해 제작되었으며, 최신 웹 기술과 디자인을 적용했습니다. 다양한 프로젝트와 지수의 소개를 한눈에 볼 수 있도록 구성되어 있습니다.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
