import React from 'react';
import Head from 'next/head';

export default class HeadOne extends React.Component {

render() {
    return (     
            <Head>
              <meta charSet="utf-8"></meta>
              <meta httpEquiv="x-ua-compatible" content="ie=edge"></meta>
              <title>DNP - Decentralized NFT Protocols </title>
              <meta name="description" content="A demo landing page for agencies or product oriented businesses built using Shards, a free, modern and lightweight UI toolkit based on Bootstrap 4."></meta>
              <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
              <script src="https://kit.fontawesome.com/bd21ab8235.js" crossorigin="anonymous"></script>
              {/* <link rel="manifest" href="%PUBLIC_URL%/manifest.json" /> */}
              <title>DNP</title>
            </Head>
    );
}
}

