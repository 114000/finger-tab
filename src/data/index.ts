export interface Staff {
  id: string
  name: string
  author: string,
  url: string
}

export const staff: { [key: string]: Staff } = {
  '1': { id: '1', name: 'Wind Song', author: 'Kotaro', url: '/wind-song.html' },
  '2': { id: '2', name: 'Simple Canon', author: '-', url: '/canon-simple.html'},
  '3': { id: '3', name: 'Distance', author: 'Satoshi Gogo', url: '/distance.html'},
}

export const fetchStaff = (id: string) => {
  const st = staff[id]
  return st ? Promise.resolve(st) : Promise.reject('404')
}

export const fetchStaffs = () => {
  return Promise.resolve(Object.values(staff))
}