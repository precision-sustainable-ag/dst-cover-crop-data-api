const Setup = require('./Setup');
const {PostsController} = require('../app/http/controllers/PostsController');
const Response = require('./Response');

beforeAll(() => {
    return new Promise(resolve => {
      // Asynchronous task
      Setup().then(res => resolve());
    });
});


test('Posts Controller Create', async () => {
    const controller = PostsController.factory();

    const req = {
        authorized: true,
        validated: {
            title: 'this is a test',
            body: 'test body is posted'
        },
    };

    const res = new Response();

    await controller.create(req, res, (err)=>{});

    expect(res.data)

})