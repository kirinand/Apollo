import constants from "@/constants"

export const menuConfig = {
  mainNav: [
    {
      key: 'write',
      title: constants.title.write,
      href: "/calendar"
    },
    {
      key: 'view',
      title: constants.title.view,
      href: "/calendar"
    },
    {
      key: 'insight',
      title: constants.title.insights,
      href: "/insights"
    },
    {
      key: 'profile',
      title: constants.title.profile,
      href: "/profile"
    },
  ],
}