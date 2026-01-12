'use client';

import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { useRouter, useParams } from 'next/navigation';
import { api } from '../../../../lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../../../components/ui/dialog';
import { PlusIcon, DocumentIcon, TagIcon, CalendarIcon, QuestionMarkCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Skeleton } from '../../../../components/ui/skeleton';

export default function PaperDetailPage() {
  const router = useRouter();
  const params = useParams();
  const paperId = params.id as string;

  const { data: paper, isLoading: paperLoading } = useQuery(api.papers.get, { paperId });
  const { data: questions, isLoading: questionsLoading } = useQuery(api.papers.getQuestionsByPaper, { paperId });

  if (paperLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!paper) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <DocumentIcon className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">Paper not found</h3>
          <p className="mt-1 text-sm text-gray-500">
            The paper you're looking for doesn't exist or you don't have access to it.
          </p>
          <Button onClick={() => router.push('/papers')} className="mt-4">
            Back to Papers
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Button variant="ghost" onClick={() => router.push('/papers')}>
              ← Back to Papers
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">{paper.title}</h1>
            <div className="flex items-center space-x-4 text-muted-foreground">
              <div className="flex items-center space-x-1">
                <CalendarIcon className="h-4 w-4" />
                <span>{paper.year}</span>
              </div>
              <div className="flex items-center space-x-1">
                <QuestionMarkCircleIcon className="h-4 w-4" />
                <span>{questions?.length || 0} questions</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <AddQuestionDialog paperId={paperId} />
            <Button variant="outline">
              <DocumentIcon className="h-4 w-4 mr-2" />
              View PDF
            </Button>
            <Button variant="destructive" size="sm">
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Paper Info */}
        <Card>
          <CardHeader>
            <CardTitle>Paper Details</CardTitle>
            <CardDescription>{paper.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Metadata</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Year:</span>
                    <span>{paper.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created:</span>
                    <span>{new Date(paper.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              {paper.tags && paper.tags.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {paper.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary">
                        <TagIcon className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Questions Tabs */}
        <Tabs defaultValue="questions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="questions">Questions ({questions?.length || 0})</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="questions">
            {questionsLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="pt-6">
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : questions && questions.length > 0 ? (
              <div className="space-y-4">
                {questions.map((question: any, index: number) => (
                  <Card key={question._id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-base">
                            Question {index + 1}
                          </CardTitle>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{question.section}</Badge>
                            <Badge variant="outline">{question.topic}</Badge>
                            <Badge variant="outline">{question.difficulty}</Badge>
                          </div>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <div>Correct: {question.correctOption}</div>
                          {question.sourceIndex && (
                            <div>Source Index: {question.sourceIndex}</div>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{question.text}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {question.options.map((option: string, optIndex: number) => (
                          <div key={optIndex} className="flex items-center space-x-2">
                            <span className="font-medium">{String.fromCharCode(65 + optIndex)}.</span>
                            <span className={optIndex === question.correctOption.charCodeAt(0) - 65 ? 'text-green-600 font-medium' : ''}>
                              {option}
                            </span>
                          </div>
                        ))}
                      </div>
                      {question.subTopic && (
                        <div className="mt-2 text-sm text-muted-foreground">
                          Subtopic: {question.subTopic}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <QuestionMarkCircleIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No questions found</h3>
                <p className="mt-1 text-sm text-gray-500 mb-4">
                  This paper doesn't have any questions yet.
                </p>
                <AddQuestionDialog paperId={paperId} />
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Paper Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{questions?.length || 0}</div>
                    <div className="text-sm text-muted-foreground">Total Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {new Set(questions?.map((q: any) => q.section)).size || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Sections Covered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {new Set(questions?.map((q: any) => q.topic)).size || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Topics Covered</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function AddQuestionDialog({ paperId }: { paperId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Question
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Question</DialogTitle>
          <DialogDescription>
            Add a new question to this paper manually or generate with AI.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Question form will be implemented with proper form handling.
          </p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>
              Add Question
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
