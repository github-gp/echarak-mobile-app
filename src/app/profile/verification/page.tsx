'use client';

import { ArrowLeft, CheckCircle, BadgeCheck, FileUp, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function VerificationPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Verification & Certificates</h1>
            <p className="text-xs text-slate-600">KYC • Compliance • Certifications</p>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-xl mx-auto bg-white mt-8 shadow-md rounded-xl">
        <ol className="mb-6 space-y-3">
          <li>
            <span className="font-bold text-slate-900">Step 1:</span> Upload KYC Documents
            <ul className="ml-5 text-xs text-slate-600 list-disc">
              <li>GST Certificate</li>
              <li>PAN/Aadhaar</li>
              <li>Business Registration</li>
            </ul>
          </li>
          <li>
            <span className="font-bold text-slate-900">Step 2:</span> Upload Certifications (if any)
            <ul className="ml-5 text-xs text-slate-600 list-disc">
              <li>Organic, GMP, ISO, AYUSH, NABL</li>
              <li>Lab Test Reports</li>
            </ul>
          </li>
          <li>
            <span className="font-bold text-slate-900">Step 3:</span> Track Status & Download Badges
          </li>
        </ol>

        <form>
          <label className="block font-medium mb-1">Upload Document</label>
          <input type="file" className="mb-4" />
          <button
            type="button"
            className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800"
            onClick={() => setUploadSuccess(true)}
          >
            <FileUp className="inline w-4 h-4 mr-1" />
            Upload
          </button>
        </form>
        {uploadSuccess && (
          <div className="mt-4 flex items-center gap-2 text-green-700 font-semibold">
            <CheckCircle className="w-5 h-5" />
            Uploaded successfully! Pending admin review.
          </div>
        )}
      </div>
    </div>
  );
}
