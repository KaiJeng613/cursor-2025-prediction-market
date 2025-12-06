import { useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { X, Wallet, CheckCircle } from 'lucide-react';

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletConnectModal: React.FC<WalletConnectModalProps> = ({ isOpen, onClose }) => {
  const { connectors, connect, isPending, error } = useConnect();
  const { isConnected } = useAccount();
  const [selectedConnector, setSelectedConnector] = useState<any>(null);

  if (!isOpen) return null;

  const handleConnect = (connector: any) => {
    setSelectedConnector(connector);
    connect({ connector }, {
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        console.error('Connection error:', error);
      }
    });
  };

  const getWalletIcon = (connectorName: string) => {
    if (connectorName.toLowerCase().includes('metamask')) {
      return '🦊';
    } else if (connectorName.toLowerCase().includes('coinbase')) {
      return '🔵';
    } else if (connectorName.toLowerCase().includes('rabby')) {
      return '🐰';
    }
    return '💼';
  };

  const getWalletDescription = (connectorName: string) => {
    if (connectorName.toLowerCase().includes('metamask')) {
      return 'Connect to your MetaMask Wallet';
    } else if (connectorName.toLowerCase().includes('coinbase')) {
      return 'Connect to Coinbase Wallet';
    } else if (connectorName.toLowerCase().includes('rabby')) {
      return 'Connect to Rabby Wallet';
    }
    return 'Connect to Web3 Wallet';
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-slideUp">
          {/* Header */}
          <div className="border-b border-gray-200 p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Wallet size={28} className="text-primary-600" />
                Connect Wallet
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Choose your preferred wallet to connect
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {isConnected ? (
              <div className="text-center py-8">
                <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Successfully Connected!
                </h3>
                <p className="text-gray-600 mb-4">
                  Your wallet is now connected to PredictHub
                </p>
                <button
                  onClick={onClose}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Start Trading
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {connectors.map((connector) => (
                    <button
                      key={connector.id}
                      onClick={() => handleConnect(connector)}
                      disabled={isPending}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                        isPending && selectedConnector?.id === connector.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                      } cursor-pointer`}
                    >
                      <div className="text-4xl">{getWalletIcon(connector.name)}</div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-gray-900 flex items-center gap-2">
                          {connector.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {getWalletDescription(connector.name)}
                        </div>
                      </div>
                      {isPending && selectedConnector?.id === connector.id && (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
                      )}
                    </button>
                  ))}
                </div>

                {error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">
                      <strong>Error:</strong> {error.message}
                    </p>
                  </div>
                )}

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>💡 New to Web3?</strong> Install{' '}
                    <a
                      href="https://metamask.io/download/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-blue-900"
                    >
                      MetaMask
                    </a>
                    ,{' '}
                    <a
                      href="https://www.coinbase.com/wallet"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-blue-900"
                    >
                      Coinbase Wallet
                    </a>
                    , or{' '}
                    <a
                      href="https://rabby.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-blue-900"
                    >
                      Rabby
                    </a>{' '}
                    to get started.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

