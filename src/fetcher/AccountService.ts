import { useFetch } from './ApiFetcher';

interface LoginResponse {
    phoneNumber: string;
    accessToken: string;
    refreshToken: string;
}

// Example fetcher custom hook implement
export const useLogin = () => useFetch<LoginResponse>(`/tv75-service/api/account/login`, 'POST');
