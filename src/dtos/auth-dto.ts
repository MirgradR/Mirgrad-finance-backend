interface Model {
   email: string,
   _id: string,
   userName: string,
   isActivated: boolean 
}

export default class AuthDto {
    email: string
    id: string
    isActivated: boolean
    userName: string

    constructor(model: Model) {
        this.email = model.email
        this.id = model._id
        this.userName = model.userName
        this.isActivated = model.isActivated
    }
}
