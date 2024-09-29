[
    {
      name: "Grand Hall",
      address: "123 Main St, Cityville",
      description: "A spacious venue perfect for conferences and products.",
      height: 15,
      weight: 25,
      width: 30,
      days: 3,
      type: "Conference",
      category: "Indoor",
      images: [
        {
          imageUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA",
          like: 10,
          dislike: 2,
          love: 5,
        },
        {
          imageUrl: "data:image/png;base64,aGBBQ0LBQUFBQUFBQUFBQUFBQUFBQUFB",
          like: 8,
          dislike: 1,
          love: 3,
        },
      ],
      products: [
        {
          productName: "Tech Conference 2024",
          eventDescription: "An annual conference for tech enthusiasts.",
          eventDate: "2024-12-10",
          eventImages: [
            {
              imageUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB",
              like: 4,
              dislike: 0,
              love: 2,
              eventimage
            },
            {
              imageUrl: "data:image/png;base64,aGBBQ0LBQUFBQUFBQUFBQUFBQUFBQU",
              like: 7,
              dislike: 1,
              love: 5,
              eventimage
            },
            eventid
          ],
        },
        {
          productName: "Corporate Meetup 2024",
          eventDescription: "A corporate event for networking and collaboration.",
          eventDate: "2024-11-15",
          eventImages: [
            {
              imageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD",
              like: 3,
              dislike: 1,
              love: 2,
            },
          ],
        },
      ],
    },
    {
      name: "Grand Hall",
      address: "123 Main St, Cityville",
      description: "A spacious venue perfect for conferences and products.",
      height: 15,
      weight: 25,
      width: 30,
      days: 3,
      type: "Conference",
      category: "Indoor",
      images: [
        {
          imageUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA",
          like: 10,
          dislike: 2,
          love: 5,
        },
        {
          imageUrl: "data:image/png;base64,aGBBQ0LBQUFBQUFBQUFBQUFBQUFBQUFB",
          like: 8,
          dislike: 1,
          love: 3,
        },
      ],
      products: [
        {
          productName: "Tech Conference 2024",
          eventDescription: "An annual conference for tech enthusiasts.",
          eventDate: "2024-12-10",
          productImages: [
            {
              imageUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB",
              like: 4,
              dislike: 0,
              love: 2,
            },
            {
              imageUrl: "data:image/png;base64,aGBBQ0LBQUFBQUFBQUFBQUFBQUFBQU",
              like: 7,
              dislike: 1,
              love: 5,
            },
          ],
        },
        {
          productName: "Corporate Meetup 2024",
          eventDescription: "A corporate event for networking and collaboration.",
          eventDate: "2024-11-15",
          productImages: [
            {
              imageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD",
              like: 3,
              dislike: 1,
              love: 2,
            },
          ],
        },
      ],
    },
  ];
  
  
 <h1> I need to access id of imageurl in the product images for every event and updates the count for the particular on user action</h1>


  const logImageUrls = (venues) => {
    venues.forEach((venue) => {
      console.log(`Venue: ${venue.name}, Address: ${venue.address}`);
  
      console.log("Venue Images:");
      venue.images.forEach((image) => {
        console.log(`Image URL: ${image.imageUrl}`);
      });
  
      venue.products.forEach((product) => {
        console.log(`Product: ${product.productName}`);
        console.log("Product Images:");
        product.productImages.forEach((image) => {
          console.log(`Image URL: ${image.imageUrl}`);
        });
      });
    });
  };
  
  const updateImageCount = (venues, imageUrl, action) => {
    venues.forEach((venue) => {
      venue.images.forEach((image) => {
        if (image.imageUrl === imageUrl) {
          if (action === 'like') image.like += 1;
          if (action === 'dislike') image.dislike += 1;
          if (action === 'love') image.love += 1;
          console.log(`Updated ${action} count for image: ${imageUrl}`);
        }
      });
  
      venue.products.forEach((product) => {
        product.productImages.forEach((image) => {
          if (image.imageUrl === imageUrl) {
            if (action === 'like') image.like += 1;
            if (action === 'dislike') image.dislike += 1;
            if (action === 'love') image.love += 1;
            console.log(`Updated ${action} count for product image: ${imageUrl}`);
          }
        });
      });
    });
  };
  
  logImageUrls(venues)