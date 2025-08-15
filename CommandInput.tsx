import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Terminal, History, HelpCircle } from "lucide-react";

interface CommandInputProps {
  currentCommand: string;
  onCommandChange: (command: string) => void;
  onExecuteCommand: (command: string) => void;
  isExecuting: boolean;
  onShowHistory: () => void;
  onShowHelp: () => void;
}

export function CommandInput({
  currentCommand,
  onCommandChange,
  onExecuteCommand,
  isExecuting,
  onShowHistory,
  onShowHelp,
}: CommandInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCommand.trim() && !isExecuting) {
      setCommandHistory(prev => [...prev, currentCommand]);
      setHistoryIndex(-1);
      onExecuteCommand(currentCommand);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        onCommandChange(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        onCommandChange(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        onCommandChange("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Basic autocomplete for common commands
      const commonCommands = ["help", "ls", "cd", "pwd", "clear", "nmap", "sqlmap", "hashcat", "whois", "ping", "tutorial", "tools"];
      const matches = commonCommands.filter(cmd => cmd.startsWith(currentCommand.toLowerCase()));
      if (matches.length === 1) {
        onCommandChange(matches[0]);
      }
    }
  };

  return (
    <div className="bg-cyber-medium border-t border-cyber-light p-3">
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 text-sm">
          <Terminal className="text-cyber-green" size={16} />
          <span className="text-gray-400">Command:</span>
        </div>
        
        <div className="flex-1 relative">
          <Input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => onCommandChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-cyber-black border-cyber-light text-white font-mono focus:border-cyber-green"
            placeholder="Type command here... (Tab for autocomplete)"
            disabled={isExecuting}
            data-testid="input-command"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs">
            Ctrl+C to cancel
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            type="submit"
            disabled={!currentCommand.trim() || isExecuting}
            className="bg-cyber-green text-cyber-black hover:bg-cyber-bright font-medium"
            data-testid="button-execute"
          >
            {isExecuting ? "Executing..." : "Execute"}
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onShowHistory}
            className="hover:bg-cyber-light"
            data-testid="button-history"
          >
            <History className="text-gray-400" size={16} />
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onShowHelp}
            className="hover:bg-cyber-light"
            data-testid="button-help"
          >
            <HelpCircle className="text-gray-400" size={16} />
          </Button>
        </div>
      </form>
    </div>
  );
}
