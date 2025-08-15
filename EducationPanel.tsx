import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X, GraduationCap, Book, Users } from "lucide-react";
import type { Tutorial } from "@/types/terminal";

interface EducationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EducationPanel({ isOpen, onClose }: EducationPanelProps) {
  const [activeTutorial, setActiveTutorial] = useState<Tutorial | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const { data: tutorials = [] } = useQuery<Tutorial[]>({
    queryKey: ["/api/tutorials"],
  });

  if (!isOpen) return null;

  const quickReferences = [
    { command: "nmap -sS target", description: "TCP SYN scan" },
    { command: "sqlmap -u url --dbs", description: "Database enumeration" },
    { command: "hashcat -m 0 hash.txt dict.txt", description: "MD5 hash cracking" },
  ];

  const startTutorial = (tutorial: Tutorial) => {
    setActiveTutorial(tutorial);
    setCurrentStep(0);
  };

  const continueTutorial = () => {
    if (activeTutorial && currentStep < activeTutorial.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const restartTutorial = () => {
    setCurrentStep(0);
  };

  const getProgressPercentage = () => {
    if (!activeTutorial) return 0;
    return Math.round(((currentStep + 1) / activeTutorial.steps.length) * 100);
  };

  return (
    <div className="w-80 bg-cyber-dark border-l border-cyber-medium flex flex-col">
      <div className="p-4 border-b border-cyber-medium">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
            <GraduationCap className="text-cyber-yellow" size={20} />
            <span>Learning Hub</span>
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-cyber-medium"
            data-testid="button-close-education"
          >
            <X className="text-gray-400" size={16} />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Current Tutorial */}
        {activeTutorial && (
          <div className="p-4 border-b border-cyber-medium">
            <h4 className="font-semibold text-cyber-bright mb-2">Active Tutorial</h4>
            <div className="bg-cyber-medium rounded p-3">
              <div className="flex items-center space-x-2 mb-2">
                <i className={`${activeTutorial.icon} text-cyber-green`} />
                <span className="font-medium">{activeTutorial.title}</span>
              </div>
              
              <p className="text-sm text-gray-300 mb-3">
                {activeTutorial.description}
              </p>
              
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Progress</span>
                  <span data-testid="text-tutorial-progress">
                    Step {currentStep + 1} of {activeTutorial.steps.length}
                  </span>
                </div>
                <Progress 
                  value={getProgressPercentage()} 
                  className="h-2"
                />
              </div>
              
              <div className="flex space-x-2">
                <Button
                  onClick={continueTutorial}
                  disabled={currentStep >= activeTutorial.steps.length - 1}
                  size="sm"
                  className="bg-cyber-green text-cyber-black hover:bg-cyber-bright"
                  data-testid="button-continue-tutorial"
                >
                  Continue
                </Button>
                <Button
                  onClick={restartTutorial}
                  variant="outline"
                  size="sm"
                  className="border-cyber-light hover:bg-cyber-medium"
                  data-testid="button-restart-tutorial"
                >
                  Restart
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Available Tutorials */}
        <div className="p-4">
          <h4 className="font-semibold text-cyber-bright mb-3">Available Tutorials</h4>
          <div className="space-y-3">
            {tutorials.map((tutorial) => (
              <div
                key={tutorial.id}
                className="bg-cyber-medium rounded p-3 hover:bg-cyber-light transition-colors cursor-pointer"
                onClick={() => startTutorial(tutorial)}
                data-testid={`tutorial-${tutorial.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-cyber-black rounded">
                    <i className={`${tutorial.icon} text-cyber-green`} />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-white mb-1">{tutorial.title}</h5>
                    <p className="text-xs text-gray-400 mb-2">{tutorial.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-cyber-cyan">
                        {tutorial.difficulty} • {tutorial.estimatedTime} min
                      </span>
                      <span className="text-xs">
                        {tutorial.isCompleted && (
                          <span className="text-cyber-green">✓ Completed</span>
                        )}
                        {tutorial.isNew && (
                          <span className="text-gray-500">New</span>
                        )}
                        {tutorial.isPopular && !tutorial.isNew && !tutorial.isCompleted && (
                          <span className="text-gray-500">Popular</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Reference */}
        <div className="p-4 border-t border-cyber-medium">
          <h4 className="font-semibold text-cyber-bright mb-3">Quick Reference</h4>
          <div className="space-y-2 text-sm">
            {quickReferences.map((ref, index) => (
              <div key={index} className="bg-cyber-medium rounded p-2">
                <div className="font-mono text-cyber-green">{ref.command}</div>
                <div className="text-xs text-gray-400 mt-1">{ref.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-cyber-medium">
        <div className="space-y-2">
          <Button
            className="w-full bg-cyber-yellow text-cyber-black hover:bg-yellow-400 font-medium"
            data-testid="button-documentation"
          >
            <Book size={16} className="mr-2" />
            Full Documentation
          </Button>
          <Button
            variant="outline"
            className="w-full border-cyber-light hover:bg-cyber-medium"
            data-testid="button-community"
          >
            <Users size={16} className="mr-2" />
            Join Community
          </Button>
        </div>
      </div>
    </div>
  );
}
