const PanelLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm z-50 cursor-wait">
      <div className="w-12 h-12 border-4 border-mid-green border-dotted rounded-full animate-spin-slow"></div>
      <h4 className="text-white mt-4 animate-expand">Loading...</h4>
    </div>
  );
};

export default PanelLoader;
