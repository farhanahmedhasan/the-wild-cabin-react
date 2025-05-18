import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'

interface IDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  columnFilters?: ColumnFiltersState
}

export default function DataTableRoot<TData, TValue>({
  columns,
  data,
  columnFilters = []
}: IDataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  })

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} style={{ width: header.getSize() }}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody className="overflow-x-scroll [&>*:nth-child(even)]:bg-gray-100">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
