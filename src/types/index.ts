export interface User {
    id: string;
    email: string;
    password: string;
}

export interface Movie {
    id: string;
    video_url: string;
    image_url: string;
    title: string;
    shared_by: string;
    shared_at: string | null;
    likes: number | 0;
    dislikes: number | 0;
    description: string | null;
    tags: string | null;
}

export interface UploadNewMovie {
    video_url: string;
    image_url: string;
    title: string;
    description: string | null;
    tags: string | null;
}

export interface UploadNewVideo {
    url: string;
}

export interface UploadNewImage {
    url: string;
}

export interface MovieState {
    movies: Movie[];
    loading: boolean;
    error: string | null;
}

export interface VideoState {
    videoUrl: string | null;
    loading: boolean;
    error: string | null;
}

export interface ImageState {
    image: string | null;
    loading: boolean;
    error: string | null;
}

export interface UserState {
    user: any | null;
    loading: boolean;
    error: string | null;
}

export interface AuthState {
    isAuthenticated: boolean;
}



export interface AppState {
    movie: MovieState;
    user: UserState;
    auth: AuthState;
}
