export default function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50/50">
      <div className="h-12 w-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}
