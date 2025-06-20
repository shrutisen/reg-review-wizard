
import React, { useState, useEffect } from 'react';
import { ComplianceAnalysis } from '@/components/ComplianceAnalysis';
import { RiskAssessment } from '@/components/RiskAssessment';
import { ExpertRecommendations } from '@/components/ExpertRecommendations';
import { RegulatoryReferences } from '@/components/RegulatoryReferences';
import { UploadedDocument } from '@/pages/Index';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, AlertTriangle, CheckCircle, BookOpen } from 'lucide-react';

interface AnalysisDashboardProps {
  selectedDocument: UploadedDocument | null;
  documents: UploadedDocument[];
}

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({
  selectedDocument,
  documents
}) => {
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedDocument && selectedDocument.analysisStatus === 'analyzing') {
      setIsLoading(true);
      
      // Simulate analysis completion
      const timer = setTimeout(() => {
        setAnalysisData(generateMockAnalysis(selectedDocument));
        setIsLoading(false);
        // Update document status
        selectedDocument.analysisStatus = 'complete';
      }, 3000);

      return () => clearTimeout(timer);
    } else if (selectedDocument && selectedDocument.analysisStatus === 'complete') {
      setAnalysisData(generateMockAnalysis(selectedDocument));
      setIsLoading(false);
    }
  }, [selectedDocument]);

  if (!selectedDocument) {
    return (
      <Card className="h-96 flex items-center justify-center">
        <CardContent className="text-center">
          <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Document Selected</h3>
          <p className="text-gray-500">Upload and select a document to begin regulatory analysis</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading || selectedDocument.analysisStatus === 'analyzing') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analyzing Document: {selectedDocument.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Performing comprehensive regulatory analysis...</p>
              <p className="text-sm text-gray-500 mt-2">This may take a few minutes</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Analysis Results: {selectedDocument.name}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="compliance" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="compliance" className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Compliance</span>
              </TabsTrigger>
              <TabsTrigger value="risk" className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4" />
                <span>Risk Assessment</span>
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>Recommendations</span>
              </TabsTrigger>
              <TabsTrigger value="references" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>References</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="compliance" className="mt-6">
              <ComplianceAnalysis data={analysisData?.compliance} />
            </TabsContent>

            <TabsContent value="risk" className="mt-6">
              <RiskAssessment data={analysisData?.riskAssessment} />
            </TabsContent>

            <TabsContent value="recommendations" className="mt-6">
              <ExpertRecommendations data={analysisData?.recommendations} />
            </TabsContent>

            <TabsContent value="references" className="mt-6">
              <RegulatoryReferences data={analysisData?.references} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

// Mock analysis data generator
const generateMockAnalysis = (document: UploadedDocument) => {
  return {
    compliance: {
      overallScore: 85,
      sections: [
        {
          title: "21 CFR Part 820 - Quality System Regulation",
          score: 90,
          status: "compliant",
          findings: [
            "Document design controls are well-defined and align with FDA requirements",
            "Risk management processes are adequately documented",
            "Validation and verification procedures meet regulatory standards"
          ],
          gaps: [
            "Consider enhancing supplier control documentation",
            "Clinical evaluation section could benefit from additional detail"
          ]
        },
        {
          title: "21 CFR Part 814 - Premarket Approval",
          score: 80,
          status: "minor_issues",
          findings: [
            "Clinical data presentation follows FDA guidance",
            "Statistical analysis methodology is appropriate"
          ],
          gaps: [
            "Manufacturing information requires additional detail",
            "Post-market surveillance plan needs enhancement"
          ]
        }
      ]
    },
    riskAssessment: {
      overallRisk: "Medium",
      riskFactors: [
        {
          category: "Clinical",
          level: "Low",
          description: "Clinical data appears comprehensive with appropriate endpoints",
          mitigation: "Continue monitoring post-market safety data"
        },
        {
          category: "Manufacturing",
          level: "Medium",
          description: "Some manufacturing controls need additional documentation",
          mitigation: "Enhance process validation documentation"
        },
        {
          category: "Regulatory",
          level: "Low",
          description: "Submission format aligns with FDA expectations",
          mitigation: "Address minor compliance gaps identified"
        }
      ]
    },
    recommendations: [
      {
        priority: "High",
        category: "Compliance",
        title: "Enhance Manufacturing Documentation",
        description: "Strengthen process validation and control documentation to meet 21 CFR Part 820 requirements",
        actionItems: [
          "Update process validation protocols",
          "Enhance supplier qualification documentation",
          "Improve change control procedures"
        ]
      },
      {
        priority: "Medium",
        category: "Clinical",
        title: "Expand Post-Market Surveillance",
        description: "Develop comprehensive post-market surveillance plan as required by FDA guidance",
        actionItems: [
          "Define adverse event reporting procedures",
          "Establish periodic safety update reports",
          "Create risk-benefit assessment framework"
        ]
      }
    ],
    references: [
      {
        regulation: "21 CFR Part 820",
        title: "Quality System Regulation",
        relevantSections: ["820.30 Design Controls", "820.50 Purchasing Controls"],
        url: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfcfr/CFRSearch.cfm?CFRPart=820"
      },
      {
        regulation: "21 CFR Part 814",
        title: "Premarket Approval of Medical Devices",
        relevantSections: ["814.20 Application", "814.44 Procedures for review"],
        url: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfcfr/CFRSearch.cfm?CFRPart=814"
      },
      {
        regulation: "ICH E6(R2)",
        title: "Good Clinical Practice",
        relevantSections: ["Protocol Design", "Data Management"],
        url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents"
      }
    ]
  };
};
