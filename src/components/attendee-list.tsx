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
import { ChangeEvent, useState } from 'react'
import { attendees } from '../data/attendees'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export function AttendeeList() {
  const [searchInput, setSearchInput] = useState('')
  const [pageIndex, setPageIndex] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  function goToNextPage() {
    if (pageIndex === Math.ceil(attendees.length / itemsPerPage)) {
      return
    }
    setPageIndex(pageIndex + 1)
  }
  function goToPrevPage() {
    if (pageIndex === 1) {
      return
    }
    setPageIndex(pageIndex - 1)
  }
  function goToFirstPage() {
    setPageIndex(1)
  }
  function goToLastPage() {
    setPageIndex(Math.ceil(attendees.length / itemsPerPage))
  }
  function handleListTotal(event: ChangeEvent<HTMLSelectElement>) {
    event.preventDefault()
    const selectedValue = parseInt(event.target.value)
    setItemsPerPage(selectedValue)
    setPageIndex(1)
  }

  function handleSearchInput(event: ChangeEvent<HTMLInputElement>) {
    setSearchInput(event.target.value)
  }
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
            onChange={handleSearchInput}
            value={searchInput}
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
          {attendees
            .slice((pageIndex - 1) * itemsPerPage, pageIndex * itemsPerPage)
            .map((attendee) => {
              return (
                <TableRow key={attendee.id}>
                  <TableCell className="w-8">
                    <input
                      type="checkbox"
                      className="size-4 rounded border-white/10 bg-black/20"
                    />
                  </TableCell>
                  <TableCell>{attendee.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-white">
                        {attendee.name}
                      </span>
                      <span>{attendee.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                  <TableCell>{dayjs().to(attendee.checkInAt)}</TableCell>
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
            <TableCell colSpan={3}>
              Showing{' '}
              <select
                onChange={handleListTotal}
                className="rounded-md border border-white/10 bg-transparent  focus:bg-white/10 focus:text-zinc-500"
              >
                <option className="bg-transparent" value="10">
                  10
                </option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>{' '}
              of {attendees.length} items
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>
                  Page {pageIndex} of{' '}
                  {Math.ceil(attendees.length / itemsPerPage)}
                </span>
                <div className="flex gap-1.5">
                  <ButtonIcon onClick={goToFirstPage}>
                    <ChevronsLeft className="size-4" />
                  </ButtonIcon>
                  <ButtonIcon onClick={goToPrevPage}>
                    <ChevronLeft className="size-4" />
                  </ButtonIcon>
                  <ButtonIcon onClick={goToNextPage}>
                    <ChevronRight className="size-4" />
                  </ButtonIcon>
                  <ButtonIcon onClick={goToLastPage}>
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
