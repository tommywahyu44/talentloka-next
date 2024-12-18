import { formatIndonesianNumber } from '@/lib/helpers'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { DataGrid } from '@mui/x-data-grid'

export default function SpgTable({ listSpg, setOpenModal }) {
  const columns = [
    {
      field: 'fullName',
      headerName: 'Profile',
      width: 300,
      renderCell: (params) => (
        <>
          <td className="whitespace-nowrap text-sm">
            <div className="flex items-center">
              <div className="mt-0.5 h-11 w-11 flex-shrink-0">
                <img
                  className="h-11 w-11 rounded-full object-cover"
                  src={params.row.profilePicture ? params.row.profilePicture[0] : ''}
                  alt=""
                />
              </div>
              <div className="ml-4">
                <div className="font-medium text-stone-900">{params.row.fullName}</div>
                <div className="mt-0.5 text-stone-700">{params.row.email.replaceAll(',', '.')}</div>
              </div>
            </div>
          </td>
        </>
      ),
    },
    { field: 'code', headerName: 'Code', width: 100 },
    { field: 'contact', headerName: 'Phone Number', width: 150 },
    { field: 'dob', headerName: 'DOB', width: 100 },
    { field: 'gender', headerName: 'Gender', width: 100 },
    { field: 'weightKg', headerName: 'Weight', width: 100 },
    { field: 'heightCm', headerName: 'Height', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <div className="m-auto flex whitespace-nowrap py-3 text-right text-sm font-medium">
            <UserCircleIcon
              onClick={() => setOpenModal(params.row)}
              className="m-auto h-7 w-7 cursor-pointer text-gray-700 hover:text-rose-500"
            />
            <a
              className="m-auto h-7 w-7 cursor-pointer text-gray-700 hover:text-rose-500"
              target="_blank"
              href={`https://wa.me/${params.row.contact}?text=Hi ${params.row.name}!`}
              rel="noreferrer">
              <img
                src="/svg/ic-wa.svg"
                className="mt-0.5 h-6 w-6 cursor-pointer text-gray-700 hover:text-rose-500"></img>
            </a>
          </div>
        </>
      ),
    },
  ]

  const rows = Object.values(listSpg).map((item, index) => ({
    ...item,
    id: item.code,
    contact: formatIndonesianNumber(item.contactNumber),
  }))
  return (
    <div
      style={{ height: '70vh', width: '100%' }}
      className="mt-4">
      <DataGrid
        disableRowSelectionOnClick
        rows={rows}
        columns={columns}
      />
    </div>
  )
}
