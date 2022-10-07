import { useState, useEffect, createRef } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import QRCode from 'qrcode.react'
import Pdf from 'react-to-pdf'
import { toast } from 'react-toastify'

const QR = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [word, setWord] = useState("");
  const [sid, setSid] = useState("");

  const ref = createRef();

  const handleClick = async () => {
    if (sid === "")
      toast.error('Enter a Station ID', {
        theme: "dark"
      });
    else {
      const id = toast.loading("Generating QR Code...", {
        theme: "dark",
        closeOnClick: true,
        closeButton: null
      })
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/station/get/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "station_id": sid,
        }),
      });
      const result = await res.json();
      console.log(result);
      if (res.status === 200) {
        toast.update(id, {
          isLoading: false,
          render: "Generated",
          type: "success",
          autoClose: 2000,
        });
        setWord(sid)
      } else {
        toast.update(id, {
          render: result.message,
          type: "warning",
          isLoading: false,
          autoClose: 3000
        });
        // toast.warning(result.message, { theme: "dark" });
        setSid("");
      }
    }
  }

  return (
    <>
      <div className="flex h-screen overflow-hidden">

        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <Container className='pt-3'>
            <Row>
              {/* QR Code */}
              <Col ref={ref} className=''>
                <QRCode
                  id="qrcode"
                  value={`${import.meta.env.VITE_FEEDBACK_URL}/${word}`}
                  size={300}
                  level={"H"}
                  includeMargin={true}
                  className='mx-auto'
                  renderAs='svg'
                />
                <br />
                <h3 className='text-center'>Instructions</h3>
                <h5 className='text-center'>Station ID: {word ? word : 'Enter an ID'}</h5>
                <ul style={{ listStyleType: 'disc' }}>
                  <li>Scan the above QR Code using Google Lens or any other QR Code Scanner.</li>
                  <li>Confirm the station &amp; Complete the authentication to fill the form.</li>
                  <li>Fill the Feedback Form.</li>
                  <li>
                    In case you can't scan the QR Code visit the following link <span className='text-decoration-underline'>{`${import.meta.env.VITE_FEEDBACK_URL}/${word ? word : ''}`}</span> .
                  </li>
                </ul>
              </Col>

              {/* Instructions */}
              <Col xs={12} md={5} className='text-center pt-5'>
                <Form.Group className='mb-3'>
                  <Form.Label><h3>Station ID</h3></Form.Label>
                  <Form.Control
                    type="text"
                    value={sid}
                    onChange={(e) => setSid(e.target.value)}
                    className='mx-auto w-75'
                  />
                </Form.Group>

                <Button onClick={handleClick} size="sm" className='mx-3 px-3'>
                  Generate
                </Button>

                {/* <Button size="sm" className='mx-3 px-3' onClick={downloadQR}>
                  Download
                </Button> */}
                <Pdf targetRef={ref} filename="QRCode.pdf">
                  {({ toPdf }) => <Button size="sm" className='mx-3 px-3' onClick={toPdf} disabled={word ? false : true}>Download</Button>}
                </Pdf>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default QR;