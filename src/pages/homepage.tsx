import { AttendeeList } from '../components/attendee-list'
import { Header } from '../components/header'

export function Home() {
  return (
    <main className="max-w-app mx-auto flex flex-col gap-5 px-5 py-5 xl:px-0">
      <Header />
      <AttendeeList />
    </main>
  )
}
