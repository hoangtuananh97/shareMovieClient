import api from "../utils/api";

export const uploadNewImageApi = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    // @ts-ignore
    const parsedUser = JSON.parse(localStorage.getItem('token'));
    return api.post<{ url: string }>('api/uploads/image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${parsedUser.access_token}`
        },
    });
};
