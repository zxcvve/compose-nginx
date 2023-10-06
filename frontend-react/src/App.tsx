import {useState, useEffect} from 'react';
import axios from 'axios';

const IP = import.meta.env.VITE_SERVER_IP;
// const IP = "127.0.0.1";
const PORT = import.meta.env.VITE_SERVER_PORT;

function App() {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({name: '', surname: ''});

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = () => {
    axios.get(`http://${IP}:${PORT}/persons`)
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.error('Error fetching persons:', error);
      });
  };

  const handleInputChange = (e : any) => {
    const {name, value} = e.target;
    setNewPerson({...newPerson, [name]: value});
  };

  const handleSubmit = (e : any) => {
    e.preventDefault();

    axios.post(`http://${IP}:${PORT}/persons`, newPerson)
      .then(() => {
        fetchPersons();
        setNewPerson({name: '', surname: ''});
      })
      .catch((error) => {
        console.error('Error creating person:', error);
      });
  };

  const handleDelete = (id : Number) => {
    axios.delete(`http://${IP}:${PORT}/persons/${id}`)
      .then(() => {
        fetchPersons();
      })
      .catch((error) => {
        console.error('Error deleting person:', error);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <h1 className="text-2xl font-bold mb-4">Person List</h1>
      <ul className="mb-4">
        {persons.map((person : any) => (
          <li key={person.id} className="mb-2">
            {person.name} {person.surname}
            <button
              onClick={() => handleDelete(person.id)}
              className="ml-2 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <h2 className="text-lg font-semibold mb-2">Add New Person</h2>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newPerson.name}
          onChange={handleInputChange}
          className="mr-2 py-1 px-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="surname"
          placeholder="Surname"
          value={newPerson.surname}
          onChange={handleInputChange}
          className="mr-2 py-1 px-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default App;
