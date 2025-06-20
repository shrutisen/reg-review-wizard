
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface ComplianceAnalysisProps {
  data: any;
}

export const ComplianceAnalysis: React.FC<ComplianceAnalysisProps> = ({ data }) => {
  if (!data) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'minor_issues':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'non_compliant':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'minor_issues':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'non_compliant':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Compliance Score */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Compliance Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-bold text-gray-900">{data.overallScore}%</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  data.overallScore >= 90 ? 'bg-green-100 text-green-800' :
                  data.overallScore >= 70 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {data.overallScore >= 90 ? 'Excellent' :
                   data.overallScore >= 70 ? 'Good' : 'Needs Improvement'}
                </span>
              </div>
              <Progress value={data.overallScore} className="h-3" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Section Analysis */}
      <div className="grid gap-6">
        {data.sections.map((section: any, index: number) => (
          <Card key={index} className={`border-l-4 ${
            section.status === 'compliant' ? 'border-l-green-500' :
            section.status === 'minor_issues' ? 'border-l-yellow-500' :
            'border-l-red-500'
          }`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{section.title}</CardTitle>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(section.status)}
                  <span className="text-2xl font-bold">{section.score}%</span>
                </div>
              </div>
              <Progress value={section.score} className="h-2" />
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Positive Findings */}
              {section.findings.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-green-700 flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Compliant Elements</span>
                  </h4>
                  <ul className="space-y-1">
                    {section.findings.map((finding: string, idx: number) => (
                      <li key={idx} className="text-sm text-gray-700 pl-6 relative">
                        <span className="absolute left-0 top-1.5 h-1.5 w-1.5 bg-green-500 rounded-full"></span>
                        {finding}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Gaps and Issues */}
              {section.gaps.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-amber-700 flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Areas for Improvement</span>
                  </h4>
                  <ul className="space-y-1">
                    {section.gaps.map((gap: string, idx: number) => (
                      <li key={idx} className="text-sm text-gray-700 pl-6 relative">
                        <span className="absolute left-0 top-1.5 h-1.5 w-1.5 bg-amber-500 rounded-full"></span>
                        {gap}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
