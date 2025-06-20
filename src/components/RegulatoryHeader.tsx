
import React from 'react';
import { FileText, Shield, CheckCircle, Star } from 'lucide-react';

export const RegulatoryHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm backdrop-blur-sm bg-white/95">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-3 rounded-xl shadow-lg">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-700 bg-clip-text text-transparent">
                FDA Regulatory Review
              </h1>
              <p className="text-sm text-gray-600 font-medium">Professional Document Analysis & Compliance Assessment</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
              <FileText className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">21 CFR Compliant</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">ICH Guidelines</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg">
              <Star className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-700">Expert Analysis</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
