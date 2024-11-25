import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';

export function Settings() {
  const [, setLocation] = useLocation();
  const [volume, setVolume] = useState(50);

  return (
    <div className="h-screen flex items-center justify-center bg-background">
      <Card className="w-[400px] p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">Settings</h2>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Volume</label>
            <Slider
              value={[volume]}
              onValueChange={([v]) => setVolume(v)}
              max={100}
              step={1}
            />
          </div>
        </div>

        <Button
          className="w-full"
          onClick={() => setLocation('/')}
        >
          Back to Menu
        </Button>
      </Card>
    </div>
  );
}
