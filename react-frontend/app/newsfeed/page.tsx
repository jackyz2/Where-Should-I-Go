'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RatingRing } from '@/components/rating-ring';

interface Newsfeed {
  school: string;
  academic: number;
  tuition: number;
  location: number;
  comment: string;
}

export default function NewsfeedPage() {
  const [newsfeeds, setNewsfeeds] = useState<Newsfeed[]>([]);

  useEffect(() => {
    async function fetchNewsfeeds() {
      try {
        const response = await fetch('http://localhost:8080/newsfeed');
        if (!response.ok) {
          throw new Error('Failed to fetch newsfeeds');
        }
        const data = await response.json();
        setNewsfeeds(data);
      } catch (error) {
        console.error('Error fetching newsfeeds:', error);
      }
    }

    fetchNewsfeeds();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">School Feedback Newsfeed</h1>
      <div className="space-y-6">
        {newsfeeds.map((feed, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <CardTitle>{feed.school}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <RatingRing rating={feed.academic} label="Academic" />
                <RatingRing rating={feed.tuition} label="Tuition" />
                <RatingRing rating={feed.location} label="Location" />
              </div>
              <p className="text-sm text-muted-foreground">{feed.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

