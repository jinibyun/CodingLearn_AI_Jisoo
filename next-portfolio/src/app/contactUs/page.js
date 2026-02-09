export default function ContactUs() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-5xl font-bold mb-12">Contact Us</h1>
        
        <div className="space-y-8 mb-12">
          {/* 전화 */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2 text-gray-300">전화</h2>
            <a href="tel:416-555-0000" className="text-xl text-white hover:text-blue-400 transition-colors">
              416-555-0000
            </a>
          </div>

          {/* 이메일 */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2 text-gray-300">이메일</h2>
            <a href="mailto:admin@jisoo.com" className="text-xl text-white hover:text-blue-400 transition-colors">
              admin@jisoo.com
            </a>
          </div>
        </div>

        {/* SNS 아이콘 */}
        <div className="bg-gray-900 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-300">SNS</h2>
          <div className="flex justify-center gap-6">
            {/* Facebook */}
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
            >
              <span className="text-2xl font-bold">f</span>
            </a>

            {/* Instagram */}
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-16 h-16 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <span className="text-2xl font-bold">📷</span>
            </a>

            {/* Twitter/X */}
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"
            >
              <span className="text-2xl font-bold">𝕏</span>
            </a>

            {/* LinkedIn */}
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
            >
              <span className="text-2xl font-bold">in</span>
            </a>

            {/* GitHub */}
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
            >
              <span className="text-2xl">💻</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
