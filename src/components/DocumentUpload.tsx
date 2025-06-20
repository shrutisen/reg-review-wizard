
import React, { useCallback, useState } from 'react';
import { Upload, FileText, File, X } from 'lucide-react';
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
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-900 mb-2">
          Upload Regulatory Document
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Drag and drop or click to select files
        </p>
        <p className="text-xs text-gray-400 mb-4">
          Supported: {supportedFormats.join(', ')} (Max 50MB)
        </p>
        
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
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isUploading ? 'Uploading...' : 'Select Document'}
        </Button>
      </div>

      {/* Uploaded Documents List */}
      {documents.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900">Uploaded Documents</h3>
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => onDocumentSelect(doc)}
            >
              <div className="flex items-center space-x-3">
                {doc.name.endsWith('.pdf') ? (
                  <FileText className="h-5 w-5 text-red-500" />
                ) : (
                  <File className="h-5 w-5 text-blue-500" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {doc.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(doc.size / 1024 / 1024).toFixed(2)} MB • {doc.uploadDate.toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  doc.analysisStatus === 'complete' 
                    ? 'bg-green-100 text-green-800'
                    : doc.analysisStatus === 'analyzing'
                    ? 'bg-yellow-100 text-yellow-800'
                    : doc.analysisStatus === 'error'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {doc.analysisStatus === 'complete' ? 'Analyzed' :
                   doc.analysisStatus === 'analyzing' ? 'Analyzing' :
                   doc.analysisStatus === 'error' ? 'Error' : 'Pending'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
