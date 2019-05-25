export interface LoggedUserResponse extends ArrayBuffer{
    description: string,
    htmlCode: number,
    typeResponse: string,
    value: [
        {
            document_id: string,
            first_name: string,
            id_user: 0,
            last_name: string,
            password: string,
            public_id: string,
            type: string,
            user_name: string
        }
    ]
}