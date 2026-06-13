'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

/**
 * Demo page showing shadcn/ui components
 */
export default function DemoPage() {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="container mx-auto space-y-8 py-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold">Component Library Demo</h1>
        <p className="text-muted-foreground">shadcn/ui components</p>
      </div>

      {/* Buttons Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Buttons</h2>
        <div className="flex flex-wrap gap-2">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      {/* Cards Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Cards</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>shadcn Card</CardTitle>
              <CardDescription>
                This is a card using shadcn/ui components with customizable styling.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                shadcn cards come with semantic subcomponents and full customization via CSS
                variables.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Forms Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Form Inputs</h2>
        <div className="max-w-sm space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter your email"
              type="email"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="Enter your password" type="password" />
          </div>
          <Button className="w-full">Submit</Button>
        </div>
      </section>
    </div>
  );
}
