const routes = require ('next-routes')();


//colon indicates wildcard
//first route .add takes precedent
routes

    .add('/assetpool', '/assetpool' )
    .add('/interestpool', '/inerestpool' )
    .add('/testpage', '/test' )
    .add('/fundingdnapage', '/fundingdnapage')
    .add('/expireddnapage', '/expireddnapage')
    .add('/prednapage', '/prednapage')
    .add('/salednapage', '/salednapage')
    .add('/saleexpdnapage', '/saleexpdnapage')
    .add('/solddnapage', '/solddnapage')
    .add('/preAbpage', '/AbPage')
    .add('/osdk', '/openseasdk')
    .add('/phliposophy', '/phliposophy')
          
module.exports = routes;

