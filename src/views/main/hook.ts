import { useToggle } from 'react-use'



export function useSidebarToggle (defaultVisible: boolean = false) {
  return useToggle(defaultVisible)
}