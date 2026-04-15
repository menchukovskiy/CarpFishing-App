import { LANG } from "../../../language/lang";
import {
    Box,
    Dialog, DialogTitle,
    DialogContent, DialogActions,
    IconButton
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import MainBtn from "../../../components/Buttons/MainBtn";
import Cropper from 'react-easy-crop'
import { useState } from "react";
import getCroppedImage from "../../../utils/getCroppedImage";

const CropAvatarModal = ({ open, onClose, imageSrc, onConfirm }) => {

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }

    const handleSave = async () => {
        if (isProcessing || !croppedAreaPixels) return;

        try {
            setIsProcessing(true);
            const croppedBlob = await getCroppedImage(imageSrc, croppedAreaPixels);
            onConfirm(croppedBlob);
        } catch (e) {
            console.error("Ошибка при обрезке изображения:", e);
        } finally {
            setIsProcessing(false);
        }
    }

   
    const onMediaLoaded = (mediaSize) => {
        const minSize = Math.min(mediaSize.width, mediaSize.height);
        setCroppedAreaPixels({
            x: (mediaSize.width - minSize) / 2,
            y: (mediaSize.height - minSize) / 2,
            width: minSize,
            height: minSize,
        });
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {LANG("TITLE_CROP_AVATAR")}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box
                    position="relative"
                    height={400}
                >
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                        onMediaLoaded={onMediaLoaded}
                        cropShape="round"
                    />
                </Box>
            </DialogContent>
            <DialogActions
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: 2
                }}
            >
                <MainBtn
                    onClick={handleSave}
                    title={isProcessing ? LANG("BUTTON_SAVING") : LANG("BUTTON_SAVE_AVATAR")}
                    disabled={isProcessing || !croppedAreaPixels}
                />
            </DialogActions>
        </Dialog>
    );
};

export default CropAvatarModal;