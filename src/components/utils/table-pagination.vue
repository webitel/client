<template>
    <footer class="pagination">
        <div class="rows-per-page">
            <div>rows per page: 20</div>
            <i class="icon-icon_arrow-down"></i>
        </div>
        <div class="page-controls">
            <span class="current items">1-10 of 100</span>
            <div class="controls">
                <i class="icon-icon_arrow-left"></i>
                <i class="icon-icon_arrow-left"></i>
            </div>
        </div>
    </footer>
</template>

<script>
    import dropdownSelect from './dropdown-select';

    export default {
        name: "table-pagination",
        components: {
            dropdownSelect
        },
    }
</script>

<style lang="scss" scoped>
    .pagination {
        display: flex;
        width: fit-content;
        margin-left: auto;

        .rows-per-page {
            display: flex;
        }

        .page-controls {
            display: flex;
        }
    }
</style>