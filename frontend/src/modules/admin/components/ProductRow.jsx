import React, { memo } from "react";
import { FiEdit, FiTrash2, FiToggleLeft, FiToggleRight } from "react-icons/fi";

const ProductRow = memo(({ product, toggleStatus, openModal, handleDelete }) => {
  return (
    <tr className="bg-white border-b hover:bg-gray-50 transition">
      <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <img 
            src={product.images[0] || 'https://via.placeholder.com/40'} 
            alt={product.name} 
            className="h-10 w-10 rounded-md object-cover" 
          />
          <span className="font-semibold">{product.name}</span>
        </div>
      </td>
      <td className="p-4">{product.category}</td>
      <td className="p-4 font-medium">${parseFloat(product.price).toFixed(2)}</td>
      <td className="p-4">{product.count} units</td>
      <td className="p-4">
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
            product.isActive 
              ? "bg-green-100 text-green-800" 
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {product.isActive ? "Active" : "Inactive"}
        </span>
      </td>
      <td className="p-4">
          <div className="flex items-center justify-center gap-3">
          <button onClick={() => toggleStatus(product)} title={product.isActive ? "Deactivate" : "Activate"}>
            {product.isActive 
              ? <FiToggleRight className="h-6 w-6 text-green-500 hover:text-green-600 transition" /> 
              : <FiToggleLeft className="h-6 w-6 text-gray-400 hover:text-gray-600 transition" />
            }
          </button>
          <button onClick={() => openModal(product)} title="Edit Product" className="p-2 text-gray-500 hover:bg-indigo-100 hover:text-indigo-600 rounded-full transition">
            <FiEdit className="h-5 w-5" />
          </button>
          <button onClick={() => handleDelete(product.id, product.name)} title="Delete Product" className="p-2 text-gray-500 hover:bg-red-100 hover:text-red-600 rounded-full transition">
            <FiTrash2 className="h-5 w-5" />
          </button>
          </div>
      </td>
    </tr>
  );
});

export default ProductRow;
