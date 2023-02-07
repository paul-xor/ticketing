import { useState } from "react";

const NewTicket = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  }

  return (
  <div>
    <h1>Create a Ticket</h1>
    <form>
      <div className="form-group">
        <label>Title</label>
        <input
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
        <div className="form-group" style={{ margin: "15px 0" }}>
        <label>Price</label>
        <input
          className="form-control"
          value={price}
          onBlur={onBlur}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
    </form>
    <button className="btn btn-primary">Submit</button>
  </div>
  )
}

export default NewTicket;