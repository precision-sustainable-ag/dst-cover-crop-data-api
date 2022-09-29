import PostsRoutes from './posts.js'


/**
 * 
 * Register all routes and routers here.
 * Registering routes should be formatted like this:
 * app.use('/<subdomain>',...<route-specific-middleware>, <router>/<callback>)
 */
export function bootstrap(app){

    app.use('/posts', PostsRoutes);

}


export default {
    bootstrap
}