export interface IUserRepository {
    getAllUsers()
    findUser(email: string)
    isEmailOrDniTaken(email: string, dni: string, id: number)
}
