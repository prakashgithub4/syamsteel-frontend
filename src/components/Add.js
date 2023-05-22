import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import axios from 'axios';

const Add = () => {
  
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    address: '',
    file: null,
  })
  const [model, setModel] = useState({
    show: false,
    details: null,
    index: 0
  });

  const [update, setUpdate] = useState({
    name: '',
    gender: '',
    address: '',
    file: null,
    id: null
  })

  const [error, setErrors] = useState({
    name: '',
    gender: '',
    file: ''
  })
  useEffect(() => {
    list();
  }, []);
  const list = () => {
    const headers = {
      "access-control-allow-origin": "*",
      "Content-type": "application/json; charset=UTF-8"

    }
    $(document).ready(function () {
      setTimeout(function () {
        $('#example').DataTable({
          paging: false,
          pageLength: false,
          "bDestroy": true,
          dom: 'lrt',
        });
      }, 1000);
    });
    // Update the document title using the browser API
    axios.get('http://127.0.0.1:8000/api', headers).then(function (response) {
      setData(response.data.data.records);
    })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }
  const handleForm = ({ target: { name, value } }) => {
    setFormData({
      ...formData,
      [name]: value
    });
  }
  const onSelectFile = (e) => {
    console.log(e.target.files[0]);
    setFormData({
      ...formData,
      file: e.target.files[0]
    });
  }

  const handleUpdateForm = ({ target: { name, value } }) => {
    setUpdate({
      ...update,
      [name]: value
    });
  }
  const onUpdateSelectFile = (e) => {
    setUpdate({
      ...update,
      file: e.target?.files[0]
    });
  }
  const remove = (id) => {
    const headers = {
      "access-control-allow-origin": "*",
      "Content-type": "application/json; charset=UTF-8"

    }
    axios.get('http://127.0.0.1:8000/api/delete/' + id, headers).then(function (response) {
      // console.log(response.data.message);
      alert(response.data.message)
      window.location.reload(false);
    })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }
  const onUpdate = (e) => {
    e.preventDefault();

    const headers = {
      'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
      "access-control-allow-origin": "*",
      'content-type': 'multipart/form-data'
    }
    console.log(update)

    const Formdata = new FormData();
    Formdata.set('name', update.name);
    Formdata.set('gender', update.gender);
    Formdata.set('address', update.address);
    if(update.file){
      Formdata.append('file', update.file);
    }
    
    console.log(update);
    axios.post('http://localhost:8000/api/update/' + update.id, Formdata, headers).then(function (response) {
      console.log(response)
      list();
      window.location.reload(false);
    })
      .catch(function (error) {
        // handle error
        setErrors({
          gender: error.response.data.error.gender,
          name: error.response.data.error?.gender,
          file: error.response.data.error?.file
        })
      });
  }
  const onSubmit = (e) => {
    e.preventDefault();


    const headers = {
      'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
      "access-control-allow-origin": "*",
      'content-type': 'multipart/form-data'
    }

    const Formdata = new FormData();

    Formdata.set('name', formData.name);
    Formdata.set('gender', formData.gender);
    Formdata.set('address', formData.address);
    Formdata.append('file', formData.file);
    axios.post('http://localhost:8000/api/store', Formdata, headers).then(function (response) {
      list();
      window.location.reload(false);

    })
      .catch(function (error) {
        // handle error
        setErrors({
          gender: error.response.data.error.gender,
          name: error.response.data.error?.gender,
          file: error.response.data.error?.file
        })
      })

  }
  const showModal = id => {

    setModel({
      show: !model.show,
      index: id,
    })
    const headers = {
      "access-control-allow-origin": "*",
      "Content-type": "application/json; charset=UTF-8"

    }
    axios.get('http://127.0.0.1:8000/api/details/' + id, headers).then(function (response) {
      //console.log(response);
      setTimeout(setModel({ show: !model.show, details: response }), 5000);

      setUpdate({
        name: response.data.data.name,
        gender: response.data.data.gender,
        address: response.data.data.address,
        id: id,
        file: null
      })
      // alert(response.data.message)
      // window.location.reload(false);
    })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

  };
  return <>

    <div className="container">
      <form encType="multipart/form-data" onSubmit={onSubmit}>
        <div className='row' style={{marginTop:"82px"}}>
          <div className='col-md-6'>Name</div>
          <div className='col-md-6'><input type="text" name="name" onChange={handleForm} />
            {
              error?.name[0] ?? (<small>{error.file}</small>)
            }
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>Image</div>
          <div className='col-md-6'>
            <input type="file" name="file" onChange={onSelectFile} />
            {
              error?.file[0] ?? (<small>{error.file[0]}</small>)
            }
          </div>


        </div>
        <div className='row'>
          <div className='col-md-6'>Address</div>
          <div className='col-md-6'><input type="text" name="address" onChange={handleForm} /></div>
        </div>
        <div className='row'>
          <div className='col-md-6'>Gender</div>
          <div className='col-md-6'>
            <select name="gender" onChange={handleForm}>
              <option >Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {
              error.gender ?? (<small>{error.gender}</small>)
            }
          </div>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
      <h2>List</h2>
      <table class="table" id="example">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((value, index) => {
            return <>
              <tr key={value.id}>
                <td>{value.id}</td>
                <td>{value.name}</td>
                <td><img src={value.avatar} height={50} width={50} alt={value.name} /></td>
                <td>{value.address}</td>
                <td>{value.gender}</td>
                <td>
                  <Link onClick={() => showModal(index)} className="btn btn-info">Edit</Link>&nbsp;&nbsp;
                  <Link onClick={() => remove(index)} className="btn btn-danger">Delete</Link>&nbsp;&nbsp;
                  <Link onClick={event =>  window.location.href='/details/'+index} className="btn btn-info">View</Link>&nbsp;
                </td>
              </tr>
            </>
          })}

        </tbody>
      </table>
      <div style={{ display: model.show === true ? 'block' : 'none' }}>
        <form encType="multipart/form-data" onSubmit={onUpdate}>
          <div className='row' style={{marginTop:"82px"}}>
            <div className='col-md-6'>Name</div>
            <div className='col-md-6'><input type="text" name="name" onChange={handleUpdateForm} value={update.name} />
              {
                error?.name[0] ?? (<small>{error.file}</small>)
              }
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>Image</div>
            <div className='col-md-6'>
              <input type="file" name="file" onChange={onUpdateSelectFile} />
              {
                error?.file[0] ?? (<small>{error.file[0]}</small>)
              }
              <img src={model.details?.data?.data.avatar} height={140} width={140} alt="thumbnail"/>
            </div>


          </div>
          <div className='row'>
            <div className='col-md-6'>Address</div>
            <div className='col-md-6'><input type="text" name="address" onChange={handleUpdateForm} value={update.address} /></div>
          </div>
          <div className='row'>
            <div className='col-md-6'>Gender</div>
            <div className='col-md-6'>
              <select name="gender" onChange={handleUpdateForm}>
                <option >Select</option>
                <option selected={update.gender === 'Male' ? true : false} value="Male">Male</option>
                <option selected={update.gender === 'Female' ? true : false} value="Female">Female</option>
              </select>
              {
                error.gender ?? (<small>{error.gender}</small>)
              }
            </div>
          </div>
          <button className="btn btn-primary">Update</button>
        </form>
      </div>
    </div>
  </>
}
export default Add;