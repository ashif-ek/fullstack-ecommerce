import { useState, useEffect } from "react";
import Api from "../../services/api"; // Assuming your API setup is correct
import { toast } from "react-toastify";
import { 
  FiEdit, 
  FiTrash2, 
  FiPlus, 
  FiSearch, 
  FiPackage,
  FiChevronDown,
  FiToggleLeft,
  FiToggleRight,
  FiX,
  FiUpload
} from "react-icons/fi";
import TableSkeleton from "./components/TableSkeleton";

// A simple, reusable component for form fields to reduce repetition
const FormInput = ({ label, value, onChange, type = "text", ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition ${type === 'file' ? 'file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100' : ''}`}
      {...props}
    />
  </div>
);

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    count: "",
    category: "",
    image: null, // Use image file object
    isActive: true,
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [filters, setFilters] = useState({ search: "", category: "all", status: "all" });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- Core Logic (Fetching, Filtering, CRUD) ---

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await Api.get("/admin/products/");
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      toast.error("Failed to fetch products.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];
    const { search, category, status } = filters;

    if (search) {
      const s = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s) ||
        (p.category || "").toLowerCase().includes(s)
      );
    }
    if (category !== "all") result = result.filter(p => p.category === category);
    if (status !== "all") result = result.filter(p => p.isActive === (status === "active"));
    
    setFilteredProducts(result);
  }, [filters, products]);

  const categories = [...new Set(products.map(p => p.category).filter(Boolean))].sort();

  const resetForm = () => {
    setFormData({
      name: "", description: "", price: "", count: "",
      category: "", image: null, isActive: true,
    });
    setEditingProduct(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const handler = editingProduct ? handleUpdate : handleAdd;
    await handler();
  };

  const handleAdd = async () => {
    const { name, price, category, count, image, description } = formData;
    if (!name || !price || !category) {
      toast.warn("Name, Price, and Category are required.");
      return;
    }
    
    const data = new FormData();
    data.append("name", name);
    data.append("price", price);
    data.append("category", category);
    data.append("count", count || 0);
    // backend expects 'stock' but frontend uses 'count', map appropriately if backend serializer uses 'stock'
    // Actually AdminProductSerializer uses __all__, and Product model has 'stock'.
    // Frontend 'count' should be mapped to 'stock'.
    data.append("stock", count || 0); 
    data.append("description", description);
    if (image) {
        data.append("image", image);
    }
    data.append("is_active", true); // Use snake_case for backend

    try {
      await Api.post("/admin/products/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(`Product "${name}" added successfully!`);
      closeModal();
      fetchProducts(); // Refresh data
    } catch (error) {
      toast.error("Failed to add product.");
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    if (!editingProduct) return;
    const { name, price, category, count, image, description } = editingProduct; // This handles state if mapped correctly, but we need to check form handling logic below
    
    // NOTE: editingProduct state structure needs to match what we send/edit.
    // Simplifying: we use local variables constructed from current form state which might be in `formData` if we shared state logic, 
    // but here we toggle `formData` or `editingProduct`.
    // Let's stick to using `currentFormData` logic used in render, but for submit we need to be careful.
    // The current component uses `editingProduct` state object for updates.
    
    if (!name || !price || !category) {
      toast.warn("Name, Price, and Category are required.");
      return;
    }

    const data = new FormData();
    data.append("name", name);
    data.append("price", price);
    data.append("category", category);
    // Map count to stock for backend
    data.append("stock", count !== undefined ? count : (editingProduct.stock || 0)); 
    data.append("description", description || "");
    
    // Only append image if it's a new file (File object), not if it's the existing URL string
    if (image instanceof File) {
        data.append("image", image);
    }
     // If we want to keep existing, we don't send 'image' key, or backend ignores if not present.
     // If user wants to clear image, that's a different feature not requested yet.

    try {
      await Api.patch(`/admin/products/${editingProduct.id}/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(`Product "${name}" updated successfully!`);
      closeModal();
      fetchProducts(); // Refresh data
    } catch (error) {
      toast.error("Failed to update product.");
      console.error(error);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) return;
    try {
      await Api.delete(`/admin/products/${id}/`);
      toast.success(`Product "${name}" deleted.`);
      fetchProducts(); // Refresh data
    } catch (error) {
      toast.error("Failed to delete product.");
      console.error(error);
    }
  };
  
  const toggleStatus = async (product) => {
    try {
      // isActive needed to be mapped to snake_case is_active for backend? 
      // Product model has is_active. Serializer expects is_active.
      const updated = { is_active: !product.is_active }; 
      await Api.patch(`/admin/products/${product.id}/`, updated);
      toast.success(`Product "${product.name}" status updated.`);
      fetchProducts(); // Refresh data
    } catch (error) {
      toast.error("Failed to update status.");
      console.error(error);
    }
  };

  const openModal = (product = null) => {
    if (product) {
       // Map backend fields to frontend form state
       // backend: stock, frontend: count
       // backend: is_active, frontend: isActive (or just use is_active consistently? let's stick to existing frontend prop names but map values)
      setEditingProduct({ 
          ...product, 
          count: product.stock, 
          image: product.image, // keep existing URL for preview
          isActive: product.is_active
      });
    } else {
      resetForm();
    }
    setIsFormOpen(true);
  };

  const closeModal = () => {
    setIsFormOpen(false);
    resetForm();
  };
  
  const currentFormData = editingProduct || formData;
  const setCurrentFormData = editingProduct ? setEditingProduct : setFormData;

  // --- JSX (UI/UX RENDER) ---
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100/50 min-h-screen font-sans">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Inventory</h1>
          <p className="text-sm text-gray-500 mt-1">Manage, add, and edit all products in your store.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="mt-4 sm:mt-0 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-semibold transition-all duration-200"
        >
          <FiPlus className="text-lg" /> Add New Product
        </button>
      </div>

      {/* Filters & Actions Toolbar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col md:flex-row items-center gap-4">
        <div className="relative w-full md:flex-grow">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, category, or description..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="w-full md:w-48 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition appearance-none bg-white bg-no-repeat"
            style={{backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em'}}
          >
            <option value="all">All Categories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="w-full md:w-40 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition appearance-none bg-white bg-no-repeat"
            style={{backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em'}}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      
      {/* Main Content Area: Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <TableSkeleton rows={5} cols={6} />
        ) : filteredProducts.length === 0 ? (
          <div className="text-center p-12">
            <FiPackage className="mx-auto text-6xl text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
            <p className="text-gray-500 mb-6">Your search or filter criteria returned no results. Try adjusting them or add a new product.</p>
            <button
              onClick={() => openModal()}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-semibold"
            >
              <FiPlus /> Add Product
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50/50">
                <tr>
                  <th scope="col" className="p-4">Product</th>
                  <th scope="col" className="p-4">Category</th>
                  <th scope="col" className="p-4">Price</th>
                  <th scope="col" className="p-4">Stock</th>
                  <th scope="col" className="p-4">Status</th>
                  <th scope="col" className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="bg-white border-b hover:bg-gray-50 transition">
                    <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img 
                          src={p.image || 'https://via.placeholder.com/40'} 
                          alt={p.name} 
                          className="h-10 w-10 rounded-md object-cover" 
                        />
                        <span className="font-semibold">{p.name}</span>
                      </div>
                    </td>
                    <td className="p-4">{p.category}</td>
                    <td className="p-4 font-medium">${parseFloat(p.price).toFixed(2)}</td>
                    <td className="p-4">{p.stock} units</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                          p.is_active 
                            ? "bg-green-100 text-green-800" 
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {p.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-4">
                       <div className="flex items-center justify-center gap-3">
                        <button onClick={() => toggleStatus(p)} title={p.is_active ? "Deactivate" : "Activate"}>
                          {p.is_active 
                            ? <FiToggleRight className="h-6 w-6 text-green-500 hover:text-green-600 transition" /> 
                            : <FiToggleLeft className="h-6 w-6 text-gray-400 hover:text-gray-600 transition" />
                          }
                        </button>
                        <button onClick={() => openModal(p)} title="Edit Product" className="p-2 text-gray-500 hover:bg-indigo-100 hover:text-indigo-600 rounded-full transition">
                          <FiEdit className="h-5 w-5" />
                        </button>
                        <button onClick={() => handleDelete(p.id, p.name)} title="Delete Product" className="p-2 text-gray-500 hover:bg-red-100 hover:text-red-600 rounded-full transition">
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 ease-out"
            style={{ animation: 'fadeIn 0.3s ease-out' }}
          >
            <div className="flex justify-between items-center border-b p-5">
              <h3 className="text-xl font-bold text-gray-900">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        label="Product Name"
                        type="text"
                        placeholder="e.g., Wireless Mouse"
                        value={currentFormData.name}
                        onChange={(e) => setCurrentFormData({ ...currentFormData, name: e.target.value })}
                        required
                    />
                    <FormInput
                        label="Category"
                        type="text"
                        placeholder="e.g., Electronics"
                        value={currentFormData.category}
                        onChange={(e) => setCurrentFormData({ ...currentFormData, category: e.target.value })}
                        required
                    />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <FormInput
                        label="Price ($)"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="e.g., 49.99"
                        value={currentFormData.price}
                        onChange={(e) => setCurrentFormData({ ...currentFormData, price: e.target.value })}
                        required
                    />
                    <FormInput
                        label="Stock Count"
                        type="number"
                        min="0"
                        placeholder="e.g., 150"
                        value={currentFormData.count}
                        onChange={(e) => setCurrentFormData({ ...currentFormData, count: e.target.value })}
                    />
                 </div>
                 
                 {/* File Upload Input */}
                 <FormInput
                    label="Product Image"
                    type="file"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                             const previewUrl = URL.createObjectURL(file);
                             setCurrentFormData({
                                  ...currentFormData, 
                                  image: file, 
                                  preview: previewUrl // Store preview URL
                             });
                        }
                    }}
                    accept="image/*"
                />
                {/* Preview existing or selected image */}
                {(currentFormData.preview || (currentFormData.image && !(currentFormData.image instanceof File))) && (
                    <div className="mt-2 text-sm text-gray-500">
                        <img 
                            src={currentFormData.preview || currentFormData.image} 
                            alt="Preview" 
                            className="h-24 w-24 object-cover rounded-lg border-2 border-gray-200 shadow-sm" 
                        />
                         {currentFormData.image instanceof File && (
                            <p className="mt-1 text-xs text-gray-400">Selected: {currentFormData.image.name}</p>
                        )}
                    </div>
                )}


                 <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                    <textarea
                        rows={4}
                        placeholder="A brief description of the product..."
                        value={currentFormData.description}
                        onChange={(e) => setCurrentFormData({ ...currentFormData, description: e.target.value })}
                        className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                 </div>
              </div>
              <div className="flex justify-end gap-3 bg-gray-50 p-5 border-t rounded-b-xl">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold transition"
                >
                  {editingProduct ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

