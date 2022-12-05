

export default class UserInfo {
    constructor({ name, job }) {
        this._name = document.querySelector(name);
        this._job = document.querySelector(job);
    }

    getUserInfo() {

        this._profileList = {
            name: this._name.textContent,
            job: this._job.textContent
        };
        
        return this._profileList
    }

    setUserInfo(formData) {
            this._name.textContent = formData.name;
            this._job.textContent = formData.job;
    }
}