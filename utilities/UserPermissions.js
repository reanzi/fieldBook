import Constants from "expo-constants"
import * as Permissions from "expo-permissions"

class UserPermissions {
    getCameraPermission = async () => {
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if(status != "granted") {
                alert("We need permission to use your camera roll");
            }
        }
        if (Constants.platform.android) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA);
            if(status != "granted") {
                alert("We need permission to use your camera");
            }
        }
    }
    getLocationPermistion = async () =>{
        // location permission
    }
}

export default new UserPermissions()