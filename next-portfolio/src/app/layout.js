import Link from 'next/link'
import './globals.css'

export const metadata = {
  title: '지수의 포트폴리오',
  description: '지수의 포트폴리오 사이트에 오신 것을 환영합니다. 이 작품은 Next.js 프레임워크를 활용해 제작되었으며, 최신 웹 기술과 디자인을 적용했습니다. 다양한 프로젝트와 지수의 소개를 한눈에 볼 수 있도록 구성되어 있습니다.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <nav className="bg-black text-white border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex space-x-8">
                <Link 
                  href="/" 
                  className="text-white hover:text-gray-300 transition-colors duration-200 font-medium"
                >
                  Home
                </Link>
                <Link 
                  href="/about" 
                  className="text-white hover:text-gray-300 transition-colors duration-200 font-medium"
                >
                  About
                </Link>
                <Link 
                  href="/contactUs" 
                  className="text-white hover:text-gray-300 transition-colors duration-200 font-medium"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
