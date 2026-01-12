'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from 'convex/react';
import { api } from '../../../lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Badge } from '../../../components/ui/badge';
import { ArrowLeftIcon, CloudArrowUpIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function UploadPaperPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    year: '',
    title: '',
    description: '',
    tags: [] as string[],
    currentTag: '',
  });

  // Mutations
  const generateUploadUrl = useMutation(api.papers.generateUploadUrl);
  const createPaper = useMutation(api.papers.createPaper);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please select a PDF file');
    }
  };

  const addTag = () => {
    if (formData.currentTag.trim() && !formData.tags.includes(formData.currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.currentTag.trim()],
        currentTag: '',
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.year || !formData.title || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    setIsUploading(true);
    
    try {
      let pdfStorageId: string | undefined;

      // Upload file if selected
      if (selectedFile) {
        const uploadUrl = await generateUploadUrl({});
        const response = await fetch(uploadUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/pdf' },
          body: selectedFile,
        });

        if (!response.ok) {
          throw new Error('Failed to upload file');
        }

        const result = await response.json();
        pdfStorageId = result.storageId;
      }

      // Create paper record
      const paperId = await createPaper({
        year: parseInt(formData.year),
        title: formData.title,
        description: formData.description,
        tags: formData.tags,
        pdfStorageId,
      });

      router.push(`/papers/${paperId}`);
    } catch (error) {
      console.error('Error uploading paper:', error);
      alert('Failed to upload paper. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.push('/papers')}>
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Papers
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Upload Paper</h1>
            <p className="text-muted-foreground">
              Add a new NIMCET question paper to your library
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle>PDF File</CardTitle>
              <CardDescription>
                Upload the question paper PDF file (optional)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!selectedFile ? (
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <CloudArrowUpIcon className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to select a PDF file or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Only PDF files are supported
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-100 p-2 rounded">
                      <CloudArrowUpIcon className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{selectedFile.name}</p>
                      <p className="text-xs text-gray-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedFile(null)}
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
            </CardContent>
          </Card>

          {/* Paper Details */}
          <Card>
            <CardHeader>
              <CardTitle>Paper Details</CardTitle>
              <CardDescription>
                Provide information about this question paper
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="year">Year *</Label>
                  <Input
                    id="year"
                    type="number"
                    min="2015"
                    max="2030"
                    value={formData.year}
                    onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                    placeholder="e.g., 2023"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., NIMCET 2023 Question Paper"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of this paper..."
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="tags">Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                      >
                        <XMarkIcon className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    id="tags"
                    value={formData.currentTag}
                    onChange={(e) => setFormData(prev => ({ ...prev, currentTag: e.target.value }))}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="Add a tag..."
                  />
                  <Button type="button" variant="outline" onClick={addTag}>
                    Add
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Add tags to help categorize this paper (e.g., "official", "practice", "mock")
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.push('/papers')}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Upload Paper'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
