import React, { useCallback, useState } from 'react';
import { Upload, FileText, File, X, Cloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { UploadedDocument } from '@/pages/Index';

interface DocumentUploadProps {
  onDocumentUpload: (document: UploadedDocument) => void;
  documents: UploadedDocument[];
  onDocumentSelect: (document: UploadedDocument) => void;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onDocumentUpload,
  documents,
  onDocumentSelect
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const supportedFormats = [
    '.pdf', '.doc', '.docx', '.txt', '.rtf'
  ];

  const handleFileUpload = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const maxSize = 50 * 1024 * 1024; // 50MB

    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please select a file smaller than 50MB",
        variant: "destructive"
      });
      return;
    }

    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!supportedFormats.includes(fileExtension)) {
      toast({
        title: "Unsupported format",
        description: "Please upload PDF, DOC, DOCX, TXT, or RTF files",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      // Simulate file upload and analysis initialization
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newDocument: UploadedDocument = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type || 'application/octet-stream',
        size: file.size,
        uploadDate: new Date(),
        analysisStatus: 'analyzing'
      };

      onDocumentUpload(newDocument);
      
      toast({
        title: "Document uploaded successfully",
        description: "Regulatory analysis is now in progress"
      });

      // Simulate analysis completion
      setTimeout(() => {
        // This would typically trigger a re-render with updated analysis results
      }, 3000);

    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Please try again or contact support",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  }, [onDocumentUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          isDragOver 
            ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg transform scale-[1.02]' 
            : 'border-gray-300 hover:border-blue-300 hover:bg-gray-50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="relative">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
            {isUploading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
            ) : (
              <Cloud className="h-8 w-8 text-white" />
            )}
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Upload Regulatory Document
        </h3>
        <p className="text-gray-600 mb-4">
          Drag and drop your files here, or click to browse
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {supportedFormats.map((format) => (
            <span key={format} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              {format.toUpperCase()}
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-500 mb-6">Maximum file size: 50MB</p>
        
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept={supportedFormats.join(',')}
          onChange={(e) => handleFileUpload(e.target.files)}
          disabled={isUploading}
        />
        
        <Button 
          onClick={() => document.getElementById('file-upload')?.click()}
          disabled={isUploading}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isUploading ? 'Uploading...' : 'Select Document'}
        </Button>
      </div>

      {/* Uploaded Documents List */}
      {documents.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
            <span>Recent Documents</span>
          </h3>
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="group flex items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md cursor-pointer transition-all duration-200"
                onClick={() => onDocumentSelect(doc)}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg">
                    {doc.name.endsWith('.pdf') ? (
                      <FileText className="h-5 w-5 text-red-600" />
                    ) : (
                      <File className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate group-hover:text-blue-700 transition-colors">
                      {doc.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {(doc.size / 1024 / 1024).toFixed(2)} MB • {doc.uploadDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                    doc.analysisStatus === 'complete' 
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : doc.analysisStatus === 'analyzing'
                      ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                      : doc.analysisStatus === 'error'
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}>
                    {doc.analysisStatus === 'complete' ? '✓ Analyzed' :
                     doc.analysisStatus === 'analyzing' ? '⏳ Analyzing' :
                     doc.analysisStatus === 'error' ? '⚠ Error' : '📋 Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
