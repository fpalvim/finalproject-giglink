import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { MyContext } from "../context/MyContext";
import React from "react";
import MapSearchBar from "../common/MapSearchBar";


function LoginPage() {
  
  const navigate = useNavigate();
  const {
    password,
    setPassword,
    username,
    setUsername,
    setProfileType,
    setUserData
  } = useContext(MyContext);
  
  const handleLogin = () => {
    const url = "https://nfz1b0p6-8787.euw.devtunnels.ms/login"
    const username = document.getElementById("userInputLogin").value
    const password = document.getElementById("passwordInputLogin").value
    const data = {
      username: username,
      password: password
    }
    fetch(url, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log("Response from server:", data);
      localStorage.setItem("token", data.access_token)
      console.log(data.user_db.id);
      console.log(data.user_db.profile_type);
      localStorage.setItem('userId', data.user_db.id)
      localStorage.setItem('profileType', data.user_db.profile_type)
      setUserData(data.user_db)
      navigate(`/profilepage/${data.user_db.id}`);
    })
    .catch((error) => {
      console.error("Error making request:", error)
    })
  }


  const handleProfileTypeChange = (e) => {
    setProfileType(e.target.value);
  };

  
  const handleSubmit = () => {
    const url = "https://nfz1b0p6-8787.euw.devtunnels.ms/user"
    const email_address = document.getElementById("inputEmail4").value
    const username = document.getElementById("inputUsername").value
    const password = document.getElementById("inputPassword4").value
    const address = document.getElementById("inputAddress2").value
    const profile_picture = document.getElementById("inputProfilePicture").value
    const profile_type = document.getElementById("profileType").value
    const data = {
      email_address: email_address,
      username: username,
      password: password,
      address: address,
      profile_picture: profile_picture,
      profile_type: profile_type
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      alert("Welcome to GigLink, your account is created!")
      console.log("Reponse from server:", data);
    })
    .catch((error) => {
      alert("account created failed, try later or contact us!")
      console.error("Error making request:", error)
    })
  }

  return (
  
    <div className="login-page-container">
     
      <div className="center-content-container">
        <div className="content-container">
      <div className="header-login d-flex justify-content-between ">
        <div className=" d-flex">
           <img className="logo" src="/src/components/common/logo.png" alt="" />
        </div>
        <div>
          <ul className="nav justify-content-end">
            <li className="nav-item">
            </li>
          </ul>
        </div>
      </div>
      </div>
      </div>
      <div className="top-view row justify-content-center">
        <form className="login-form ">
          <div className="mb-3">
            <h1 style={{ color: "white" }}>Welcome to Giglink</h1>
            <label
              for="exampleInputEmail1"
              className="form-label"
              style={{ color: "white" }}
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              required
              className="form-control"
              id="userInputLogin"
              aria-describedby="emailHelp"
            ></input>
            <div
              id="emailHelp"
              className="form-text"
              style={{ color: "white" }}
            >
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label
              for="exampleInputPassword1"
              className="form-label"
              style={{ color: "white" }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)} required
              className="form-control"
              id="passwordInputLogin"
            ></input>
          </div>
         
          <button
            type="button"
            className="button-78"
            onClick={handleLogin}
          >
            Log in
          </button>{" "}
          
          <a
                  href="#"
                  className="btn btn-link"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  style={{ color: "white" }}
                >
                  Create Your Profile
                </a>
        </form>
      </div>
      <div className="login-page-middle ">
        <div className="site-info-title">
          <h1 style={{ color: "white" }}>Introducing GigLink</h1>
        </div>
        <div className="site-info-text p-5">
          <p style={{ color: "white" }}>
            welcome to GigLink, <br></br>
            <br></br>
            The ultimate online platform designed to bridge the gap between
            bands and venues effortlessly! With GigLink, musicians can create
            profiles to showcase their talents, while venues can list
            availability and unique features. Our intuitive calendar system
            allows both sides to easily browse available dates, ensuring that
            you find the perfect match for your next gig. Whether you’re a band
            looking to book your next performance or a venue seeking fresh
            sounds, simply connect, message, and send booking requests—all in
            one seamless experience. <br /> Join GigLink today and transform the
            way you book live music!
          </p>
          <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 style={{ color: "white" }} className="modal-title fs-5" id="exampleModalLabel">Ready for your musical adventure?</h1>
                                    <button style={{ color: "white" }} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">X</button>
                                </div>
                            <div className="modal-body">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label for="inputEmail4" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="inputEmail4"></input>
                                    </div>
                                    <div className="col-md-6">
                                        <label for="inputPassword4" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="inputPassword4"></input>
                                    </div>
                                    <div className="col-12">
                                        <label for="inputUsername" className="form-label">Band or Venue Name</label>
                                        <input type="text" className="form-control" id="inputUsername" placeholder="The Three Musketeers"></input>
                                    </div>
                                    <div className="col-12">
                                        <label for="inputProfilePicture" className="form-label">URL of the profile picture</label>
                                        <input type="text" className="form-control" id="inputProfilePicture" placeholder="E.g. https://www.instagram.com/metallica/?hl=en"></input>
                                    </div>
                                    <div className="col-12">
                                        <label for="inputAddress2" className="form-label">Address</label>
                                        <MapSearchBar/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="profileType" className="form-label">Profile Type</label>
                                        <select id="profileType" className="form-select">
                                            <option value="band">Band</option>
                                            <option value="venue">Venue</option>
                                        </select>
                                    </div>
                                    <div className="col-12">
                                        <button  type="submit" className="button-78" data-bs-dismiss="modal" onClick={handleSubmit}>Create account</button>
                                    </div>
                                </div>
                            </div>
                                <div className="modal-footer"></div>
                            </div>
                        </div>
                    </div>
        </div>
        <div id="spotlight" style={{zIndex: 2}}></div>
           <div className="for-accounts container-fluid row justify-content-center">
          <div className="left-account col-md">
            <div className="card-left text-center">
              <img className="leftImage" src="https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="" />
              <div className="card-header">
                <h1>ARTISTS ACCOUNT</h1>
              </div>
              <br />
              <br />
              <div className="card-body">
                <h5 className="card-title">Connect with Venues Effortlessly</h5>
                <br />
                <p className="card-text">
                  Join GigLink to showcase your talent and get discovered!
                  Create a profile that highlights your music, gigs, and
                  experience. Connect with venues looking for budding artists
                  and book your next performance with ease.
                </p>
                <br />
              </div>
              <div className="card-footer text-body-secondary">
                "Where words fail, music speaks." – Hans Christian Andersen
              </div>
            </div>
          </div>
          <div className="middle-wrapper col-md d-flex flex-column justify-content-start">
            <h1 style={{ color: "white" }}>Ready to join GigLink?</h1>
            <br />
            <button
              type="button"
              className="button-78"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              style={{ color: "white" }}
            >
              start here
            </button>
          </div>
          <div className="right-account col-md">
            <div class="card-right text-center">
              <img className="rightImage" src="https://images.pexels.com/photos/27781607/pexels-photo-27781607/free-photo-of-the-interior-of-a-large-auditorium-with-a-large-orchestra.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="" />
              <div className="card-header">
                <h1>VENUES ACCOUNT</h1>
              </div>
              <br />
              <br />
              <div className="card-body">
                <h5 className="card-title">
                  Find Artists for Your Events
                </h5>
                <br />
                <p className="card-text">
                  Join GigLink to access a diverse pool of talented musicians!
                  Create a venue profile to showcase your space and connect with
                  artists eager to perform. Make booking seamless and elevate
                  your event lineup today!
                </p>
                <br />
              </div>
              <p style={{ color: "white" }} className="card-footer text-body-secondary">
                "Music can change the world because it can change people." –
                Bono
              </p>
            </div>
          </div>
           </div>
      </div>
      <br />
      <br />
      <div className="login-page-bottom d-flex pb-5 container text-center">
        <div className="row align-items-start">
          <div
            id="carouselExampleAutoplaying"
            className="carousel slide col"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://images.pexels.com/photos/164693/pexels-photo-164693.jpeg"
                  className="d-block w-100"
                  alt=""
                ></img>
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.pexels.com/photos/210887/pexels-photo-210887.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  className="d-block w-100"
                  alt=""
                ></img>
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.pexels.com/photos/1309240/pexels-photo-1309240.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  className="d-block w-100"
                  alt=""
                ></img>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <div className="bottom-text col">
            <h1 style={{ color: "white" }}>here are some of our friends</h1>
            <p style={{ color: "white" }}>
              You can see some fun pictures or click the explore button on top
              of the page to dive into our list of band and venues that are
              waiting for you and ready to connect with
            </p>
          </div>
        </div>
      </div>
      <div className="nav justify-content-center">
        <button
          type="button"
          className="btn btn-link"
          onClick={() => navigate("/faqspage")}
        >
          FAQS
        </button>
        
      </div>
     
    </div>
  );
}
export default LoginPage;