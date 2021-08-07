import useAuth from "../hooks/useAuth"
import UploadForm from '../components/UploadForm'

export default function Dashboard() {
  const { user, loading } = useAuth()
  
  return (
    <>
      <h1>Ferry</h1>
      {loading ? 'Loading...' : user.email}
      <UploadForm />
    </>
  )
}