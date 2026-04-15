const path = require('path')
const fs = require('fs')

class FileController {

    async getFile(req, res) {
        try {
            const { folder, filename } = req.params
            const allowedFolders = ['users_avatar']
            if (!allowedFolders.includes(folder)) {
                return res.status(400).json({message: "Invalid folder"})
            }

            const filePath = path.resolve(__dirname, '..', 'files', folder, filename)
            if (!fs.existsSync(filePath)) {
                return res.status(404).json({message: "File not found"})
            }

            res.sendFile(filePath)

        } catch (e) {
            console.error(e)
            res.status(500).json({message: "Server error"})
        }
    }

}

module.exports = new FileController()