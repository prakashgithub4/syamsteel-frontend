import { Link,useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

const Profile = (props)=>{
  let { id } = useParams();
  const [data,setData] = useState([]);
  useEffect(() => {
    const headers = {
      "access-control-allow-origin": "*",
      "Content-type": "application/json; charset=UTF-8"

    }
    axios.get('http://127.0.0.1:8000/api/details/' + id, headers).then(function (response) {
      
      setData(response.data.data)
      
      
    })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }, [props]);
  const goBack = () => {
		window.location.href='/';
	}

    return <>
    <section class="vh-100" style={{backgroundColor: "#f4f5f7;"}}>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-lg-6 mb-4 mb-lg-0">
        <div class="card mb-3" style={{borderRadius: ".5rem;"}}>
          <div class="row g-0">
            <div class="col-md-4 gradient-custom text-center text-white"
              style={{borderTopLeftRadius:".5rem; border-bottom-left-radius: .5rem;"}}>
              <img src={data?.avatar}
                alt="Avatar" class="img-fluid my-5" style={{width: "80px"}} />
              <h5>Marie Horwitz</h5>
              <p>Web Designer</p>
              <i class="far fa-edit mb-5"></i>
            </div>
            <div class="col-md-8">
              <div class="card-body p-4">
                <h6>Information</h6>
                <hr class="mt-0 mb-4"/>
                <div class="row pt-1">
                  <div class="col-6 mb-3">
                    <h6>Name</h6>
                    <p class="text-muted">{data.name}</p>
                  </div>
                  <div class="col-6 mb-3">
                    <h6>Address</h6>
                    <p class="text-muted">{data.address}</p>
                  </div>
                </div>
                {/* <h6>Projects</h6> */}
                <hr class="mt-0 mb-4"/>
                <div class="row pt-1">
                  <div class="col-6 mb-3">
                    <h6>Gender</h6>
                    <p class="text-muted">{data.gender}</p>
                  </div>
                  {/* <div class="col-6 mb-3">
                    <h6>Most Viewed</h6>
                    <p class="text-muted">Dolor sit amet</p>
                  </div> */}
                </div>
                <div class="d-flex justify-content-start">
                  <a href="#!"><i class="fab fa-facebook-f fa-lg me-3"></i></a>
                  <a href="#!"><i class="fab fa-twitter fa-lg me-3"></i></a>
                  <a href="#!"><i class="fab fa-instagram fa-lg"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button onClick={goBack}>Back</button>
  </div>
</section>
    
    </>
}
export default Profile;