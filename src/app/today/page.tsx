'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';
import { Checkbox } from '../../components/ui/checkbox';
import { CalendarIcon, ClockIcon, CheckCircleIcon, AcademicCapIcon, TrophyIcon, PlayIcon } from '@heroicons/react/24/outline';
import { mockData, helpers } from '../../lib/mockData';

interface DailyTask {
  id: string;
  title: string;
  type: 'question' | 'topic' | 'review' | 'mock';
  target: number;
  progress: number;
  difficulty: 'easy' | 'medium' | 'hard';
  section: string;
  topic: string;
}

export default function TodayPage() {
  const router = useRouter();
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const dailyTasks: DailyTask[] = [
    {
      id: '1',
      title: 'Practice Algebra Questions',
      type: 'question',
      target: 10,
      progress: 6,
      difficulty: 'medium',
      section: 'math',
      topic: 'Algebra',
    },
    {
      id: '2',
      title: 'Logical Reasoning Practice',
      type: 'question',
      target: 8,
      progress: 8,
      difficulty: 'easy',
      section: 'reasoning',
      topic: 'Logical Reasoning',
    },
    {
      id: '3',
      title: 'Review Previous Mistakes',
      type: 'review',
      target: 5,
      progress: 3,
      difficulty: 'medium',
      section: 'mixed',
      topic: 'Review',
    },
    {
      id: '4',
      title: 'Computer Fundamentals',
      type: 'topic',
      target: 12,
      progress: 0,
      difficulty: 'easy',
      section: 'computer',
      topic: 'Computer Fundamentals',
    },
  ];

  const userStats = { user: mockData.user, achievements: mockData.achievements, quests: mockData.quests };
  const user = userStats.user;

  const handleStartSession = async () => {
    if (selectedTasks.length === 0) {
      alert('Please select at least one task to start practicing');
      return;
    }
    // Mock implementation - would create session in real app
    console.log('Starting session with tasks:', selectedTasks);
  };

  const toggleTaskSelection = (taskId: string) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const markTaskComplete = (taskId: string) => {
    setCompletedTasks(prev => [...prev, taskId]);
  };

  const getTotalProgress = () => {
    const totalTarget = dailyTasks.reduce((sum, task) => sum + task.target, 0);
    const totalProgress = dailyTasks.reduce((sum, task) => sum + task.progress, 0);
    return Math.round((totalProgress / totalTarget) * 100);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'question': return <AcademicCapIcon className="h-4 w-4" />;
      case 'topic': return <AcademicCapIcon className="h-4 w-4" />;
      case 'review': return <CheckCircleIcon className="h-4 w-4" />;
      case 'mock': return <TrophyIcon className="h-4 w-4" />;
      default: return <ClockIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Today's Practice</h1>
          <p className="text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Daily Progress</p>
                  <p className="text-2xl font-bold">{getTotalProgress()}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <TrophyIcon className="h-4 w-4 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">XP Earned</p>
                  <p className="text-2xl font-bold">{user?.xp || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <ClockIcon className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
                  <p className="text-2xl font-bold">{user?.streakCurrent || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="h-4 w-4 text-purple-500" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Level</p>
                  <p className="text-2xl font-bold">{user?.level || 1}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Progress</CardTitle>
            <CardDescription>
              Complete your daily practice goals to maintain your streak and earn XP
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">
                  {dailyTasks.reduce((sum, task) => sum + task.progress, 0)} / {dailyTasks.reduce((sum, task) => sum + task.target, 0)} items
                </span>
              </div>
              <Progress value={getTotalProgress()} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Daily Tasks */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Today's Tasks</h2>
            <Button 
              onClick={handleStartSession}
              disabled={selectedTasks.length === 0}
              className="flex items-center space-x-2"
            >
              <PlayIcon className="h-4 w-4" />
              <span>Start Practice ({selectedTasks.length})</span>
            </Button>
          </div>

          <div className="grid gap-4">
            {dailyTasks.map(task => (
              <Card 
                key={task.id}
                className={`transition-all ${
                  completedTasks.includes(task.id) 
                    ? 'bg-green-50 border-green-200' 
                    : selectedTasks.includes(task.id)
                    ? 'ring-2 ring-blue-200 bg-blue-50'
                    : 'hover:bg-gray-50'
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <Checkbox
                      checked={completedTasks.includes(task.id)}
                      onCheckedChange={() => markTaskComplete(task.id)}
                      className="mt-1"
                    />
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(task.type)}
                            <h3 className="font-medium">{task.title}</h3>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {task.section}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {task.topic}
                            </Badge>
                            <Badge className={`text-xs ${getDifficultyColor(task.difficulty)}`}>
                              {task.difficulty}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="text-right space-y-1">
                          <div className="text-sm font-medium">
                            {task.progress} / {task.target}
                          </div>
                          <Progress 
                            value={(task.progress / task.target) * 100} 
                            className="h-1 w-20"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          {task.type === 'question' && `${task.target} questions`}
                          {task.type === 'topic' && `${task.target} topics`}
                          {task.type === 'review' && `${task.target} mistakes`}
                          {task.type === 'mock' && 'Full mock test'}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={selectedTasks.includes(task.id)}
                            onCheckedChange={() => toggleTaskSelection(task.id)}
                            disabled={completedTasks.includes(task.id)}
                          />
                          <span className="text-xs text-muted-foreground">
                            Include in practice
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Today's Quests */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Quests</CardTitle>
            <CardDescription>
              Complete these special challenges to earn bonus XP
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockData.quests.map((quest: any) => (
                <div key={quest._id} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{quest.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {quest.progress} / {quest.target}
                    </p>
                  </div>
                  <Progress 
                    value={(quest.progress / quest.target) * 100} 
                    className="w-24 h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-auto p-4 flex-col space-y-2"
                onClick={() => router.push('/mocks')}
              >
                <TrophyIcon className="h-6 w-6" />
                <span>Take Mock Test</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-auto p-4 flex-col space-y-2"
                onClick={() => router.push('/mistakes')}
              >
                <CheckCircleIcon className="h-6 w-6" />
                <span>Review Mistakes</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-auto p-4 flex-col space-y-2"
                onClick={() => router.push('/bank')}
              >
                <AcademicCapIcon className="h-6 w-6" />
                <span>Practice Questions</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
