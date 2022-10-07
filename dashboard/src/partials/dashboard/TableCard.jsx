import React from 'react';

function TableCard({ data }) {
  return (
    <div className="col-span-full bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Recent Feedbacks</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table Header */}
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className='p-2'>
                  #
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Station ID</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Ratings</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">How did you come to the police station?</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">After how much time you were heard in PS?</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">How would you describe your experience with police officers in the police station?</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {/* Row */}
              {data.length === 0 ? <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <div className='p-2 text-center text-red-700 text-bold'>
                    Data doesn't exist
                  </div>
                </td>
              </tr> : data.map((d, id) => (
                <tr key={id}>
                  <td className='p-2'>
                    <div className="flex items-center">
                      <div className="text-slate-800">{id + 1}</div>
                    </div>
                  </td>
                  <td className='p-2'>
                    <div className="text-center text-sky-500">
                      {d.station_id}
                    </div>
                  </td>
                  <td className='p-2 text-center text-green-500'>
                    {d.res4}
                  </td>
                  <td className='p-2'>
                    {d.res1}
                  </td>
                  <td className='p-2'>
                    {d.res2}
                  </td>
                  <td className='p-2'>
                    {d.res3}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default TableCard;
