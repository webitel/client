export default {
    mounted() {
        setTimeout(() => {
            const sortableList = this.$refs.vuetable.$el.querySelector('.vuetable-body');
            this.enableDragList(sortableList);
        }, 500);
    },

    methods: {
        enableDragList(list) {
            [...list.children].forEach(item => this.enableDragItem(item));
        },

        enableDragItem(item) {
            item.setAttribute('draggable', true);
            item.ondragenter = this.handleDrag;
            item.ondragend = this.onDrop;
            item.ondragstart = this.onDragStart;
        },

        onDragStart(event) {
            event.currentTarget.classList.add('curr-dragged');
        },

        onDrop() {
            const draggableEl = this.$refs.vuetable.$el.querySelector('.curr-dragged');
            draggableEl.classList.remove('curr-dragged');
        },

        handleDrag(item) {
            const selectedItem = this.$refs.vuetable.$el.querySelector('.curr-dragged');
            const list = this.$refs.vuetable.$el.querySelector('.vuetable-body');

            let swapItem = item.currentTarget;
            if (list === swapItem.parentNode) {
                swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
                list.insertBefore(selectedItem, swapItem);
            }
        },
    }
}