import React from 'react';

const Page = async () => {
  const res = await fetch('http://localhost:3000/api/showalltasks', { cache: 'no-store' });
  const data = await res.json();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Tasks</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Page;
