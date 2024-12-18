import { formatIndonesianNumber } from '@/lib/helpers'
import { CheckCircleIcon, EnvelopeIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { DataGrid } from '@mui/x-data-grid'

export default function SpgRegisteredTable({ listSpg, setOpenModal, verifySPG }) {
  if (!listSpg) {
    return
  }

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
    { field: 'dob', headerName: 'DOB', width: 80 },
    { field: 'gender', headerName: 'Gender', width: 100 },
    { field: 'weightKg', headerName: 'Weight', width: 80 },
    { field: 'heightCm', headerName: 'Height', width: 80 },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div>
          {params.row.confirmed ? (
            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              Active
            </span>
          ) : (
            <span className="inline-flex items-center rounded-md bg-rose-50 px-2 py-1 text-xs font-medium text-rose-500 ring-1 ring-inset ring-rose-600/20">
              Unverified
            </span>
          )}
        </div>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <div className="flex space-x-1 whitespace-nowrap py-3 text-sm font-medium">
            <UserCircleIcon
              onClick={() => setOpenModal(params.row)}
              className="h-7 w-7 cursor-pointer text-gray-700 hover:text-rose-500"
            />
            {!params.row.confirmed && (
              <CheckCircleIcon
                onClick={() => verifySPG(params.row.email, params.row.code, params.row.fullName)}
                className="h-7 w-7 cursor-pointer text-gray-700 hover:text-rose-500"
              />
            )}
            <a
              className="mt-0.5 h-6 w-6 cursor-pointer rounded-full border-2 border-gray-700 p-1 text-gray-700 hover:border-rose-500 hover:text-rose-500"
              target="_blank"
              href={`mailto:${params.row.email.replaceAll(',', '.')}`}
              rel="noreferrer">
              <EnvelopeIcon className="h-full w-full cursor-pointer stroke-[3px] font-bold text-gray-700 hover:text-rose-500" />
            </a>
            <a
              className="h-7 w-7 cursor-pointer text-gray-700 hover:text-rose-500"
              target="_blank"
              href={`https://wa.me/${params.row.contact}?text=Hi ${params.row.name}!`}
              rel="noreferrer">
              <img
                src="/svg/ic-wa.svg"
                className="ml-0.5 mt-0.5 h-6 w-6 cursor-pointer text-gray-700 hover:text-rose-500"></img>
            </a>
          </div>
        </>
      ),
    },
  ]

  const rows = listSpg.map((item) => ({
    ...item[1],
    email: item[0],
    id: item[0],
    contact: formatIndonesianNumber(item[1].contact),
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
