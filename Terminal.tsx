import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Eraser, Expand } from "lucide-react";
import type { TerminalCommand, SystemStats } from "@/types/terminal";

interface TerminalProps {
  commands: TerminalCommand[];
  currentPath: string;
  systemStats: SystemStats;
  onClear: () => void;
  onFullscreen: () => void;
}

export function Terminal({ commands, currentPath, systemStats, onClear, onFullscreen }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  const renderWelcomeMessage = () => (
    <div className="text-cyber-green mb-4">
      <pre className="text-sm">
{`   ____      _               _____                    _             _ 
  / ___|   _| |__   ___ _ __|_   _|__ _ __ _ __ ___   (_)_ __   __ _| |
 | |  | | | | '_ \\ / _ \\ '__| | |/ _ \\ '__| '_ \` _ \\  | | '_ \\ / _\` | |
 | |__| |_| | |_) |  __/ |    | |  __/ |  | | | | | | | | | | (_| | |
  \\____\\__, |_.__/ \\___|_|    |_|\\___|_|  |_| |_| |_|_|_| |_|\\__,_|_|
       |___/                                                         
                    🔒 ANONYMOUS EDITION 🔒                          `}
      </pre>
      <p className="text-cyber-bright mt-2">Welcome to CyberTerminal Pro v2.1.0 - Anonymous Security Platform</p>
      <p className="text-gray-400">Type 'help' for commands, 'anonymous' for stealth mode, 'tools' for privacy tools.</p>
      <p className="text-cyber-red">🚫 COMPLETELY UNTRACEABLE - NO LOGS • NO TRACKING 🚫</p>
      <p className="text-cyber-cyan mt-1">All tools route through Tor + VPN + Proxy chains automatically!</p>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col">
      {/* Terminal Header */}
      <div className="bg-cyber-medium px-4 py-2 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-cyber-red rounded-full"></div>
              <div className="w-3 h-3 bg-cyber-yellow rounded-full"></div>
              <div className="w-3 h-3 bg-cyber-green rounded-full"></div>
            </div>
            <span className="text-gray-400">Terminal Session #1</span>
          </div>
          <div className="text-gray-500">|</div>
          <div className="text-gray-400">
            <span data-testid="text-current-path">{currentPath}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <i className="fas fa-microchip text-cyber-green"></i>
            <span className="text-gray-400">
              CPU: <span className="text-cyber-green" data-testid="text-cpu-usage">{systemStats.cpuUsage}</span>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="fas fa-memory text-cyber-cyan"></i>
            <span className="text-gray-400">
              RAM: <span className="text-cyber-cyan" data-testid="text-ram-usage">{systemStats.ramUsage}</span>
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClear}
            className="hover:bg-cyber-light"
            data-testid="button-clear-terminal"
          >
            <Eraser className="text-gray-400" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onFullscreen}
            className="hover:bg-cyber-light"
            data-testid="button-fullscreen"
          >
            <Expand className="text-gray-400" size={16} />
          </Button>
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="flex-1 bg-cyber-black p-4 font-mono text-sm overflow-y-auto"
        data-testid="terminal-content"
      >
        <div className="space-y-1">
          {commands.length === 0 && renderWelcomeMessage()}
          
          {commands.map((command) => (
            <div key={command.id} className="command-block">
              <div className="flex items-center">
                <span className="text-cyber-green">ghost@anonymous</span>
                <span className="text-gray-400">:</span>
                <span className="text-cyber-cyan">~</span>
                <span className="text-gray-400">$ </span>
                <span className="text-white">{command.command}</span>
              </div>
              {command.output && (
                <div className="ml-4 mt-1 text-gray-300 whitespace-pre-wrap">
                  {command.output}
                </div>
              )}
            </div>
          ))}
          
          {/* Current Command Line */}
          <div className="flex items-center mt-4">
            <span className="text-cyber-green">ghost@anonymous</span>
            <span className="text-gray-400">:</span>
            <span className="text-cyber-cyan">~</span>
            <span className="text-gray-400">$ </span>
            <span className="text-white terminal-cursor" data-testid="terminal-cursor"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
