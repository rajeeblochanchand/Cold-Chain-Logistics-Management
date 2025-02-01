import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Shield, 
  Activity,
  Box,
  ChevronDown
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80"
          >
            <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-cyan-900/90" />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Revolutionizing Cold Chain Logistics
            <br />
            <span className="text-blue-400">with AI and Blockchain</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Real-time monitoring, predictive analytics, and blockchain traceability
            for your temperature-sensitive supply chain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
            <Link
              to="#features"
              className="bg-white text-blue-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Explore Features
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Logistics
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to manage your cold chain effectively
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Activity className="w-12 h-12 text-blue-600" />,
                title: 'Real-Time Monitoring',
                description:
                  'Monitor temperature, humidity, and location data in real-time with advanced IoT sensors.',
              },
              {
                icon: <BarChart3 className="w-12 h-12 text-blue-600" />,
                title: 'Predictive Analytics',
                description:
                  'AI-powered predictions to prevent spoilage and optimize your cold chain operations.',
              },
              {
                icon: <Shield className="w-12 h-12 text-blue-600" />,
                title: 'Blockchain Traceability',
                description:
                  'Immutable record-keeping ensures complete transparency and accountability.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600">
              See what our clients say about our solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Supply Chain Director',
                company: 'PharmaCore Inc.',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
                quote:
                  'The predictive analytics have helped us reduce spoilage by 47%. This system has revolutionized our cold chain operations.',
              },
              {
                name: 'Michael Chen',
                role: 'Operations Manager',
                company: 'Fresh Foods Global',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
                quote:
                  'Real-time monitoring and blockchain traceability give us complete visibility into our supply chain. Incredible tool!',
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Box className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">ColdChain</span>
              </div>
              <p className="text-gray-400">
                Revolutionizing cold chain logistics with cutting-edge technology.
              </p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li>
                  <Link to="/dashboard" className="text-gray-400 hover:text-white">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/regulate" className="text-gray-400 hover:text-white">
                    Regulate
                  </Link>
                </li>
                <li>
                  <Link to="/trace" className="text-gray-400 hover:text-white">
                    Trace
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Contact</h5>
              <ul className="space-y-2">
                <li className="text-gray-400">contact@coldchain.com</li>
                <li className="text-gray-400">+1 (555) 123-4567</li>
                <li className="text-gray-400">
                  123 Logistics Way
                  <br />
                  Tech City, TC 12345
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Follow Us</h5>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  Twitter
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  LinkedIn
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Facebook
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ColdChain. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;