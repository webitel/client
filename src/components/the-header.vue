<template>
    <div class="col-12">
        <header class="the-header">
            <div class="the-header__user-panel">
                <div class="the-header__user-item the-header__user-pic">
                    <img class="the-header__img" src="../assets/img/home/user-pic.svg" alt="user picture">
                </div>
                <div class="the-header__user-item the-header__user-notifications">
                    <img class="the-header__img" src="../assets/img/home/user-notification.svg"
                         alt="notifications">
                </div>
                <div class="the-header__user-item the-header__user-add">
                    <img class="the-header__img" src="../assets/img/home/user-add.svg" alt="add button">
                </div>
                <div class="the-header__user-item the-header__domain-select">
                    <div class="the-header__domain-select-title fs14-lh16">
                        Select domain
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>

    <script>
        export default {
            name: "the-header"
        }
    </script>

    <style scoped>
        .the-header {
            height: 63px;
            background: #e8e8e8;
            color: #000;
        }

        .the-header__user-panel {
            display: flex;
            flex-direction: row-reverse;
            justify-content: flex-start;
            align-items: center;
            height: 100%;
        }

        .the-header__user-item {
            margin-right: 27px;
            cursor: pointer;
        }

        .the-header__user-pic {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 39px;
            height: 39px;
            background: #eee;
            border-radius: 50%;
        }

        .the-header__img {
            display: block;
        }

        .the-header__domain-select-title {
            position: relative;
            padding-right: 20px;
            letter-spacing: 0.5px;
            color: rgba(0, 0, 0, 0.3);
            user-select: none;
        }

        .the-header__domain-select-title:before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 12px;
            height: 12px;
            background: url("../assets/img/home/select-domain-arrow.svg") no-repeat center center;
            background-size: contain;
            transform: rotate(0);
            transition: 0.3s;
        }

    </style>