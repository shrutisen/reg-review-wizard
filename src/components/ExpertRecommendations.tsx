
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface ExpertRecommendationsProps {
  data: any[];
}

export const ExpertRecommendations: React.FC<ExpertRecommendationsProps> = ({ data }) => {
  if (!data) return null;

  const getPriorityIcon = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'medium':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
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
      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Recommendations Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-2xl font-bold text-red-700">
                {data.filter(r => r.priority.toLowerCase() === 'high').length}
              </div>
              <div className="text-sm text-red-600">High Priority</div>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="text-2xl font-bold text-yellow-700">
                {data.filter(r => r.priority.toLowerCase() === 'medium').length}
              </div>
              <div className="text-sm text-yellow-600">Medium Priority</div>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-2xl font-bold text-green-700">
                {data.filter(r => r.priority.toLowerCase() === 'low').length}
              </div>
              <div className="text-sm text-green-600">Low Priority</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Recommendations */}
      <div className="space-y-4">
        {data.map((recommendation: any, index: number) => (
          <Card key={index} className={`border-l-4 ${
            recommendation.priority.toLowerCase() === 'high' ? 'border-l-red-500' :
            recommendation.priority.toLowerCase() === 'medium' ? 'border-l-yellow-500' :
            'border-l-green-500'
          }`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getPriorityIcon(recommendation.priority)}
                  <CardTitle className="text-lg">{recommendation.title}</CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(recommendation.priority)}`}>
                    {recommendation.priority} Priority
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {recommendation.category}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-gray-700 text-sm">{recommendation.description}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Action Items</h4>
                <ul className="space-y-2">
                  {recommendation.actionItems.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <div className="mt-1.5 h-2 w-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
