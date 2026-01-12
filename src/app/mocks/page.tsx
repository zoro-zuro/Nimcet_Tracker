'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from 'convex/react';
import { api } from '../../lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Checkbox } from '../../components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { ClockIcon, AcademicCapIcon, CogIcon, DocumentTextIcon, PlayIcon } from '@heroicons/react/24/outline';

const sections = [
  { id: 'math', name: 'Mathematics', icon: '🔢' },
  { id: 'reasoning', name: 'Logical Reasoning', icon: '🧠' },
  { id: 'computer', name: 'Computer Awareness', icon: '💻' },
  { id: 'english', name: 'English Comprehension', icon: '📝' },
];

const difficulties = [
  { id: 'easy', name: 'Easy', description: 'Basic concepts' },
  { id: 'medium', name: 'Medium', description: 'Moderate difficulty' },
  { id: 'hard', name: 'Hard', description: 'Advanced problems' },
];

const years = [2024, 2023, 2022, 2021, 2020, 2019, 2018];

export default function MocksPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMode, setSelectedMode] = useState<'YEARLY' | 'TOPIC_WISE' | 'CUSTOM'>('YEARLY');

  // Mock configuration state
  const [config, setConfig] = useState({
    year: undefined as number | undefined,
    topics: [] as string[],
    sectionFilters: [] as string[],
    questionCount: 50,
    timerEnabled: true,
    timeLimitSeconds: 120,
    sectionDistribution: {
      math: 15,
      reasoning: 15,
      computer: 10,
      english: 10,
    },
    difficultyDistribution: {
      easy: 30,
      medium: 50,
      hard: 20,
    },
  });

  const createMockSession = useMutation(api.sessions.createMockSession);

  const handleCreateMock = async () => {
    try {
      const result = await createMockSession({
        mode: selectedMode,
        config,
      });

      if (result) {
        router.push(`/solve?sessionId=${result._id}`);
      }
    } catch (error) {
      console.error('Error creating mock:', error);
      alert('Failed to create mock test. Please try again.');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Choose Mock Test Mode</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card 
                  className={`cursor-pointer transition-colors ${
                    selectedMode === 'YEARLY' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedMode('YEARLY')}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <DocumentTextIcon className="h-5 w-5" />
                      <span>Yearly Paper</span>
                    </CardTitle>
                    <CardDescription>
                      Practice with questions from a specific year's paper
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card 
                  className={`cursor-pointer transition-colors ${
                    selectedMode === 'TOPIC_WISE' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedMode('TOPIC_WISE')}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AcademicCapIcon className="h-5 w-5" />
                      <span>Topic Wise</span>
                    </CardTitle>
                    <CardDescription>
                      Focus on specific topics or sections you're weak in
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card 
                  className={`cursor-pointer transition-colors ${
                    selectedMode === 'CUSTOM' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedMode('CUSTOM')}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CogIcon className="h-5 w-5" />
                      <span>Custom</span>
                    </CardTitle>
                    <CardDescription>
                      Create a custom test with your own distribution
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Configure Your Mock Test</h3>
              
              {/* Mode-specific configuration */}
              {selectedMode === 'YEARLY' && (
                <div className="space-y-4">
                  <div>
                    <Label>Select Year</Label>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-2">
                      {years.map(year => (
                        <Button
                          key={year}
                          variant={config.year === year ? "default" : "outline"}
                          size="sm"
                          onClick={() => setConfig(prev => ({ ...prev, year }))}
                        >
                          {year}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedMode === 'TOPIC_WISE' && (
                <div className="space-y-4">
                  <div>
                    <Label>Select Topics</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      {sections.map(section => (
                        <div key={section.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={section.id}
                            checked={config.sectionFilters.includes(section.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setConfig(prev => ({
                                  ...prev,
                                  sectionFilters: [...prev.sectionFilters, section.id]
                                }));
                              } else {
                                setConfig(prev => ({
                                  ...prev,
                                  sectionFilters: prev.sectionFilters.filter(s => s !== section.id)
                                }));
                              }
                            }}
                          />
                          <Label htmlFor={section.id} className="flex items-center space-x-2">
                            <span>{section.icon}</span>
                            <span>{section.name}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedMode === 'CUSTOM' && (
                <div className="space-y-4">
                  <div>
                    <Label>Question Count</Label>
                    <Input
                      type="number"
                      min="10"
                      max="100"
                      value={config.questionCount}
                      onChange={(e) => setConfig(prev => ({ ...prev, questionCount: parseInt(e.target.value) || 50 }))}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label>Section Distribution</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {sections.map(section => (
                        <div key={section.id}>
                          <Label htmlFor={`${section.id}-count`} className="text-sm">
                            {section.icon} {section.name}
                          </Label>
                          <Input
                            id={`${section.id}-count`}
                            type="number"
                            min="0"
                            max="50"
                            value={config.sectionDistribution[section.id as keyof typeof config.sectionDistribution]}
                            onChange={(e) => setConfig(prev => ({
                              ...prev,
                              sectionDistribution: {
                                ...prev.sectionDistribution,
                                [section.id]: parseInt(e.target.value) || 0
                              }
                            }))}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Difficulty Distribution (%)</Label>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      {difficulties.map(difficulty => (
                        <div key={difficulty.id}>
                          <Label htmlFor={`${difficulty.id}-pct`} className="text-sm">
                            {difficulty.name}
                          </Label>
                          <Input
                            id={`${difficulty.id}-pct`}
                            type="number"
                            min="0"
                            max="100"
                            value={config.difficultyDistribution[difficulty.id as keyof typeof config.difficultyDistribution]}
                            onChange={(e) => setConfig(prev => ({
                              ...prev,
                              difficultyDistribution: {
                                ...prev.difficultyDistribution,
                                [difficulty.id]: parseInt(e.target.value) || 0
                              }
                            }))}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Test Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="timer-enabled"
                    checked={config.timerEnabled}
                    onCheckedChange={(checked) => 
                      setConfig(prev => ({ ...prev, timerEnabled: !!checked }))
                    }
                  />
                  <Label htmlFor="timer-enabled">Enable Timer</Label>
                </div>
                
                {config.timerEnabled && (
                  <div>
                    <Label>Time Limit (minutes)</Label>
                    <Input
                      type="number"
                      min="30"
                      max="300"
                      value={Math.round(config.timeLimitSeconds / 60)}
                      onChange={(e) => setConfig(prev => ({ 
                        ...prev, 
                        timeLimitSeconds: (parseInt(e.target.value) || 120) * 60 
                      }))}
                      className="mt-2"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Mock Test Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Mode:</span>
                    <span className="font-medium">{selectedMode.replace('_', ' ')}</span>
                  </div>
                  
                  {config.year && (
                    <div className="flex justify-between">
                      <span>Year:</span>
                      <span className="font-medium">{config.year}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Questions:</span>
                    <span className="font-medium">{config.questionCount}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Timer:</span>
                    <span className="font-medium">
                      {config.timerEnabled ? `${Math.round(config.timeLimitSeconds / 60)} minutes` : 'No timer'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Mock Test Wizard</h1>
          <p className="text-muted-foreground">
            Create a personalized mock test to practice for NIMCET
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3].map(step => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div
                  className={`w-12 h-0.5 mx-2 ${
                    currentStep > step ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ClockIcon className="h-5 w-5" />
              <span>Step {currentStep}: {
                currentStep === 1 ? 'Select Mode' :
                currentStep === 2 ? 'Configure Test' :
                'Test Settings'
              }</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          {currentStep < 3 ? (
            <Button onClick={() => setCurrentStep(prev => Math.min(3, prev + 1))}>
              Next
            </Button>
          ) : (
            <Button onClick={handleCreateMock} className="flex items-center space-x-2">
              <PlayIcon className="h-4 w-4" />
              <span>Start Mock Test</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
