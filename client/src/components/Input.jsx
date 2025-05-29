// eslint-disable-next-line react/prop-types
function Input({ icon: Icon, ...props }) {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-green-400" aria-hidden="true" />
      </div>
      <input
        {...props}
        className="block w-full pl-10 pr-3 py-2 border text-white bg-gray-800 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
      />
    </div>
  );
}

export default Input;
