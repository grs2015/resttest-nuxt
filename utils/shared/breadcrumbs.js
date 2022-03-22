export const dashboardBreadcrumbs = [
  {
    text: 'Dashboard',
    to: '/admin',
    exact: true,
    disabled: false,
  }
]

export const customersBreadcrumbs = [
  {
    text: 'Dashboard',
    to: '/admin',
    disabled: false,
    exact: true
  },
  {
    text: 'Customers',
    to: '/admin/customers',
    disabled: false,
    exact: true
  }
]

export const customerEditBreadcrumbs = [
  {
    text: 'Dashboard',
    to: '/admin',
    disabled: false,
    exact: true
  },
  {
    text: 'Customers',
    to: '/admin/customers',
    disabled: false,
    exact: true
  },
  {
    text: 'Edit Customer Data',
    disabled: true,
    to: '/admin/customers',
    exact: true
  }
]

export const usersBreadcrumbs = [
  {
    text: 'Dashboard',
    to: '/admin',
    disabled: false,
    exact: true
  },
  {
    text: 'Users',
    to: '/admin/users',
    disabled: false,
    exact: true
  }
]
