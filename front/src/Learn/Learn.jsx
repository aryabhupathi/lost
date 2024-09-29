// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   Container,
//   Typography,
//   Card,
//   CardMedia,
//   Box,
//   Button,
//   Modal,
// } from "@mui/material";
// import Grid from "@mui/material/Grid2";
// import CloseIcon from "@mui/icons-material/Close";
// import ThumbUpIcon from "@mui/icons-material/ThumbUp";
// import ThumbDownIcon from "@mui/icons-material/ThumbDown";
// import FavoriteIcon from "@mui/icons-material/Favorite";

// const Learn = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [currentImage, setCurrentImage] = useState("");
//   const [mainImageModal, setMainImageModal] = useState({
//     open: false,
//     imageUrl: "",
//     likes: 0,
//     dislikes: 0,
//     loves: 0,
//     imageId: "",
//   });
//   const [showAllImages, setShowAllImages] = useState(false); // New state for toggling images

//   const handleImageModal = (image) => {
//     setMainImageModal({
//       imageId: image._id,
//       open: true,
//       imageUrl: image.imageUrl,
//       likes: image.like,
//       dislikes: image.dislike,
//       loves: image.love,
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

  
//   useEffect(() => {
//     fetch(`http://localhost:5000/api/venue/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setProduct(data);
//         if (data.images.length > 0) {
//           setCurrentImage(data.images[0].imageUrl);
//         }
//       })
//       .catch((error) => console.error("Error fetching venue details:", error));
//   }, [id]);

//   if (!product) {
//     return <Typography>Loading...</Typography>;
//   }
//   const updateImageCounts = async (venueId, imageUrl, like, dislike, love) => {
//     const url = `http://localhost:5000/api/venue/${venueId}/images`;
//     const data = { imageUrl, like, dislike, love };

//     try {
//       const response = await fetch(url, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         const errorMessage = await response.json();
//         console.error("Error updating image counts:", errorMessage);
//       } else {
//         const updatedVenue = await response.json();
//         console.log("Image counts updated successfully:", updatedVenue);
//       }
//     } catch (err) {
//       console.error("Error making PUT request:", err.message);
//     }
//   };

//   const handleButtonClick = (buttonType) => {
//     let newLikeCount = currentImageLikes;
//     let newDislikeCount = currentImageDislikes;
//     let newLoveCount = currentImageLoves;

//     if (buttonType === "like") {
//       newLikeCount = liked ? currentImageLikes - 1 : currentImageLikes + 1;
//       setLiked((prev) => !prev);
//       if (disliked) setDisliked(false);
//       setCurrentImageLikes(newLikeCount);
//     } else if (buttonType === "dislike") {
//       newDislikeCount = disliked
//         ? currentImageDislikes - 1
//         : currentImageDislikes + 1;
//       setDisliked((prev) => !prev);
//       if (liked) setLiked(false);
//       setCurrentImageDislikes(newDislikeCount);
//     } else if (buttonType === "love") {
//       newLoveCount = loved ? currentImageLoves - 1 : currentImageLoves + 1;
//       setLoved((prev) => !prev);
//       setCurrentImageLoves(newLoveCount);
//     }

//     updateImageCounts(
//       selectedVenueId,
//       selectedImage,
//       newLikeCount,
//       newDislikeCount,
//       newLoveCount
//     );
//   };


//   return (
//     <Container maxWidth="lg" sx={{ marginTop: 4 }}>
//       <Typography variant="h5" align="center" gutterBottom>
//         {product.name}
//       </Typography>
//       <Typography variant="h6" align="center" gutterBottom>
//         {product.address}
//       </Typography>

//       <Grid container spacing={4}>
//         <Grid item size={{ xs: 12, sm: 6 }}>
//           <Card elevation={2} sx={{ height: "300px" }}>
//             <CardMedia
//               component="img"
//               image={currentImage}
//               alt={`Event Image`}
//               sx={{
//                 height: "100%",
//                 width: "100%",
//                 cursor: "pointer",
//                 objectFit: "contain",
//               }}
//             />
//           </Card>
//           <Box
//             sx={{
//               display: "flex",
//               flexWrap: "wrap",
//               gap: 1,
//               marginTop: 1,
//               border: "2px dotted gold",
//               overflowX: "scroll",
//             }}
//           >
//             {product.images.map((image, index) => (
//               <Card
//                 key={index}
//                 sx={{ width: "80px", height: "80px", cursor: "pointer" }}
//                 onClick={() => setCurrentImage(image.imageUrl)}
//               >
//                 <CardMedia
//                   component="img"
//                   image={image.imageUrl}
//                   alt={`Thumbnail ${index + 1}`}
//                   sx={{
//                     height: "100%",
//                     width: "100%",
//                     objectFit: "cover",
//                   }}
//                 />
//               </Card>
//             ))}
//           </Box>
//         </Grid>

//         <Grid item size={{ xs: 12, sm: 6 }}>
//           <Typography variant="body1">{product.description}</Typography>
//           <Typography variant="h5" gutterBottom>
//             Key Features:
//           </Typography>
//           <ul>
//             <li>
//               <Typography variant="body1">
//                 Height: {product.height} ft
//               </Typography>
//             </li>
//             <li>
//               <Typography variant="body1">
//                 Weight: {product.weight} kg
//               </Typography>
//             </li>
//             <li>
//               <Typography variant="body1">Width: {product.width} ft</Typography>
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
//         {product.events.map((event, index) => (
//           <Box key={index} sx={{ marginBottom: 4 }}>
//             <Typography variant="h5" gutterBottom>
//               {event.eventName}
//             </Typography>
//             <Typography variant="body1">{event.eventDescription}</Typography>
//             <Typography variant="body2" color="textSecondary">
//               Event Date: {event.eventDate}
//             </Typography>

//             <Grid container spacing={4}>
//               {event.eventImages
//                 .slice(0, showAllImages ? event.eventImages.length : 5)
//                 .map((image, imgIndex) => (
//                   <Grid item size={{ xs: 12, sm: 4 }} mt={3} key={imgIndex}>
//                     <Card sx={{ height: "250px" }}>
//                       <CardMedia
//                         component="img"
//                         image={image.imageUrl}
//                         alt={`Event Image ${imgIndex + 1}`}
//                         sx={{
//                           height: "100%",
//                           width: "100%",
//                           cursor: "pointer",
//                           objectFit: "contain",
//                         }}
//                         onClick={() => handleImageModal(image)}
//                       />
//                     </Card>
//                   </Grid>
//                 ))}
//               {event.eventImages.length > 5 && (
//                 <Button
//                   color="primary"
//                   onClick={() => setShowAllImages(!showAllImages)} // Toggle showAllImages state
//                 >
//                   {showAllImages ? "View Less" : "View More"}
//                 </Button>
//               )}
//             </Grid>
//           </Box>
//         ))}
//       </Box>

//       <Modal
//         open={mainImageModal.open}
//         onClose={handleCloseMainImageModal}
//         aria-labelledby="modal-image"
//         aria-describedby="modal-image-description"
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: "40%",
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2, // Optional: Adds rounded corners
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           {/* Close Button aligned to the top-right */}
//           <Box sx={{ alignSelf: "flex-end", mb: 2 }}>
//             <Button
//               onClick={handleCloseMainImageModal}
//               sx={{ minWidth: 0, p: 0 }}
//             >
//               <CloseIcon
//                 sx={{
//                   color: "black",
//                   "&:hover": {
//                     color: "red",
//                   },
//                 }}
//               />
//             </Button>
//           </Box>

//           {/* Image Section */}
//           <CardMedia
//             component="img"
//             image={mainImageModal.imageUrl}
//             alt="Main Image"
//             sx={{
//               objectFit: "contain",
//               height: "400px",
//               width: "400px",
//               mb: 2,
//             }}
//           />

//           {/* Interaction Buttons Section */}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               width: "100%",
//             }}
//           >
//             <Box sx={{ fontWeight: "bold" }}>{mainImageModal.imageId}</Box>
//             <Box sx={{ display: "flex", gap: 1 }}>
//               <Button sx={{ minWidth: 0 }} onClick={handleButtonClick}>
//                 <ThumbUpIcon />
//                 {mainImageModal.likes}
//               </Button>
//               <Button sx={{ minWidth: 0 }} onClick={handleButtonClick}>
//                 <ThumbDownIcon />
//                 {mainImageModal.dislikes}
//               </Button>
//               <Button sx={{ minWidth: 0 }} onClick={handleButtonClick}>
//                 <FavoriteIcon />
//                 {mainImageModal.loves}
//               </Button>
//             </Box>
//           </Box>
//         </Box>
//       </Modal>
//     </Container>
//   );
// };

// export default Learn;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  Box,
  Button,
  Modal,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Learn = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [mainImageModal, setMainImageModal] = useState({
    open: false,
    imageUrl: "",
    likes: 0,
    dislikes: 0,
    loves: 0,
    imageId: "",
  });
  const [showAllImages, setShowAllImages] = useState(false);

  // States to handle like, dislike, and love button interactions
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [loved, setLoved] = useState(false);
  const [currentImageLikes, setCurrentImageLikes] = useState(0);
  const [currentImageDislikes, setCurrentImageDislikes] = useState(0);
  const [currentImageLoves, setCurrentImageLoves] = useState(0);

  const handleImageModal = (image) => {
    setMainImageModal({
      imageId: image._id,
      open: true,
      imageUrl: image.imageUrl,
      likes: image.like,
      dislikes: image.dislike,
      loves: image.love,
    });
    setCurrentImageLikes(image.like);
    setCurrentImageDislikes(image.dislike);
    setCurrentImageLoves(image.love);
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

  useEffect(() => {
    fetch(`http://localhost:5000/api/venue/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        if (data.images.length > 0) {
          setCurrentImage(data.images[0].imageUrl);
        }
      })
      .catch((error) => console.error("Error fetching venue details:", error));
  }, [id]);

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  const updateImageCounts = async (venueId, eventId, imageId, action) => {
    const url = `/api/venue/${venueId}/${eventId}/${imageId}`; // Adjusted the API URL
    const data = { action }; // Send the action ('like', 'dislike', 'love')
  
    try {
      const response = await fetch(url, {
        method: "POST", // Use POST instead of PUT since the API uses POST
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorMessage = await response.json();
        console.error("Error updating image counts:", errorMessage);
      } else {
        const updatedImage = await response.json();
        console.log("Image counts updated successfully:", updatedImage);
      }
    } catch (err) {
      console.error("Error making POST request:", err.message);
    }
  };
  
  const handleButtonClick = (buttonType) => {
    let newLikeCount = currentImageLikes;
    let newDislikeCount = currentImageDislikes;
    let newLoveCount = currentImageLoves;
    let action = ''; // Variable to store the action
  
    if (buttonType === "like") {
      newLikeCount = liked ? currentImageLikes - 1 : currentImageLikes + 1;
      setLiked((prev) => !prev);
      if (disliked) setDisliked(false);
      setCurrentImageLikes(newLikeCount);
      action = 'like';
    } else if (buttonType === "dislike") {
      newDislikeCount = disliked
        ? currentImageDislikes - 1
        : currentImageDislikes + 1;
      setDisliked((prev) => !prev);
      if (liked) setLiked(false);
      setCurrentImageDislikes(newDislikeCount);
      action = 'dislike';
    } else if (buttonType === "love") {
      newLoveCount = loved ? currentImageLoves - 1 : currentImageLoves + 1;
      setLoved((prev) => !prev);
      setCurrentImageLoves(newLoveCount);
      action = 'love';
    }
  
    // Now we call the updateImageCounts function with the required parameters
    updateImageCounts(
      id, // Venue ID
      product.eventId, // Event ID (you need to ensure that eventId is available from the product or event object)
      mainImageModal.imageId, // Current image ID
      action // Action to send ('like', 'dislike', or 'love')
    );
  };
  
  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        {product.name}
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        {product.address}
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Card elevation={2} sx={{ height: "300px" }}>
            <CardMedia
              component="img"
              image={currentImage}
              alt={`Event Image`}
              sx={{
                height: "100%",
                width: "100%",
                cursor: "pointer",
                objectFit: "contain",
              }}
            />
          </Card>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              marginTop: 1,
              border: "2px dotted gold",
              overflowX: "scroll",
            }}
          >
            {product.images.map((image, index) => (
              <Card
                key={index}
                sx={{ width: "80px", height: "80px", cursor: "pointer" }}
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
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1">{product.description}</Typography>
          <Typography variant="h5" gutterBottom>
            Key Features:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">
                Height: {product.height} ft
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Weight: {product.weight} kg
              </Typography>
            </li>
            <li>
              <Typography variant="body1">Width: {product.width} ft</Typography>
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
        {product.events.map((event, index) => (
          <Box key={index} sx={{ marginBottom: 4 }}>
            <Typography variant="h5" gutterBottom>
              {event.eventName}
            </Typography>
            <Typography variant="body1">{event.eventDescription}</Typography>
            <Typography variant="body2" color="textSecondary">
              Event Date: {event.eventDate}
            </Typography>

            <Grid container spacing={4}>
              {event.eventImages
                .slice(0, showAllImages ? event.eventImages.length : 5)
                .map((image, imgIndex) => (
                  <Grid item xs={12} sm={4} mt={3} key={imgIndex}>
                    <Card sx={{ height: "250px" }}>
                      <CardMedia
                        component="img"
                        image={image.imageUrl}
                        alt={`Event Image ${imgIndex + 1}`}
                        sx={{
                          height: "100%",
                          width: "100%",
                          cursor: "pointer",
                          objectFit: "contain",
                        }}
                        onClick={() => handleImageModal(image)}
                      />
                    </Card>
                  </Grid>
                ))}
              {event.eventImages.length > 5 && (
                <Button
                  color="primary"
                  onClick={() => setShowAllImages(!showAllImages)}
                >
                  {showAllImages ? "View Less" : "View More"}
                </Button>
              )}
            </Grid>
          </Box>
        ))}
      </Box>

      <Modal
        open={mainImageModal.open}
        onClose={handleCloseMainImageModal}
        aria-labelledby="modal-image"
        aria-describedby="modal-image-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ alignSelf: "flex-end", mb: 2 }}>
            <Button
              onClick={handleCloseMainImageModal}
              sx={{ minWidth: 0, p: 0 }}
            >
              <CloseIcon
                sx={{
                  color: "black",
                  "&:hover": {
                    color: "red",
                  },
                }}
              />
            </Button>
          </Box>

          <CardMedia
            component="img"
            image={mainImageModal.imageUrl}
            alt="Main Image"
            sx={{
              objectFit: "contain",
              height: "400px",
              width: "400px",
              mb: 2,
            }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box sx={{ fontWeight: "bold" }}>{mainImageModal.imageId}</Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                sx={{ minWidth: 0 }}
                onClick={() => handleButtonClick("like")}
              >
                <ThumbUpIcon />
                {mainImageModal.likes}
              </Button>
              <Button
                sx={{ minWidth: 0 }}
                onClick={() => handleButtonClick("dislike")}
              >
                <ThumbDownIcon />
                {mainImageModal.dislikes}
              </Button>
              <Button
                sx={{ minWidth: 0 }}
                onClick={() => handleButtonClick("love")}
              >
                <FavoriteIcon />
                {mainImageModal.loves}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default Learn;
