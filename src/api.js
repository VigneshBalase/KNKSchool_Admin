import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend server URL
});

export const createBlog = (blogData) => API.post('/blogs', blogData);
export const createEvent = (eventData) => API.post('/events', eventData);
