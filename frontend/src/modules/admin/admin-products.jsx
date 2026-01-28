import { useState, useEffect } from "react";
import Api from "../../auth/api"; // Assuming your API setup is correct
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
  FiX
} from "react-icons/fi";

// A simple, reusable component for form fields to reduce repetition
const FormInput = ({ label, value, onChange, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
    <input
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
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
    imageUrl: "",
    isActive: true,
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [filters, setFilters] = useState({ search: "", category: "all", status: "all" });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- Core Logic (Fetching, Filtering, CRUD) ---
  // This logic is mostly the same, as it was already well-structured.

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await Api.get("/products");
      // Add a fallback for images to avoid errors
      const productsWithImages = data.map(p => ({ ...p, images: p.images || [] }));
      setProducts(productsWithImages);
      setFilteredProducts(productsWithImages);
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
        p.category.toLowerCase().includes(s)
      );
    }
    if (category !== "all") result = result.filter(p => p.category === category);
    if (status !== "all") result = result.filter(p => p.isActive === (status === "active"));
    
    setFilteredProducts(result);
  }, [filters, products]);

  const categories = [...new Set(products.map(p => p.category))].sort();

  const resetForm = () => {
    setFormData({
      name: "", description: "", price: "", count: "",
      category: "", imageUrl: "", isActive: true,
    });
    setEditingProduct(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const handler = editingProduct ? handleUpdate : handleAdd;
    await handler();
  };

  const handleAdd = async () => {
    const { name, price, category, count, imageUrl } = formData;
    if (!name || !price || !category) {
      toast.warn("Name, Price, and Category are required.");
      return;
    }
    try {
      const newProd = {
        ...formData,
        id: Date.now().toString(), // Use a more robust ID in a real app
        price: parseFloat(price),
        count: parseInt(count || 0, 10),
        images: imageUrl ? [imageUrl] : [],
        created_at: new Date().toISOString(),
      };
      await Api.post("/products", newProd);
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
    const { name, price, category, count, imageUrl } = editingProduct;
     if (!name || !price || !category) {
      toast.warn("Name, Price, and Category are required.");
      return;
    }
    try {
      const updated = {
        ...editingProduct,
        price: parseFloat(price),
        count: parseInt(count || 0, 10),
        images: imageUrl ? [imageUrl] : editingProduct.images || [],
      };
      await Api.put(`/products/${editingProduct.id}`, updated);
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
      await Api.delete(`/products/${id}`);
      toast.success(`Product "${name}" deleted.`);
      fetchProducts(); // Refresh data
    } catch (error) {
      toast.error("Failed to delete product.");
      console.error(error);
    }
  };
  
  const toggleStatus = async (product) => {
    try {
      const updated = { ...product, isActive: !product.isActive };
      await Api.put(`/products/${product.id}`, updated);
      toast.success(`Product "${product.name}" has been ${updated.isActive ? "activated" : "deactivated"}.`);
      fetchProducts(); // Refresh data
    } catch (error) {
      toast.error("Failed to update status.");
      console.error(error);
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct({ ...product, imageUrl: product.images?.[0] || "" });
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
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin h-12 w-12 border-t-4 border-b-4 border-indigo-500 rounded-full" />
          </div>
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
                          src={p.images[0] || 'https://via.placeholder.com/40'} 
                          alt={p.name} 
                          className="h-10 w-10 rounded-md object-cover" 
                        />
                        <span className="font-semibold">{p.name}</span>
                      </div>
                    </td>
                    <td className="p-4">{p.category}</td>
                    <td className="p-4 font-medium">${p.price.toFixed(2)}</td>
                    <td className="p-4">{p.count} units</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                          p.isActive 
                            ? "bg-green-100 text-green-800" 
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {p.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-4">
                       <div className="flex items-center justify-center gap-3">
                        <button onClick={() => toggleStatus(p)} title={p.isActive ? "Deactivate" : "Activate"}>
                          {p.isActive 
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
            // Simple animation
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
                 <FormInput
                    label="Image URL"
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    value={currentFormData.imageUrl}
                    onChange={(e) => setCurrentFormData({ ...currentFormData, imageUrl: e.target.value })}
                />
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

