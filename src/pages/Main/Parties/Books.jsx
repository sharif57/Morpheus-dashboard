import { useState, useRef } from "react";
import { ArrowLeft, ArrowUpToLine, X } from "lucide-react";
import {
  useGetBooksListQuery,
  useResetBooksMutation,
  useUploadBooksMutation,
} from "../../../redux/features/uploadBooks";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Books() {
  const [, setUploadedBooks] = useState([]);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);
  const fileInputRef = useRef(null);
  const [uploadBooks] = useUploadBooksMutation();
  const { data } = useGetBooksListQuery();
  console.log(data, "datas");

  const [resetBooks] = useResetBooksMutation();

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const validBooks = Array.from(files).filter(
      (file) => file.type === "application/pdf" && file.size <= MAX_FILE_SIZE
    );

    if (validBooks.length !== files.length) {
      setUploadStatus({
        type: "error",
        message: "Some files were rejected (only PDFs under 10MB allowed)",
      });
      setTimeout(() => setUploadStatus(null), 3000);
    }

    if (validBooks.length === 0) return;

    setUploadedBooks((prev) => [...prev, ...validBooks]);
    setUploadStatus({ type: "uploading" });

    try {
      for (const book of validBooks) {
        const formData = new FormData();
        formData.append("ebooks", book); // Matching backend expected field name
        formData.append("Key", "book_upload"); // Additional required parameter

        const response = await uploadBooks(formData).unwrap();
        console.log(response, "response");

        if (response.error) {
          throw new Error(response.error.message || "Upload failed");
        }

        setUploadProgress((prev) => prev + 100 / validBooks.length);
      }

      setUploadStatus({ type: "success", message: "Upload successful!" });
      setTimeout(() => setUploadStatus(null), 3000);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus({
        type: "error",
        message:
          error.data?.error?.message || "Upload failed. Please try again.",
      });
      setTimeout(() => setUploadStatus(null), 3000);
    } finally {
      setUploadProgress(0);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeBook = (index) => {
    setUploadedBooks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReset = async () => {
    const willReset = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reset it!",
    });

    if (willReset.isConfirmed) {
      try {
        const res = await resetBooks({}).unwrap();
        console.log(res, "reset");
        Swal.fire("Reset!", "Books have been reset successfully.", "success");
      } catch (error) {
        console.error("Reset error:", error);
        Swal.fire("Error!", "Failed to reset books.", "error");
      }
    }
  };

  return (
    <div className="bg-[#006A82] p-6 rounded-lg shadow-md mx-4">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 p-2 bg-white rounded-lg text-black shadow-md"
        >
          <ArrowLeft className="cursor-pointer" />
          <h1 className="text-lg font-semibold">Uploaded Books</h1>
        </Link>
      </div>
      {/* Upload Section */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={handleReset}
          className="bg-red hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300 flex items-center gap-2"
        >
          <X size={18} />
          Reset Books
        </button>
        <div>
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
            disabled={uploadStatus?.type === "uploading"}
          >
            <ArrowUpToLine className="inline mr-2" />
            {uploadStatus?.type === "uploading"
              ? "Uploading..."
              : "Upload New Book"}
          </button>
        </div>
      </div>

      {uploadStatus && (
        <div className="mt-4">
          {uploadStatus.type === "uploading" && (
            <>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-gray-600 mt-1">
                Uploading {Math.round(uploadProgress)}%
              </p>
            </>
          )}
          {uploadStatus.type === "success" && (
            <p className="text-green-500 mt-2">{uploadStatus.message}</p>
          )}
          {uploadStatus.type === "error" && (
            <p className="text-red-500 mt-2">{uploadStatus.message}</p>
          )}
        </div>
      )}

      {/* Book Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {data?.books?.map((book, idx) => (
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
            <div className="cursor-pointer">
              <div className="w-40 h-40 mx-auto bg-[#005163] rounded-full flex items-center justify-center overflow-hidden">
                <img src="/pdf.png" alt="PDF Icon" className="object-contain" />
              </div>
              <h2 className="text-center mt-4 text-lg font-medium truncate">
                {book?.book_name}
              </h2>
              <p className="text-center text-sm text-gray-500">
                {new Date(book?.upload_on).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
