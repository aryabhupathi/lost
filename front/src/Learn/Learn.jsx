// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardMedia,
//   Box,
//   Modal,
//   Button,
// } from "@mui/material";
// import style1 from "../Sstyle/Modal1";
// import EventLike from "../Components/EventLike";
// const Learn = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [events, setEvents] = useState([]);
//   const [eventIds, setEventIds] = useState([]);
//   const [currentImage, setCurrentImage] = useState("");
//   const [mainImageModal, setMainImageModal] = useState({
//     open: false,
//     imageUrl: "",
//     likes: 0,
//     dislikes: 0,
//     loves: 0,
//     imageId: "",
//   });
//   const [showAllImages, setShowAllImages] = useState(false);
//   const navigate = useNavigate();
//   const handleImageModal = (image, eventId) => {
//     setMainImageModal({
//       imageId: image._id,
//       open: true,
//       imageUrl: image.imageUrl,
//       likes: image.like,
//       dislikes: image.dislike,
//       loves: image.love,
//       eventId: eventId,  // Store the event ID
//     });
//   };
  

//   const handleCloseMainImageModal = () => {
//     setMainImageModal({
//       open: false,
//       imageUrl: "",
//       likes: 0,
//       dislikes: 0,
//       loves: 0,
//     });
//   };

//   // Fetch product and event details
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/venue/${id}`);
//         const data = await response.json();
//         setProduct(data);

//         // Set current image if images exist
//         if (data.images && data.images.length > 0) {
//           setCurrentImage(data.images[0].imageUrl);
//         }

//         if (data.eventIds && data.eventIds.length > 0) {
//           setEventIds(data.eventIds);
//           console.log("Event IDs set:", data.eventIds); // Log event IDs
//         }
//       } catch (error) {
//         console.error("Error fetching venue or events:", error);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   useEffect(() => {
//     const fetchEvent = async () => {
//       if (eventIds.length === 0) return; // Exit if no event IDs

//       try {
//         const response = await fetch(
//           `http://localhost:5000/api/venue/event/${eventIds.join(",")}`
//         );
//         const data = await response.json();

//         // Wrap the data in an array if it's a single object
//         const eventsToSet = Array.isArray(data) ? data : [data];

//         setEvents(eventsToSet); // Set events
//         console.log("Events set successfully:", eventsToSet); // Log the successfully set events
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       }
//     };

//     fetchEvent();
//   }, [eventIds]);

//   if (!product) {
//     return <Typography>Loading...</Typography>;
//   }
//   return (
//     <Grid sx={{backgroundImage: `url(/download11.jpeg)` }}>
//       <Box sx= {{paddingTop:'30px',paddingLeft:'30px'}}>
//         <Typography variant="h5" align="center" gutterBottom>
//           {product.name}
//         </Typography>
//         <Typography variant="h6" align="center" gutterBottom>
//           {product.address}
//         </Typography>
//       </Box>

//       <Grid container spacing={4}>
//         <Grid item xs={12} sm={6} sx = {{paddingLeft:'20px'}}>
//           <Card elevation={2} sx={{ height: "300px", backgroundImage: `url(/download11.jpeg)` }}>
//             {currentImage ? (
//               <CardMedia
//                 component="img"
//                 image={currentImage}
//                 alt="Product Image"
//                 sx={{
//                   height: "100%",
//                   width: "100%",
//                   cursor: "pointer",
//                   objectFit: "contain",
//                 }}
//               />
//             ) : (
//               <Typography variant="h6" align="center" sx={{ padding: 4 }}>
//                 No images available
//               </Typography>
//             )}
//           </Card>

//           {/* Display product image thumbnails if images exist */}
//           {product.images && product.images.length > 0 ? (
//             <Box
//               sx={{
//                 display: "flex",
//                 flexWrap: "wrap",
//                 gap: 1,
//                 borderRadius: "2px",
//                 marginTop: 1,
//                 border: "2px dotted gold",
//                 overflowX: "scroll",
//               }}
//             >
//               {product.images.map((image, index) => (
//                 <Card
//                   key={index}
//                   sx={{ width: "80px", height: "80px", cursor: "pointer",backgroundImage: `url(/download11.jpeg)` }}
//                   onClick={() => setCurrentImage(image.imageUrl)}
//                 >
//                   <CardMedia
//                     component="img"
//                     image={image.imageUrl}
//                     alt={`Thumbnail ${index + 1}`}
//                     sx={{
//                       height: "100%",
//                       width: "100%",
//                       objectFit: "cover",
//                     }}
//                   />
//                 </Card>
//               ))}
//             </Box>
//           ) : (
//             <Typography variant="body1" sx={{ mt: 2 }}>
//               No thumbnails available
//             </Typography>
//           )}
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <Typography variant="body1">{product.description}</Typography>
//           <Typography variant="h5" gutterBottom>
//             Key Features:
//           </Typography>
//           <ul>
//             <li>
//               <Typography variant="body1">
//                 Height: {product.height ? `${product.height} ft` : "N/A"}
//               </Typography>
//             </li>
//             <li>
//               <Typography variant="body1">
//                 Weight: {product.weight ? `${product.weight} kg` : "N/A"}
//               </Typography>
//             </li>
//             <li>
//               <Typography variant="body1">
//                 Width: {product.width ? `${product.width} ft` : "N/A"}
//               </Typography>
//             </li>
//           </ul>

//           <Typography variant="body1">{product.days} days</Typography>
//           <Typography variant="body1">{product.category}</Typography>
//           <Typography variant="body1">{product.type}</Typography>
//         </Grid>
//       </Grid>
//       <hr />

//       <Box sx={{ marginTop: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           Events
//         </Typography>


// {events.length > 0 ? (
//   events.map((event, index) => (
//     <Box key={event._id} sx={{ marginBottom: 4 }}>
//       <Button onClick={() => navigate(`/event/${event._id}`)}>
//         Event
//       </Button>
//       <Typography variant="h5" gutterBottom>
//         {event.name}
//       </Typography>
//       <Typography variant="body1">{event.description}</Typography>
//       <Typography variant="body2" color="textSecondary">
//         Event Date: {new Date(event.date).toLocaleDateString()}{" "}
//         {/* Format the date */}
//       </Typography>

//       <Grid container spacing={4}>
//         {event.images && event.images.length > 0 ? (
//           event.images
//             .slice(0, showAllImages ? event.images.length : 5)
//             .map((image, imgIndex) => (
//               <Grid item xs={12} sm={4} mt={3} key={imgIndex}>
//                 <Card sx={{ height: "250px" }}>
//                   <CardMedia
//                     component="img"
//                     image={image.imageUrl}
//                     alt={`Event Image ${imgIndex + 1}`}
//                     sx={{
//                       height: "100%",
//                       width: "100%",
//                       cursor: "pointer",
//                       objectFit: "contain",
//                     }}
//                     onClick={() => handleImageModal(image, event._id)} // Pass event ID here
//                   />
//                 </Card>
//               </Grid>
//             ))
//         ) : (
//           <Typography variant="body1" sx={{ mt: 2 }}>
//             No images available for this event.
//           </Typography>
//         )}
//         {event.images && event.images.length > 5 && (
//           <Button
//             color="primary"
//             onClick={() => setShowAllImages(!showAllImages)}
//           >
//             {showAllImages ? "View Less" : "View More"}
//           </Button>
//         )}
//       </Grid>
//     </Box>
//   ))
// ) : (
//   <Typography variant="body1">No events available</Typography>
// )}

// {/* Modal to display the main image and EventLike component */}
// <Modal
//   open={mainImageModal.open}
//   onClose={handleCloseMainImageModal}
//   sx={{
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   }}
// >
//   <Box sx={style1}>
//     <Box
//       sx={{
//         position: "relative",
//         display: "flex",
//         justifyContent: "center",
//       }}
//     >
//       {mainImageModal.imageUrl ? (
//         <Card>
//           <CardMedia
//             component="img"
//             alt="Event Image"
//             image={mainImageModal.imageUrl}
//             sx={{ height: "300px", width: "500px", objectFit: "contain" }}
//           />
//           {/* Update this button to use the stored eventId */}
//           <Button onClick={() => navigate(`/event/${mainImageModal.eventId}`)}>
//             See More
//           </Button>
//         </Card>
//       ) : (
//         <p>No image available</p>
//       )}
//     </Box>

//     <EventLike
//       venueId={product._id}
//       imageId={mainImageModal.imageId}
//       initialLikes={mainImageModal.likes}
//       initialDislikes={mainImageModal.dislikes}
//       initialLoves={mainImageModal.loves}
//     />
//   </Box>
// </Modal>
// </Box>
//     </Grid>
//   );
// };

// export default Learn;


import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  Box,
  Modal,
  Button,
} from "@mui/material";
import style1 from "../Sstyle/Modal1";
import EventLike from "../Components/EventLike";

const Learn = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [events, setEvents] = useState([]);
  const [eventIds, setEventIds] = useState([]);
  const [currentImage, setCurrentImage] = useState("");
  const [mainImageModal, setMainImageModal] = useState({
    open: false,
    imageUrl: "",
    likes: 0,
    dislikes: 0,
    loves: 0,
    imageId: "",
    eventId: "",
  });
  const [showAllImages, setShowAllImages] = useState(false);
  const navigate = useNavigate();

  const handleImageModal = (image, eventId) => {
    setMainImageModal({
      imageId: image._id,
      open: true,
      imageUrl: image.imageUrl,
      likes: image.like,
      dislikes: image.dislike,
      loves: image.love,
      eventId: eventId,
    });
  };

  const handleCloseMainImageModal = () => {
    setMainImageModal({
      open: false,
      imageUrl: "",
      likes: 0,
      dislikes: 0,
      loves: 0,
    });
  };

  // Fetch product and event details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/venue/${id}`);
        const data = await response.json();
        setProduct(data);

        if (data.images && data.images.length > 0) {
          setCurrentImage(data.images[0].imageUrl);
        }

        if (data.eventIds && data.eventIds.length > 0) {
          setEventIds(data.eventIds);
          console.log("Event IDs set:", data.eventIds);
        }
      } catch (error) {
        console.error("Error fetching venue or events:", error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchEvent = async () => {
      if (eventIds.length === 0) return;

      try {
        const response = await fetch(
          `http://localhost:5000/api/venue/event/${eventIds.join(",")}`
        );
        const data = await response.json();
        const eventsToSet = Array.isArray(data) ? data : [data];
        setEvents(eventsToSet);
        console.log("Events set successfully:", eventsToSet);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvent();
  }, [eventIds]);

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Grid container sx ={{
        backgroundImage: `url(/download11.jpeg)`,}}>
    <Container sx={{ paddingTop: "30px", paddingBottom: "30px" ,
        backgroundImage: `url(/download11.jpeg)`, }}>
      <Box sx={{ paddingBottom: "30px", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {product.address}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Card elevation={2} sx={{ height: "300px", position: "relative" }}>
            {currentImage ? (
              <CardMedia
                component="img"
                image={currentImage}
                alt="Product Image"
                sx={{
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                  backgroundImage: `url(/download11.jpeg)`, // Ensures the image covers the card
                }}
              />
            ) : (
              <Typography variant="h6" align="center" sx={{ padding: 4 }}>
                No images available
              </Typography>
            )}
          </Card>

          {/* Display product image thumbnails if images exist */}
          {product.images && product.images.length > 0 ? (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                borderRadius: "2px",
                marginTop: 1,
                border: "2px dotted gold",
                overflowX: "auto",
                padding: 1,
              }}
            >
              {product.images.map((image, index) => (
                <Card
                  key={index}
                  sx={{
                    width: "80px",
                    height: "80px",
                    cursor: "pointer",
                    backgroundImage: `url(/download11.jpeg)`,
                  }}
                  onClick={() => setCurrentImage(image.imageUrl)}
                >
                  <CardMedia
                    component="img"
                    image={image.imageUrl}
                    alt={`Thumbnail ${index + 1}`}
                    sx={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Card>
              ))}
            </Box>
          ) : (
            <Typography variant="body1" sx={{ mt: 2 }}>
              No thumbnails available
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1">{product.description}</Typography>
          <Typography variant="h5" gutterBottom>
            Key Features:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">
                Height: {product.height ? `${product.height} ft` : "N/A"}
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Weight: {product.weight ? `${product.weight} kg` : "N/A"}
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Width: {product.width ? `${product.width} ft` : "N/A"}
              </Typography>
            </li>
          </ul>

          <Typography variant="body1">{product.days} days</Typography>
          <Typography variant="body1">{product.category}</Typography>
          <Typography variant="body1">{product.type}</Typography>
        </Grid>
      </Grid>

      <hr />

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Events
        </Typography>

        {events.length > 0 ? (
          events.map((event) => (
            <Box key={event._id} sx={{ marginBottom: 4 }}>
              <Button
                variant="outlined"
                onClick={() => navigate(`/event/${event._id}`)}
                sx={{ marginBottom: 1 }}
              >
                Event
              </Button>
              <Typography variant="h5" gutterBottom>
                {event.name}
              </Typography>
              <Typography variant="body1">{event.description}</Typography>
              <Typography variant="body2" color="textSecondary">
                Event Date: {new Date(event.date).toLocaleDateString()}
              </Typography>

              <Grid container spacing={4}>
                {event.images && event.images.length > 0 ? (
                  event.images
                    .slice(0, showAllImages ? event.images.length : 5)
                    .map((image, imgIndex) => (
                      <Grid item xs={12} sm={4} mt={3} key={imgIndex}>
                        <Card sx={{ height: "250px", cursor: "pointer" }}>
                          <CardMedia
                            component="img"
                            image={image.imageUrl}
                            alt={`Event Image ${imgIndex + 1}`}
                            sx={{
                              height: "100%",
                              width: "100%",
                              objectFit: "cover", // Fill the entire card
                            }}
                            onClick={() => handleImageModal(image, event._id)}
                          />
                        </Card>
                      </Grid>
                    ))
                ) : (
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    No images available for this event.
                  </Typography>
                )}
                {event.images && event.images.length > 5 && (
                  <Button
                    color="primary"
                    onClick={() => setShowAllImages(!showAllImages)}
                    sx={{ marginTop: 2 }}
                  >
                    {showAllImages ? "View Less" : "View More"}
                  </Button>
                )}
              </Grid>
            </Box>
          ))
        ) : (
          <Typography variant="body1">No events available</Typography>
        )}

        {/* Modal to display the main image and EventLike component */}
        <Modal
          open={mainImageModal.open}
          onClose={handleCloseMainImageModal}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={style1}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {mainImageModal.imageUrl ? (
                <Card sx = {{backgroundImage: `url(/download11.jpeg)`}}>
                  <CardMedia
                    component="img"
                    alt="Event Image"
                    image={mainImageModal.imageUrl}
                    sx={{
                      // height: "400px", // Adjust height as needed
                      // width: "600px",  // Adjust width as needed
                      objectFit: "contain", // Ensures the image fits well
                    }}
                  />
                </Card>
              ) : (
                <Typography>No image available</Typography>
              )}
            </Box>

          </Box>
        </Modal>
      </Box>
    </Container>
    </Grid>
  );
};

export default Learn;
