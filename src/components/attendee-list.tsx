import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  LoaderCircle,
  MoreHorizontal,
  Search,
} from 'lucide-react'
import { Table } from './table/table'
import { ButtonIcon } from './button-icon'
import { TableHeader } from './table/table-header'
import { TableCell } from './table/table-cell'
import { TableRow } from './table/table-row'
import { ChangeEvent, useEffect, useState } from 'react'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { api } from '@/lib/axios'
import { useDebounce } from '@/hooks/useDebounce'
dayjs.extend(relativeTime)

interface Attendee {
  id: string
  ticketId: string
  name: string
  email: string
  createdAt: string
  checkedInAt?: string | null
}

interface AttendeeResponse {
  data: {
    attendees: Attendee[]
    total: number
  }
}

export function AttendeeList() {
  const [searchInput, setSearchInput] = useState(() => {
    const url = new URL(window.location.toString())

    if (url.searchParams.has('query')) {
      return url.searchParams.get('query') ?? ''
    }
    return ''
  })
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const url = new URL(window.location.toString())

    if (url.searchParams.has('itemsPerPage')) {
      return Number(url.searchParams.get('itemsPerPage'))
    }
    return 10
  })
  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [total, setTotal] = useState(1)

  const debouncedSearch = useDebounce(searchInput, 500)

  const totalPages = Math.ceil(total / itemsPerPage)

  const [pageIndex, setPageIndex] = useState(() => {
    const url = new URL(window.location.toString())

    if (url.searchParams.has('query') && totalPages === 1) {
      url.searchParams.set('page', '1')
      window.history.pushState({}, '', url)
      return 1
    }
    if (url.searchParams.has('page')) {
      return Number(url.searchParams.get('page'))
    }
    return 1
  })

  const fetchAttendees = async () => {
    try {
      setIsLoading(true)
      const response: AttendeeResponse = await api.get(
        'events/16b9c10f-c291-419a-b76d-48c7b80a9577/attendees',
        {
          params: {
            pageIndex: pageIndex - 1,
            query:
              debouncedSearch.length > 0
                ? debouncedSearch
                : searchInput.length > 0
                  ? searchInput
                  : '',
            itemsPerPage,
          },
        },
      )

      setAttendees(response.data.attendees)
      setTotal(response.data.total)
      setIsLoading(false)
    } catch (e) {
      console.error(e)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAttendees()
  }, [pageIndex, debouncedSearch, totalPages])

  function setCurrentPage(pageIndex: number) {
    const url = new URL(window.location.toString())

    url.searchParams.set('page', String(pageIndex))

    window.history.pushState({}, '', url)

    setPageIndex(pageIndex)
  }

  function setCurrentSearch(query: string) {
    const url = new URL(window.location.toString())

    url.searchParams.set('query', query)

    window.history.pushState({}, '', url)

    setSearchInput(query)
  }

  function goToNextPage() {
    if (pageIndex === totalPages) {
      return
    }

    setCurrentPage(pageIndex + 1)
  }
  function goToPrevPage() {
    if (pageIndex === 1) {
      return
    }
    setCurrentPage(pageIndex - 1)
  }
  function goToFirstPage() {
    setCurrentPage(1)
  }
  function goToLastPage() {
    setCurrentPage(totalPages)
  }
  function handleListTotal(event: ChangeEvent<HTMLSelectElement>) {
    event.preventDefault()
    const selectedValue = parseInt(event.target.value)

    const url = new URL(window.location.toString())

    url.searchParams.set('itemsPerPage', event.target.value)

    window.history.pushState({}, '', url)

    setItemsPerPage(selectedValue)
    setPageIndex(1)
  }

  function handleSearchInput(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value)
    setPageIndex(1)
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Participants</h1>
        <div className="flex w-72 items-center gap-3  rounded-lg border border-white/10 px-3 py-1.5">
          <Search className="size-4 text-emerald-300" />
          <input
            type="text"
            placeholder="Search attendees..."
            className="flex-1 border-0 bg-transparent p-0 text-sm outline-none focus:ring-0"
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
          {isLoading ? (
            <>
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="flex w-full items-center justify-center">
                    <LoaderCircle className="size-5 animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            </>
          ) : (
            attendees.map((attendee) => {
              return (
                <TableRow key={attendee.ticketId}>
                  <TableCell className="w-8">
                    <input
                      type="checkbox"
                      className="size-4 rounded border-white/10 bg-black/20"
                    />
                  </TableCell>
                  <TableCell>{attendee.ticketId}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-white">
                        {attendee.name}
                      </span>
                      <span>{attendee.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                  <TableCell>
                    {attendee.checkedInAt === null ? (
                      <span className="text-zinc-500">
                        Didn&apos;t check in
                      </span>
                    ) : (
                      dayjs().to(attendee.checkedInAt)
                    )}
                  </TableCell>
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
            })
          )}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              Showing{' '}
              <select
                onChange={handleListTotal}
                value={itemsPerPage}
                className="rounded-md border border-white/10 bg-transparent  focus:bg-white/10 focus:text-zinc-300"
              >
                <option className="bg-zinc-950 text-zinc-300" value="10">
                  10
                </option>
                <option className="bg-zinc-950 text-zinc-300" value="20">
                  20
                </option>
                <option className="bg-zinc-950 text-zinc-300" value="50">
                  50
                </option>
              </select>{' '}
              of {searchInput ? attendees.length : total} items
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>
                  Page {totalPages === 0 ? '0' : pageIndex} of {totalPages}
                </span>
                <div className="flex gap-1.5">
                  <ButtonIcon
                    onClick={goToFirstPage}
                    disabled={pageIndex === 1}
                  >
                    <ChevronsLeft className="size-4" />
                  </ButtonIcon>
                  <ButtonIcon onClick={goToPrevPage} disabled={pageIndex === 1}>
                    <ChevronLeft className="size-4" />
                  </ButtonIcon>
                  <ButtonIcon
                    onClick={goToNextPage}
                    disabled={pageIndex === totalPages || totalPages === 0}
                  >
                    <ChevronRight className="size-4" />
                  </ButtonIcon>
                  <ButtonIcon
                    onClick={goToLastPage}
                    disabled={pageIndex === totalPages || totalPages === 0}
                  >
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
