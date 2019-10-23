<template>
    <label class="switcher">
        <input
                type="checkbox"
                :checked="value"
                @change="toggleSwitch"
        >
        <span class="slider"></span>
    </label>
</template>

<script>
    export default {
        name: "switcher",
        props: {
            value: {
                type: Boolean,
                required: true
            }
        },
        methods: {
            toggleSwitch() {
                this.$emit('input', !this.value);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .switcher {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 22px;
        cursor: pointer;
        
        input {
            width: 0;
            height: 0;
            opacity: 0;
        }
        
        .slider {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: $icon-color;
            border-radius: 24px;
            transition: $transition;
            
            &:before {
                content: '';
                position: absolute;
                bottom: 4px;
                left: 4px;
                height: 15px;
                width: 15px;
                background: #fff;
                border-radius: 50%;
                transition: $transition;
            }
        }

        input:checked + .slider {
            background: $accent-color;
        }

        input:checked + .slider:before {
            transform: translateX(17px);
        }
    }
</style>