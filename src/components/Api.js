import { data } from "autoprefixer";

const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}


export default class Api {
    constructor(options){
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    getInitialCards() {
        return fetch(this.baseUrl + `/cards`, {
            headers: this.headers
        })
        .then(handleResponse)
        .catch(err => {
            console.log(err)
        })
    }

    getProfileInfo() {
        return fetch(this.baseUrl + `users` + `/me`, {
            headers: this.headers
        })
        .then(handleResponse)
        .catch(err => {
            console.log(err)
        })
    }

    editProfileInfo() {
        return fetch(this.baseUrl + `/users` + `/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify()
        })
            .then(handleResponse)
            .catch(err => {
                console.log(err)
        })
    }

    addNewCard(data) {
        return fetch(this.baseUrl + `/cards`, {
            method:'POST',
            headers:this.headers,
            body: JSON.stringify(data)
        })
            .then(handleResponse)
            .catch(err => {
                console.log(err)
        })
    }

    deleteCard(cardId) {
        return fetch(this.baseUrl + `/cards`+ `/${cardId}`, {
            method:'DELETE',
            headers:this.headers
        })
            .then(handleResponse)
            .catch(err => {
                console.log(err)
        })
    }

    likeCard(cardId) {
        return fetch(this.baseUrl + `/cards`+ `/${cardId}` + `/likes`, {
            method:'PUT',
            headers:this.headers
        })
            .then(handleResponse)
            .catch(err => {
                console.log(err)
        })
    }

    dislikeCard(cardId) {
        return fetch(this.baseUrl + `/cards`+ `/${cardId}` + `/likes`, {
            method:'DELETE',
            headers:this.headers
        })
            .then(handleResponse)
            .catch(err => {
                console.log(err)
        })
    }

    changeAvatar(dataAvatar) {
        return fetch(this.baseUrl + `/users`+ `/me` + `/avatar`, {
            method:'PATCH',
            headers:this.headers,
            body: JSON.stringify(dataAvatar)
        })
            .then(handleResponse)
            .catch(err => {
                console.log(err)
        })
    }
        
}
