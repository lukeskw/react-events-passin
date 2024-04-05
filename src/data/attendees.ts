import { faker } from '@faker-js/faker'

export const attendees = Array.from({ length: 211 }).map(() => {
  return {
    id: faker.string.nanoid(8),
    name: faker.person.fullName(),
    email: faker.internet.email().toLocaleLowerCase(),
    checkInAt: faker.date.recent({ days: 7 }),
    createdAt: faker.date.recent({ days: 30 }),
  }
})
