import { data } from "autoprefixer";


export default class UserInfo {
    constructor(data) {
        this._name = data.name;
        this._about = data.about;
        this._avatar = data.avatar;        
    }

    getUserInfo() {
        this._profileList = {
            name: this._name,
            about: this._about,
            avatar: this._avatar
        };
        return this._profileList
    }

    setUserInfo() {
        name: this._name;
        this._about = data.about;
        this._avatar = data.avatar;
    }
}