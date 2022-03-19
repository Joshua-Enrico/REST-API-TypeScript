import app from './app';
// import './database' // this is mongoose init and connection

// Run the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})