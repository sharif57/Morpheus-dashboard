// import { useState, useRef } from "react"
// import { ChevronLeft, ChevronRight, Star, Plus, EllipsisVertical, Pencil, Trash2 } from "lucide-react"
// import { Link } from "react-router-dom"

// export default function Shop() {
//   const [currentPage, setCurrentPage] = useState(1)
//   const [activeMenu, setActiveMenu] = useState(null)
//   const sliderRefs = useRef([])

//   // Categories of products
//   const categories = [
//     {
//       title: "Top sales",
//       items: [
//         {
//           id: 1,
//           name: "Wow Sticks 8 LED Accessories",
//           price: 20,
//           rating: 4.5,
//           image: "/shop.png",
//         },
//         {
//           id: 2,
//           name: "Themed Party Kits",
//           price: 20,
//           rating: 4.8,
//           image: "/placeholder.svg?height=200&width=200",
//         },
//         {
//           id: 3,
//           name: "Wow Sticks 8 LED Accessories",
//           price: 20,
//           rating: 4.5,
//           image: "/shop.png",
//         },
//         {
//           id: 4,
//           name: "Ambrose Black & Rust Orange Floral Print",
//           price: 20,
//           rating: 4.4,
//           image: "/shop.png",
//         },
//         {
//           id: 5,
//           name: "Themed Party Kits",
//           price: 20,
//           rating: 4.8,
//           image: "/placeholder.svg?height=200&width=200",
//         },
//         {
//           id: 6,
//           name: "Ambrose Black & Rust Orange Floral Print",
//           price: 20,
//           rating: 4.7,
//           image: "/shop.png",
//         },
//         {
//           id: 7,
//           name: "Themed Party Kits",
//           price: 20,
//           rating: 4.8,
//           image: "/placeholder.svg?height=200&width=200",
//         },
//         {
//           id: 8,
//           name: "Ambrose Black & Rust Orange Floral Print",
//           price: 20,
//           rating: 4.7,
//           image: "/shop.png",
//         },
//       ],
//     },
//     {
//       title: "Drinks",
//       items: [
//         {
//           id: 9,
//           name: "Orange Blossom Cocktail",
//           price: 20,
//           rating: 4.5,
//           image: "/shop.png",
//         },
//         {
//           id: 10,
//           name: "Lime Fizzy shot",
//           price: 20,
//           rating: 4.4,
//           image: "/placeholder.svg?height=200&width=200",
//         },
//         {
//           id: 11,
//           name: "Orange Blossom Cocktail",
//           price: 20,
//           rating: 4.4,
//           image: "/shop.png",
//         },
//         {
//           id: 12,
//           name: "Lime Fizzy shot",
//           price: 20,
//           rating: 4.6,
//           image: "/placeholder.svg?height=200&width=200",
//         },
//         {
//           id: 13,
//           name: "Margaritas",
//           price: 20,
//           rating: 4.5,
//           image: "/placeholder.svg?height=200&width=200",
//         },
//         {
//           id: 14,
//           name: "Lime Fizzy shot",
//           price: 20,
//           rating: 4.4,
//           image: "/placeholder.svg?height=200&width=200",
//         },
//         {
//           id: 15,
//           name: "Margaritas",
//           price: 20,
//           rating: 4.4,
//           image: "/placeholder.svg?height=200&width=200",
//         },
//         {
//           id: 16,
//           name: "Margaritas",
//           price: 20,
//           rating: 4.5,
//           image: "/placeholder.svg?height=200&width=200",
//         },
//       ],
//     },
//     {
//       title: "Shortlist",
//       items: [
//         {
//           id: 17,
//           name: "Disposable Partyware",
//           price: 20,
//           rating: 4.6,
//           image: "/shop.png",
//         },
//         {
//           id: 18,
//           name: "Disposable Partyware",
//           price: 20,
//           rating: 4.5,
//           image: "/shop.png",
//         },
//         {
//           id: 19,
//           name: "Disposable Partyware",
//           price: 20,
//           rating: 4.7,
//           image: "/shop.png",
//         },
//         {
//           id: 20,
//           name: "Disposable Partyware",
//           price: 20,
//           rating: 4.8,
//           image: "/shop.png",
//         },
//         {
//           id: 21,
//           name: "Ambrose Black & Rust Orange Floral Print",
//           price: 20,
//           rating: 4.5,
//           image: "/shop.png",
//         },
//         {
//           id: 22,
//           name: "Ambrose Black & Rust Orange Floral Print",
//           price: 20,
//           rating: 4.6,
//           image: "/shop.png",
//         },
//         {
//           id: 23,
//           name: "Ambrose Black & Rust Orange Floral Print",
//           price: 20,
//           rating: 4.7,
//           image: "/shop.png",
//         },
//         {
//           id: 24,
//           name: "Ambrose Black & Rust Orange Floral Print",
//           price: 20,
//           rating: 4.8,
//           image: "/shop.png",
//         },
//       ],
//     },
//   ]

//   // Function to handle pagination
//   const handlePageChange = (page) => {
//     setCurrentPage(page)
//     // Close any open menu when changing pages
//     setActiveMenu(null)
//   }

//   // Function to scroll slider left
//   const scrollLeft = (index) => {
//     if (sliderRefs.current[index]) {
//       sliderRefs.current[index]?.scrollBy({ left: -300, behavior: "smooth" })
//     }
//     // Close any open menu when scrolling
//     setActiveMenu(null)
//   }

//   // Function to scroll slider right
//   const scrollRight = (index) => {
//     if (sliderRefs.current[index]) {
//       sliderRefs.current[index]?.scrollBy({ left: 300, behavior: "smooth" })
//     }
//     // Close any open menu when scrolling
//     setActiveMenu(null)
//   }

//   // Function to toggle menu visibility
//   const toggleMenu = (itemId) => {
//     if (activeMenu === itemId) {
//       setActiveMenu(null)
//     } else {
//       setActiveMenu(itemId)
//     }
//   }

//   // Function to handle edit action
//   const handleEdit = (itemId) => {
//     console.log(`Edit item ${itemId}`)
//     // Add your edit logic here
//     setActiveMenu(null)
//   }

//   // Function to handle delete action
//   const handleDelete = (itemId) => {
//     console.log(`Delete item ${itemId}`)
//     // Add your delete logic here
//     setActiveMenu(null)
//   }

//   // Close menu when clicking outside
//   const handleClickOutside = () => {
//     setActiveMenu(null)
//   }

//   return (
//     <div className="max-w-[1520px] py-8" onClick={handleClickOutside}>
//       {/* Header with Add New Item button */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">Product Listing</h1>
//         <Link to={'/add-item'} className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-2 flex items-center transition-colors duration-200">
//           <Plus className="w-4 h-4 mr-2" />
//           Add New Item
//         </Link>
//       </div>

//       {/* Product Categories */}
//       {categories.map((category, index) => (
//         <div key={index} className="mb-12">
//           <div className="flex justify-between items-center mb-5">
//             <h2 className="text-2xl font-semibold text-gray-800">{category.title}</h2>
//             <a href="#" className="text-orange-500 hover:text-orange-600 font-medium flex items-center">
//               View all
//               <ChevronRight className="w-4 h-4 ml-1" />
//             </a>
//           </div>

//           {/* Product Slider */}
//           <div className="relative group">
//             <div
//               className="overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
//               ref={(el) => (sliderRefs.current[index] = el)}
//               style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//             >
//               <div className="flex space-x-5">
//                 {category.items.map((item) => (
//                   <div
//                     key={item.id}
//                     className="min-w-[220px] max-w-[220px] flex-shrink-0 transition-all duration-300 hover:shadow-lg border border-gray-200 rounded-lg bg-white overflow-hidden"
//                   >
//                     <div className="relative h-[220px] w-full overflow-hidden">
//                       <img
//                         src={item.image || "/placeholder.svg?height=220&width=220"}
//                         alt={item.name}
//                         className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
//                       />
//                     </div>
//                     <div className="p-4">
//                       <h3 className="text-sm font-medium line-clamp-2 h-10 text-gray-800">{item.name}</h3>
//                       <div className="flex justify-between items-center mt-3">
//                         <span className="font-bold text-lg text-gray-900">${item.price}</span>
//                         <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
//                           <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
//                           <span className="text-xs ml-1 font-medium">{item.rating}</span>
//                         </div>
//                         <div className="relative">
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation()
//                               toggleMenu(item.id)
//                             }}
//                             className="p-1 rounded-full hover:bg-gray-100 transition-colors"
//                             aria-label="More options"
//                           >
//                             <EllipsisVertical className="w-5 h-5 text-gray-600" />
//                           </button>

//                           {activeMenu === item.id && (
//                             <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg z-10 border border-gray-200 py-1">
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation()
//                                   handleEdit(item.id)
//                                 }}
//                                 className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                               >
//                                 <Pencil className="w-4 h-4 mr-2 text-gray-500" />
//                                 Edit
//                               </button>
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation()
//                                   handleDelete(item.id)
//                                 }}
//                                 className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//                               >
//                                 <Trash2 className="w-4 h-4 mr-2 text-red-500" />
//                                 Delete
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Slider Navigation Buttons */}
//             <button
//               onClick={() => scrollLeft(index)}
//               className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 group-hover:-translate-x-6 transition-all duration-300"
//               aria-label="Scroll left"
//             >
//               <ChevronLeft className="w-5 h-5 text-gray-700" />
//             </button>
//             <button
//               onClick={() => scrollRight(index)}
//               className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 group-hover:translate-x-6 transition-all duration-300"
//               aria-label="Scroll right"
//             >
//               <ChevronRight className="w-5 h-5 text-gray-700" />
//             </button>
//           </div>
//         </div>
//       ))}

//       {/* Pagination */}
//       <div className="flex justify-center mt-12">
//         <div className="flex items-center space-x-2">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className={`flex items-center justify-center w-9 h-9 rounded-md border ${
//               currentPage === 1
//                 ? "text-gray-400 border-gray-200 cursor-not-allowed"
//                 : "text-gray-700 border-gray-300 hover:bg-gray-50"
//             }`}
//           >
//             <ChevronLeft className="w-4 h-4" />
//           </button>

//           <button
//             onClick={() => handlePageChange(1)}
//             className={`flex items-center justify-center w-9 h-9 rounded-md ${
//               currentPage === 1
//                 ? "bg-orange-500 text-white hover:bg-orange-600"
//                 : "border border-gray-300 hover:bg-gray-50"
//             }`}
//           >
//             1
//           </button>

//           {currentPage > 3 && <span className="flex items-center justify-center w-9 h-9">...</span>}

//           {Array.from({ length: 3 }, (_, i) => {
//             const page = currentPage - 1 + i
//             if (page > 1 && page < 10) {
//               return (
//                 <button
//                   key={page}
//                   onClick={() => handlePageChange(page)}
//                   className={`flex items-center justify-center w-9 h-9 rounded-md ${
//                     currentPage === page
//                       ? "bg-orange-500 text-white hover:bg-orange-600"
//                       : "border border-gray-300 hover:bg-gray-50"
//                   }`}
//                 >
//                   {page}
//                 </button>
//               )
//             }
//             return null
//           })}

//           {currentPage < 8 && <span className="flex items-center justify-center w-9 h-9">...</span>}

//           <button
//             onClick={() => handlePageChange(10)}
//             className={`flex items-center justify-center w-9 h-9 rounded-md ${
//               currentPage === 10
//                 ? "bg-orange-500 text-white hover:bg-orange-600"
//                 : "border border-gray-300 hover:bg-gray-50"
//             }`}
//           >
//             10
//           </button>

//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === 10}
//             className={`flex items-center justify-center w-9 h-9 rounded-md border ${
//               currentPage === 10
//                 ? "text-gray-400 border-gray-200 cursor-not-allowed"
//                 : "text-gray-700 border-gray-300 hover:bg-gray-50"
//             }`}
//           >
//             <ChevronRight className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }


import { useState } from "react"
import { Button, Card, Dropdown, Modal, Form,  Pagination, Typography } from "antd"
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  StarFilled,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons"
import { Plus } from "lucide-react"
import { Link } from "react-router-dom"

const { Title, Text } = Typography

export default function ProductListing() {
  const [currentPage, setCurrentPage] = useState(1)
  const [editingProduct, setEditingProduct] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [deleteProduct, setDeleteProduct] = useState(null)
  const [priceFilter, setPriceFilter] = useState(20)
  const [form] = Form.useForm()

  // Categories
  const categories = [
    { id: 1, name: "Top sales" },
    { id: 2, name: "Drinks" },
    { id: 3, name: "Shortlet" },
  ]

  // Mock product data
  const initialProducts = [
    {
      id: 1,
      title: "Glow Sticks & LED Accessories",
      price: 20,
      rating: 4.8,
      image: "/shop1.png",
      category: 1,
    },
    {
      id: 2,
      title: "Themed Party Kits",
      price: 20,
      rating: 4.5,
      image: "/shop1.png",
      category: 1,
    },
    {
      id: 3,
      title: "Glow Sticks & LED Accessories",
      price: 20,
      rating: 4.8,
      image: "/shop1.png",
      category: 1,
    },
    {
      id: 4,
      title: "Anthea Black & Rust Orange Floral Print",
      price: 20,
      rating: 4.8,
      image: "/shop1.png",
      category: 1,
    },
    {
      id: 5,
      title: "Themed Party Kits",
      price: 20,
      rating: 4.9,
      image: "/shop1.png",
      category: 1,
    },
    {
      id: 6,
      title: "Anthea Black & Rust Orange Floral Print",
      price: 20,
      rating: 4.6,
      image: "/shop1.png",
      category: 1,
    },
    {
      id: 7,
      title: "Themed Party Kits",
      price: 20,
      rating: 4.7,
      image: "/shop1.png",
      category: 1,
    },
    {
      id: 8,
      title: "Anthea Black & Rust Orange Floral Print",
      price: 20,
      rating: 4.9,
      image: "/placeholder.svg?height=150&width=150",
      category: 1,
    },
    {
      id: 9,
      title: "Orange flavored slushies",
      price: 20,
      rating: 4.8,
      image: "/shop1.png",
      category: 2,
    },
    {
      id: 10,
      title: "Lime Fizzy shot",
      price: 20,
      rating: 4.8,
      image: "/shop1.png",
      category: 2,
    },
    {
      id: 11,
      title: "Orange flavored slushies",
      price: 20,
      rating: 4.8,
      image: "/shop1.png",
      category: 2,
    },
    {
      id: 12,
      title: "Lime Fizzy shot",
      price: 20,
      rating: 4.7,
      image: "/shop1.png",
      category: 2,
    },
    {
      id: 13,
      title: "Margaritas",
      price: 20,
      rating: 4.9,
      image: "/shop1.png",
      category: 2,
    },
    {
      id: 14,
      title: "Lime Fizzy shot",
      price: 20,
      rating: 4.5,
      image: "/shop1.png",
      category: 2,
    },
    {
      id: 15,
      title: "Margaritas",
      price: 20,
      rating: 4.7,
      image: "/shop1.png",
      category: 2,
    },
    {
      id: 16,
      title: "Margaritas",
      price: 20,
      rating: 4.8,
      image: "/shop1.png",
      category: 2,
    },
    {
      id: 17,
      title: "Disposable Partyware",
      price: 20,
      rating: 4.4,
      image: "/shop1.png",
      category: 3,
    },
    {
      id: 18,
      title: "Disposable Partyware",
      price: 20,
      rating: 4.5,
      image: "/shop1.png",
      category: 3,
    },
    {
      id: 19,
      title: "Disposable Partyware",
      price: 20,
      rating: 4.7,
      image: "/shop1.png",
      category: 3,
    },
    {
      id: 20,
      title: "Disposable Partyware",
      price: 20,
      rating: 4.3,
      image: "/shop1.png",
      category: 3,
    },
    {
      id: 21,
      title: "Anthea Black & Rust Orange Floral Print",
      price: 20,
      rating: 4.7,
      image: "/shop1.png",
      category: 3,
    },
    {
      id: 22,
      title: "Anthea Black & Rust Orange Floral Print",
      price: 20,
      rating: 4.3,
      image: "/shop1.png",
      category: 3,
    },
    {
      id: 23,
      title: "Anthea Black & Rust Orange Floral Print",
      price: 20,
      rating: 4.5,
      image: "/shop1.png",
      category: 3,
    },
    {
      id: 24,
      title: "Anthea Black & Rust Orange Floral Print",
      price: 20,
      rating: 4.6,
      image: "/shop1.png",
      category: 3,
    },
  ]

  const [products, setProducts] = useState(initialProducts)

  // Filter products by price
  const filteredProducts = products.filter((product) => product.price <= priceFilter)

  // Handle edit product
  const handleEditProduct = (product) => {
    setEditingProduct({ ...product })
    setIsEditModalOpen(true)
    form.setFieldsValue({
      title: product.title,
      price: product.price,
      rating: product.rating,
      category: product.category,
      image: product.image,
    })
  }

  // Handle delete product
  const handleDeleteProduct = (product) => {
    setDeleteProduct(product)
    setIsDeleteModalOpen(true)
  }

  // Confirm delete product
  const confirmDeleteProduct = () => {
    if (deleteProduct) {
      setProducts(products.filter((p) => p.id !== deleteProduct.id))
      setIsDeleteModalOpen(false)
      setDeleteProduct(null)
    }
  }

 

  
  // Custom styles to match the design
  const customStyles = {
    primaryColor: "#E64A19",
    primaryColorHover: "#D84315",
    // backgroundColor: "#FFF8F7",
    cardShadow: "0 1px 3px rgba(0,0,0,0.1)",
    cardShadowHover: "0 4px 6px rgba(0,0,0,0.1)",
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: customStyles.backgroundColor, padding: "16px 24px" }}>
      {/* Header with Add New Item button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <Title level={3} style={{ margin: 0 }}>
          Product Listing
        </Title>
        <Link to={'/add-item'} className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-2 flex items-center transition-colors duration-200">
<Plus className="w-4 h-4 mr-2" />
Add New Item
      </Link>
      </div>


      {/* Categories and Products */}
      {categories.map((category) => {
        const categoryProducts = filteredProducts.filter((product) => product.category === category.id)

        if (categoryProducts.length === 0) return null

        return (
          <div key={category.id} style={{ marginBottom: "32px" }}>
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}
            >
              <Title level={4} style={{ margin: 0 }}>
                {category.name}
              </Title>
              <Button type="link" style={{ color: customStyles.primaryColor, padding: 0 }}>
                View all
              </Button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "16px",
              }}
            >
              {categoryProducts.map((product) => (
                <Card
                  key={product.id}
                  hoverable
                  cover={
                    <div style={{ height: "128px", overflow: "hidden" }}>
                      <img
                        alt={product.title}
                        src={product.image || "/placeholder.svg"}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                  }
                  bodyStyle={{ padding: "12px" }}
                  style={{
                    boxShadow: customStyles.cardShadow,
                    transition: "box-shadow 0.3s ease",
                  }}
                  actions={[
                    <Dropdown
                      key="more"
                      menu={{
                        items: [
                          {
                            key: "1",
                            icon: <EditOutlined />,
                            label: "Edit",
                            onClick: () => handleEditProduct(product),
                          },
                          {
                            key: "2",
                            icon: <DeleteOutlined />,
                            label: "Delete",
                            danger: true,
                            onClick: () => handleDeleteProduct(product),
                          },
                        ],
                      }}
                      trigger={["click"]}
                      placement="bottomRight"
                    >
                      <MoreOutlined key="more" />
                    </Dropdown>,
                  ]}
                >
                  <div style={{ height: "40px", marginBottom: "8px" }}>
                    <Text
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {product.title}
                    </Text>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", color: customStyles.primaryColor }}>${product.price}</Text>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <StarFilled style={{ fontSize: "12px", color: "#FADB14", marginRight: "4px" }} />
                      <Text style={{ fontSize: "12px", color: "#666" }}>{product.rating}</Text>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )
      })}

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "32px" }}>
        <Pagination
          current={currentPage}
          onChange={(page) => setCurrentPage(page)}
          total={150}
          pageSize={10}
          showSizeChanger={false}
          itemRender={(page, type, originalElement) => {
            if (type === "prev") {
              return (
                <Button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: customStyles.primaryColor,
                    borderColor: "#d9d9d9",
                  }}
                >
                  <LeftOutlined /> Previous
                </Button>
              )
            }
            if (type === "next") {
              return (
                <Button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: customStyles.primaryColor,
                    borderColor: "#d9d9d9",
                  }}
                >
                  Next <RightOutlined />
                </Button>
              )
            }
            if (page === currentPage) {
              return (
                <Button
                  style={{
                    backgroundColor: customStyles.primaryColor,
                    color: "white",
                    borderColor: customStyles.primaryColor,
                  }}
                >
                  {page}
                </Button>
              )
            }
            return originalElement
          }}
        />
      </div>



      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        open={isDeleteModalOpen}
        onOk={confirmDeleteProduct}
        onCancel={() => {
          setIsDeleteModalOpen(false)
          setDeleteProduct(null)
        }}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete "{deleteProduct?.title}"?</p>
        <p style={{ fontSize: "14px", color: "#666", marginTop: "8px" }}>This action cannot be undone.</p>
      </Modal>
    </div>
  )
}
