"use client"
import { Camera, CameraType } from "react-camera-pro";
import { useContext, useEffect, useRef, useState } from "react";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import CameraIcon from '@mui/icons-material/Camera';
import { PantryContext, TPantryContext } from "@/contexts/PantryContext";
import { CircularProgress } from '@mui/material';

export default function CameraPro({ isLoadingName, itemName }: { isLoadingName: boolean, itemName: string }): JSX.Element {
    const { image, setImage } = useContext(PantryContext) as TPantryContext
    const camera = useRef<CameraType | null>(null);
    const [canShowName, setCanShowName] = useState<boolean>(false)

    const retakeImage = () => setImage(() => undefined)

    useEffect(() => {
        if (image && itemName) {
            setCanShowName(() => true)
            const nameTimeout = setTimeout(() => setCanShowName(() => false), 3000)
            return () => clearTimeout(nameTimeout)
        }
    }, [itemName, image])

    return (
        <Box display="flex" flexDirection='column' gap="12px" sx={{ width: { xs: "100%", md: '500px' }, margin: "12px 0 0 0" }}>
            {!image &&
                <>
                    <Box position="relative" display="flex" width="100%" sx={{ height: { xs: '40svh', lg: '280px' } }}>
                        <Skeleton width="100%" height="100%" variant="rectangular" sx={{ position: 'absolute', top: 0, zIndex: 0 }} />
                        <CameraIcon fontSize='large' sx={{
                            position: 'absolute', display: 'block', zIndex: 0, inset: 0, margin: 'auto', fill: '#99999950',
                        }} />
                        <Camera
                            ref={camera}
                            errorMessages={{ noCameraAccessible: '', permissionDenied: '', switchCamera: '', canvas: '' }}
                            aspectRatio={16 / 8.6} />
                    </Box>
                    <button type="button" onClick={() => setImage(camera.current?.takePhoto())}
                        className="py-2 px-6 text-center border border-orange-primary text-orange-primary font-semibold tracking-wide rounded-lg transition-all duration-150 hover:border-yellow-primary hover:bg-yellow-primary hover:text-zinc-900">Take photo (optional)</button>
                </>
            }

            {image &&
                <>
                    <Box position="relative" sx={{ width: { md: '500px' } }}>
                        <img width={'100%'} src={(image as string)} alt='Taken photo' />
                        {isLoadingName && <CircularProgress sx={{ position: 'absolute', display: 'block', zIndex: 3, inset: 0, margin: 'auto', color: '#fff' }} />}
                        {canShowName && <Typography sx={{ position: 'absolute', top: 0, display: 'grid', placeContent: "center", zIndex: 3, width: "100%", height: "100%", color: '#fff', fontSize: '40px', fontWeight: 700, bgcolor: "#01010140", textAlign: "center" }}>{itemName}</Typography>}
                    </Box>
                    <Button onClick={retakeImage}>Retake Image</Button>
                </>
            }
        </Box>
    );
}