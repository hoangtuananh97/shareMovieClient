import {Movie} from "../types";
import api from "../utils/api";

export const fetchMoviesApi = () => {
    return api.get<Movie[]>('api/videos');
};
export const uploadNewMoviesApi = (movies: Movie) => {
    // @ts-ignore
    const parsedUser = JSON.parse(localStorage.getItem('token'));
    return api.post<Movie>('api/videos', movies, {
        headers: {
            "Authorization": `Bearer ${parsedUser.access_token}`
        },
    });
}
