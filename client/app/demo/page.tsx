'use client';

import { useState } from 'react';

// HeroUI imports
import { Button as HeroButton, Card as HeroCard, Input as HeroInput } from '@heroui/react';

// shadcn imports
import { Button as ShadcnButton } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input as ShadcnInput } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

/**
 * Demo page showing HeroUI and shadcn/ui components side by side
 * This demonstrates the gradual migration approach where both libraries coexist
 */
export default function DemoPage() {
  const [heroValue, setHeroValue] = useState('');
  const [shadcnValue, setShadcnValue] = useState('');

  return (
    <div className="container mx-auto space-y-8 py-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold">Component Library Demo</h1>
        <p className="text-muted-foreground">
          Comparing HeroUI and shadcn/ui components side by side
        </p>
      </div>

      {/* Buttons Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Buttons</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {/* HeroUI Buttons */}
          <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-semibold">HeroUI Buttons</h3>
            <div className="flex flex-wrap gap-2">
              <HeroButton color="primary">Primary</HeroButton>
              <HeroButton color="secondary">Secondary</HeroButton>
              <HeroButton color="success">Success</HeroButton>
              <HeroButton color="danger">Danger</HeroButton>
              <HeroButton variant="bordered">Bordered</HeroButton>
              <HeroButton variant="ghost">Ghost</HeroButton>
            </div>
          </div>

          {/* shadcn Buttons */}
          <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-semibold">shadcn Buttons</h3>
            <div className="flex flex-wrap gap-2">
              <ShadcnButton>Default</ShadcnButton>
              <ShadcnButton variant="secondary">Secondary</ShadcnButton>
              <ShadcnButton variant="outline">Outline</ShadcnButton>
              <ShadcnButton variant="ghost">Ghost</ShadcnButton>
              <ShadcnButton variant="destructive">Destructive</ShadcnButton>
              <ShadcnButton variant="link">Link</ShadcnButton>
            </div>
            <div className="flex flex-wrap gap-2">
              <ShadcnButton size="xs">Extra Small</ShadcnButton>
              <ShadcnButton size="sm">Small</ShadcnButton>
              <ShadcnButton size="default">Default</ShadcnButton>
              <ShadcnButton size="lg">Large</ShadcnButton>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Cards</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {/* HeroUI Card */}
          <HeroCard>
            <div className="p-4">
              <h3 className="mb-2 text-lg font-semibold">HeroUI Card</h3>
              <p className="text-default-600 text-sm">
                This is a card using HeroUI components. It has the standard HeroUI styling and
                behavior.
              </p>
            </div>
          </HeroCard>

          {/* shadcn Card */}
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
        <div className="grid gap-6 md:grid-cols-2">
          {/* HeroUI Form */}
          <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-semibold">HeroUI Form</h3>
            <HeroInput
              label="Email"
              placeholder="Enter your email"
              type="email"
              value={heroValue}
              onChange={(e) => setHeroValue(e.target.value)}
            />
            <HeroInput label="Password" placeholder="Enter your password" type="password" />
            <HeroButton className="w-full" color="primary">
              Submit (HeroUI)
            </HeroButton>
          </div>

          {/* shadcn Form */}
          <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-semibold">shadcn Form</h3>
            <div>
              <Label htmlFor="email">Email</Label>
              <ShadcnInput
                id="email"
                placeholder="Enter your email"
                type="email"
                value={shadcnValue}
                onChange={(e) => setShadcnValue(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <ShadcnInput id="password" placeholder="Enter your password" type="password" />
            </div>
            <ShadcnButton className="w-full">Submit (shadcn)</ShadcnButton>
          </div>
        </div>
      </section>

      {/* Implementation Notes */}
      <section className="bg-muted/50 rounded-lg border p-6">
        <h2 className="mb-4 text-2xl font-semibold">Migration Strategy</h2>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Current Approach:</strong> Both HeroUI and shadcn/ui are installed and can be
            used together.
          </p>
          <p>
            <strong>Gradual Migration:</strong> New features can use shadcn components while
            existing features continue using HeroUI.
          </p>
          <p>
            <strong>Import Pattern:</strong>
          </p>
          <ul className="ml-6 list-disc space-y-1">
            <li>
              HeroUI:{' '}
              <code className="rounded bg-black/10 px-1 py-0.5">
                {`import { Button } from '@heroui/react'`}
              </code>
            </li>
            <li>
              shadcn:{' '}
              <code className="rounded bg-black/10 px-1 py-0.5">
                {`import { Button } from '@/components/ui/button'`}
              </code>
            </li>
          </ul>
          <p>
            <strong>Customization:</strong> shadcn components can be directly edited in{' '}
            <code className="rounded bg-black/10 px-1 py-0.5">components/ui/</code>
          </p>
        </div>
      </section>
    </div>
  );
}
