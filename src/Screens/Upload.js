import React from "react";
import "./App.css"
import * as XLSX from "xlsx";
import Axios from "axios";
import { Form, Button, Table } from 'react-bootstrap'
import { useState,useEffect } from "react";
import Footer from './Footer'

const App = () => {
  const [ data, setdata ] = useState([]);


 
  useEffect(() => {
    // Axios.get("http://192.168.43.112:8001/api/v1/data/read")
    // .then((response) => {
    //   console.log(response.data)
    //   setdata(response.data)
    //   // window.location.reload()

    // })
    // .catch(() => {
    //   console.log("Err");
    // });
  },[]);


  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);

        // console.log(data)


      };

      fileReader.onerror = (error) => {
        reject(error);
      };

      
    });

    promise.then((data) => {

        console.log(data)

        Axios.post("http://192.168.43.112:8001/api/v1/data/post", {
          n: data,
        })
        .then((response) => {
          // console.log(response);
          alert("Successfully Uploded");
          window.location.reload()
        
        })
        .catch((error) => {
          alert("Not a valid infromation, Please check and try again.");
          console.log(error);
         
        });
  
      // var an = [];
      // for (let index = 0; index < data.length; index++) {
      //          const n = data[index]["ADMISSION_NUMBER"];
      //          an.push(n);
      //   }
        // console.log(arr)

        function padTo2Digits(num) {
          return num.toString().padStart(2, '0');
        }
        function formatDate(date) {
          return (
            [
              padTo2Digits(date.getDate()),
              padTo2Digits(date.getMonth() + 1),
              date.getFullYear(),
            ].join('-') +
            ' ' +
            [
              padTo2Digits(date.getHours()),
              padTo2Digits(date.getMinutes()),
            ].join(':')
          );
        }
        
        const uplodeDate=(formatDate(new Date()));

        
        // const results = arr.filter(element => {
        //   return element !== undefined;
        // });
        
        // arr =results;
  
        // console.log("HERE"+arr);

      console.log("Done convert");


      // Axios.post("http://192.168.43.112:8001/api/v1/data/post", {
      //   n: an,

      // })
      // .then((response) => {
      //   // console.log(response);
      //   alert("Successfully Uploded");
      //   window.location.reload()
      
      // })
      // .catch((error) => {
      //   alert("Not a valid infromation, Please check and try again.");
      //   console.log(error);
       
      // });

    });
  };



  const tableDocArr = data.map((data, index) => {
    return (
      <tr>
      <td>{index+1}</td>
      <td>{data.docName}</td> 
      <td>{data.docDate}</td>
      {/* <td> <Button variant="danger" 
      onClick={() => {  deleteRcnumber(data._id); }} 
      >Delete</Button> </td> */}
    </tr>
    )
  })


  return (
    <>
    <div class="containerNew">
   <div className="App">
   <div className="App-Center">

<Form>

<Form.Group controlId="formFile" className="mb-3">
    <Form.Label>Add document</Form.Label>
    <Form.Control 
    
    type="file" 
    accept=".xls,.xlsx,.csv" 
    onChange={(e) => {
      const file = e.target.files[0];
      readExcel(file);
    }}
    />
  </Form.Group>
  </Form>
</div>
    </div>

    <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>#</th>
      <th>Document name</th>
      <th>Uploaded date</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
   {tableDocArr}
  </tbody>
  <Footer/>
</Table>

</div>
    </>
  )
}

export default App;




