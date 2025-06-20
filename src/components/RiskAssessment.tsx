
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Shield, Info } from 'lucide-react';

interface RiskAssessmentProps {
  data: any;
}

export const RiskAssessment: React.FC<RiskAssessmentProps> = ({ data }) => {
  if (!data) return null;

  const getRiskIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'medium':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'low':
        return <Shield className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'low':
        return 'bg-green-50 border-green-200 text-green-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Risk Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            {getRiskIcon(data.overallRisk)}
            <div>
              <span className={`px-4 py-2 rounded-lg font-medium ${getRiskColor(data.overallRisk)}`}>
                {data.overallRisk} Risk
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Risk Factors */}
      <div className="grid gap-4">
        {data.riskFactors.map((factor: any, index: number) => (
          <Card key={index} className={`border-l-4 ${
            factor.level.toLowerCase() === 'high' ? 'border-l-red-500' :
            factor.level.toLowerCase() === 'medium' ? 'border-l-yellow-500' :
            'border-l-green-500'
          }`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{factor.category} Risk</CardTitle>
                <div className="flex items-center space-x-2">
                  {getRiskIcon(factor.level)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    factor.level.toLowerCase() === 'high' ? 'bg-red-100 text-red-800' :
                    factor.level.toLowerCase() === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {factor.level}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Risk Description</h4>
                <p className="text-gray-700 text-sm">{factor.description}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Recommended Mitigation</h4>
                <p className="text-gray-700 text-sm">{factor.mitigation}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Risk Matrix Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Matrix Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-2xl font-bold text-green-700">
                {data.riskFactors.filter((f: any) => f.level.toLowerCase() === 'low').length}
              </div>
              <div className="text-sm text-green-600">Low Risk Areas</div>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="text-2xl font-bold text-yellow-700">
                {data.riskFactors.filter((f: any) => f.level.toLowerCase() === 'medium').length}
              </div>
              <div className="text-sm text-yellow-600">Medium Risk Areas</div>
            </div>
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-2xl font-bold text-red-700">
                {data.riskFactors.filter((f: any) => f.level.toLowerCase() === 'high').length}
              </div>
              <div className="text-sm text-red-600">High Risk Areas</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
