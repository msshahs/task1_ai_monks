//just extra file for experiments

import sizeOf from 'image-size'

let size_data = sizeOf('./images/final.png')

let obj = {
    dataset_id: 2226,
    organisation_id: "5e3d5300df42650010ffbb3c",
    category_type: "OCR",
    images: [

    ]
}

let obj_to_push ={
    image_name: "nameofimage",
    image_tags: [],
    image_url: "",
    height: size_data.height,
    width: size_data.width,
    rotation_angle: 0,
    annotations: []
}

let annotations_push = {
                    id: "",
                    category_name: "",
                    area: 0,
                    creator: "NeuralMarker",
                    annotation_tags: [],
                    polygon: [
                        [
                           
                        ]
                    ],
                    
}

obj_to_push.annotations.push(annotations_push);
obj.images.push(obj_to_push);
console.log(obj_to_push.annotations);
console.log(JSON.stringify(obj))


