

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

		let imageGallery = document.querySelector("#image-gallery");
		let imageContainer  = document.createElement("div");
		let figure = document.createElement("figure");
		let caption = document.createElement("figcaption");
		let image = document.createElement("img");
		let link = document.createElement('a');
		

		link.href= imageobj['url'];
		link.textContent = "View Original image";
		
		
		image.src = imageobj['url'];
		image.alt = imageobj['title'];
		imageContainer.className = "image-container";
		
		figure.width="100%";
		


		imageContainer.appendChild(figure)
			      .appendChild(image);

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
			
			let data = await response.json();
			
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

	const response = await fetch(url);
	
         if(response.ok){
		
		let image =  await response.json();
		let apod_container = document.querySelector(".apod-image");
		
		if(image['media_type'] == "video"){
			
			let frame = document.createElement("iframe");
			frame.src = image['url'];
			frame.width="100%";
			frame.height = "100%";
			
			apod_container.appendChild(frame);
			return;
		}
		
	
		let apod_expl = document.querySelector(".article-content");
		let apod_img = document.createElement("img");
		
		apod_expl.textContent = image['explanation'];
		apod_img.src = image['url'];
		apod_container.appendChild(apod_img);
		
				

	}
	console.log("Error geting APOD");

	
}


picOfDay(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
getImages(IMAGE_URL);

