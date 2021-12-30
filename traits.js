
var r;

const traits = require("./traits.json");

const sex_traits = {"Male":70, "Female":30}

const hat_hair = {
  "No Hair":10,
  "Long Hair.png":20
}



function build_traits(seed){
  if(seed != "random"){
    r = new RND(parseInt(seed.slice(0, 16), 16))
  }
  
  const orang = {}

  orang["Sex"] = get_probabilities(sex_traits)
  const sex = orang['Sex']
  for(trait in traits[orang['Sex']]){
    const values = traits[sex][trait]
    const trait_value = get_probabilities(values)
    orang[trait] = trait_value
  }

  if(orang['Body'] == "Cyborg-Grey.png" || orang['Body'] == "Cyborg-Purple.png"){
    orang['Type'] = "Cyborg"
  }

  if(orang['Head accessories'] ==  'Cap.png' || 
  orang['Head accessories'] ==  'Hat.png' || 
  orang['Head accessories'] == "Straw Hat.png" ){
    orang['Hair'] = get_probabilities(hat_hair)
  }


  if(orang['Clothes'] == "Hoodie.png"){
    orang['Hair'] = "None";
  }
    if( orang['Hair'] != 'Long Hair.png'){
    orang['Hat'] = 'None'
    }

  return orang
}


function sum_probabilities(weights){
  var sum = 0;
  for(var i in weights){
    sum+=weights[i]
  }
  return sum
}

function get_probabilities(probabilities){
  const total = sum_probabilities(probabilities)
  const randnum = random();
  let probability_index = 0
  for(var key in probabilities){
    probability_index += probabilities[key] / total
    if(randnum < probability_index){
      return key;
    }
  }
}
function random(){
  if(r === undefined){
    return Math.random()
  }
  return r.rb(0, 1);
}

function draw_trait(out,trait){

}

function build_image(orang, tokenID){
  var out = 'convert '
  var sexvalue;
  for(var sex in orang){
    sexvalue = orang[sex]
    break;
  }
  delete orang["Sex"]
  if(sexvalue == "Female"){
    var traits_order_hannya = [
      "Background",
      "Body",
      "Clothes",
      "Type",
      "Eyes",
      "Neck",
      "Eyewear",
      "Mask",
      "Hair",
      "Hat",
    ]
    var traits_order = [
      "Background",
      "Body",
      "Clothes",
      "Type",
      "Eyes",
      "Neck",
      "Eyewear",
      "Hair",
      "Mask",
      "Hat",
    ]
      if(orang['Mask'] == "Hannya.png"){
        var traits_order = traits_order_hannya;
      }
  for(var index in traits_order){
    var k = traits_order[index]
    const v = orang[k]
    //skip eyes if mask is not None or Hannya.png
    if(k == 'Eyes' && sexvalue == "Female"){
      if( orang['Mask'] == 'None'  || orang['Mask'] == "Hannya.png"){
      }else{
        continue;
      }
    }
    if(( k == 'Hair' || k == 'Mask') && orang['Mask'] == 'Plague Doctor.png'){
      continue
    }
    if(v.split(".png").length > 1){
      out+=`   "${sexvalue}/${k}/${v}"  `
    }
  }
  if(orang['Mask'] == 'Plague Doctor.png'){
    out += `   "${sexvalue}/Hair/${orang['Hair']}"  `
    out += `   "${sexvalue}/Mask/${orang['Mask']}"  `
  }
  const eyes = orang['Eyes']


      if( orang['Mask'] == 'Cat.png'  || orang['Mask'] == "Kyubi.png"  || orang['Mask'] == "Plague Doctor.png"){
      }else{
        out+=`   "${sexvalue}/Eyes/${eyes}"  `
      }
  }else{ // Male
    var traits_order = [
      "Background"
      ,"Hair"
      ,"Body"
      ,"Clothes"
      ,"Neck"
      ,"Head accessories"
      ,"Type"
      ,"Eyes"
      ,"Eye"
      ,"Beard"
    ]
    var traits_order_hoodie = [
      "Background"
      ,"Hair"
      ,"Body"
      ,"Eyes"
      ,"Clothes"
      ,"Neck"
      ,"Head accessories"
      ,"Type"
      ,"Eye"
      ,"Beard"
    ]
    if(orang['Clothes'] == "Hoodie.png"){
      traits_order = traits_order_hoodie;
    }




    for(var i in traits_order){

      const k = traits_order[i]
      const v = orang[traits_order[i]]
      if(v.split(".png").length > 1){
        out+=`   "${sexvalue}/${k}/${v}"  `
      }
    }

  }



  out+= ' -background black -gravity center -flatten '+tokenID+'.jpeg'

  return out
}

class RND {
     constructor(seed) {
          this.seed = seed
     }
     rd() {
          this.seed ^= this.seed << 13
          this.seed ^= this.seed >> 17
          this.seed ^= this.seed << 5
          return ((this.seed < 0 ? ~this.seed + 1 : this.seed) % 1000) / 1000
     }
     rb(a, b) {
          return a + (b - a) * this.rd()
     }
}

module.exports = { build_traits};

module.exports = { build_traits, build_image};
