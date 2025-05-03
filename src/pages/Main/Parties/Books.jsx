// import { useState, useRef } from "react";
// import { ArrowLeft, ArrowUpToLine, X } from "lucide-react";
// import { useUploadBooksMutation } from "../../../redux/features/uploadBooks";

// export default function Books() {
//   const [uploadedBooks, setUploadedBooks] = useState([]);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const fileInputRef = useRef(null);
//   const [uploadBooks] =useUploadBooksMutation()

//   const handleFileUpload = (e) => {
//     const files = e.target.files;
//     if (files && files.length > 0) {
//       const newBooks = Array.from(files).filter(
//         (file) => file.type === "application/pdf"
//       );
//       setUploadedBooks((prev) => [...prev, ...newBooks]);
//     }
//     console.log("Uploaded books:", uploadedBooks);
//   };

//   const handleBookClick = (book) => {
//     setSelectedBook(book);
//     const url = URL.createObjectURL(book);
//     setPreviewUrl(url);
//     console.log("Preview URL:", url);
//   };

//   const handleClosePreview = () => {
//     setSelectedBook(null);
//     if (previewUrl) {
//       URL.revokeObjectURL(previewUrl);
//       setPreviewUrl(null);
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };

//   return (
//     <div className="bg-[#006A82] p-6 rounded-lg shadow-md mx-4">
//       {/* Header */}
//       <div className="flex items-center gap-3 p-4 bg-white rounded-lg text-black shadow-md">
//         <ArrowLeft className="cursor-pointer" />
//         <h1 className="text-xl font-semibold">Uploaded Books</h1>
//       </div>

//       <div className="flex items-end justify-end mt-2">
//         <input
//           type="file"
//           ref={fileInputRef}
//           onChange={handleFileUpload}
//           accept="application/pdf"
//           className="hidden"
//           multiple
//         />
//         <button
//           onClick={triggerFileInput}
//           className="mt-4 bg-[#33CDF0] text-[#005163] py-2 px-4 rounded-lg shadow-md transition duration-300"
//         >
//           <ArrowUpToLine className="inline mr-2" />
//           Upload New Book
//         </button>
//       </div>

//       {/* Book Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
//         {uploadedBooks.map((book, idx) => (
//           <div
//             key={idx}
//             onClick={() => handleBookClick(book)}
//             className="bg-white rounded-lg p-5 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
//           >
//             {/* Fully Rounded Image Section */}
//             <div className="w-40 h-40 mx-auto bg-[#005163] rounded-full flex items-center justify-center overflow-hidden">
//               <img src="/pdf.png" alt="PDF Icon" className="object-contain" />
//             </div>
//             <h2 className="text-center mt-4 text-lg font-medium truncate">
//               {book.name}
//             </h2>
//           </div>
//         ))}
//       </div>

//       {/* PDF Preview Modal */}
//       {selectedBook && previewUrl && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
//             <div className="flex justify-between items-center p-4 border-b">
//               <h3 className="text-lg font-semibold">{selectedBook.name}</h3>
//               <button
//                 onClick={handleClosePreview}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={24} />
//               </button>
//             </div>
//             <div className="flex-grow overflow-auto">
//               <iframe
//                 src={previewUrl}
//                 className="w-full h-full min-h-[70vh]"
//                 title="PDF Preview"
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useRef } from "react";
import { ArrowLeft, ArrowUpToLine, X } from "lucide-react";
import { useUploadBooksMutation } from "../../../redux/features/uploadBooks";

export default function Books() {
  const [uploadedBooks, setUploadedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);
  const fileInputRef = useRef(null);
  const [uploadBooks] = useUploadBooksMutation();

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newBooks = Array.from(files).filter(
        (file) => file.type === "application/pdf"
      );
      console.log(files); 
      
      setUploadedBooks((prev) => [...prev, ...newBooks]);
      setUploadStatus("uploading");
      
      try {
        // Create FormData for each file and upload
        for (const book of newBooks) {
          const formData = new FormData();
          formData.append("ebook",File(book));
          // formData.append("title", book.name.replace('.pdf', ''));
          // formData.append("description", "Uploaded via web interface");
          
          const response = await uploadBooks(formData);
          
          if (response.error) {
            throw new Error(response.error.message || "Upload failed");
          }
          
          setUploadProgress((prev) => prev + (100 / newBooks.length));
        }
        
        setUploadStatus("success");
        setTimeout(() => setUploadStatus(null), 3000);
      } catch (error) {
        console.error("Upload error:", error);
        setUploadStatus("error");
        setTimeout(() => setUploadStatus(null), 3000);
      } finally {
        setUploadProgress(0);
      }
    }
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    const url = URL.createObjectURL(book);
    setPreviewUrl(url);
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

  const removeBook = (index) => {
    setUploadedBooks((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-[#006A82] p-6 rounded-lg shadow-md mx-4">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-white rounded-lg text-black shadow-md">
        <ArrowLeft className="cursor-pointer" />
        <h1 className="text-xl font-semibold">Uploaded Books</h1>
      </div>

      {/* Upload Section */}
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
          className="mt-4 bg-[#33CDF0] text-[#005163] py-2 px-4 rounded-lg shadow-md transition duration-300 hover:bg-[#2ab8d8] flex items-center"
          disabled={uploadStatus === "uploading"}
        >
          <ArrowUpToLine className="inline mr-2" />
          {uploadStatus === "uploading" ? "Uploading..." : "Upload New Book"}
        </button>
      </div>

      {/* Upload Status */}
      {uploadStatus && (
        <div className="mt-4">
          {uploadStatus === "uploading" && (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
          {uploadStatus === "success" && (
            <p className="text-green-500 mt-2">Upload successful!</p>
          )}
          {uploadStatus === "error" && (
            <p className="text-red-500 mt-2">Upload failed. Please try again.</p>
          )}
        </div>
      )}

      {/* Book Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {uploadedBooks.map((book, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg p-5 shadow-md hover:shadow-xl transition-shadow duration-300 relative group"
          >
            {/* Remove button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeBook(idx);
              }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
            
            {/* Book content */}
            <div
              onClick={() => handleBookClick(book)}
              className="cursor-pointer"
            >
              <div className="w-40 h-40 mx-auto bg-[#005163] rounded-full flex items-center justify-center overflow-hidden">
                <img src="/pdf.png" alt="PDF Icon" className="object-contain" />
              </div>
              <h2 className="text-center mt-4 text-lg font-medium truncate">
                {book.name}
              </h2>
              <p className="text-center text-sm text-gray-500">
                {(book.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {uploadedBooks.length === 0 && (
        <div className="text-center py-10 text-white">
          <p>No books uploaded yet. Click "Upload New Book" to get started.</p>
        </div>
      )}

      {/* PDF Preview Modal */}
      {selectedBook && previewUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">{selectedBook.name}</h3>
              <button
                onClick={handleClosePreview}
                className="text-gray-500 hover:text-gray-700"
              >
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