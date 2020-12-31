import React, { useState } from "react";
import { useEffect } from "react";
import { TileLayer, MapContainer, Marker, Popup } from "react-leaflet";
import { JobRetrievingService } from "./Services/JobRetrievingService";
import { Container, Col, Row, Button } from "react-bootstrap";
import TokenManagement from "./utils/TokenManagement";

const MapComponent = (props) => {
  //defines the settings for the initial display of the map
  const [mapSettings] = useState({
    lat: 8.99,
    lng: -79.51,
    zoom: 1,
    height: "600px",
    width: "600px",
  });

  const [markers, setMarkers] = useState([]);
  const [jobs, setjobs] = useState([]);

  useEffect(() => {
    //call the job service to get list of jobs
    JobRetrievingService.getJobs().then((data) => {
      setjobs(data);
    });
    // const js = [
    //   {
    //     id: 1,
    //     title: "Atque.",
    //     description:
    //       "The Panther took pie-crust, and gravy, and meat, While the Owl had the best plan.' It sounded an excellent plan, no doubt, and very neatly and simply arranged; the only difficulty was, that she had.",
    //     latitude: "-11.121309",
    //     longitude: "106.71978",
    //     image: "https://lorempixel.com/640/480/?32173",
    //     date: "1970-09-14",
    //     status: "pending",
    //     assigned_to: "Jammie Legros",
    //     created_at: "2020-10-21T20:21:55.000000Z",
    //     updated_at: "2020-10-21T20:21:55.000000Z",
    //   },
    //   {
    //     id: 2,
    //     title: "Quidem.",
    //     description:
    //       "However, she got to the Queen, turning purple. 'I won't!' said Alice. 'Off with her head! Off--' 'Nonsense!' said Alice, very loudly and decidedly, and there was a very respectful tone, but frowning.",
    //     latitude: "9.699661",
    //     longitude: "-140.143868",
    //     image: "https://lorempixel.com/640/480/?61279",
    //     date: "2008-11-07",
    //     status: "complete",
    //     assigned_to: "Florence Mante",
    //     created_at: "2020-10-21T20:21:55.000000Z",
    //     updated_at: "2020-10-21T20:21:55.000000Z",
    //   },
    // ];
    //setjobs(js);
  }, []);

  const addJobMarker = (jobId) => {
    let selectedJ = jobs.filter((j) => j.id === jobId);
    let newList = markers.concat(selectedJ);
    setMarkers(newList);
  };

  //create a two column display, one for a table and the other for the map
  return (
    <Container style={{ "margin-top": "10px" }}>
      {" "}
      <h1>
        Welcome{" "}
        {props.location.state !== undefined
          ? props.location.state.userInfo
          : TokenManagement.getUserName()}
      </h1>
      <Row>
        <Col md="6">
          <table border="1">
            <thead>
              <tr>
                <td>Title</td>
                <td>Date</td>
                <td>Status</td>
                <td>Assigned to</td>
                <td>View on map</td>
              </tr>
            </thead>
            <tbody>
              {jobs.length !== 0 ? (
                jobs.map((job) => {
                  return (
                    <tr key={job.id}>
                      <td>{job.title}</td>
                      <td>{job.date}</td>
                      <td>{job.status}</td>
                      <td>{job.assigned_to}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          onClick={(e) => addJobMarker(job.id)}
                        >
                          See Marker
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr></tr>
              )}
            </tbody>
          </table>
        </Col>
        <Col md="6">
          <MapContainer
            id="mapId"
            center={[mapSettings.lat, mapSettings.lng]}
            zoom={mapSettings.zoom}
            style={{ height: mapSettings.height, width: mapSettings.width }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            ></TileLayer>{" "}
            {/*Add markers added to the markers state variable  */}
            {markers.length !== 0 ? (
              markers.map((marker) => {
                let pos = [marker.latitude, marker.longitude];
                return (
                  <Marker position={pos} key={marker.id}>
                    <Popup>
                      <p>
                        <b>{marker.title}</b>
                      </p>
                      <span>{marker.description}</span>
                    </Popup>
                  </Marker>
                );
              })
            ) : (
              <></>
            )}
          </MapContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default MapComponent;
