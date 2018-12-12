<template>
    <div class="row" style="padding-top: 40px;">
        <div class="col-6">
            <publisher-component></publisher-component>
        </div>
        <div class="col-6">
            <listener-component></listener-component>
        </div>
    </div>
</template>

<script>
    import PublisherComponent from './Publisher'
    import ListenerComponent from './Lister'

    export default {
        name: 'HomeIndex',
        components: {
            'publisher-component': PublisherComponent,
            'listener-component': ListenerComponent,
        },
    }
</script>

<style scoped>

</style>