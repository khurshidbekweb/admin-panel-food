import { Backdrop, Box, Button, Fade, Modal, Typography, styled } from "@mui/material";
import { useRef, useState } from "react";
import { BiCloudUpload } from "react-icons/bi";
import { LuFolderEdit } from "react-icons/lu";
import { IMG_BASE_URL } from "../constants/server.BaseUrl";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FoodUtils } from "../utils/food.utils";
import { QUERY_KEY } from "../Query/QUERY_KEY";
import { RiImageEditLine } from "react-icons/ri";
import DeleteImgModal from "./DeleteImgModal";
import { BiImageAdd } from "react-icons/bi";

// Images transform getbase64Full
async function getBase64Full(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
}
const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 300,
    width: 350,
    bgcolor: "background.paper",
    boxShadow: 24,
    px: 2,
    p: 1,
    borderRadius: 2,
};
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const EditImage = ({data}) => {  
     ///////////////////////////////////// Modal open and close
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const queryClient = useQueryClient()
    const praductImg = useRef()

  const deleteImg = useMutation({
    mutationFn: FoodUtils.deleteImg,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEY.food]})
      toast.success("Delete image")
    },
    onError: (err) => {
      console.log(err, "image delete");
      toast.error("Don't delete image")
    }
  })
  const addImagesSingle = useMutation({
    mutationFn: FoodUtils.addSingleImage,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEY.category]})
      toast.success("Add succes image")
      handleClose()
    },
    onError: (err) => {
      console.log(err, "Add aimage");
      toast.error("Error")
    }
  })
  const addImageSingle = (e) => {
    e.preventDefault()
    addImagesSingle.mutate({
      foodId: data._id,
      image: e.target.image.files[0]
    })
  }
    return (
        <div className="z-10">
          <button className="absolute z-10 bottom-[-10px] bg-yellow-500 text-white p-1 md:p-2 rounded-full right-11 md:right-14" onClick={handleOpen}> <LuFolderEdit size={20}/> </button>    
          <div className="z-30">
            <button
              className="absolute z-10 top-0 bg-indigo-400 right-0 md:right-0 text-white p-1 md:p-2 rounded-[0, 0, 0, 10px] md:right-14"
              onClick={handleOpen}
            ><RiImageEditLine size={20}/>
            </button>
      
            <Modal
              aria-labelledby={`child-modal-title${data.id}`}
              aria-describedby={`transition-modal-description${data.id}`}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                  <Typography
                    id={`transition-modal-description${data.id}`}
                    sx={{ mt: 2 }}
                  >
                    Edit to praduct images
                  </Typography>
                  <div className="title-edit flex items-center gap-3">
                      <h2 className="font-bold">Name:</h2>
                      <p className="font-medium">{data.name}</p>
                    </div>
                  <form onSubmit={addImageSingle}>           
                        <div className="images flex overflow-x-scroll items-center gap-x-1">
                            
                            {data.image_urls?.length && data.image_urls.map((img, i) => {
                              return <div className="relative" key={i}>
                                          <img width={70} className="h-[130px] py-4" src={`${IMG_BASE_URL}${img}`} alt="images" />
                                          <DeleteImgModal deleteFn={deleteImg.mutate} id={{foodId: data._id, image_url: img}}/>
                                      </div>
                            })}
                            <img width={70} ref={praductImg} className='hidden h-[130px] py-4' src="" alt="img" />
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                className="h-[100%] bg-red-800"
                                onChange={showImage}
                                tabIndex={-1}
                                startIcon={<BiImageAdd  size={30}/>}
                                sx={{
                                  height: "100%",
                                  padding:"17px 0 17px 15px",
                                  backgroundColor:"silver",
                                  borderRadius: "50%"
                                }}
                              >
                                <VisuallyHiddenInput  name="image" type="file" />
                            </Button>
                        </div>
                    <Button
                      className="w-full"
                      type="submit"
                      variant="contained"
                      color="success"
                    >
                      Save
                    </Button>
                  </form>
                </Box>
              </Fade>
            </Modal>
          </div>
        </div>
      );
// Show category image
async function showImage(e) {
  praductImg.current.src = await getBase64Full(e.target.files[0]);
  praductImg.current.classList.remove("hidden");
}
};

export default EditImage;