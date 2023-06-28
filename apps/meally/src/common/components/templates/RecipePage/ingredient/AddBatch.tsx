'use client';
import React, { useEffect, useState } from 'react';
import { PlusCircleIcon, MinusCircleIcon } from 'lucide-react';

interface AddBatchProps {
  add: number;
  setAdd: React.Dispatch<React.SetStateAction<number>>;
}

const AddBatch = ({ add, setAdd }: AddBatchProps) => {
  useEffect(() => {
    add < 1 ? setAdd(1) : null;
  }, [add, setAdd]);

  function addBatch() {
    setAdd(add + 1);
  }
  function minusBatch() {
    setAdd(add - 1);
  }

  return (
    <>
      <div className="flex flew-row items-center py-2" aria-label="Add a batch">
        <button data-testid="plus_button" onClick={addBatch}>
          <PlusCircleIcon className="w-9 h-9" />
        </button>
        <button
          data-testid="minus_button"
          aria-label="Remove a batch"
          onClick={minusBatch}
          disabled={add < 2}
        >
          <MinusCircleIcon
            className={`w-9 h-9 ${
              add < 2 ? 'pointer-events-none bg-none opacity-20 text-white' : ''
            }`}
          />
        </button>
        <p data-testid="title">
          {add} {add > 1 ? 'Batches' : 'Batch'}
        </p>
      </div>
    </>
  );
};

export default AddBatch;
