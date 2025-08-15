import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DisclaimerModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onCancel: () => void;
}

export function DisclaimerModal({ isOpen, onAccept, onCancel }: DisclaimerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-cyber-dark border border-cyber-light rounded-lg p-6 max-w-md mx-4">
        <div className="flex items-center space-x-3 mb-4">
          <AlertTriangle className="text-cyber-red text-2xl" size={32} />
          <h3 className="text-xl font-bold text-white">🔒 Anonymous Security Platform</h3>
        </div>
        
        <div className="space-y-3 text-gray-300 mb-6">
          <p>This is a fully anonymous cybersecurity platform. All tools route through Tor + VPN + Proxy chains automatically.</p>
          <p className="text-cyber-green font-medium">🚫 COMPLETELY UNTRACEABLE - NO LOGS • NO TRACKING</p>
          <p className="text-cyber-cyan">All network traffic is encrypted and anonymized. Your identity remains hidden.</p>
          <p className="text-cyber-red font-medium">⚠️ Use responsibly. Anonymous doesn't mean consequence-free.</p>
          <p>By continuing, you acknowledge that you will use this platform ethically and lawfully.</p>
        </div>
        
        <div className="flex space-x-3">
          <Button
            onClick={onAccept}
            className="flex-1 bg-cyber-green text-cyber-black hover:bg-cyber-bright font-medium"
            data-testid="button-accept-disclaimer"
          >
            I Understand
          </Button>
          <Button
            onClick={onCancel}
            variant="outline"
            className="border-cyber-light hover:bg-cyber-medium"
            data-testid="button-cancel-disclaimer"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
