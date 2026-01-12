'use client';

import { useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import { api } from '../../lib/api';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { 
  FireIcon, 
  StarIcon, 
  AcademicCapIcon 
} from '@heroicons/react/24/outline';

export function Topbar() {
  const router = useRouter();
  const userStats = {
    user: { 
      xp: 250, 
      level: 3, 
      streakCurrent: 5, 
      name: "Demo User"
    }
  };

  const user = userStats?.user;
  const levelProgress = user ? (user.xp % 100) : 0;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 h-16">
      <div className="flex items-center justify-between h-full px-4">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push('/')}
          >
            <AcademicCapIcon className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">NIMCET Prep</span>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => router.push('/dashboard')}
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Dashboard
          </button>
          <button 
            onClick={() => router.push('/papers')}
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Papers
          </button>
          <button 
            onClick={() => router.push('/mocks')}
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Mocks
          </button>
          <button 
            onClick={() => router.push('/today')}
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Today
          </button>
          <button 
            onClick={() => router.push('/progress')}
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Progress
          </button>
        </nav>

        {/* User Stats */}
        {user && (
          <div className="flex items-center space-x-4">
            {/* XP and Level */}
            <div className="hidden lg:flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <StarIcon className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">{user.level}</span>
              </div>
              <div className="w-20">
                <Progress value={levelProgress} className="h-2" />
              </div>
              <span className="text-xs text-gray-500">{user.xp} XP</span>
            </div>

            {/* Streak */}
            <div className="flex items-center space-x-1">
              <FireIcon className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">{user.streakCurrent}</span>
            </div>

            {/* User Avatar/Name */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user.name?.charAt(0) || 'U'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
