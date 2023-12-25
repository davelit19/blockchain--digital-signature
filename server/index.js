
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04bddfc23bcb7912a33d4c42582ff68c93834b9cb31284691be0ecdd25645b2fea01e731bd3b0997a9d029c42373632b26c050e953f94ddad1a5efbe52bade6e35": 100,
  "048d21c5e2c3cd6a1bf1a1a74897088504cad750843e9b56c9ca82e27d7bab8671a14619ddabdaa5766af90f8252915be919dc581f6ada3afc3d2137f2d3d0c12b": 50,
  "0405845fd3abfa611b763ed1e2d1b4e0f1c68bd3e42b186275f2a79d7468b5c4fd03e335eefcbcc3bdd1b9a71ab57bef20781e64cf6e8c542c8dd46b306948e675": 75,
};

//1: c82b3ec88b31dda55f77df919e641b67c13b7f2910894445183af0b82d09d2eb
//2: 77a819c12522ba39a8bc3b412266b6f5f2287abe619f4bd914e1e1025c7784fe
//3: 17ddb6b597121d6126956d0c7b22faf047f6077c56021272e61dc8640d273c81

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {

  const { sender, recipient, amount, isSigned } = req.body;

  if(isSigned) {
  setInitialBalance(sender);
  setInitialBalance(recipient);
 
  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  } 
 } 
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

