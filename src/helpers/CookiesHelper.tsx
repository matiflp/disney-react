import Cookies from 'universal-cookie';

const cookies = new Cookies();

cookies.set('.AspNetCore.Session', '', {path: '/'});

export default cookies;