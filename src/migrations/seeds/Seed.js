
import Post from '../../app/models/Post.js'

export default class Seed {

    static model(){
        return null;
    }
    
    static data(){

        return [
            {}
        ];

    }

    static plant(){

        const model = this.model();
        if (!model) return;
        model.register();
        for(let row of this.data()){
            model.create(row);
        }

    }

}