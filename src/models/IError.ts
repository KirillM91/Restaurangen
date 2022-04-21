export interface IError {
    nameError: {
        name: string,
        approved: boolean
    },
    lastnameError: {
        lastname: string,
        approved: boolean
    },
    emailError: {
        email: string,
        approved: boolean
    },
    phoneError: {
        phone: string,
        approved: boolean
    }
};