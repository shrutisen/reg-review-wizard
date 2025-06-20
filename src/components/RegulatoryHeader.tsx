
import React from 'react';
import { FileText, Shield, CheckCircle } from 'lucide-react';

export const RegulatoryHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">FDA Regulatory Review</h1>
              <p className="text-sm text-gray-600">Professional Document Analysis & Compliance Assessment</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FileText className="h-4 w-4" />
              <span>21 CFR Compliant</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <CheckCircle className="h-4 w-4" />
              <span>ICH Guidelines</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
