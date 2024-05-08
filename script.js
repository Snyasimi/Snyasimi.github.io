

//GET IMAGES FROM NASA API
//FOR EACH IMAGE CREATE THE IMAGE CARD
//ADD THE CARD TO GALLERY
//MAX OF 50 IMAGES
//

const API_KEY = "EjUoC9JtUKrteFF8ZUBjbcUUMXfwcgii9SOuIr8r";

const IMAGE_URL =`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=20`;
//Take in the imageobj as argument

function createCard(imageobj){
	
	try{

		const imageGallery = document.querySelector("#image-gallery");
		const imageContainer  = document.createElement("div");
		const figure = document.createElement("figure");
		const caption = document.createElement("figcaption");
		
		/*
 		* const link = document.createElement('a');
 		*link.href= imageobj['url'];
		link.textContent = "View Original image";
		*/

		switch(imageobj["media_type"]){
		
			case "video":
				
				const frame = document.createElement("iframe");
				frame.src = image['url'];
				frame.width="100%";
				frame.height = "100%";

				imageContainer.appendChild(figure)
				 	      .appendChild(frame);
				break;
			
			default:	
				
				const image = document.createElement("img");
				image.src = imageobj['url'];
				image.alt = imageobj['title'];
				imageContainer.className = "image-container";
				figure.width="100%";

				imageContainer.appendChild(figure)
			      	      	      .appendChild(image);
				break;

		}

		//imageContainer.appendChild(link);

		caption.innerHTML = `<p>TITLE: ${imageobj['title']},</p>
				     <p> DATE: ${imageobj['date']},\ </p>
				     <p>COPYRIGHT: ${imageobj['copyright']}.</p>`;

		figure.appendChild(caption);


		//AFTER SETTING All ATTRIBUTES
		imageGallery.appendChild(imageContainer);
	
	
	}

	catch(error){
		console.log(`Error creating image card\n${error}`);
		return false;

	}



	
	
	
}






async function getImages(url){
	//Get images from api and store them.
	
	try{

		const response = await fetch(url);
		
		if(response.ok){
			
			const data = await response.json();
			
			for(image of data){

				createCard(image);
				console.log(`${image['title']} appended`);
			}
		}

	}
	catch(error){
		console.log(`Error creating image card\n${error}`);


	}

}


async function picOfDay(url){

	try{


		const response = await fetch(url);
	
         	if(response.ok){
		
			const image =  await response.json();
			const apod_container = document.querySelector(".apod-image");
			const apod_expl = document.querySelector(".article-content");
		
			if(image['media_type'] == "video"){
			
				const frame = document.createElement("iframe");
				frame.src = image['url'];
				frame.width="100%";
				frame.height = "100%";
				apod_expl.textContent = image['explanation'];
			
				apod_container.appendChild(frame);
				return true;
			}
		
	
			const apod_img = document.createElement("img");
		
			apod_expl.textContent = image['explanation'];
			apod_img.src = image['url'];
			apod_container.appendChild(apod_img);
			return true;
		
				

		}

		console.log("Error geting APOD response");
		return false;


		}	

	catch(error){
		
		console.log(`Error ${error} `);
	}
}


picOfDay(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
getImages(IMAGE_URL);

