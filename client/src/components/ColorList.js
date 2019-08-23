import React, { useState } from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    // console.log('color in editColor', color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      // console.log(res.data)
      let newArr = colors.filter(color => color.id !== res.data.id)
      newArr.push(res.data)
      // console.log('newArr', newArr)
      updateColors(newArr.sort((a, b) => a.id - b.id))
    })
    .catch(err => console.log(err))
  };

  const deleteColor = e => {
    e.preventDefault();
    if(window.confirm('Are you sure?'))
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${colorToEdit.id}`)
    .then(res => {
      // console.log(res)
      let newArr = colors.filter(color => color.id !== colorToEdit.id)
      updateColors(newArr)
    })
    .catch(err => console.log(err))
    // make a delete request to delete this color
  };

  const saveNew = e => {
    axiosWithAuth()
    .post(`http://localhost:5000/api/colors/`, newColor)
    .then(res => {
      console.log('post new color response', res)
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
            <button onClick={deleteColor}>Delete Color</button>
          </div>
        </form>
      )}
      <form onSubmit={saveNew}>
          <legend>add new color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setNewColor({ ...newColor, color: e.target.value })
              }
              value={newColor.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setNewColor({
                  ...newColor,
                  code: { hex: e.target.value }
                })
              }
              value={newColor.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
