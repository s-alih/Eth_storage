const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  //http://127.0.0.1:7545
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:7545"
  );
  const wallet = new ethers.Wallet(
    "6d786aff3f8b77ba050ea046f29ca94f2b394e1d60412fa2e64247b7db233a5c",
    provider
  );

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
