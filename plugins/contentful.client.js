import { createClient } from './contentful';
const client = createClient();

export default ({ store }) => {
    function setup() {
        fetchData();
    }

    function fetchData() {
        let promises = [
            client.getEntries({
                'content_type': 'project',
                order: 'sys.createdAt'
            }),
            client.getEntries({
                'content_type': 'home',
              }),
        ];

        Promise.all(promises).then(([projects, home]) => {
            //populate store
        });
    }

    setup();
}