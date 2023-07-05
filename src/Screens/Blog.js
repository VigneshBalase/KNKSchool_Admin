import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Card, CardContent } from '@material-ui/core';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [events, setEvents] = useState([]);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');

  const handleBlogSubmit = (event) => {
    event.preventDefault();
    const newBlog = { title: blogTitle, content: blogContent };
    setBlogs([...blogs, newBlog]);
    setBlogTitle('');
    setBlogContent('');
  };

  const handleEventSubmit = (event) => {
    event.preventDefault();
    const newEvent = { title: eventTitle, date: eventDate };
    setEvents([...events, newEvent]);
    setEventTitle('');
    setEventDate('');
  };

  return (
    <Container maxWidth="md" style={{ marginTop: 20 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Admin Panel
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Blogs
              </Typography>

              <form onSubmit={handleBlogSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Title"
                      value={blogTitle}
                      onChange={(event) => setBlogTitle(event.target.value)}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Content"
                      value={blogContent}
                      onChange={(event) => setBlogContent(event.target.value)}
                      fullWidth
                      required
                      multiline
                      rows={4}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                      Upload Blog
                    </Button>
                  </Grid>
                </Grid>
              </form>

              <div style={{ marginTop: 20 }}>
                {blogs.map((blog, index) => (
                  <Card key={index} style={{ marginBottom: 10 }}>
                    <CardContent>
                      <Typography variant="h6">{blog.title}</Typography>
                      <Typography>{blog.content}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Events
              </Typography>

              <form onSubmit={handleEventSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Title"
                      value={eventTitle}
                      onChange={(event) => setEventTitle(event.target.value)}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Date"
                      type="date"
                      value={eventDate}
                      onChange={(event) => setEventDate(event.target.value)}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                      Upload Event
                    </Button>
                  </Grid>
                </Grid>
              </form>

              <div style={{ marginTop: 20 }}>
                {events.map((event, index) => (
                  <Card key={index} style={{ marginBottom: 10 }}>
                    <CardContent>
                      <Typography variant="h6">{event.title}</Typography>
                      <Typography>{event.date}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
