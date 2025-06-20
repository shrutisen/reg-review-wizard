
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, BookOpen, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RegulatoryReferencesProps {
  data: any[];
}

export const RegulatoryReferences: React.FC<RegulatoryReferencesProps> = ({ data }) => {
  if (!data) return null;

  const getRegulationIcon = (regulation: string) => {
    if (regulation.includes('CFR')) {
      return <FileText className="h-5 w-5 text-blue-500" />;
    } else if (regulation.includes('ICH')) {
      return <BookOpen className="h-5 w-5 text-green-500" />;
    } else {
      return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card>
        <CardHeader>
          <CardTitle>Regulatory References</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            The following regulations and guidance documents are relevant to your submission. 
            Review these references to ensure full compliance with FDA requirements.
          </p>
        </CardContent>
      </Card>

      {/* Reference Cards */}
      <div className="grid gap-4">
        {data.map((reference: any, index: number) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getRegulationIcon(reference.regulation)}
                  <div>
                    <CardTitle className="text-lg">{reference.regulation}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{reference.title}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(reference.url, '_blank')}
                  className="flex items-center space-x-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>View</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Relevant Sections</h4>
                <div className="flex flex-wrap gap-2">
                  {reference.relevantSections.map((section: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {section}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">FDA Guidance Documents</h4>
              <p className="text-sm text-blue-700 mb-3">
                Access the latest FDA guidance documents for medical devices and drug submissions.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('https://www.fda.gov/regulatory-information/search-fda-guidance-documents', '_blank')}
                className="text-blue-700 border-blue-300 hover:bg-blue-100"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                FDA Guidance Search
              </Button>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">ICH Guidelines</h4>
              <p className="text-sm text-green-700 mb-3">
                International harmonized guidelines for pharmaceutical development and registration.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('https://www.ich.org/page/ich-guidelines', '_blank')}
                className="text-green-700 border-green-300 hover:bg-green-100"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                ICH Guidelines
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
