import { type } from "os"

export type NavItemType = {
  title: string,
  href: string,
}

export type UserType = {
  username: string,
  email: string,
  name: string,
  isLoggedIn: boolean,
}