'use client';

import { ArrowLeft, Shield, CheckCircle, Camera, Upload, FileText, Award } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';

const certifications = [
  {
    id: 'cert-001',
    productName: 'Ashwagandha Root Powder',
    batchNumber: 'ASH-2024-1156',
    status: 'verified',
    certType: 'Organic India',
    issueDate: '2024-10-15',
    expiryDate: '2025-10-15',
    verifiedBy: 'AYUSH Quality Council',
    qrCode: true,
  },
  {
    id: 'cert-002',
    productName: 'Tulsi Leaves (Dried)',
    batchNumber: 'TUL-2024-0892',
    status: 'verified',
    certType: 'AYUSH Certified',
    issueDate: '2024-09-20',
    expiryDate: '2025-09-20',
    verifiedBy: 'NMPB',
    qrCode: true,
  },
  {
    id: 'cert-003',
    productName: 'Turmeric Powder',
    batchNumber: 'TUR-2024-2341',
    status: 'pending',
    certType: 'ISO 9001',
    issueDate: '2024-11-20',
    expiryDate: '2025-11-20',
    verifiedBy: 'Bureau of Indian Standards',
    qrCode: false,
  },
];

export default function QualityVerificationPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Quality Verification</h1>
            <p className="text-xs text-gray-500">Blockchain-backed Certification</p>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
        <div className="flex items-center gap-3 mb-3">
          <Shield className="w-8 h-8" />
          <div>
            <p className="font-bold text-lg">Verified Quality Assurance</p>
            <p className="text-sm opacity-90">Government-backed certification system</p>
          </div>
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg p-3 text-sm">
          <p className="font-medium mb-1">Blockchain Verification Active</p>
          <p className="text-xs opacity-90">All certifications stored on distributed ledger for authenticity</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 p-4">
        <button className="bg-white rounded-lg shadow-md p-4 text-center active:scale-95 transition-transform">
          <Camera className="w-8 h-8 text-brand-primary mx-auto mb-2" />
          <p className="text-sm font-semibold">Scan QR Code</p>
          <p className="text-xs text-gray-500">Verify instantly</p>
        </button>
        <button className="bg-white rounded-lg shadow-md p-4 text-center active:scale-95 transition-transform">
          <Upload className="w-8 h-8 text-brand-primary mx-auto mb-2" />
          <p className="text-sm font-semibold">Upload Certificate</p>
          <p className="text-xs text-gray-500">Add new</p>
        </button>
      </div>

      {/* Certifications List */}
      <div className="px-4">
        <h3 className="font-semibold mb-3">My Certifications</h3>
        <div className="space-y-3">
          {certifications.map((cert) => (
            <div key={cert.id} className="bg-white rounded-lg shadow-md p-4">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1">{cert.productName}</h4>
                  <p className="text-xs text-gray-500">Batch: {cert.batchNumber}</p>
                </div>
                <Badge variant={cert.status === 'verified' ? 'success' : 'warning'}>
                  {cert.status === 'verified' ? (
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  ) : (
                    'Pending'
                  )}
                </Badge>
              </div>

              {/* Certification Details */}
              <div className="space-y-2 text-xs mb-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Certification Type</span>
                  <span className="font-medium">{cert.certType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Verified By</span>
                  <span className="font-medium">{cert.verifiedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Valid Until</span>
                  <span className="font-medium">{cert.expiryDate}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <FileText className="w-4 h-4 mr-1" />
                  View Certificate
                </Button>
                {cert.qrCode && (
                  <Button variant="primary" size="sm" className="flex-1">
                    <Camera className="w-4 h-4 mr-1" />
                    Show QR
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Card */}
      <div className="mx-4 mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Award className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-700">
            <p className="font-semibold text-blue-900 mb-1">Quality Standards</p>
            <p className="text-xs">All products on eCharak 2.0 undergo rigorous quality checks. Certifications are verified through blockchain technology ensuring complete traceability and authenticity.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
