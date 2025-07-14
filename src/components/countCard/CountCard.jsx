export default function CountCard() {
  return (
    <div className="bg-white p-3  max-w-xs backdrop-blur-sm rounded-xl shadow-lg">
      <div className="bg-green-100 rounded-lg p-3 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="bg-green-500 rounded-lg p-2 flex items-center justify-center">
            <svg 
              className="w-4 h-4 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M7 16l-4-4m0 0l4-4m-4 4h18" 
              />
            </svg>
          </div>
          <div>
            <div className="text-xl font-bold text-gray-900">50+</div>
            <div className="text-gray-500 text-xs">Available Articles</div>
          </div>
        </div>
      </div>
    </div>
  );
}