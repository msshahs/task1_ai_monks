
  import fetch from "node-fetch";
  import fs from 'fs'
  import FormData from "form-data"
  
  let files = fs.readdirSync('./images');

  
const read_api_call = async(folderimage) => {

  let temp = folderimage.split('.')
  const formData = new FormData();
  let image_url = './images/' + folderimage
  formData.append( 'file', fs.createReadStream(image_url));

    // console.log("***** OUTPUT of IMAGE - " + folderimage + " *****");

  
  let microsoftdata = await fetch(
    "https://testingmode.cognitiveservices.azure.com/vision/v3.2/read/analyze/",
    {
      method: "POST",
      headers: {
        
        "Ocp-Apim-Subscription-Key": "a41a9ca44d5b46dbb6ac264b20b05d9f",
      },
      body: formData
    }
  )
    .then((res) =>{

     let data = res.headers.get('apim-request-id')
     let ext =  temp[0];
    //  console.log("ext = " + ext);

      get_api_call(data,ext);
     
    } )
    .catch((err) => {
      console.log(err);
    });

   

};


const get_api_call =async(val,wot_ext)=>{
 
        // console.log("called------------------");
     
      let url = "https://testingmode.cognitiveservices.azure.com/vision/v3.2/read/analyzeResults/" + val
      // console.log(url);
     const final_data = await fetch(url,{
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": "a41a9ca44d5b46dbb6ac264b20b05d9f",
      }
    }).then(res => {
        return res.json();
    }).then(daa => daa).catch((err)=>{
      console.log(err);
    })

    // console.log(final_data);
    if(final_data.status == 'running'){
      // console.log("running------------");
      get_api_call(val,wot_ext);
    }
    else{
      // console.log("Completed-------------");
      let conce =  final_data.analyzeResult
      // console.log(conce);
      let concurrent = conce.readResults
  
      let final_string_data ="";
  
      for (const ele of concurrent) {
        let line_arr = ele.lines;
        let temp_string =""
        for (const e of line_arr) {
            let coord = e.boundingBox;
            let st = ""
            for (const e of coord) {
              st = st + " " +e 
            }
            // console.log(st);
            temp_string = temp_string + "\n" +"[" + st + "]" +"\n"+  e.text
        }
        final_string_data = final_string_data + temp_string + "\n"
      }
      // console.log(final_string_data);
      // console.log(wot_ext);
      // console.log( wot_ext + ".json");

      let pt = wot_ext + ".json"
      fs.writeFile(pt, final_string_data, function (err) {
            if (err) throw err;
            console.log('******* Saved! ' + pt + " successfully *******");
          });
    }
  

  
  

}

for (let i = 0; i < files.length; i++) {

    read_api_call(files[i]);
  
}

