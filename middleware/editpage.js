export default function ({ route, redirect }) {
  if (route.path === '/admin/customers/edit') {
    return redirect(302, '/admin/customers')
  }
}
