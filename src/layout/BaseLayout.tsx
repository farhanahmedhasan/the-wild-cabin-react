import { Toaster } from 'react-hot-toast'

interface IProps {
  children: React.ReactNode
}

export default function BaseLayout(props: IProps) {
  return (
    <>
      {props.children}
      <Toaster position="top-center" />
    </>
  )
}
