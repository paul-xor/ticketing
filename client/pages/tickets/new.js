const NewTicket = () => {
  return (
  <div>
    <h1>Create a Ticket</h1>
    <form>
      <div className="form-group">
        <label>Title</label>
        <input className="form-control" />
      </div>
        <div className="form-group" style={{ margin: "15px 0" }}>
        <label>Price</label>
        <input className="form-control" />
      </div>
    </form>
    <button className="btn btn-primary">Submit</button>
  </div>
  )
}

export default NewTicket;