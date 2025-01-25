import React from 'react';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Shield className="h-12 w-12 mx-auto text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="mt-2 text-gray-600">Last updated:  January 25, 2025</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Information We Collect</h2>
            <p className="text-gray-600">We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-2">
              <li>Personal identification information (name, email, phone number)</li>
              <li>Location data during rides</li>
              <li>Payment information</li>
              <li>Device information and usage data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. How We Use Your Information</h2>
            <p className="text-gray-600">We use the collected information to:</p>
            <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-2">
              <li>Provide and improve our services</li>
              <li>Process your payments</li>
              <li>Send you updates and promotional materials</li>
              <li>Ensure safety and security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Information Sharing</h2>
            <p className="text-gray-600">We may share your information with:</p>
            <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-2">
              <li>Drivers to facilitate your rides</li>
              <li>Payment processors for transactions</li>
              <li>Law enforcement when required by law</li>
              <li>Service providers who assist our operations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Data Security</h2>
            <p className="text-gray-600">We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Your Rights</h2>
            <p className="text-gray-600">You have the right to:</p>
            <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-2">
              <li>Access your personal information</li>
              <li>Request corrections to your data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Contact Us</h2>
            <p className="text-gray-600">If you have any questions about this Privacy Policy, please contact us at privacy@drivorides.com</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;