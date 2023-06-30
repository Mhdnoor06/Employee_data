import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListView() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://reqres.in/api/users?page=${currentPage}`,
        );
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item.first_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const displayedData = searchTerm ? filteredData : data;

  return (
    <div>
      <h1>List View of Employees</h1>
      <div className="container">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search By First Name"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      {displayedData.map((item, index) => (
        <div className="container" key={item.id}>
          <div
            className="accordion"
            id={`accordion${item.id}`}
            style={{ width: '50%' }}
          >
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${
                    index === 0 ? 'collapsed' : ''
                  }`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${item.id}`}
                  aria-expanded={index === 0 ? 'true' : 'false'}
                  aria-controls={`collapse${item.id}`}
                >
                  {`Employee ${item.id}`}
                </button>
              </h2>
              <div
                id={`collapse${item.id}`}
                className={`accordion-collapse collapse ${
                  index === 0 ? 'show' : ''
                }`}
              >
                <div className="accordion-body" style={{ width: '200px' }}>
                  <div className="card">
                    <img
                      src={item.avatar}
                      className="card-img-top"
                      alt="..."
                      style={{ padding: '10px', borderRadius: '15px' }}
                    />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {item.id}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </div>
                  <p>{item.first_name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="m-5">
        <button
          onClick={() => setCurrentPage(1)}
          className={`btn btn-${
            currentPage == 1 ? 'primary' : 'secondary'
          } m-3`}
        >
          Page 1
        </button>
        <button
          onClick={() => setCurrentPage(2)}
          className={`btn btn-${currentPage == 2 ? 'primary' : 'secondary'} `}
        >
          Page 2
        </button>
      </div>
    </div>
  );
}

export default ListView;
