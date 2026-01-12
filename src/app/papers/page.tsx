'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Skeleton } from '../../../components/ui/skeleton';
import { PlusIcon, DocumentIcon, TagIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { mockData, helpers } from '../../../lib/mockData';

const years = [2024, 2023, 2022, 2021, 2020, 2019, 2018];

export default function PapersPage() {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const papers = helpers.getPapersByYear(selectedYear);
  
  // Filter papers by selected tags
  const filteredPapers = papers.filter(paper => {
    if (selectedTags.length === 0) return true;
    return selectedTags.some(tag => paper.tags?.includes(tag));
  });

  // Extract all unique tags
  const allTags = Array.from(
    new Set(papers.flatMap((paper: any) => paper.tags || []))
  );

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const isLoading = false;

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Papers Library</h1>
            <p className="text-muted-foreground">
              Browse and manage NIMCET question papers
            </p>
          </div>
          <Button onClick={() => router.push('/papers/upload')}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Upload Paper
          </Button>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          {/* Year Filter */}
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4" />
            <span className="font-medium">Year:</span>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedYear === undefined ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedYear(undefined)}
              >
                All
              </Button>
              {years.map(year => (
                <Button
                  key={year}
                  variant={selectedYear === year ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedYear(year)}
                >
                  {year}
                </Button>
              ))}
            </div>
          </div>

          {/* Tags Filter */}
          {allTags.length > 0 && (
            <div className="flex items-center space-x-2">
              <TagIcon className="h-4 w-4" />
              <span className="font-medium">Tags:</span>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Papers Grid */}
        {filteredPapers.length === 0 ? (
          <div className="text-center py-12">
            <DocumentIcon className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No papers found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {selectedYear || selectedTags.length > 0
                ? "Try adjusting your filters"
                : "Upload your first paper to get started"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPapers.map((paper: any) => (
              <Card 
                key={paper._id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => router.push(`/papers/${paper._id}`)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="line-clamp-2">{paper.title}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center space-x-2">
                          <CalendarIcon className="h-4 w-4" />
                          <span>{paper.year}</span>
                        </div>
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">{paper.year}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {paper.description}
                  </p>
                  
                  {paper.tags && paper.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {paper.tags.slice(0, 3).map((tag: string) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {paper.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{paper.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
