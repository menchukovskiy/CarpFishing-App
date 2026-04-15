import AvatarBox from "../../../components/AvatarBox";
import ActionMenu from "./ActionMenu";
import CropAvatarModal from "./CropAvatarModal";
import { Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import validateImageFile from "../../../utils/validateImageFile";
import { handleUpdateAvatar } from "../../../store/slice/userSlice";

const AccauntPicture = () => {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileError, setFileError] = useState("");
    const [isCropModalOpen, setIsCropModalOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState("");
    const previewUrlRef = useRef("");

    useEffect(() => {
        previewUrlRef.current = previewUrl;
    }, [previewUrl]);

    useEffect(() => {
        return () => {
            if (previewUrlRef.current) {
                URL.revokeObjectURL(previewUrlRef.current);
            }
        };
    }, []);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    }

    const handleDeleteClick = () => {
    }

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const validation = validateImageFile(file, { maxSizeInMb: 3 });
        if (!validation.isValid) {
            setSelectedFile(null);
            setFileError(validation.error);
            event.target.value = "";
            return;
        }

        setFileError("");
        setSelectedFile(file);
        if (previewUrlRef.current) {
            URL.revokeObjectURL(previewUrlRef.current);
        }
        setPreviewUrl(URL.createObjectURL(file));
        setIsCropModalOpen(true);
        event.target.value = "";
    }

    const handleCloseCropModal = () => {
        if (previewUrlRef.current) {
            URL.revokeObjectURL(previewUrlRef.current);
        }
        setIsCropModalOpen(false);
        setSelectedFile(null);
        setPreviewUrl("");
    }

    const handleConfirmCrop = (croppedBlob) => {
        handleCloseCropModal();
        dispatch( handleUpdateAvatar(croppedBlob) );
    }

    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <AvatarBox size={250} />
                <ActionMenu
                    hasAvatar={Boolean(user?.avatar)}
                    onUploadClick={handleUploadClick}
                    onDeleteClick={handleDeleteClick}
                />
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
                {!!fileError && (
                    <Typography p={1} variant="body2" color="error">
                        {fileError}
                    </Typography>
                )}
            </Box>

            <CropAvatarModal
                open={isCropModalOpen}
                onClose={handleCloseCropModal}
                imageSrc={previewUrl}
                selectedFile={selectedFile}
                onConfirm={handleConfirmCrop}
            />

        </>
    );
};

export default AccauntPicture;