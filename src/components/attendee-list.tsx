import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from 'lucide-react'
import { Table } from './table/table'
import { ButtonIcon } from './button-icon'
import { TableHeader } from './table/table-header'
import { TableCell } from './table/table-cell'
import { TableRow } from './table/table-row'

export function AttendeeList() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="flex w-72 items-center gap-3  rounded-lg border border-white/10 px-3 py-1.5">
          <Search className="size-4 text-emerald-300" />
          <input
            type="text"
            placeholder="Search attendees..."
            className="flex-1 border-0 bg-transparent p-0 text-sm outline-none"
          />
        </div>
      </div>

      <Table>
        <thead>
          <TableRow>
            <TableHeader className="w-[64px]">
              <input
                type="checkbox"
                className="size-4 rounded border-white/10 bg-black/20"
              />
            </TableHeader>
            <TableHeader>Code</TableHeader>
            <TableHeader>Attendee</TableHeader>
            <TableHeader>Registration Date</TableHeader>
            <TableHeader>Check-in Date</TableHeader>
            <TableHeader className="w-[64px]"></TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map(() => {
            return (
              <TableRow key={crypto.randomUUID()}>
                <TableCell className="w-8">
                  <input
                    type="checkbox"
                    className="size-4 rounded border-white/10 bg-black/20"
                  />
                </TableCell>
                <TableCell>1234</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">
                      Lucas Porfirio
                    </span>
                    <span>lucasporfirioa@gmail.com</span>
                  </div>
                </TableCell>
                <TableCell>7 days ago</TableCell>
                <TableCell>3 days ago</TableCell>
                <TableCell>
                  <ButtonIcon
                    variant="transparent"
                    className="rounded-md border border-white/10 bg-black/20 p-1.5"
                  >
                    <MoreHorizontal className="size-4" />
                  </ButtonIcon>
                </TableCell>
              </TableRow>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>Showing 10 of 228 items</TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>Page 1 of 23</span>
                <div className="flex gap-1.5">
                  <ButtonIcon>
                    <ChevronsLeft className="size-4" />
                  </ButtonIcon>
                  <ButtonIcon>
                    <ChevronLeft className="size-4" />
                  </ButtonIcon>
                  <ButtonIcon>
                    <ChevronRight className="size-4" />
                  </ButtonIcon>
                  <ButtonIcon>
                    <ChevronsRight className="size-4" />
                  </ButtonIcon>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  )
}
