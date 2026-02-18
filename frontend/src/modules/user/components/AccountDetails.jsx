import InlineFeedback from "../../../components/InlineFeedback";

export default function AccountDetails({ 
  user, 
  isEditing, 
  setIsEditing, 
  editFormData, 
  handleEditChange, 
  handleUpdateProfile,
  feedback,        // New prop
  onFeedbackClose  // New prop
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
      <div className="text-center pt-4 flex flex-col items-center gap-4">
        {isEditing ? (
          <div className="flex gap-4">
            <button
              onClick={handleUpdateProfile}
              className="bg-white text-black text-sm tracking-widest uppercase px-6 py-3 hover:bg-gray-200 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                if (onFeedbackClose) onFeedbackClose();
              }}
              className="border border-white/20 text-gray-400 text-sm tracking-widest uppercase px-6 py-3 hover:border-white hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="border border-white/50 text-white text-sm tracking-widest uppercase px-6 py-3 hover:bg-white hover:text-black transition-colors"
          >
            Edit Details
          </button>
        )}
        
        {/* Render Inline Feedback here */}
        {feedback && (
            <div className="w-full">
                <InlineFeedback {...feedback} onClose={onFeedbackClose} />
            </div>
        )}
      </div>
    </div>
  );
}
