export default function AccountDetails({ 
  user, 
  isEditing, 
  setIsEditing, 
  editFormData, 
  handleEditChange, 
  handleUpdateProfile 
}) {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="space-y-4">
        <div>
          <label className="text-xs text-gray-400 uppercase tracking-wider">User ID</label>
          <input type="text" value={user.id} disabled className="w-full bg-transparent border-b border-white/20 p-2 mt-1 text-gray-500" />
        </div>
        <div>
          <label className="text-xs text-gray-400 uppercase tracking-wider">Username</label>
          <input
            type="text"
            name="username"
            value={isEditing ? editFormData.username : user.username}
            disabled={!isEditing}
            onChange={handleEditChange}
            className={`w-full bg-transparent border-b p-2 mt-1 transition-colors ${isEditing ? "border-white text-white" : "border-white/20 text-gray-400"
              }`}
          />
        </div>
        <div>
          <label className="text-xs text-gray-400 uppercase tracking-wider">Email Address</label>
          <input
            type="email"
            name="email"
            value={isEditing ? editFormData.email : user.email}
            disabled={!isEditing}
            onChange={handleEditChange}
            className={`w-full bg-transparent border-b p-2 mt-1 transition-colors ${isEditing ? "border-white text-white" : "border-white/20 text-gray-400"
              }`}
          />
        </div>
        <div>
          <label className="text-xs text-gray-400 uppercase tracking-wider">Profile Picture</label>
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              className="w-full bg-transparent border-b border-white/20 p-2 mt-1 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-white file:text-black hover:file:bg-gray-200"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  // We need to pass this up to parent state
                  // Since handleEditChange expects an event with name/value, we might need a custom handler or mock event
                  // But direct state setter in parent would be cleaner. 
                  // For now, let's call handleEditChange with a mock event object or add a specific prop.
                  // BETTER: Let's assume the parent passed a setEditFormData or specific handler. 
                  // But sticking to existing props: let's invoke a new prop 'handleImageChange' if it existed.
                  // Since it doesn't, let's mock the event structure the parent expects:
                   const mockEvent = {
                       target: {
                           name: "profile_picture",
                           value: e.target.files[0]
                       }
                   };
                   handleEditChange(mockEvent);
                }
              }}
            />
          )}
        </div>
      </div>
      <div className="text-center pt-4 flex gap-4 justify-center">
        {isEditing ? (
          <>
            <button
              onClick={handleUpdateProfile}
              className="bg-white text-black text-sm tracking-widest uppercase px-6 py-3 hover:bg-gray-200 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
              }}
              className="border border-white/20 text-gray-400 text-sm tracking-widest uppercase px-6 py-3 hover:border-white hover:text-white transition-colors"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="border border-white/50 text-white text-sm tracking-widest uppercase px-6 py-3 hover:bg-white hover:text-black transition-colors"
          >
            Edit Details
          </button>
        )}
      </div>
    </div>
  );
}
