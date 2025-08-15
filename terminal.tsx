import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Terminal as TerminalIcon, Shield, GraduationCap, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Terminal } from "@/components/Terminal";
import { Sidebar } from "@/components/Sidebar";
import { EducationPanel } from "@/components/EducationPanel";
import { CommandInput } from "@/components/CommandInput";
import { DisclaimerModal } from "@/components/DisclaimerModal";
import { useTerminal } from "@/hooks/use-terminal";

export default function TerminalPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [isEducationPanelOpen, setIsEducationPanelOpen] = useState(true);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const {
    session,
    commands,
    currentCommand,
    setCurrentCommand,
    executeCommand,
    clearTerminal,
    isExecuting,
    isLoading,
    systemStats,
  } = useTerminal(sessionId);

  // Create new session mutation
  const createSessionMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "demo-user", // In a real app, this would come from auth
          name: "Terminal Session",
          currentPath: "/home/cybersec",
          isActive: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create session");
      }

      return response.json();
    },
    onSuccess: (newSession) => {
      setSessionId(newSession.id);
      queryClient.invalidateQueries({ queryKey: ["/api/sessions"] });
      toast({
        title: "New Session Created",
        description: "Your terminal session is ready",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create new session",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    // Create initial session
    if (!sessionId) {
      createSessionMutation.mutate();
    }
  }, []);

  const handleAcceptDisclaimer = () => {
    setShowDisclaimer(false);
    localStorage.setItem("cyberTerminalDisclaimerAccepted", "true");
  };

  const handleNewSession = () => {
    createSessionMutation.mutate();
  };

  const handleLoadScript = () => {
    toast({
      title: "Load Script",
      description: "Script loading functionality coming soon",
    });
  };

  const handleExportResults = () => {
    toast({
      title: "Export Results",
      description: "Export functionality coming soon",
    });
  };

  const handleShowHistory = () => {
    executeCommand("history");
  };

  const handleShowHelp = () => {
    executeCommand("help");
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-cyber-black flex items-center justify-center">
        <div className="text-cyber-green">Initializing CyberTerminal...</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-cyber-black text-gray-300 font-cyber overflow-hidden">
      {/* Header */}
      <header className="bg-cyber-dark border-b border-cyber-medium px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <TerminalIcon className="text-cyber-green text-xl" size={24} />
            <h1 className="text-xl font-bold text-white">CyberTerminal Pro</h1>
            <span className="bg-cyber-green text-cyber-black px-2 py-1 rounded text-xs font-bold">
              v2.1.0
            </span>
            <span className="bg-cyber-red text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
              🔒 ANONYMOUS
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse-green"></div>
              <span>Stealth Mode</span>
            </div>
            <span className="text-cyber-medium">|</span>
            <span data-testid="text-user-session">ghost@anonymous</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <Shield className="text-cyber-cyan" size={16} />
            <span>Anonymous Environment</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEducationPanelOpen(!isEducationPanelOpen)}
              className="hover:bg-cyber-medium"
              data-testid="button-toggle-education"
            >
              <GraduationCap className="text-cyber-yellow" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-cyber-medium"
              data-testid="button-settings"
            >
              <Settings className="text-gray-400" size={16} />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        {!isFullscreen && (
          <Sidebar
            session={session}
            onNewSession={handleNewSession}
            onLoadScript={handleLoadScript}
            onExportResults={handleExportResults}
          />
        )}

        {/* Main Terminal Area */}
        <div className="flex-1 flex flex-col">
          <Terminal
            commands={commands}
            currentPath={session?.currentPath || "/home/cybersec"}
            systemStats={systemStats}
            onClear={clearTerminal}
            onFullscreen={toggleFullscreen}
          />

          <CommandInput
            currentCommand={currentCommand}
            onCommandChange={setCurrentCommand}
            onExecuteCommand={executeCommand}
            isExecuting={isExecuting}
            onShowHistory={handleShowHistory}
            onShowHelp={handleShowHelp}
          />
        </div>

        {/* Education Panel */}
        {!isFullscreen && (
          <EducationPanel
            isOpen={isEducationPanelOpen}
            onClose={() => setIsEducationPanelOpen(false)}
          />
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-cyber-medium border-t border-cyber-light px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-cyber-green rounded-full"></div>
            <span>Anonymous Connection</span>
          </div>
          <span className="text-gray-500">|</span>
          <span data-testid="text-environment">Anonymous Stealth Environment</span>
          <span className="text-gray-500">|</span>
          <span>
            Last Activity: <span className="text-cyber-green" data-testid="text-last-activity">2 seconds ago</span>
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <span>
            Memory Usage: <span className="text-cyber-cyan" data-testid="text-memory-usage">{systemStats.memoryUsage}</span>
          </span>
          <span className="text-gray-500">|</span>
          <span>
            Active Tools: <span className="text-cyber-yellow" data-testid="text-active-tools">{systemStats.activeTools}</span>
          </span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-400">CyberTerminal Pro v2.1.0 - Anonymous Edition</span>
        </div>
      </div>

      {/* Disclaimer Modal */}
      <DisclaimerModal
        isOpen={showDisclaimer}
        onAccept={handleAcceptDisclaimer}
        onCancel={() => setShowDisclaimer(false)}
      />
    </div>
  );
}
