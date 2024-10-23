// src/app/(admin)/dashboard/conferences/fields/edit-fields.tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getDirectionById, updateDirection } from '@/fetch-api/fetchConferences';
import EditDirectionModal from "@/components/modals/edit-direction-modal";
import { DirectionType } from "@/types";

const EditFieldsPage = () => {
    const router = useRouter();
    const { id } = router.query; // Get the ID from the query
    const [direction, setDirection] = useState<DirectionType | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (id) {
            // Fetch the direction data by ID
            const fetchData = async () => {
                const directionData = await getDirectionById(id as string);
                setDirection(directionData);
                setModalOpen(true);
            };
            fetchData();
        }
    }, [id]);

    const handleSave = async (data: DirectionType) => {
        await updateDirection(data);
        router.push('/dashboard/conferences/fields'); // Navigate back after saving
    };

    return (
        <>
            <EditDirectionModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                direction={direction}
                onSave={handleSave}
            />
        </>
    );
};

export default EditFieldsPage;
