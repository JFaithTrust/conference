import React from 'react';
import Modal from '../ui/Modal';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { DirectionType } from '@/types';

interface EditFieldsModalProps {
  isOpen: boolean;
  onClose: () => void;
  direction: DirectionType; // The direction to edit
  onSave: (data: DirectionType) => void; // Callback to save the edited data
}

const EditFieldsModal: React.FC<EditFieldsModalProps> = ({ isOpen, onClose, direction, onSave }) => {
  const { register, handleSubmit } = useForm<DirectionType>({ defaultValues: direction });

  const onSubmit = (data: DirectionType) => {
    onSave(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} classNames="w-[500px] h-[400px]">
      <form onSubmit={handleSubmit(onSubmit)} className="p-4">
        <h2 className="text-lg font-semibold">Edit Direction</h2>
        <input {...register('name')} placeholder="Name" className="border p-2 w-full" />
        <div className="flex justify-end mt-4">
          <Button type="submit">Save</Button>
          <Button variant="outline" onClick={onClose} className="ml-2">Cancel</Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditFieldsModal;
