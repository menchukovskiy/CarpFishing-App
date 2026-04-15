import { getFiles } from "../http/filesAPI"

// Кэш: ключ = "catalog/file", значение = objectURL
// Живет в памяти пока открыта вкладка — запросы на сервер делаются только один раз
const imageCache = new Map()

export const getImage = async (catalog, file) => {
    const cacheKey = `${catalog}/${file}`

    if (imageCache.has(cacheKey)) {
        return imageCache.get(cacheKey)
    }

    try {
        const blob = await getFiles(catalog, file)
        const objectUrl = URL.createObjectURL(blob)
        imageCache.set(cacheKey, objectUrl)
        return objectUrl
    } catch (e) {
        console.error("Image load error", e)
        return null
    }
}

// Вызывать после обновления/удаления файла на сервере,
// чтобы следующий getImage сделал свежий запрос
export const invalidateImageCache = (catalog, file) => {
    const cacheKey = `${catalog}/${file}`
    const cached = imageCache.get(cacheKey)
    if (cached) {
        URL.revokeObjectURL(cached)
        imageCache.delete(cacheKey)
    }
}