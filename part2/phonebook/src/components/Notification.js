const Notification = ({message}) => {
  if (message === null) {
    return message;
  }
  return (
    <div className={message.isError ? 'error' : 'success'}>
      {message.content}
    </div>
  )
}

export default Notification;