
const EntryView = (props: any) => {

  return (
    <div>
      <h2>{props.date}</h2>
      <span>{props.content}</span>
    </div>
  )
}

export default EntryView