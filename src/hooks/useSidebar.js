import { useContext } from "react"
import { SidebarContext } from "../context/SidebarContext"

export const useSidebar = () => {
  const state = useContext(SidebarContext)
  return state
}