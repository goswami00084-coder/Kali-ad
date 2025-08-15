export interface TerminalCommand {
  id: string;
  command: string;
  output: string;
  exitCode: number;
  timestamp: Date;
  toolUsed?: string;
}

export interface TerminalSession {
  id: string;
  name: string;
  currentPath: string;
  isActive: boolean;
  startTime: Date;
  commandCount: number;
  toolsUsed: number;
  commands: TerminalCommand[];
}

export interface SystemStats {
  cpuUsage: string;
  ramUsage: string;
  memoryUsage: string;
  activeTools: number;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  icon: string;
  steps: TutorialStep[];
  isCompleted: boolean;
  isNew: boolean;
  isPopular: boolean;
}

export interface TutorialStep {
  title: string;
  content: string;
}

export interface ToolCategory {
  id: string;
  name: string;
  icon: string;
  toolCount: number;
  description: string;
}
