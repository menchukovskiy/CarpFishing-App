import { LANG } from "../language/lang";

const DEFAULT_ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const validateImageFile = (file, options = {}) => {
    const {
        maxSizeInMb = 3,
        allowedTypes = DEFAULT_ALLOWED_IMAGE_TYPES,
    } = options;

    if (!file) {
        return {
            isValid: false,
            error: LANG("ERROR_FILE_NOT_SELECTED"),
        };
    }

    const isImage = file.type?.startsWith("image/");
    const isAllowedType = allowedTypes.includes(file.type);

    if (!isImage || !isAllowedType) {
        return {
            isValid: false,
            error: LANG("ERROR_INVALID_FILE_TYPE"),
        };
    }

    const maxFileSizeInBytes = maxSizeInMb * 1024 * 1024;

    if (file.size > maxFileSizeInBytes) {
        return {
            isValid: false,
            error: LANG("ERROR_FILE_TOO_LARGE"),
        };
    }

    return {
        isValid: true,
        error: "",
    };
};

export default validateImageFile;