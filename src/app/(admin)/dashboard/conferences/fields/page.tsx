import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Accordion } from "@radix-ui/react-accordion";
import { FiPlus } from "react-icons/fi";
import { MdSearch } from "react-icons/md";

interface FieldProps {
  title: string;
  subField: SubFieldProps[];
}

interface SubFieldProps {
  id: number;
  title: string;
  telNumber: number;
  status: 'Active' | 'Inactive';
}

const FieldData: FieldProps  = {
  title:'Oliy ta\'lim tizimini raqamlashitish va innvatsion texnologiyalardan foydalanish',
  subField: [
    {
      id: 1,
      title: "George Washington",
      telNumber: +998907458961,
      status: 'Active',
    },
    {
      id: 2,
      title: 'Jack London',
      telNumber: +998974785141,
      status: 'Inactive',
    },
    {
      id: 3,
      title: 'Nas Daily',
      telNumber: +998934785141,
      status: 'Active',
    },

  ]
}

const ConferenceFieldsPage = () => {
  return (
    
    <div>
     <div className="flex justify-between items-center mt-7 mx-10">
      <button className="flex items-center px-3 py-1 bg-indigo-200 rounded text-indigo-800 font-semibold">
        <FiPlus className="mr-1" /> Yaratish
      </button>
      <button className="flex items-center px-3 py-1 bg-indigo-200 rounded text-indigo-800 font-semibold">
        <MdSearch className="mr-1" /> Qidirish
      </button>
     </div>

     <div className="bg-gray-200 rounded mx-3 my-5 md:mx-6 md:my-6 lg:mx-9 lg:my-9 ">
      <Accordion type="multiple">
        <h2 className="px-2 py-1">{FieldData.title}</h2>
        {FieldData.subField.map((field) => (
          <AccordionItem key={field.id} value={`item-${field.id}`}>
            <AccordionTrigger className="flex justify-between items-center px-4 py-2 bg-white rounded shadow mb-2 cursor-pointer">
              <span>{field.title}</span>
              <span className={`text-${field.status === 'Active' ? 'green' : 'red'}-600`}>{field.status}</span>
            </AccordionTrigger>
          </AccordionItem>
        ))}
      </Accordion>
     </div>

    </div>
  );
}

export default ConferenceFieldsPage;
