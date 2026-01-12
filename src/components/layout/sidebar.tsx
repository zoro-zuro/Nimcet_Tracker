'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { 
  HomeIcon, 
  DocumentTextIcon,
  TrophyIcon,
  CalendarIcon,
  ChartBarIcon,
  QuestionMarkCircleIcon,
  BookOpenIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Papers', href: '/papers', icon: DocumentTextIcon },
  { name: 'Mock Tests', href: '/mocks', icon: TrophyIcon },
  { name: 'Today', href: '/today', icon: CalendarIcon },
  { name: 'Progress', href: '/progress', icon: ChartBarIcon },
  { name: 'Question Bank', href: '/bank', icon: QuestionMarkCircleIcon },
  { name: 'Mistakes', href: '/mistakes', icon: BookOpenIcon },
  { name: 'Roadmap', href: '/roadmap', icon: CogIcon },
];

export function Sidebar() {
  const router = useRouter();

  return (
    <aside className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 overflow-y-auto">
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.name}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => router.push(item.href)}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.name}
            </Button>
          );
        })}
      </nav>
      
      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200 mt-8">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            onClick={() => router.push('/papers/upload')}
          >
            <DocumentTextIcon className="h-4 w-4 mr-2" />
            Upload Paper
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            onClick={() => router.push('/mocks')}
          >
            <TrophyIcon className="h-4 w-4 mr-2" />
            Start Mock Test
          </Button>
        </div>
      </div>
    </aside>
  );
}
