'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaUsers } from "react-icons/fa6"; 
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/custom/data-table";
import axios from "axios";
import { MdEditNote } from "react-icons/md";
import { DirectionType } from "@/types"; //
import { getAllDirections } from "@/fetch-api/fetchConferences";

const DirectionFieldsPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [directionFields, setDirectionFields] = useState<DirectionType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDirections = async () => {
      try {
        const data = await getAllDirections();
        setDirectionFields(data);
      } catch (error) {
        console.error('Failed to fetch directions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDirections();
  }, []);

  const handleOpenReviewersModal = (directionId: number) => {
    console.log(`Open reviewers modal for direction ID: ${directionId}`);
  };

  const handleDeleteDirection = async (directionId: number) => {
    try {
      await axios.delete(`/api/direction/${directionId}`); 
      setDirectionFields(prev => prev.filter(item => item.id !== directionId)); 
      console.log(`Deleted direction with ID: ${directionId}`);
    } catch (error) {
      console.error('Failed to delete the direction:', error);
    }
  };

  const handleEditDirection = (directionId: number) => {
    router.push(`/dashboard/conferences/fields/edit/${directionId}`); 
  };

  const columns = [
    {
      accessorKey: 'name',
      header: 'Direction Name',
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }: { row: { original: DirectionType } }) => (
        <div className="flex space-x-2">
          <button 
            onClick={() => handleOpenReviewersModal(row.original.id)} 
            className="text-blue-500 hover:underline"
          >
            <FaUsers /> Muharrirlar
          </button>
          <button 
            onClick={() => handleDeleteDirection(row.original.id)} 
            className="text-red-500 hover:underline"
          >
            <FaTrash /> O&apos;chirish
          </button>
          <button 
            onClick={() => handleEditDirection(row.original.id)} 
            className="text-green-500 hover:underline"
          >
            <MdEditNote /> Tahrirlash
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between mt-10 mx-2 md:mx-8 space-y-4 md:space-y-0">
        <div>
          <button 
            className="flex flex-row items-center px-4 py-2 rounded-md bg-indigo-500 font-semibold text-white"
            onClick={() => router.push('/dashboard/conferences/fields/fields-create')}
          >
            <FaPlus className="mr-1" /> Yaratish
          </button>
        </div>
        <div className="w-full md:max-w-md">
          <Input  
            placeholder="Yo'nalish nomi bo'yicha qidiring..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full p-2 rounded-md text-indigo-700 font-semibold placeholder:indigo-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center">Ma&apos;lumotlar yuklanmoqda...</div>
      ) : (
        <DataTable
          columns={columns}
          data={directionFields.filter(field => 
            field.name.toLowerCase().includes(searchTerm.toLowerCase())
          )}
          hasPagination={true}
          hasSearchbar={false} 
        />
      )}
    </div>
  );
}

export default DirectionFieldsPage;
