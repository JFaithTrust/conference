import React from 'react';
import AddEditorForm from '@/components/forms/add.editor.form'; // Import the AddEditorForm
import { UserType } from '@/types';

const CreateDirectionField = async () => {
  
  const allReviewers: UserType[] = []; 

  return (
    <div className="p-4 md:p-8">
      <AddEditorForm allReviewers={allReviewers} setReviewersId={(ids) => console.log(ids)} />
    </div>
  );
};

export default CreateDirectionField;
