import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { TerminalSession, TerminalCommand, SystemStats } from "@/types/terminal";

export function useTerminal(sessionId?: string) {
  const queryClient = useQueryClient();
  const [currentCommand, setCurrentCommand] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);

  // Get session data
  const { data: session, isLoading: sessionLoading } = useQuery<TerminalSession>({
    queryKey: ["/api/sessions", sessionId],
    enabled: !!sessionId,
  });

  // Get command history
  const { data: commands = [], isLoading: commandsLoading } = useQuery<TerminalCommand[]>({
    queryKey: ["/api/sessions", sessionId, "commands"],
    enabled: !!sessionId,
  });

  // Execute command mutation
  const executeCommandMutation = useMutation({
    mutationFn: async (command: string) => {
      if (!sessionId) throw new Error("No active session");
      
      const response = await fetch("/api/commands/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          command,
          output: "",
          exitCode: 0,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to execute command");
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch commands
      queryClient.invalidateQueries({ queryKey: ["/api/sessions", sessionId, "commands"] });
      queryClient.invalidateQueries({ queryKey: ["/api/sessions", sessionId] });
      setCurrentCommand("");
      setIsExecuting(false);
    },
    onError: () => {
      setIsExecuting(false);
    },
  });

  const executeCommand = useCallback(async (command: string) => {
    if (!command.trim() || isExecuting) return;
    
    setIsExecuting(true);
    try {
      await executeCommandMutation.mutateAsync(command);
    } catch (error) {
      console.error("Failed to execute command:", error);
    }
  }, [executeCommandMutation, isExecuting]);

  const clearTerminal = useCallback(() => {
    executeCommand("clear");
  }, [executeCommand]);

  // Simulate system stats
  const [systemStats, setSystemStats] = useState<SystemStats>({
    cpuUsage: "23%",
    ramUsage: "1.2GB",
    memoryUsage: "256MB / 2GB",
    activeTools: 3,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats(prev => ({
        ...prev,
        cpuUsage: `${Math.floor(Math.random() * 40 + 10)}%`,
        ramUsage: `${(Math.random() * 0.8 + 0.8).toFixed(1)}GB`,
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    session,
    commands,
    currentCommand,
    setCurrentCommand,
    executeCommand,
    clearTerminal,
    isExecuting,
    isLoading: sessionLoading || commandsLoading,
    systemStats,
  };
}
