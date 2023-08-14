
import { useRecoilState } from 'recoil';
import { authAtom } from '../stores/login-store';
import { history } from './history';

export { UserInfo };

function UserInfo() {
  const [ auth, setAuth ] = useRecoilState(authAtom);

  return {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
  };

  interface HttpRequestConfig {
    method: any,
    headers: any,
    body?: any
  }

  function request(method :any){
    return (url :any, body :any) => {
      const requestOptions: HttpRequestConfig = {
        method,
        headers: authHeader(url)
      };
      if(body){
        requestOptions.headers['Content-Type'] = 'application/json';
        requestOptions.body = JSON.stringify(body);
      }
      return fetch(url, requestOptions).then(handleResponse);
    }
  }

  function authHeader(url: any) {
    // return auth header with jwt if user is logged in and request is to the api url
    const token = auth?.token;
    const isLoggedIn = !!token;
    const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${token}` } as any;
    } else {
        return {};
    }
  }
  

  function handleResponse(response:any) {
    return response.text().then((text: string) => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            if ([401, 403].includes(response.status) && auth?.token) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                localStorage.removeItem('user');
                setAuth(null);
                history.push('/account/login');
            }

            const error = (data && data.message) || response.statusText;
            console.log(error);
            return Promise.reject(error);
        }

        return data;
    });
  }    

}