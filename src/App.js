import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function Data({ excelData }) {
  if (typeof excelData === 'object' && excelData !== null) {
    return (
      <tr>
        <td>{excelData.ADMISSION_NUMBER}</td>
        <td>{excelData.Student_Name}</td>
        <td>{excelData.Father_Name}</td>
        <td>{excelData.Mother_name}</td>
        <td>{excelData.Date_of_Birth}</td>
        <td>{excelData.Mobile_No}</td>
      </tr>
    );
  } else {
    return null;
  }
}

function App() {
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
  const [excelData, setExcelData] = useState(null);

  const fileType = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (fileType.includes(selectedFile.type)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
        reader.readAsArrayBuffer(selectedFile);
      } else {
        setExcelFileError('Please select only Excel file types');
        setExcelFile(null);
      }
    } else {
      console.log('Please select your file');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      // Send the Excel data to the backend server
      fetch('/api/excelData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ excelData: data }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          // Handle the response from the server if needed
          console.log(responseData);
        })
        .catch((error) => {
          console.error(error);
        });

      setExcelData(data);
    } else {
      setExcelData(null);
    }
  };

  return (
    <div className="container">
      <div className="form">
        <form className="form-group" autoComplete="off" onSubmit={handleSubmit}>
          <label>
            <h5>Upload Excel file</h5>
          </label>
          <br />
          <input type="file" className="form-control" onChange={handleFile} required />
          {excelFileError && (
            <div className="text-danger" style={{ marginTop: '5px' }}>
              {excelFileError}
            </div>
          )}
          <button type="submit" className="btn btn-success" style={{ marginTop: '5px' }}>
            Submit
          </button>
        </form>
      </div>

      <br />
      <hr />

      <h5>View Excel file</h5>
      <div className="viewer">
        {!excelData ? (
          <>No file selected</>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ADMISSION_NUMBER</th>
                  <th scope="col">Student_Name</th>
                  <th scope="col">Father_Name</th>
                  <th scope="col">Mother_name</th>
                  <th scope="col">Date_of_Birth</th>
                  <th scope="col">Mobile_No</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(excelData) && excelData.length > 0 ? (
                  excelData.map((row, index) => <Data key={index} excelData={row} />)
                ) : (
                  <tr>
                    <td colSpan="6">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
