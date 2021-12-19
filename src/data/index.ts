export interface Staff {
  id: string
  name: string
  author: string,
  url: string
}

export const staff: { [key: string]: Staff } = {
  '1': { id: '1', name: 'Wind Song', author: 'kotaro', url: '/wind-song.html' },
  '2': { id: '2', name: 'Simple Canon', author: '-', url: '/canon-simple.html'}
}

export const fetchStaff = (id: string) => {
  const st = staff[id]
  return st ? Promise.resolve(st) : Promise.reject('404')
}

export const fetchStaffs = () => {
  return Promise.resolve(Object.values(staff))
}