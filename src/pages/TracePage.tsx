import React, { useState } from 'react';
import { Search, Download, ChevronDown, ChevronUp } from 'lucide-react';


const TracePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [expandedRecord, setExpandedRecord] = useState<string | null>(null);

  // Mock data for timeline and blockchain records
  const timelineData = [
    {
      id: '1',
      date: '2024-03-15 14:30',
      event: 'Temperature Alert',
      description: 'Temperature exceeded threshold by 0.5°C',
      status: 'warning',
    },
    {
      id: '2',
      date: '2024-03-15 12:00',
      event: 'Location Update',
      description: 'Batch arrived at Warehouse B',
      status: 'info',
    },
    {
      id: '3',
      date: '2024-03-15 08:15',
      event: 'Status Change',
      description: 'Batch status changed to In Transit',
      status: 'success',
    },
  ];

  const blockchainRecords = [
    {
      id: '1',
      hash: '0x8f2e...3b4d',
      timestamp: '2024-03-15 14:35:22',
      type: 'Temperature Log',
      status: 'Verified',
      details: {
        temperature: '2.5°C',
        location: 'Warehouse A',
        batchId: 'B1234',
      },
    },
    {
      id: '2',
      hash: '0x7d1c...9e2f',
      timestamp: '2024-03-15 14:30:15',
      type: 'Location Update',
      status: 'Verified',
      details: {
        location: 'Warehouse B',
        batchId: 'B1234',
      },
    },
    {
      id: '3',
      hash: '0x6b3a...5c8e',
      timestamp: '2024-03-15 14:25:08',
      type: 'Humidity Log',
      status: 'Verified',
      details: {
        humidity: '85%',
        batchId: 'B1234',
      },
    },
  ];

  // Filtered data based on search and filters
  const filteredTimeline = timelineData.filter((item) => {
    const matchesSearch = item.event.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || item.status === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const filteredBlockchainRecords = blockchainRecords.filter((record) => {
    const matchesSearch = record.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || record.status === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Function to export data as JSON
  const handleExportData = () => {
    const dataToExport = {
      timeline: filteredTimeline,
      blockchainRecords: filteredBlockchainRecords,
    };
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'trace_data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Trace</h1>
          <button
            onClick={handleExportData}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
          >
            <Download className="h-4 w-4" />
            <span>Export Data</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 hover:shadow-md transition-shadow duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Batch ID</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border-gray-300 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search batch ID..."
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <input
                type="date"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Completed</option>
                <option>Warning</option>
              </select>
            </div>
          </div>
        </div>

        

        {/* Timeline */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 hover:shadow-md transition-shadow duration-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Batch Timeline</h2>
          <div className="space-y-8">
            {filteredTimeline.map((item) => (
              <div
                key={item.id}
                className="relative flex items-start group cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-all duration-200"
              >
                <div className="flex items-center h-6">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      item.status === 'warning'
                        ? 'bg-yellow-400'
                        : item.status === 'success'
                        ? 'bg-green-400'
                        : 'bg-blue-400'
                    }`}
                  />
                </div>
                <div className="ml-4 min-w-0 flex-1">
                  <div className="text-sm font-medium text-gray-900">{item.event}</div>
                  <div className="mt-1 text-sm text-gray-500">
                    <p>{item.description}</p>
                    <p className="mt-1 text-xs">{item.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blockchain Records */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Blockchain Records</h2>
          <div className="space-y-4">
            {filteredBlockchainRecords.map((record) => (
              <div
                key={record.id}
                className="flex flex-col p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 text-xs font-medium">TX</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{record.hash}</p>
                      <p className="text-sm text-gray-500">{record.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">{record.type}</span>
                    <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                      {record.status}
                    </span>
                    <button
                      onClick={() =>
                        setExpandedRecord(expandedRecord === record.id ? null : record.id)
                      }
                      className="text-gray-400 hover:text-gray-600"
                      aria-label="Toggle details"
                    >
                      {expandedRecord === record.id ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                {expandedRecord === record.id && (
                  <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                    <pre className="text-sm text-gray-700">
                      {JSON.stringify(record.details, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TracePage;