import React from 'react';
import OpenSeaApi from "./api/OpenSeaApi.js"
import { Link } from '../../routes';
import ButtonGroup from './buttons/ButtonGroup.js';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  CardTitle,
  Row,
  Col,
  Table,
  Header,
  HeaderCell,
  Container
} from "shards-react";

export default class AssetDash extends React.Component {

render() {
    return (    
      <Container fluid>  
          <Row className="justify-content-center">
            <div className="mb-4 col-sm-12 col-md-12 col-xl">
            <Card className="mb-4">
              <CardHeader className="border-bottom bg-white">
                <CardTitle className="m-0">Asset Proposals</CardTitle>
              </CardHeader>
                <CardBody className="p-0">
                <table className="table table-striped table-responsive-sm table-light mb-0">
                  <thead>
                    <tr className="">
                      <th scope="col">Asset</th>
                      <th scope="col">Price</th>
                      <th scope="col">Resale Price</th>
                      <th scope="col">Start</th>
                      <th scope="col">End</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>4 ETH</td>
                      <td></td>
                      <td></td>
                      <td>td>@twitter</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                      <td>td>@twitter</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry the Bird</td>
                      <td>@twitter</td>
                      <td>@twitter</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </table>
              </CardBody>
              <CardFooter className="border-top p-0">
                <Row>
                  <Col className="text-center view-report">
                    <Button className="btn-md btn-block" theme="" type="submit">
                      View All
                    </Button>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
            <style jsx>{`
            `}  </style>
          </div>
        </Row>
        </Container>
       
    );
}
}

