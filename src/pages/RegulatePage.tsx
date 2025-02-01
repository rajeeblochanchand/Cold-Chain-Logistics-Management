import React, { useState } from 'react';
import { ThermometerSnowflake, Droplets, AlertTriangle, X } from 'lucide-react';

// Reusable QuickActionButton Component
interface QuickActionButtonProps {
  icon: JSX.Element;
  label: string;
  onClick: () => void;
  color?: string;
}

const QuickActionButton = ({ icon, label, onClick, color = 'blue' }: QuickActionButtonProps) => (
  <button
    className={`w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 ${
      color === 'red' ? 'hover:bg-red-50' : 'hover:bg-blue-50'
    }`}
    onClick={onClick}
    aria-label={label}
  >
    <span className="flex items-center">
      {React.cloneElement(icon, { className: `h-6 w-6 ${color === 'red' ? 'text-red-600' : 'text-blue-600'}` })}
      <span className="ml-3 text-gray-700">{label}</span>
    </span>
    <span className="text-gray-400">→</span>
  </button>
);

// Reusable Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close modal">
            <X className="h-6 w-6" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const RegulatePage = () => {
  const [formData, setFormData] = useState({
    batchId: '',
    temperature: '',
    humidity: '',
    environment: 'storage',
    status: 'active',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Quick Actions State
  const [isTempModalOpen, setIsTempModalOpen] = useState(false);
  const [isHumidityModalOpen, setIsHumidityModalOpen] = useState(false);
  const [tempValue, setTempValue] = useState('');
  const [humidityValue, setHumidityValue] = useState('');
  const [modalErrors, setModalErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form fields
    const newErrors: { [key: string]: string } = {};
    if (!formData.batchId) newErrors.batchId = 'Batch ID is required';
    if (!formData.temperature || +formData.temperature < -20 || +formData.temperature > 50)
      newErrors.temperature = 'Temperature must be between -20°C and 50°C';
    if (!formData.humidity || +formData.humidity < 0 || +formData.humidity > 100)
      newErrors.humidity = 'Humidity must be between 0% and 100%';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Handle form submission
    console.log('Form Data:', formData);
    setErrors({});
    alert('Settings applied successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleReset = () => {
    setFormData({
      batchId: '',
      temperature: '',
      humidity: '',
      environment: 'storage',
      status: 'active',
    });
    setErrors({});
  };

  // Quick Actions Handlers
  const handleOverrideTemp = () => {
    setIsTempModalOpen(true);
    setModalErrors({});
  };

  const handleAdjustHumidity = () => {
    setIsHumidityModalOpen(true);
    setModalErrors({});
  };

  const handleEmergencyStop = () => {
    if (window.confirm('Are you sure you want to trigger an emergency stop?')) {
      alert('Emergency stop triggered!');
    }
  };

  const handleTempSubmit = () => {
    if (!tempValue || +tempValue < -20 || +tempValue > 50) {
      setModalErrors({ temperature: 'Temperature must be between -20°C and 50°C' });
      return;
    }
    alert(`Temperature overridden to ${tempValue}°C`);
    setIsTempModalOpen(false);
    setTempValue('');
  };

  const handleHumiditySubmit = () => {
    if (!humidityValue || +humidityValue < 0 || +humidityValue > 100) {
      setModalErrors({ humidity: 'Humidity must be between 0% and 100%' });
      return;
    }
    alert(`Humidity adjusted to ${humidityValue}%`);
    setIsHumidityModalOpen(false);
    setHumidityValue('');
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Regulate</h1>

        {/* Control Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Batch Control Panel</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Batch ID</label>
                    <input
                      type="text"
                      name="batchId"
                      value={formData.batchId}
                      onChange={handleChange}
                      className={`w-full rounded-lg border ${
                        errors.batchId ? 'border-red-500' : 'border-gray-300'
                      } p-2`}
                      placeholder="Enter batch ID"
                    />
                    {errors.batchId && <p className="text-sm text-red-500 mt-1">{errors.batchId}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Temperature (°C)</label>
                    <input
                      type="number"
                      name="temperature"
                      value={formData.temperature}
                      onChange={handleChange}
                      className={`w-full rounded-lg border ${
                        errors.temperature ? 'border-red-500' : 'border-gray-300'
                      } p-2`}
                      placeholder="Enter temperature"
                    />
                    {errors.temperature && <p className="text-sm text-red-500 mt-1">{errors.temperature}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Humidity (%)</label>
                    <input
                      type="number"
                      name="humidity"
                      value={formData.humidity}
                      onChange={handleChange}
                      className={`w-full rounded-lg border ${
                        errors.humidity ? 'border-red-500' : 'border-gray-300'
                      } p-2`}
                      placeholder="Enter humidity"
                    />
                    {errors.humidity && <p className="text-sm text-red-500 mt-1">{errors.humidity}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Environment Type</label>
                    <select
                      name="environment"
                      value={formData.environment}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 p-2"
                    >
                      <option value="storage">Storage</option>
                      <option value="transit">Transit</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Apply Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-4">
                <QuickActionButton
                  icon={<ThermometerSnowflake />}
                  label="Override Temperature"
                  onClick={handleOverrideTemp}
                />
                <QuickActionButton
                  icon={<Droplets />}
                  label="Adjust Humidity"
                  onClick={handleAdjustHumidity}
                />
                <QuickActionButton
                  icon={<AlertTriangle />}
                  label="Emergency Stop"
                  onClick={handleEmergencyStop}
                  color="red"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Active Batches Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Active Batches</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Batch ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Temperature
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Humidity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { id: 'B1234', temp: '2.5°C', humidity: '85%', status: 'Active' },
                  { id: 'B1235', temp: '2.3°C', humidity: '82%', status: 'Active' },
                  { id: 'B1236', temp: '2.7°C', humidity: '87%', status: 'Warning' },
                ].map((batch) => (
                  <tr key={batch.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{batch.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{batch.temp}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{batch.humidity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          batch.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : batch.status === 'Warning'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {batch.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => alert(`Edit ${batch.id}`)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Temperature Override Modal */}
      <Modal isOpen={isTempModalOpen} onClose={() => setIsTempModalOpen(false)} title="Override Temperature">
        <div className="space-y-4">
          <input
            type="number"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className={`w-full rounded-lg border ${
              modalErrors.temperature ? 'border-red-500' : 'border-gray-300'
            } p-2`}
            placeholder="Enter temperature (°C)"
          />
          {modalErrors.temperature && <p className="text-sm text-red-500">{modalErrors.temperature}</p>}
          <button
            onClick={handleTempSubmit}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </Modal>

      {/* Humidity Adjustment Modal */}
      <Modal isOpen={isHumidityModalOpen} onClose={() => setIsHumidityModalOpen(false)} title="Adjust Humidity">
        <div className="space-y-4">
          <input
            type="number"
            value={humidityValue}
            onChange={(e) => setHumidityValue(e.target.value)}
            className={`w-full rounded-lg border ${
              modalErrors.humidity ? 'border-red-500' : 'border-gray-300'
            } p-2`}
            placeholder="Enter humidity (%)"
          />
          {modalErrors.humidity && <p className="text-sm text-red-500">{modalErrors.humidity}</p>}
          <button
            onClick={handleHumiditySubmit}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default RegulatePage;