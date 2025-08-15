
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Play, FileText, Download, Github } from "lucide-react";
import type { ToolCategory, TerminalSession } from "@/types/terminal";

interface SidebarProps {
  session?: TerminalSession;
  onNewSession: () => void;
  onLoadScript: () => void;
  onExportResults: () => void;
}

export function Sidebar({ session, onNewSession, onLoadScript, onExportResults }: SidebarProps) {
  const { data: toolCategories = [] } = useQuery<ToolCategory[]>({
    queryKey: ["/api/tool-categories"],
  });

  const formatDuration = (startTime: Date | string) => {
    const now = new Date();
    const start = new Date(startTime);
    const diff = Math.floor((now.getTime() - start.getTime()) / 1000);
    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleGitHubExport = () => {
    console.log('GitHub export clicked');
    window.open('/api/github-export', '_blank');
  };

  return (
    <div className="w-64 bg-cyber-dark border-r border-cyber-medium flex flex-col">
      {/* Tool Categories */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
          Tool Categories
        </h3>
        <div className="space-y-2">
          {toolCategories.map((category) => (
            <button
              key={category.id}
              className="w-full text-left p-2 rounded hover:bg-cyber-medium transition-colors flex items-center space-x-2 group"
              data-testid={`button-category-${category.name.toLowerCase().replace(' ', '-')}`}
            >
              <i className={`${category.icon} text-cyber-green group-hover:text-cyber-bright`} />
              <span>{category.name}</span>
              <span className="ml-auto text-xs bg-cyber-medium px-2 py-1 rounded">
                {category.toolCount}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-cyber-medium">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
          Quick Actions
        </h3>
        <div className="space-y-2">
          <Button
            onClick={onNewSession}
            className="w-full justify-start bg-cyber-green text-cyber-black hover:bg-cyber-bright font-medium"
            data-testid="button-new-session"
          >
            <Play size={16} className="mr-2" />
            New Session
          </Button>
          
          <Button
            onClick={onLoadScript}
            variant="ghost"
            className="w-full justify-start hover:bg-cyber-medium"
            data-testid="button-load-script"
          >
            <FileText size={16} className="mr-2 text-cyber-cyan" />
            Load Script
          </Button>
          
          <Button
            onClick={onExportResults}
            variant="ghost"
            className="w-full justify-start hover:bg-cyber-medium"
            data-testid="button-export-results"
          >
            <Download size={16} className="mr-2 text-cyber-yellow" />
            Export Results
          </Button>
          
          <Button
            onClick={handleGitHubExport}
            variant="ghost"
            className="w-full justify-start hover:bg-cyber-medium text-white bg-gray-800 border border-gray-600"
            data-testid="button-github-export"
            style={{ backgroundColor: '#1f2937', borderColor: '#4b5563', color: '#ffffff' }}
          >
            <Github size={16} className="mr-2" style={{ color: '#00ffff' }} />
            <span style={{ color: '#00ffff' }}>Export to GitHub</span>
          </Button>
        </div>
      </div>

      {/* Session Info */}
      {session && (
        <div className="mt-auto p-4 border-t border-cyber-medium">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Session Time:</span>
              <span className="text-cyber-green font-mono" data-testid="text-session-time">
                {formatDuration(session.startTime)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Commands Run:</span>
              <span className="text-cyber-green font-mono" data-testid="text-command-count">
                {session.commandCount}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Tools Used:</span>
              <span className="text-cyber-green font-mono" data-testid="text-tools-used">
                {session.toolsUsed}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
