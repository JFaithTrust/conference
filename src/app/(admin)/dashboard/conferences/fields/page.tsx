import { router } from "next/client";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";


const ConferenceFieldsPage = () => {
  return (
    <div>
        <div className="flex flex-row justify-between mt-10 mx-16">
  <div>
    <button 
    className="flex flex-row items-center px-2 py-1 rounded-md bg-indigo-500 font-semibold text-white"

    >
      <FaPlus className="mr-1" /> Yaratish
    </button>
  </div>
  <div>
    <button className="flex flex-row items-center px-2 py-1 rounded-md bg-indigo-500 font-semibold text-white">
      <FaSearch className="mr-1" /> Qidirish
    </button>
  </div>
</div>


    </div>
  );
}

export default ConferenceFieldsPage;