import ConnectionBanner from '@rimble/connection-banner';
import NetworkIndicator from '@rimble/network-indicator';



export const CurrentNetwork = ({ethNetwork}) => (

  <NetworkIndicator currentNetwork={ethNetwork} requiredNetwork={1337}>
    {{
      onNetworkMessage: "Connected to correct network",
      noNetworkMessage: "Not connected to anything",
      onWrongNetworkMessage: "Wrong network"
    }}
  </NetworkIndicator>
)


export const DefaultConntectionBanner = ({ethNetwork}) => (

    <ConnectionBanner
      currentNetwork={ethNetwork}
      requiredNetwork={1337}  
      onWeb3Fallback={false}
    /> 
)

export const  FullConntectionBanner = ({ethNetwork}) => (
              
        <ConnectionBanner currentNetwork={ethNetwork} requiredNetwork={1337} onWeb3Fallback={false}>
          {{
            notWeb3CapableBrowserMessage: (
              <div>
                <p>Not a web3 capable browser</p>
              </div>
            ),
            noNetworkAvailableMessage: (
              <div>
                <p>No Ethereum network available</p>
              </div>
            ),
            onWrongNetworkMessage: (
              <div>
                <p>On wrong Ethereum network</p>
              </div>
            )
          }}
        </ConnectionBanner>
)    