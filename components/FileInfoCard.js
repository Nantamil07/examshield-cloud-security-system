import { FileText, HardDrive, FileBadge2 } from "lucide-react";

export default function FileInfoCard({ file }) {
  const size = (file.size / 1024).toFixed(2);

  return (
    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5">
      <div className="flex items-center gap-4">
        <div className="bg-blue-700 rounded-full p-3">
          <FileText size={28} className="text-white" />
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-blue-800">{file.name}</h3>

          <p className="text-sm text-gray-600 mt-1">
            PDF Document selected for encryption and upload.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-5 text-sm">
        <div className="flex items-center gap-2 text-gray-700">
          <HardDrive size={18} />
          Size: {size} KB
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <FileBadge2 size={18} />
          Type: {file.type || "application/pdf"}
        </div>
      </div>
    </div>
  );
}