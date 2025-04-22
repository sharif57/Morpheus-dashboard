

import { ArrowLeft } from "lucide-react";

export default function Books() {
  return (
    <div className="bg-[#006A82] p-6 rounded-lg shadow-md mx-4">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-white rounded-lg text-black shadow-md">
        <ArrowLeft className="cursor-pointer" />
        <h1 className="text-xl font-semibold">Uploaded Books</h1>
      </div>

      {/* Book Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {[1, 2].map((book, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg p-5 shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            {/* Fully Rounded Image Section */}
            <div className="w-40 h-40 mx-auto bg-[#005163] rounded-full flex items-center justify-center overflow-hidden">
              <img src="/pdf.png" alt="PDF Icon" className="object-contain" />
            </div>
            <h2 className="text-center mt-4 text-lg font-medium">
              BookName.pdf
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
