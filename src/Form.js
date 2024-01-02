import React, { useState ,useEffect} from 'react';
import "./App.css"

const Form = () => {
  const [formData, setFormData] = useState([]);
  const [srNo, setSrNo] = useState(1);
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [rate, setRate] = useState('');
  const [total, setTotal] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null)

  useEffect(() => {
    // If editingIndex is not null, populate the form with the item to be edited
    if (editingIndex !== null) {
      const editedItem = formData[editingIndex];
      setSrNo(editedItem.srNo);
      setItem(editedItem.item);
      setQuantity(editedItem.quantity);
      setRate(editedItem.rate);
      setTotal(editedItem.total);
    }
  }, [editingIndex, formData]);

  useEffect(() => {
    const calculatedTotal = (parseFloat(quantity) * parseFloat(rate)).toFixed(2);
    setTotal(calculatedTotal);
  }, [quantity, rate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!srNo || !item || !quantity || !rate || !total) {
        alert('Please fill in all the fields before submitting.');
        return;
      }
      if (editingIndex !== null) {
        // If editing, update the item in the formData array
        const updatedData = [...formData];
        updatedData[editingIndex] = {
          srNo: srNo,
          item: item,
          quantity: quantity,
          rate: rate,
          total: total,
        };
        setFormData(updatedData);
        setEditingIndex(null); // Reset editing state
      } else{
     

    const newRow = {
      srNo: srNo,
      item: item,
      quantity: quantity,
      rate: rate,
      total: total,
    };

    setFormData([...formData, newRow]);
    setSrNo(srNo + 1);
}

    // Clear input fields after submission
    setSrNo('');
    setItem('');
    setQuantity('');
    setRate('');
    setTotal('');
  };
  const calculateTotal = () => {
    return formData.reduce((acc, row) => acc + parseFloat(row.total || 0), 0).toFixed(2);
  };
  const handleEdit = (index) => {
    // Set the index of the item being edited and trigger the useEffect to populate the form
    setEditingIndex(index);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Serial No.: 
             <input type="text" value={srNo} readOnly />
        </label>
        <br />

        <label>
          Item:
          <input type="text" value={item} onChange={(e) => setItem(e.target.value)} />
        </label>
        <br />

        <label>
          Quantity:
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </label>
        <br />

        <label>
          Rate:
          <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
        </label>
        <br />

        <label>
          Total:
          <input type="text" value={total} readOnly />
        </label>
        <br />

        {/* <button type="submit">Submit</button> */}
      </form>

      <h2>ordered items</h2>
      <form onSubmit={handleSubmit}>
        {/* ... (Input fields remain the same) ... */}
        <button type="submit">{editingIndex !== null ? 'Update' : 'Submit'}</button>
      </form>

      {formData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((row, index) => (
              <tr key={index}>
                <td>{row.srNo}</td>
                <td>{row.item}</td>
                <td>{row.quantity}</td>
                <td>{row.rate}</td>
                <td>{row.total}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No items ordered yet.</p>
      )}
      <p>Total: {calculateTotal()}</p>
      
      
    </div>
  );
};

export default Form;
