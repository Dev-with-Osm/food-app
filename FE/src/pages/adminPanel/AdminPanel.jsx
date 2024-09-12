import React from 'react';

export default function AdminPanel() {
  return (
    <div className="flex items-center w-full h-full">
      <div className="w-1/5 bg-red-700 h-[90vh] top-[75px] fixed">sidebar</div>
      <div className="w-4/5 bg-green-700 ">content</div>
    </div>
  );
}
