import React, { useState } from 'react';
import { Code, Key, Link2, RefreshCw, X } from 'lucide-react';

const LinkPage = () => {
  const [apiKeys, setApiKeys] = useState([
    { id: '1', name: 'Production Key', key: 'sk_prod_...3f9d', status: 'Active' },
    { id: '2', name: 'Development Key', key: 'sk_dev_...7b2e', status: 'Active' },
    { id: '3', name: 'Test Key', key: 'sk_test_...9c4a', status: 'Inactive' },
  ]);

  const [webhooks, setWebhooks] = useState([
    {
      id: '1',
      url: 'https://example.com/webhook1',
      events: ['batch.created', 'batch.updated'],
      status: 'Active',
    },
    {
      id: '2',
      url: 'https://example.com/webhook2',
      events: ['alert.triggered'],
      status: 'Active',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newApiKey, setNewApiKey] = useState('');

  // Function to generate a new API key
  const handleGenerateKey = () => {
    const key = `sk_new_${Math.random().toString(36).substring(2, 18)}`;
    setNewApiKey(key);
    setIsModalOpen(true);
  };

  // Function to confirm and save the new API key
  const handleSaveKey = () => {
    const newKey = {
      id: String(apiKeys.length + 1),
      name: 'New Key',
      key: newApiKey,
      status: 'Active',
    };
    setApiKeys([...apiKeys, newKey]);
    setIsModalOpen(false);
    alert('New API key saved!');
  };

  // Function to refresh an API key
  const handleRefreshKey = (id: string) => {
    const updatedKeys = apiKeys.map((key) =>
      key.id === id ? { ...key, key: `sk_refreshed_${Math.random().toString(36).substring(2, 18)}` } : key
    );
    setApiKeys(updatedKeys);
    alert(`API key refreshed: ${id}`);
  };

  // Function to add a new webhook
  const handleAddWebhook = () => {
    const newWebhook = {
      id: String(webhooks.length + 1),
      url: 'https://example.com/new-webhook',
      events: ['batch.created'],
      status: 'Active',
    };
    setWebhooks([...webhooks, newWebhook]);
    alert('New webhook added!');
  };

  // Function to copy code to clipboard
  const handleCopyCode = () => {
    navigator.clipboard.writeText(`curl -X GET "https://api.coldchain.com/v1/batches" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`);
    alert('Code copied to clipboard!');
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">API Integration</h1>

        {/* API Keys Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">API Keys</h2>
            <button
              onClick={handleGenerateKey}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
            >
              <Key className="h-4 w-4" />
              <span>Generate New Key</span>
            </button>
          </div>

          <div className="space-y-4">
            {apiKeys.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.key}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {item.status}
                  </span>
                  <button
                    onClick={() => handleRefreshKey(item.id)}
                    className="text-gray-400 hover:text-gray-600 transition-all duration-200"
                  >
                    <RefreshCw className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API Documentation Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 hover:shadow-md transition-shadow duration-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">API Documentation</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Authentication</h3>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300">
                  <code>{`curl -X GET "https://api.coldchain.com/v1/batches" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}</code>
                </pre>
                <button
                  onClick={handleCopyCode}
                  className="mt-2 text-sm text-blue-500 hover:text-blue-700 transition-all duration-200"
                >
                  Copy to Clipboard
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Endpoints</h3>
              <div className="space-y-4">
                {[
                  {
                    method: 'GET',
                    path: '/v1/batches',
                    description: 'List all batches',
                  },
                  {
                    method: 'POST',
                    path: '/v1/batches',
                    description: 'Create a new batch',
                  },
                  {
                    method: 'GET',
                    path: '/v1/batches/:id',
                    description: 'Get batch details',
                  },
                ].map((endpoint, index) => (
                  <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-md ${
                        endpoint.method === 'GET' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {endpoint.method}
                    </span>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{endpoint.path}</p>
                      <p className="text-sm text-gray-500">{endpoint.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Webhooks Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Webhooks</h2>
            <button
              onClick={handleAddWebhook}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
            >
              <Link2 className="h-4 w-4" />
              <span>Add Webhook</span>
            </button>
          </div>

          <div className="space-y-4">
            {webhooks.map((webhook) => (
              <div key={webhook.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900">{webhook.url}</p>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      webhook.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {webhook.status}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {webhook.events.map((event, eventIndex) => (
                    <span
                      key={eventIndex}
                      className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full"
                    >
                      {event}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for New API Key */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-11/12 max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">New API Key</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Your new API key has been generated. Please copy it and store it securely.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <pre className="text-sm text-gray-700 break-all">{newApiKey}</pre>
              </div>
              <button
                onClick={handleSaveKey}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                Save Key
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkPage;