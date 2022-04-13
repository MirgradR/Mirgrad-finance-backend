export default class AuthDto {
    email: string
    id: string
    isActivated: boolean
    userName: string

    constructor(model) {
        this.email = model.email
        this.id = model._id
        this.userName = model.userName
        this.isActivated = model.isActivated
    }
}
