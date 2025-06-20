
import React from 'react';
import { DocumentUpload } from '@/components/DocumentUpload';
import { AnalysisDashboard } from '@/components/AnalysisDashboard';
import { RegulatoryHeader } from '@/components/RegulatoryHeader';
import { useState } from 'react';

export interface UploadedDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: Date;
  analysisStatus: 'pending' | 'analyzing' | 'complete' | 'error';
  analysisResults?: any;
}

const Index = () => {
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<UploadedDocument | null>(null);

  const handleDocumentUpload = (newDocument: UploadedDocument) => {
    setDocuments(prev => [...prev, newDocument]);
  };

  const handleDocumentSelect = (document: UploadedDocument) => {
    setSelectedDocument(document);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <RegulatoryHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Document Upload Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 backdrop-blur-sm bg-white/90">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                <h2 className="text-xl font-semibold text-gray-900">Document Upload</h2>
              </div>
              <DocumentUpload 
                onDocumentUpload={handleDocumentUpload}
                documents={documents}
                onDocumentSelect={handleDocumentSelect}
              />
            </div>
          </div>

          {/* Analysis Dashboard */}
          <div className="lg:col-span-2">
            <AnalysisDashboard 
              selectedDocument={selectedDocument}
              documents={documents}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
