import { ethers } from "ethers"
import * as fs from "fs-extra"
import "dotenv/config"

async function main() {
    //http://127.0.0.1:7545
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider)
    // const encryptedJson = fs.readFileSync("./.encryptedKey.json");
    // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    //   encryptedJson,
    //   process.env.PASSWORD
    // );
    // wallet = await wallet.connect(provider);

    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")
    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf8"
    )
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("Deploying, please wait...")
    const contract = await contractFactory.deploy()
    await contract.deployTransaction.wait(1)
    console.log("contract address", contract.address)
    const currentFavourateNumber = await contract.retrive()
    console.log(
        "current favourite number is: ",
        currentFavourateNumber.toString()
    )
    const transactionResponse = await contract.store("9")
    const transactionReciept = await transactionResponse.wait(1)
    const updatedFavourateNumber = await contract.retrive()
    console.log(updatedFavourateNumber.toString())
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
