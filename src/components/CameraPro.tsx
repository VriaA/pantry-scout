import { Camera, CameraType } from "react-camera-pro";
import { useContext, useRef } from "react";
import { Box, Button, Skeleton } from "@mui/material";
import CameraIcon from '@mui/icons-material/Camera';
import { PantryContext, TPantryContext } from "@/contexts/PantryContext";

export default function CameraPro(): JSX.Element {
    const { image, setImage } = useContext(PantryContext) as TPantryContext
    const camera = useRef<CameraType | null>(null);

    const retakeImage = () => setImage(() => undefined)

    return (
        <Box display="flex" flexDirection='column' gap="12px" sx={{ width: { md: '500px' } }}>
            {!image &&
                <>
                    <Box position="relative" display="flex" width="500px" sx={{ height: { xs: '40svh', lg: '300px' } }}>
                        <Skeleton width="500px" height="100%" variant="rectangular" sx={{ position: 'absolute', top: 0, zIndex: 0 }} />
                        <CameraIcon fontSize='large' sx={{
                            position: 'absolute', display: 'block', zIndex: 0, inset: 0, margin: 'auto', fill: '#b3b3b350',
                        }} />
                        <Camera
                            ref={camera}
                            errorMessages={{ noCameraAccessible: '', permissionDenied: '', switchCamera: '', canvas: '' }}
                            aspectRatio={16 / 9.6} />
                    </Box>
                    <Button onClick={() => setImage(camera.current?.takePhoto())}>Take photo</Button>
                </>
            }

            {image &&
                <>
                    <img width={'100%'} src={(image as string)} alt='Taken photo' />
                    <Button onClick={retakeImage}>Retake Image</Button>
                </>
            }

        </Box>
    );
}