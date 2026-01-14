export class GetUsersUsecase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute() {
        return await this.userRepository.getAllUsers();
    }
}