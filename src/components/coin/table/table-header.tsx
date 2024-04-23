import React from 'react'

export const TableHeader = ({ headerOptions }: { headerOptions: string[] }) => (
  <thead className="bg-gray-50">
    <tr>
      {headerOptions.map((header) => (
        <th
          key={header}
          scope="col"
          style={{
            paddingLeft: '1.5rem', // px-6
            paddingRight: '1.5rem', // px-6
            paddingTop: '0.75rem', // py-3
            paddingBottom: '0.75rem', // py-3
            textAlign: 'left',
            fontSize: '0.75rem', // text-xs
            fontWeight: '500', // font-medium
            color: '#6b7280', // text-gray-500
            textTransform: 'uppercase',
            letterSpacing: '0.05em', // tracking-wider
          }}
        >
          {header}
        </th>
      ))}
    </tr>
  </thead>
)
