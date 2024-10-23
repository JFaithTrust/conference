"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/custom/data-table";
import { getAllDirections, deleteDirection } from "@/fetch-api/fetchConferences";
import { DirectionType } from "@/types";
import DeleteFieldsModal from "@/components/modals/delete-fields-modal";

const DeleteDirectionPage = () => {
    const [data, setData] = useState<DirectionType[]>([]);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [currentDirection, setCurrentDirection] = useState<DirectionType | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const directions = await getAllDirections();
            setData(directions);
        };
        fetchData();
    }, []);

    const handleDelete = async () => {
        if (currentDirection) {
            await deleteDirection(currentDirection.id);
            setData(data.filter(direction => direction.id !== currentDirection.id));
            setDeleteModalOpen(false);
        }
    };

    const columns = [
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const direction = row.original;
                return (
                    <Button
                        variant="destructive"
                        onClick={() => {
                            setCurrentDirection(direction);
                            setDeleteModalOpen(true);
                        }}
                    >
                        Delete
                    </Button>
                );
            },
        },
    ];

    return (
        <div className="p-4 md:p-8">
            <h1 className="text-xl font-bold mb-4">Delete Directions</h1>
            <DataTable
                columns={columns}
                data={data}
                hasPagination={true}
                hasSearchbar
                hasFilter
            />

            <DeleteFieldsModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default DeleteDirectionPage;
