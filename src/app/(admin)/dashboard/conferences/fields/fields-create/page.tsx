import React from 'react';
import AddEditorForm from '@/components/forms/add.editor.form';
import { UserType } from '@/types';
import { getAllUsers } from '@/lib/actions/user.action';

const CreateDirectionField = async () => {
  const allReviewers: UserType[] = await getAllUsers();
 
  return (
    <div className="p-4 md:p-8">
      <AddEditorForm allReviewers={allReviewers} setReviewersId={(ids) => console.log(ids)} />
    </div>
  );
};

export default CreateDirectionField;
