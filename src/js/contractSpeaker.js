/*
 ██████╗ ██████╗ ███╗   ██╗████████╗██████╗  █████╗  ██████╗████████╗
██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔══██╗██╔════╝╚══██╔══╝
██║     ██║   ██║██╔██╗ ██║   ██║   ██████╔╝███████║██║        ██║   
██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██╗██╔══██║██║        ██║   
╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║██║  ██║╚██████╗   ██║   
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝   ╚═╝   
*/

const Web3 = require('web3');
var account;
var contract;

window.onload = function(){
    document.getElementById('wallet').textContent = "Connect Wallet";

    if(account){
        document.getElementById('wallet').textContent = account;
    }
}

const connectWallet = async () => {
    if(window.ethereum){
        await window.ethereum.send('eth_requestAccounts');
        window.web3 = new Web3(window.ethereum);

        var accounts = await web3.eth.getAccounts();
        account = accounts[0]
        document.getElementById('wallet').textContent = account;

        // TODO: Add ABI and Address
        // contract = new web3.eth.Contract(ABI,ADDRESS);
    }
};




const getCount = async () => {
    if(contract){
        tokenCount = await contract.methods.totalSupply().call();
        return tokenCount;
    }
}

            
document.getElementById("wallet").addEventListener("click", connectWallet, false);

function sendDataToSolidity(tokenURI){
  if(contract){
		try{
			contract.methods.mintForSelf(tokenURI).send({from: account, value: "60000000000000000"});
      showStatus("NFT minted!", 0);
			}
			catch(err){
				showStatus(err, 1);
			}
	
		
    }
	else showStatus("Could not connect to Solidity contract.", 1);
}




