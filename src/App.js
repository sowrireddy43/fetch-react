import React, { useEffect, useState } from "react";
import { Toaster, Position } from "@blueprintjs/core";

const foad = Toaster.create({ position: Position.TOP });

const App = () => {
  const [user, setUser] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUser(json));
  }, []);

  const rea = () => {
    const na = name.trim();
    const em = email.trim();
    const we = website.trim();

    if (na && em && we) {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: na,
          email: em,
          website: we,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setUser([...user, data]);
          setName("");
          setEmail("");
          setWebsite("");
          foad.show({
            message: "New Item successfully added",
            intent: "success",
            timeout: 3000,
          });
        });
    }
  };
  const deleteUser = id =>
  {
    fetch("https://jsonplaceholder.typicode.com/posts/${id}",{method:"DELETE",})
    .then(response => response.json)
    .then(()=>
    {
      setUser(values =>
        { return values.filter(item => item.id!=id)
        })
        foad.show(
          {
            message:"deleted successfullt",
            intent:"success",
            time:3000,
          }

        )
    })
  };

  return (
    <>
      <div className="f">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Website</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {user.map((users) => (
              <tr key={users.id}>
                <td>{users.id}</td>
                <td>{users.name}</td>
                <td>{users.email}</td>
                <td>{users.website}</td>
                <td>
                  <button intent="primary">Update</button>
                  <button intent="success" onClick={()=>{deleteUser(users.id)}}>Delete</button>
                </td>
              </tr>
            ))}
            
            <tr>
              <td></td>
              <td>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </td>
              <td>
                <button onClick={rea}>Add User</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default App;
