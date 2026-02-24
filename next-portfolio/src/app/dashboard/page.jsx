"use client"

import { ModeToggle } from "@/components/ui/mode-toggle"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const recentActivities = [
  {
    id: 1,
    title: "새 프로젝트 생성",
    description: "Next.js 포트폴리오 프로젝트가 성공적으로 생성되었습니다.",
    time: "방금 전",
    badge: "프로젝트",
    badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    icon: "📁",
  },
  {
    id: 2,
    title: "컴포넌트 업데이트",
    description: "Shadcn UI Avatar 및 Card 컴포넌트가 추가되었습니다.",
    time: "5분 전",
    badge: "업데이트",
    badgeColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    icon: "🔧",
  },
  {
    id: 3,
    title: "대시보드 배포 완료",
    description: "관리자 대시보드 페이지가 성공적으로 배포되었습니다.",
    time: "10분 전",
    badge: "배포",
    badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    icon: "🚀",
  },
]

const navItems = [
  { label: "대시보드", icon: "🏠", active: true },
  { label: "프로젝트", icon: "📂", active: false },
  { label: "분석", icon: "📊", active: false },
  { label: "메시지", icon: "💬", active: false },
  { label: "설정", icon: "⚙️", active: false },
]

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-muted/30">
      {/* 사이드바 */}
      <aside className="hidden md:flex w-64 flex-col gap-2 border-r bg-background px-4 py-6">
        <div className="mb-4 px-2">
          <h1 className="text-xl font-bold tracking-tight">Admin Panel</h1>
          <p className="text-xs text-muted-foreground mt-1">관리자 대시보드</p>
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? "secondary" : "ghost"}
              className="w-full justify-start gap-3 font-normal"
            >
              <span>{item.icon}</span>
              {item.label}
            </Button>
          ))}
        </nav>
        <div className="mt-auto">
          <Card className="py-4">
            <CardContent className="flex items-center gap-3 px-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://github.com/shadcn.png" alt="프로필" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium leading-none truncate">지수</p>
                <p className="text-xs text-muted-foreground truncate mt-1">admin@jisoo.dev</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </aside>

      {/* 메인 영역 */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* 상단 헤더 */}
        <header className="flex h-16 items-center justify-between border-b bg-background px-6 gap-4">
          <div>
            <h2 className="text-lg font-semibold">대시보드</h2>
            <p className="text-xs text-muted-foreground hidden sm:block">환영합니다, 오늘도 좋은 하루 되세요!</p>
          </div>
          <div className="flex items-center gap-3">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full outline-none ring-2 ring-transparent hover:ring-ring transition-all">
                  <Avatar className="h-9 w-9 cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" alt="프로필" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>프로필</DropdownMenuItem>
                <DropdownMenuItem>설정</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">로그아웃</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 overflow-y-auto px-6 py-8">
          {/* 요약 통계 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "총 방문자", value: "12,480", change: "+8.2%", icon: "👥" },
              { label: "프로젝트 수", value: "24", change: "+2", icon: "📁" },
              { label: "완료 작업", value: "138", change: "+15", icon: "✅" },
              { label: "메시지", value: "9", change: "새 메시지", icon: "✉️" },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center gap-1.5">
                    <span>{stat.icon}</span>
                    {stat.label}
                  </CardDescription>
                  <CardTitle className="text-2xl">{stat.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 최근 활동 카드 3개 */}
          <div className="mb-4">
            <h3 className="text-base font-semibold mb-4">최근 활동</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentActivities.map((activity) => (
                <Card key={activity.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-2xl">{activity.icon}</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${activity.badgeColor}`}>
                        {activity.badge}
                      </span>
                    </div>
                    <CardTitle className="text-base mt-2">{activity.title}</CardTitle>
                    <CardDescription>{activity.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
