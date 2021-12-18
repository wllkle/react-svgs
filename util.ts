import {access} from "fs"

export const pathExists = (path) => {
    access(path, err => {
        if (!err) return true
        return false
    })
}
