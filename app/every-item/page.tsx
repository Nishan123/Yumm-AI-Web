import Navbar from "../home/components/navBar/nav-bar";

const EveryItem = () => {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center flex-1">
        <h1 className="text-4xl font-bold text-gray-800">Every Items</h1>
      </div>
    </div>
  );
};

export default EveryItem;
