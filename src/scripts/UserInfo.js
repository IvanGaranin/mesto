import { profileName, profileJob } from "../utils/Constants.js";

export default class UserInfo {
    constructor({ profileDefault }) {
        this._name = profileDefault.name;
        this._job = profileDefault.job;
    }

    getUserInfo() {

        this._profileList = {
            name: this._name,
            job: this._job
        };

        console.log(this._profileList);
        
        return this._profileList
    }

    setUserInfo(formData) {
        profileName.textContent = formData.name;
        profileJob.textContent = formData.job;

        
        
    }
}