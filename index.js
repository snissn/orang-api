

const express = require('express');
const app = express();
const chain = require("./chain")

const traits = require("./traits")
const description = "10,000 Cultured Orangutan is on a mission to achieve great things"



app.get('/favicon.ico',  async (req, res) =>  {
  res.json({});
})

app.get('/:address/:tokenid',  async (req, res) =>  {
    const tokenID = req.params.tokenid;
    const address = req.params.address;
  const seed = await chain.getSeed(address,tokenID);
  const traits_array = []
  const traits_dict = traits.build_traits(seed);
  for(var key in traits_dict){
    const value = traits_dict[key]
    if(key.split("Eyebrow").length > 1 ||key.split("_").length > 1 ||  value.split("#").length > 1){
      continue;
    }
    traits_array.push({"trait_type":key,"value":value})
  }

  

  const data = {
    "name": "Cultured Orangutan #"+tokenID,
    "description": description,
    "traits":traits_array,
    "tokenID":tokenID,
    "seed":seed,
    "image": 'http://34.69.105.225/image.php?tokenID='+tokenID+'&seed='+seed + '&address=' + address,
    'convert':traits.build_image(traits_dict, tokenID)
  }
  res.json(data);
});

const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});

