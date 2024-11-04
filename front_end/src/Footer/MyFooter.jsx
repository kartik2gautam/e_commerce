import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './MyFooter.css';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";

export function MyFooter() {
  return (
    <MDBFooter className="text-center" color="white" bgColor="dark">
      <MDBContainer className="p-4 container-footer">
        <section className="mb-4">
          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="facebook-f" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="twitter" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="google" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="instagram" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="linkedin-in" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="github" />
          </MDBBtn>
        </section>

        

        <section className="mb-4"></section>

        <section className="">
          <MDBRow className="d-flex justify-content-between">
            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="text-white fw-lighter ">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white fw-lighter">
                    Account
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white fw-lighter">
                    Investor Relations
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white fw-lighter">
                    Ways to watch
                  </a>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="text-white fw-lighter">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white fw-lighter">
                    Corporate Information
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white fw-lighter">
                    Speed Test
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white fw-lighter">
                    Only on Gaming House
                  </a>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="text-white fw-lighter">
                    Help Centre
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white fw-lighter">
                    Media Centre
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white fw-lighter">
                    Jobs
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white fw-lighter">
                    Terms of Use
                  </a>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="text-white fw-lighter">
                    Cookie Preferences
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white fw-lighter">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white fw-lighter">
                    Legal Notices
                  </a>
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>

      <div
        className="text-center p-3 fw-lighter"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2023 Copyright:
        <a className="text-white fw-lighter" href="#">
          Mysite.com
        </a>
      </div>
    </MDBFooter>
  );
}
