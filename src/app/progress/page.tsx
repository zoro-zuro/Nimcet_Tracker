import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';
import { 
  TrophyIcon, 
  FireIcon, 
  StarIcon, 
  UserGroupIcon,
  AcademicCapIcon,
  ClockIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { mockData, helpers } from '../../lib/mockData';

export default function ProgressPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const userStats = { 
    user: mockData.user, 
    achievements: mockData.achievements, 
    quests: mockData.quests 
  };
  const leaderboard = helpers.getLeaderboard();

  const user = userStats.user;
  const achievements = userStats.achievements;
  const quests = userStats.quests;

  const levelProgress = (user?.xp || 0) % 100;
  const nextLevelXP = 100 - levelProgress;

  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Progress</h1>
          <p className="text-muted-foreground">
            Track your achievements and compete with others
          </p>
        </div>

        {/* Level and XP Card */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <StarIcon className="h-5 w-5" />
                  <span className="text-sm font-medium">Level {user?.level || 1}</span>
                </div>
                <div className="text-3xl font-bold">{user?.xp || 0} XP</div>
                <div className="text-sm opacity-90">
                  {nextLevelXP} XP to next level
                </div>
              </div>
              <div className="text-right space-y-2">
                <div className="text-sm">Progress to Level {(user?.level || 1) + 1}</div>
                <Progress 
                  value={levelProgress} 
                  className="w-24 bg-white/20" 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <FireIcon className="h-4 w-4 text-orange-500" />
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
                <TrophyIcon className="h-4 w-4 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Best Streak</p>
                  <p className="text-2xl font-bold">{user?.streakBest || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <StarIcon className="h-4 w-4 text-purple-500" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Achievements</p>
                  <p className="text-2xl font-bold">{achievements.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <ChartBarIcon className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rank</p>
                  <p className="text-2xl font-bold">#12</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="quests">Daily Quests</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest accomplishments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.slice(0, 5).map((achievement: any) => (
                    <div key={achievement._id} className="flex items-center space-x-3">
                      <div className="bg-yellow-100 p-2 rounded-full">
                        <TrophyIcon className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{achievement.title}</p>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(achievement.earnedAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                  
                  {achievements.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <TrophyIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No achievements yet</p>
                      <p className="text-sm">Start practicing to earn your first achievement!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Unlock achievements by completing challenges</CardDescription>
              </CardHeader>
              <CardContent>
                {achievements.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {achievements.map((achievement: any) => (
                      <Card key={achievement._id} className="border-2 border-yellow-200 bg-yellow-50">
                        <CardContent className="pt-6">
                          <div className="text-center space-y-2">
                            <div className="bg-yellow-100 p-3 rounded-full w-fit mx-auto">
                              <TrophyIcon className="h-6 w-6 text-yellow-600" />
                            </div>
                            <h3 className="font-semibold">{achievement.title}</h3>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            <Badge variant="secondary">
                              {new Date(achievement.earnedAt).toLocaleDateString()}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <TrophyIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No achievements yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Complete challenges to unlock your first achievement!
                    </p>
                    <Button onClick={() => setActiveTab('overview')}>
                      Start Practicing
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Quests</CardTitle>
                <CardDescription>Complete daily challenges for bonus XP</CardDescription>
              </CardHeader>
              <CardContent>
                {quests.length > 0 ? (
                  <div className="space-y-4">
                    {quests.map((quest: any) => (
                      <div key={quest._id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{quest.title}</h3>
                          <Badge variant={quest.completedAt ? "default" : "secondary"}>
                            {quest.completedAt ? "Completed" : "In Progress"}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{quest.progress} / {quest.target}</span>
                          </div>
                          <Progress value={(quest.progress / quest.target) * 100} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <StarIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No quests today</h3>
                    <p className="text-muted-foreground mb-4">
                      Check back tomorrow for new daily challenges!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <UserGroupIcon className="h-5 w-5" />
                  <span>Leaderboard</span>
                </CardTitle>
                <CardDescription>See how you rank against other users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard?.map((user: any, index: number) => (
                    <div 
                      key={user._id} 
                      className={`flex items-center space-x-4 p-3 rounded-lg ${
                        user.name === 'Demo User' ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-yellow-100 text-yellow-800' :
                        index === 1 ? 'bg-gray-100 text-gray-800' :
                        index === 2 ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-50 text-gray-600'
                      }`}>
                        {index + 1}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{user.name}</span>
                          {user.name === 'Demo User' && <Badge variant="secondary">You</Badge>}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Level {user.level} • Streak: {user.streakBest}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-bold">{user.xp} XP</div>
                      </div>
                    </div>
                  ))}
                  
                  {(!leaderboard || leaderboard.length === 0) && (
                    <div className="text-center py-12">
                      <UserGroupIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No leaderboard data</h3>
                      <p className="text-muted-foreground">
                        Start practicing to appear on the leaderboard!
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
