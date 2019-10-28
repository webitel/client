import pagination from '../components/utils/table-pagination';


export default {
    components: {
        'pagination': pagination
    },

    data() {
        return {
            rowsPerPage: 10,
            rowsPerPageOptions: [5, 10, 20, 50, 100],
        }
    }
}