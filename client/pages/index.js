import React from 'react';
import { Page, Center }  from '../components/layout/Layout.js';
import HomeBody from '../components/layout/Homebody.js';
import DnaHomeSection from "../components/DnaHomeSection.js"

export default class IndexPage extends React.Component {
render() {
  return (
          <div>
            <Page>
              <Center>
                <DnaHomeSection />
              </Center>
            </Page>
          </div>
    );
  }
}