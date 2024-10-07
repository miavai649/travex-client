interface IProps {
  params: {
    userId: string
  }
}

const page = ({ params }: IProps) => {
  return (
    <div>
      <h1>This is page component</h1>
    </div>
  )
}

export default page
