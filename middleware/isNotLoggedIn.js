export default function ({ $cookies, redirect }) {
  if (!$cookies.get('token')) {
    return redirect('/login')
  }
}
