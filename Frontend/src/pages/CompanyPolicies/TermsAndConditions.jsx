import React from 'react';
import { ScrollText } from 'lucide-react';

const TermsAndConditions = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <ScrollText className="h-12 w-12 mx-auto text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Terms and Conditions</h1>
          <p className="mt-2 text-gray-600">Last updated: January 25, 2025</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-600">By accessing and using Drivo Rides services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Service Description</h2>
            <p className="text-gray-600">Drivo Rides provides a ride-booking platform connecting passengers with drivers. We facilitate transportation services but are not a transportation carrier.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. User Responsibilities</h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Provide accurate information during registration</li>
              <li>Maintain the security of your account</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Treat drivers and other users with respect</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Payment Terms</h2>
            <p className="text-gray-600">Users agree to pay all fees associated with the services. Prices may vary based on demand, location, and other factors. Cancellation fees may apply.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Liability</h2>
            <p className="text-gray-600">Drivo Rides is not liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Modifications</h2>
            <p className="text-gray-600">We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;