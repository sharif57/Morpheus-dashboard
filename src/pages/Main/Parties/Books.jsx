// import { ArrowLeft, ArrowUpToLine } from "lucide-react";

// export default function Books() {
//   return (
//     <div className="bg-[#006A82] p-6 rounded-lg shadow-md mx-4">
//       {/* Header */}
//       <div className="flex items-center gap-3 p-4 bg-white rounded-lg text-black shadow-md">
//         <ArrowLeft className="cursor-pointer" />
//         <h1 className="text-xl font-semibold">Uploaded Books</h1>
//       </div>

//       <div className="flex items-end justify-end mt-2">
//       <button className="mt-4  bg-[#33CDF0] text-[#005163] py-2 px-4 rounded-lg shadow-md  transition duration-300" >
//         <ArrowUpToLine className="inline mr-2" />
//         Upload New Book
//       </button>
//       </div>

//       {/* Book Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
//         {[1, 2].map((book, idx) => (
//           <div
//             key={idx}
//             className="bg-white rounded-lg p-5 shadow-md hover:shadow-xl transition-shadow duration-300"
//           >
//             {/* Fully Rounded Image Section */}
//             <div className="w-40 h-40 mx-auto bg-[#005163] rounded-full flex items-center justify-center overflow-hidden">
//               <img src="/pdf.png" alt="PDF Icon" className="object-contain" />
//             </div>
//             <h2 className="text-center mt-4 text-lg font-medium">
//               BookName.pdf
//             </h2>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useState, useRef } from "react";
import { ArrowLeft, ArrowUpToLine, X } from "lucide-react";

export default function Books() {
  const [uploadedBooks, setUploadedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newBooks = Array.from(files).filter(file => file.type === "application/pdf");
      setUploadedBooks(prev => [...prev, ...newBooks]);
    }
    console.log("Uploaded books:", uploadedBooks);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    const url = URL.createObjectURL(book);
    setPreviewUrl(url);
    console.log("Preview URL:", url);
  };

  const handleClosePreview = () => {
    setSelectedBook(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-[#006A82] p-6 rounded-lg shadow-md mx-4">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-white rounded-lg text-black shadow-md">
        <ArrowLeft className="cursor-pointer" />
        <h1 className="text-xl font-semibold">Uploaded Books</h1>
      </div>

      <div className="flex items-end justify-end mt-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="application/pdf"
          className="hidden"
          multiple
        />
        <button
          onClick={triggerFileInput}
          className="mt-4 bg-[#33CDF0] text-[#005163] py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          <ArrowUpToLine className="inline mr-2" />
          Upload New Book
        </button>
      </div>

      {/* Book Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {uploadedBooks.map((book, idx) => (
          <div
            key={idx}
            onClick={() => handleBookClick(book)}
            className="bg-white rounded-lg p-5 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            {/* Fully Rounded Image Section */}
            <div className="w-40 h-40 mx-auto bg-[#005163] rounded-full flex items-center justify-center overflow-hidden">
              <img src="/pdf.png" alt="PDF Icon" className="object-contain" />
            </div>
            <h2 className="text-center mt-4 text-lg font-medium truncate">
              {book.name}
            </h2>
          </div>
        ))}
      </div>

      {/* PDF Preview Modal */}
      {selectedBook && previewUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">{selectedBook.name}</h3>
              <button onClick={handleClosePreview} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="flex-grow overflow-auto">
              <iframe
                src={previewUrl}
                className="w-full h-full min-h-[70vh]"
                title="PDF Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}